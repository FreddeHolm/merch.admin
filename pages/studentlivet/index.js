import React, {useEffect, useState} from 'react';
import { siteName, siteNameAlt2, siteEmail } from '../../components/config';
import Navbar from '../../components/Navbar';
import { client } from '../../lib/client';
import { studentlivetclient } from '../../lib/studentlivetclient';

import StudentlivetNavigation from '../../components/studentlivet/SLNavigation';

//import { siteName, siteNameAlt2, siteEmail } from '../components/config';
import SwedenMap from '../../components/studentlivet/SwedenMap';
import Link from 'next/link';


import HomeIcon from '@material-ui/icons/Home';
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";

// yarn add react-simple-maps d3-geo

const MapApp = ({products, announcements, release, slcity, sluniversities}) => {
  const [selectedCity, setSelectedCity] = useState(null);

  /* Facebook profile TODO: 

  const [profilePicture, setProfilePicture] = useState('');
  useEffect(() => {
    // Make a request to the Facebook Graph API to get user profile picture
    // Replace 'FestN1' with the actual user ID or username
    const userId = 'FestN1';
    const accessToken = 'your_access_token'; // Replace with your access token
    const imageSize = 500;
    fetch(`https://graph.facebook.com/v13.0/${userId}/picture?type=large&width=${imageSize}&height=${imageSize}`)
      .then(response => response.url)
      .then(url => setProfilePicture(url))
      .catch(error => console.error(error));
      
  }, []);
  
    */


  return (
<div>
<Navbar announcements={announcements} release={release} productsss={products}/>
<StudentlivetNavigation slcity={slcity} sluniversities={sluniversities} defaultOpen={true} selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}  />
{/* 
<div style={{position: "absolute", zIndex: 0}} >
  <p style={{fontSize: "16px", padding: "5px", marginLeft: "10px", }}> 
          <a className="text-link-style-black" style={{ top: "3px"}}><Link href={`/`} ><HomeIcon style={{ fontSize: "16px" }}/></Link></a>

          /
          <a className="text-link-style-black"><Link href={`/studentlivet/`}>studentlivet</Link></a>
       

</p>

   
      <h1 style={{marginLeft: "10px",}}>Sverigekarta</h1>
      </div>      
     
      */}


      
      <SwedenMap slcity={slcity} sluniversities={sluniversities}  selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}/>

      
    {/* </div>*/}
    </div>
  );
};

export const getServerSideProps = async () => { //also import import { client } from '../lib/client';

  const query = '*[_type == "product" && minovve != true && showproduct == true]';
  const products = await client.fetch(query);
  const productss = products.map(product => {
    return {
      ...product,
      hiddenLink: "https://www.studentshoppen.com/studentlivet"
    };
  });


  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  const slcityQuery = '*[_type == "slcity"]';
  const slcity = await studentlivetclient.fetch(slcityQuery);

  const sluniversitiesQuery = '*[_type == "sluniversities" && show == true]';

  const sluniversities = await studentlivetclient.fetch(sluniversitiesQuery);
  
  
  return {
    props: { products: productss, announcements, release, slcity, sluniversities },
  };
};




export default MapApp;