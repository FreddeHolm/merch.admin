import React from 'react';
import Head from 'next/head';

//import Navbar from './Navbar';
import Footer from './Footer';
import { siteName, siteNameAlt2, siteEmail, metaDescription, metaKeywords  } from '../components/config';
import { client } from '../lib/client';
import { useTranslation } from 'react-i18next';


const Layout = ({ children, dynamicPageTitle, announcements }) => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="layout">
      <Head>
        <title>{siteNameAlt2} | {dynamicPageTitle ? dynamicPageTitle : t("layout.pagetitle") } {/*Studentovve | */}  </title>

        <meta charSet="UTF-8"/>
        <meta name="description" content={metaDescription}/>
        <meta name="keywords" content={metaKeywords}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="google-adsense-account" content="ca-pub-5860074326686436"/>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Your description" />      
        {/* Include ads.txt in head for accessibility */}
        <link rel="text/plain" href="/ads.txt" />
          {/* Helmet for adding AdSense script to head, oklart om jag behöver denna 
    <Helmet>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5860074326686436"
     crossorigin="anonymous"></script>
      </Helmet>*/}
      </Head>
      <header>
      {/*<Navbar announcements={announcements}/>*/}
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}



export default Layout