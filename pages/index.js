import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import { client } from '../lib/client';

import { Product, HeroBanner, Imgcarusel } from '../components';
import Link from 'next/link';
//import { Helmet } from 'react-helmet';
import Head from 'next/head';
import { useRouter } from 'next/router';

// ADS / Adsense : https://www.youtube.com/watch?v=7w4Qv50EVZE
// custom ads adsense: https://www.google.com/adsense/new/u/2/pub-5860074326686436/myads/units

import { fetchData } from  '../components/getServerSideProps.js';


import { useTranslation } from 'react-i18next';

const Home = ({ products, bannerData, ratingsData, announcements, landingimages, release }) => {
  // Filter products based on the "festen" tag

  const [t, i18n] = useTranslation("global");


  const router = useRouter();
  const currentPath = router.pathname;

  const [screenWidth, setScreenWidth] = useState(0);
  const [numberOfProducts, setNumberOfProducts] = useState();

  useEffect(() => {

    handleResize();
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
  
    // Initialize screen width on component mount
    setScreenWidth(window.innerWidth);
  
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

  const handleResize = () => {
    setScreenWidth(window.innerWidth);

if (window.innerWidth >= 1310) {
    setNumberOfProducts(10);
  } else if (window.innerWidth < 1310 && window.innerWidth >= 1045) {
    setNumberOfProducts(8);
  }else{

    setNumberOfProducts(6);
  }
  };


  const sortByLanguage = (data) => {
    return data.sort((a, b) => {
      // Sort by new products first (if the newproduct tag exists)
      if (i18n.language !== 'sv') {
        const langValues = ['universal', 'en'];
  

  
        if (langValues.includes(a.language) && langValues.includes(b.language)) {
          // If both have 'universal' or 'en' language, sort by importance
          if (a.newproduct && !b.newproduct) return -1;
          if (!a.newproduct && b.newproduct) return 1;
          return a.importance - b.importance;
          
        } else if (langValues.includes(a.language)) {
          // 'universal' or 'en' should come before other languages
          return -1;
        } else if (langValues.includes(b.language)) {
          // 'universal' or 'en' should come before other languages
          return 1;
        }

      } else{
      if (a.newproduct && !b.newproduct) return -1;
        if (!a.newproduct && b.newproduct) return 1;
      }
      // If i18n is sv or both have other languages, sort by importance
      return a.importance - b.importance;
    }).filter((product, index, self) => {
      // Filter out duplicate products based on their id
      return index === self.findIndex((p) => p.id === product.id);
    });
  };


  
  const allProducts = 
  products
    .filter((product) => product.showproduct && !product.minovve)
    .sort((a, b) => {
      // Sort by new products first (if the newproduct tag exists)
      if (a.newproduct && !b.newproduct) return -1;
      if (!a.newproduct && b.newproduct) return 1;
    
      // Then, sort by importance
      if (a.importance === undefined && b.importance === undefined) return 0;
      if (a.importance === undefined) return 1;
      if (b.importance === undefined) return -1;
      return a.importance - b.importance; 
    })
    .filter((product, index, self) => {
      // Filter out duplicate products based on their id
      return index === self.findIndex((p) => p.id === product.id);
    }); //.reverse()


  const festProducts = sortByLanguage(products.filter((product) =>
  product.tags && product.tags.includes('festen') && product.showproduct && !product.minovve));    
  


  const braProducts = sortByLanguage(products.filter((product) =>
  product.tags && product.tags.includes('bra att ha') && product.showproduct && !product.minovve));     


const patchesProducts = sortByLanguage(products.filter((product) =>
product.tags && product.tags.includes('patches') && product.showproduct && !product.minovve));    


const featuredProducts = sortByLanguage(products.filter((product) =>
product.tags && product.tags.includes('featured') && product.showproduct && !product.minovve));    




const ovvenProducts = sortByLanguage(products.filter((product) =>
product.tags && product.tags.includes('ovven') && product.showproduct && !product.minovve));



const newProducts = sortByLanguage(products
  .filter((product) => (product.newproduct || product.backInStock)  && product.showproduct && !product.minovve));
  

  
let mergedProducts = [];



if (newProducts.length < 4) { //4
// Merge new products with featuredProducts
mergedProducts = [
  ...newProducts,
  ...featuredProducts.filter(
    (featuredProduct) =>
      !newProducts.some((newProduct) => newProduct.id === featuredProduct.id)
  ),
];
} else {
// Display only featuredProducts
mergedProducts = [...featuredProducts];
}

  //PASS the props from  getServerSideProps


/*
useEffect(() => {
  // Trigger AdSense ads after the component has mounted
  (window.adsbygoogle = window.adsbygoogle || []).push({});
}, []);
*/

  return (
    
 <div> 
    
  {/* Helmet for adding AdSense script to head, oklart om jag behöver denna 
    <Helmet>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5860074326686436"
     crossorigin="anonymous"></script>
      </Helmet>*/}
      
      <Head> {/* Verifiera adsense, ads.txt filen ska ligga i pages och/eller public*/}
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Your description" />
        <meta name="google-adsense-account" content="ca-pub-5860074326686436"></meta>      
        {/* Include ads.txt in head for accessibility */}
        <link rel="text/plain" href="/ads.txt" />

        
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3KDRHQWHTV"></script>
<script
dangerouslySetInnerHTML={{
  __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-3KDRHQWHTV');
`
}}
  
></script>
        
      </Head>


    
    
    <Navbar announcements={announcements} release={release} productsss={products}/>

  
<div style={{ marginTop: announcements.filter(announcement => announcement.showannouncement).length > 0 ? "10px" : "-50px" }}>    
{landingimages.some(image => image.showcaruselimage) && <Imgcarusel landingimages={landingimages}/>  }  




  </div> 
  </div>  
);
};

//  const productQuery = '*[_type == "product" && minovve != true && price < 150]';
export const getServerSideProps = async () => {
  const productQuery = `*[_type == "product" && minovve != true && showproduct == true]`;
  const products = await client.fetch(productQuery);

  // Modify the fetched data to replace hiddenLink values with "abc"
  const productss = products.map(product => {
    return {
      ...product,
      hiddenLink: "https://www.studentshoppen.com/studentlivet"
    };
  });

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const ratingsQuery = '*[_type == "productratings"]';
  const ratingsData = await client.fetch(ratingsQuery);

  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const landingimagesquery = '*[_type == "landingimages" && showcaruselimage == true] | order(imageimportance asc)';
  const landingimages = await client.fetch(landingimagesquery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  // Return the data inside a 'props' key
  return { props: { products: productss, bannerData, ratingsData, announcements, landingimages, release } };
};

export default Home;
