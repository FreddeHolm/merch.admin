import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { client } from '../lib/client';
import Head from 'next/head';

import { Layout } from '../components';
import '../styles/globals.css';
import '../styles/review.css';
import '../styles/studentlivet.css';

import '../styles/PatchSwipe.css';
import '../styles/SwipeButtons.css';

import '../styles/contactform.css';
import '../styles/create.css';
import '../styles/FormRadioCheckbox.css';
//import '../styles/bootstrap.min.css';

import { StateContext } from '../context/StateContext';

import CookieConsent from 'react-cookie-consent';

import { I18nextProvider, useTranslation } from 'react-i18next'
import i18next from 'i18next'

import global_en from "../components/translations/en/global.json"
import global_sv from "../components/translations/sv/global.json"
import Script from 'next/script'; // Import Script from next/script
import * as ReactGA from '../lib/googleanalytics';


i18next.init({
  interpolation: {escapeValue: true},
  lng: "sv",
  resources: {
    en:{
      global: global_en,
    },
    sv:{
      global: global_sv,
    },
  }


})





function MyApp({ Component, pageProps,  }) {
    const [t, i18n] = useTranslation("global");
  
    const router = useRouter();

    useEffect(() => {
      ReactGA.initGA(); // Initialize Google Analytics
      ReactGA.logPageView(); // Log initial pageview
  
      const handleRouteChange = (url) => {
        ReactGA.logPageView(); // Log pageview on route change
      };
  
      router.events.on('routeChangeComplete', handleRouteChange);
  
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, []);


  return (
    <StateContext >
      <I18nextProvider i18n={i18next}>
      <Layout >
          <Toaster />
        <Component {...pageProps} />
      </Layout>
      <Head>
        {/* Other meta tags TODO
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5860074326686436"
          crossOrigin="anonymous"
        /> */}{/* Use Script component instead */}
      </Head>
     { /*
      {i18next.language === "sv" ?  
      (<CookieConsent debug={true} location="bottom" 
      style={{background: "#000", textAlign: "left", zIndex: 2000}}
      buttonStyle={{ width: '120px', padding: '7px 14px', backgroundColor: 'var(--primarycolor)', color: 'white', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transform: 'scale(1, 1)', transition: 'transform 0.5s ease' }}
      buttonText="Jag förstår!"
      >Denna hemsida använder cookies. Se vår integritetspolicy <a className="text-link-style" ><Link href="/privacy-policy"  >här</Link></a> för mer information.</CookieConsent>)
    : (*/}
    <CookieConsent /*debug={true}*/ location="bottom" 
      style={{background: "#000", textAlign: "left", zIndex: 2000}}
      buttonStyle={{ width: '120px', padding: '7px 14px', backgroundColor: 'var(--primarycolor)', color: 'white', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transform: 'scale(1, 1)', transition: 'transform 0.5s ease' }}
      buttonText="I understand!"
      >This website uses cookies. See our privacy policy <a className="text-link-style" ><Link href="/privacy-policy"  >here</Link></a> for more information.</CookieConsent>
   { /*  )} */}
      </I18nextProvider>
    </StateContext>
  )
}




export default MyApp
