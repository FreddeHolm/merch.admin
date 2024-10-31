import React, { useEffect, useState }  from 'react';
import Navbar from '../components/Navbar';
import { client } from '../lib/client';
import { siteName, siteNameAlt2, siteEmail, siteFb, siteInsta  } from '../components/config';
import { useTranslation } from 'react-i18next';
import { fetchData } from  '../components/basicgetServerSideProps.js';


const Releases = ({announcements, release, products})=> {
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
    <Navbar announcements={announcements} release={release} productsss={products}/>
      
      {release.filter(release => release.showform).length > 0 ? (
      release.filter(release => release.showform).map((release) => (
      <>
        <div className="privacy-policy-container">
          <h1 className="title" style={{ marginTop: "30px" }}>{t("release.Formulär för")} {release.name && release.name} </h1>
          <h3 >{t("release.Formuläret stänger")}<span style={{ color: 'var(--primarycolor)' }}>
          {release.formclosedate && formatDate(release.formclosedate)}
          </span></h3>

        </div>
        <div     style={{display: "block", height: "100%",   overflow: "hidden"}}>
        {release.formurl &&
          <iframe
            src={release.formurl.replace("/viewform?usp=sf_link", "") + "/viewform?embedded=true"}
            width="100%"
            height={release.formheight ? 200 + release.formheight : 4000} //+200
            //height="4108" //+200

            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            >
            {t("release.loading")} 
          </iframe>}
        </div>
      </>
       ))
       ) : ( //else statement
        
       i18n.language === "sv" ? (
        <div className="privacy-policy-container" >
          <h1 className="title" style={{ marginTop: "30px" }}>Inget förbeställningsformulär öppet</h1>
          <p className="paragraph">
            Inga märken finns för närvarande att förbeställa. Följ oss på <a className="text-link-style" href={siteInsta}>Instagram</a> eller <a className="text-link-style" href={siteFb}>Facebook</a> för uppdateringar om framtida förbeställningar, nya märken och andra spännande nyheter. 
          </p>
        </div>) :( 
          <div className="privacy-policy-container" >
          <h1 className="title" style={{ marginTop: "30px" }}>No Pre-order Form Open</h1>
          <p className="paragraph">
            There are currently no brands available for pre-order. Follow us on <a className="text-link-style" href={siteInsta}>Instagram</a> or <a className="text-link-style" href={siteFb}>Facebook</a> for updates on future pre-orders, new patches, and other exciting news.
          </p>
        </div>
        )

       )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const data = await fetchData();

  return {
    props: { ...data },
  };
};

export default Releases;