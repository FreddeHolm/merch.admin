// pages/studentlivet/admin/completeRegistration.js
import CompleteRegistration from '../../../components/studentlivetadmin/CompleteRegistration';
import { client } from '../../../lib/client';
import { studentlivetclient } from '../../../lib/studentlivetclient';
import { getAuth } from 'firebase/auth';
import { app, auth } from '../../../components/studentlivetadmin/firebase'; //
import { Product, Navbar } from '../../../components';
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';


const CompleteRegistrationPage = ({ products, announcements, release, slforening, sluniversities, slkarhus, slovve, slforeningfromusers, slcity }) => (
  <div>
  <Navbar announcements={announcements} release={release} productsss={products}/>
  <p style={{fontSize: "16px", marginTop:"20px", padding: "5px", marginLeft: "10px"}}> 
          <a className="text-link-style-black" style={{ top: "3px"}}><Link href={`/`} ><HomeIcon style={{ fontSize: "16px" }}/></Link></a>

          /
          <a className="text-link-style-black"><Link href={`/studentlivet/`}>studentlivet</Link></a>
       /
          <a className="text-link-style-black"><Link href={`/studentlivet/admin`} >admin</Link></a>
          /
          <a className="text-link-style-black"><Link href={`/studentlivet/admin/completeregistration`} >completeregistration</Link></a> 

          


</p>

  <CompleteRegistration slcity={slcity} sluniversities={sluniversities} />

  </div>
);




export const getServerSideProps = async ({ params }) => {
    //const { cityname } = params;
  
    const announcementsQuery = '*[_type == "announcements"]';
    const announcements = await client.fetch(announcementsQuery);
  
    const releaseQuery = '*[_type == "release"]';
    const release = await client.fetch(releaseQuery);
  
  
    const query = '*[_type == "product" && minovve != true && showproduct == true]';
    const products = await client.fetch(query);
    const productss = products.map(product => {
      return {
        ...product,
        hiddenLink: "https://www.studentshoppen.com/studentlivet"
      };
    });
  
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
    
    return {
      props: { products: productss, announcements, release, slcity, slovve, sluniversities, slkarhus, slforening, slforeningfromusers},
    };
  };

export default CompleteRegistrationPage;