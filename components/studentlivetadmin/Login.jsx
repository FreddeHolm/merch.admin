import React, { useState, useRef, useEffect } from 'react';
import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from './AuthContext'; // Import useAuth hook
import { useRouter } from 'next/router';
import StudentlivetNavigation from '../studentlivet/SLNavigation';
import Register from './Register'; // Import the Register component
import RegisterWithEmailLink from './RegisterWithEmailLink'; // Import the RegisterWithEmailLink component
import ReVerifyAccount from './ReVerifyAccount';


import ResetPassword from './ResetPassword'; // Import the ResetPassword component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import {  BsInfoCircle } from 'react-icons/bs';

const Login = ({  
  slforening,
  sluniversities,
  slkarhus,
  slovve,
  slcity,
 
 // Remove if  Login not from index
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
  error,
  message,
  submitting, 
}) => {
 /* Enable if Login not from index
 
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); 
  const [submitting, setSubmitting] = useState(false);

  */
  const [registerView, setRegisterView] = useState("Login"); // State to toggle between views
  const [activePopup, setActivePopup] = useState({ visible: false, header: "", content: '', position: { top: 0, left: 0 } });
  const router = useRouter();

  const auth = getAuth();
  const { currentUser } = useAuth(); // Use the useAuth hook to get current user
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActivePopup({ ...activePopup, visible: false });
      }
    };

    if (activePopup.visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activePopup]);

  useEffect(() => {
    if (router.query.error) {
      setError(router.query.error);
      router.replace('/studentlivet/admin', undefined, { shallow: true });
    }
  }, [router.query.error]);

  
/*   Enable if Login not from index
  
const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);
  
    try {
      console.log('Attempting to log in...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (user.emailVerified) {
        console.log('Login successful!');
        setMessage('Login successful!');
      } else {
        console.log('Email not verified');
        setError('Please verify your email before logging in.');
        await sendEmailVerification(user);
        await auth.signOut(); // Sign out the user since their email is not verified
        router.push({
          pathname: '/studentlivet/admin',
          query: { error: 'Please verify your email before logging in.' }
        });
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  //todo, error om konto inte finns
*/


  const handleLoginRegisterView = (value) => {
    setRegisterView(value);
  };

  const toggleInfoPopup = (e, header, content) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    let top = rect.top;
    let left = rect.left;

    // Ensure the popup doesn't go off the right edge of the screen
    const popupWidth = 300; // Approximate width of the popup
    if (left + popupWidth > window.innerWidth) {
      left = window.innerWidth - popupWidth - 10; // Adjust 10px from the right edge
    }

    // Ensure the popup doesn't go off the bottom edge of the screen
    const popupHeight = 200; // Approximate height of the popup
    if (top + popupHeight > window.innerHeight) {
      top = rect.top - popupHeight - 10; // Adjust 10px above the button
    }

    //console.log(`Top: ${top}, Left: ${left}`); // Debugging log

    setActivePopup({
      visible: !activePopup.visible,
      header: activePopup.visible ? '' : header,
      content: activePopup.visible ? '' : content,
      position: { top, left }
    });
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 1rem',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: "600px",
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            backgroundColor: registerView === "Login" ? "transparent" :  registerView === "ResetPassword" ? "var(--primarycolor)":"var(--secondarycolor)",
            borderRadius: '0.875rem'
          }}
        >
          <div>
            <h2 style={{ marginTop: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', color: registerView === "Login" ? "Black" : (registerView === "ResetPassword"? "var(--secondarycolor)" : "var(--primarycolor)" ) }}>
              {registerView === "Login" ? ("Sign in to your account") :
                registerView === "ResetPassword" ? ("Reset password") :
                registerView === "ReVerifyAccount" ? ("Resend Account Verification") :
                (registerView === "RegisterLink" ? ("Register with Email Link")
                  : registerView === "Register" && ("Register with Email/Password"))
              }
            </h2>
          </div>

          <div>
            {registerView === "Register" ? (
              <Register slcity={slcity} sluniversities={sluniversities} registerView={registerView} />
            ) : registerView === "ReVerifyAccount" ? (
              <ReVerifyAccount slforening={slforening} sluniversities={sluniversities} slkarhus={slkarhus} slovve={slovve} slcity={slcity} registerView={registerView} />
            ) :
            registerView === "RegisterLink" ? (
              <RegisterWithEmailLink slforening={slforening} sluniversities={sluniversities} slkarhus={slkarhus} slovve={slovve} slcity={slcity} registerView={registerView} />
            ) : registerView === "ResetPassword" ? (
              <ResetPassword />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
                <div style={{ width: '100%', maxWidth: '600px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <form
                      onSubmit={handleLogin}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.375rem',
                        padding: '1.5rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <div>
                        <label>Email:</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            fontSize: '1rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                          }}
                        />
                      </div>
                      <div>
                        <label>Password:</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            fontSize: '1rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                          }}
                        />
                      </div>
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      {message && <p style={{ color: 'green' }}>{message}</p>}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button
                          type="submit"
                          disabled={submitting}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            fontSize: '1rem',
                            backgroundColor: 'var(--primarycolor)',
                            color: 'white',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            border: "1px solid var(--primarycolor)"
                          }}
                        >
                          {submitting ? 'Signing in...' : 'Sign in'}

                        </button>
                      </div>
                      <button 
                        onClick={(e) => toggleInfoPopup(e, "Login Info" ,'If you have registered for an account, log in with the email/password you choose. If you forgot your password you can reset it under the "Forgot Password?" section and if you dont have an account, you can register under "Register account" section, if you have any questions please contact info@studentshoppen.com.')} 
                        style={{ width: "30px", backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <BsInfoCircle style={{ fontSize: "30px", color: 'var(--primarycolor)' }} />
                      </button>
                    </form>
                    
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-20px' }}>
                      <button onClick={() =>  handleLoginRegisterView(registerView !== "Register" ? "Register" : "Login")}  style={{ padding: '0.75rem', fontSize: '1rem', backgroundColor: 'transparent', color: registerView !== "ResetPassword" ? 'var(--primarycolor)' : 'var(--secondarycolor)', border: 'none', cursor: 'pointer' }}>
                        
                        {registerView !== "Register" ? 'Register?' : 'Sign in'}
                      </button>
            </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-20px' }}>
                      <button onClick={() =>  handleLoginRegisterView(registerView !== "ResetPassword" ? "ResetPassword" : "Login")}  style={{ padding: '0.75rem', fontSize: '1rem', backgroundColor: 'transparent', color: registerView !== "ResetPassword" ? 'var(--primarycolor)' : 'var(--secondarycolor)', border: 'none', cursor: 'pointer' }}>
                        
                        {registerView !== "ResetPassword" ? 'Forgot Password?' : 'Sign in'}
                      </button>
            </div>

{/*
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-20px' }}>
            <button onClick={() => handleLoginRegisterView(registerView !== "RegisterLink" ? "RegisterLink" : "Login")} 
              style={{ padding: '0.75rem', fontSize: '1rem', backgroundColor: 'transparent', color: registerView !== "ResetPassword" ? 'var(--primarycolor)' : 'var(--secondarycolor)', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
              {registerView !== "RegisterLink" ? 'Register account direct link' : 'Sign in'}
            </button>
          </div>
*/}
{/*
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-20px' }}>
            <button onClick={() => handleLoginRegisterView(registerView !== "ReVerifyAccount" ? "ReVerifyAccount" : "Login")} 
              style={{ padding: '0.75rem', fontSize: '1rem', backgroundColor: 'transparent', color: registerView !== "ResetPassword" ? 'var(--primarycolor)' : 'var(--secondarycolor)', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
              {registerView !== "ReVerifyAccount" ? 'Resend Account Verification' : 'Sign in'}
            </button>
          </div>
*/}

          <StudentlivetNavigation slcity={slcity} sluniversities={sluniversities} adminpage={true} relativepositionheigth={"250px"} />
        </div>
      </div>

      {activePopup.visible && (
        <div ref={popupRef} style={{
          position: 'absolute',
          top: `${activePopup.position.top}px`,
          left: `${activePopup.position.left}px`,
          backgroundColor: 'white',
          padding: '1rem',
          border: '3px solid var(--secondarycolor)',
          borderRadius: '0.375rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          maxWidth: '300px',
          width: 'auto',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <div style={{
              content: '',
              position: 'absolute',
              bottom: '-10px',
              left: 'calc(50% - 10px)',
              borderWidth: '10px',
              borderStyle: 'solid',
              borderColor: 'white transparent transparent transparent',
            }}></div>
          </div>
          <h3 style={{ margin: '0 0 1rem 0' }}>{activePopup.header}</h3>
          <p>{activePopup.content}</p>
          <button onClick={() => setActivePopup({ ...activePopup, visible: false })} style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: 'var(--primarycolor)',
            color: 'white',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            marginTop: '15px',
            transition: 'background-color 0.3s',
            border: '1px solid var(--primarycolor)'
          }}>
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Login;