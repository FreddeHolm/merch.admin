import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../../../components/studentlivetadmin/AuthContext';
import Adminsida from '../../../components/studentlivetadmin/Adminsida';
import Login from '../../../components/studentlivetadmin/Login';
import { client } from '../../../lib/client';
import { Navbar } from '../../../components';
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import { studentlivetclient } from '../../../lib/studentlivetclient';
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const IndexContent = ({ products, slsektioner, announcements, release, slforening, sluniversities, slkarhus, slovve, slforeningfromusers, slcity }) => {
  const { currentUser, emailVerified, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState('');
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);
    let emailVerificationError = false;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError('Please verify your email before logging in, a new verification link has been sent to your email. ');
        await sendEmailVerification(user);
        await auth.signOut();
        emailVerificationError = true;
      }
    } catch (error) {
      if (emailVerificationError) {
        console.error('Login error:', error.message);
      } else {
        setError('An error occurred, please try again later. ' + error.message);
      }
      console.error('Login error:', error.message);
    } finally {
      setSubmitting(false);
      emailVerificationError = false;
    }
  };

  return (
    <>
      <Navbar announcements={announcements} release={release} productsss={products} />
      <div className={announcements.filter((announcement) => announcement.showannouncement).length > 0 ? "entirefilterpage2" : "entirefilterpage"}>
        <p style={{ fontSize: "16px", marginTop: "20px", padding: "5px", marginLeft: "10px" }}>
          <a className="text-link-style-black" style={{ top: "3px" }}><Link href={`/`} ><HomeIcon style={{ fontSize: "16px" }} /></Link></a>
          /
          <a className="text-link-style-black"><Link href={`/studentlivet/`}>studentlivet</Link></a>
          /
          <a className="text-link-style-black"><Link href={`/studentlivet/admin`} >admin</Link></a>
        </p>
        {currentUser && emailVerified ? (
          <Adminsida
            slforening={slforening}
            sluniversities={sluniversities}
            slkarhus={slkarhus}
            slsektioner={slsektioner}
            slovve={slovve}
            slforeningfromusers={slforeningfromusers}
            slcity={slcity}
          />
        ) : (
          <Login
            slforening={slforening}
            sluniversities={sluniversities}
            slkarhus={slkarhus}
            slsektioner={slsektioner}
            slovve={slovve}
            slforeningfromusers={slforeningfromusers}
            slcity={slcity}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLogin={handleLogin}
            error={error}
            message={message}
            submitting={submitting}
          />
        )}
      </div>
    </>
  );
};

const Index = (props) => {
  return (
    <AuthProvider>
      <IndexContent {...props} />
    </AuthProvider>
  );
};


export const getServerSideProps = async ({ params }) => {
  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  const query = '*[_type == "product" && minovve != true && showproduct == true]';
  const products = await client.fetch(query);
  const productss = products.map(product => ({
    ...product,
    hiddenLink: "https://www.studentshoppen.com/studentlivet"
  }));

  const slovveQuery = '*[_type == "slovve"]';
  const slovve = await studentlivetclient.fetch(slovveQuery);

  const slcityQuery = '*[_type == "slcity"]';
  const slcity = await studentlivetclient.fetch(slcityQuery);

  const sluniversitiesQuery = '*[_type == "sluniversities"]';
  const sluniversities = await studentlivetclient.fetch(sluniversitiesQuery);

  const slkarhusQuery = '*[_type == "slkarhus"]';
  const slkarhus = await studentlivetclient.fetch(slkarhusQuery);

  const slforeningQuery = '*[_type == "slforening"]';
  const slforening = await studentlivetclient.fetch(slforeningQuery);

  const slforeningfromusersQuery = '*[_type == "slforeningfromusers"]';
  const slforeningfromusers = await studentlivetclient.fetch(slforeningfromusersQuery);

  const slsektionerQuery = '*[_type == "slsektioner"]';
  const slsektioner = await studentlivetclient.fetch(slsektionerQuery);


  return {
    props: {
      products: productss,
      announcements,
      release,
      slcity,
      slovve,
      sluniversities,
      slkarhus,
      slforening,
      slforeningfromusers,
      slsektioner
    },
  };
};

export default Index;