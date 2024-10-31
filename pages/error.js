import React, { useEffect, useState }  from 'react';
import Navbar from '../components/Navbar';
import { client } from '../lib/client';
import { siteName, siteNameAlt2, siteEmail, siteFb, siteInsta  } from '../components/config';
import { useTranslation } from 'react-i18next';
import { fetchData } from  '../components/basicgetServerSideProps.js';
import HomeIcon from '@material-ui/icons/Home';
import Link from 'next/link';


const Error = ({announcements, products})=> {
  const [t, i18n] = useTranslation("global");

    // Update the document's title when the component mounts
    useEffect(() => {
      document.title = `${siteNameAlt2 && siteNameAlt2} | ${t("navbar.Förbeställ märken")}`;
    }, []);

  const [loadCounter, setLoadCounter] = useState(0);

  useEffect(() => {
    // Function to handle the iframe load event
    const handleIframeLoad = () => {
      setLoadCounter((prevCounter) => prevCounter + 1);
      
      
        window.scrollTo(0, 100);


    };

    // Add event listeners for iframe load events
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      iframe.addEventListener('load', handleIframeLoad);
    });

    // Cleanup: Remove event listeners when the component unmounts
    return () => {
      iframes.forEach((iframe) => {
        iframe.removeEventListener('load', handleIframeLoad);
      });
    };
  }, []);

  // Check loadCounter and update the iframe height and scroll position when both iframes are loaded
  /*useEffect(() => { //kan nog ta bort denna 
    if (loadCounter === 2) {
      // Update iframe height
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
        iframe.style.height = '500px';
      });

      // Scroll the window
      window.scrollTo(0, 115);
    }
  }, [loadCounter]);*/



  const formatDate = (date) => {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = d.getFullYear();
  
    return `kl ${hours}:${minutes} den ${day}-${month}-${year}`;
  };

  return (
    <div>
    <Navbar announcements={announcements}  productsss={products}/>
      
    <p style={{fontSize: "16px", padding: "5px", marginLeft: "10px", marginTop: "30px"}}> 
          <a className="text-link-style-black" style={{ top: "3px"}}><Link href={`/`} ><HomeIcon style={{ fontSize: "16px" }}/></Link></a>

          /
          <a className="text-link-style-black"><Link href={`/studentlivet/`}>studentlivet</Link></a>
          /
          <a className="text-link-style-black"><Link href={`/error/`}>error</Link></a> 
         
        {/* /
          <a className="text-link-style-black"><Link href={`/studentlivet/${cityData.slug.current}/${slug}`} >{slug}</Link></a>
          */}
</p>


      <>
        
        
       {/* <div className="privacy-policy-container">
          <h1 className="title" style={{ marginTop: "30px" }}>Ge feedback och rapportera errors</h1>
          <h3 >Fyll i formuläret nedan eller skicka ett mail till <span style={{ color: 'var(--primarycolor)' }}>
          
          </span></h3>

        </div>
        <div     style={{display: "block", height: "100%",   overflow: "hidden"}}>
        
          <iframe
            src={release.formurl.replace("/viewform?usp=sf_link", "") + "/viewform?embedded=true"}
            width="100%"
            //height={release.formheight ? 200 + release.formheight : 4000} //+200
            height="4108" //+200

            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            >
            {t("release.loading")} 
          </iframe>
        </div>*/}
      </>
       
        
    </div>
  );
};

export const getServerSideProps = async () => {
  const data = await fetchData();

  return {
    props: { ...data },
  };
};

export default Error;