import React, { useState, useEffect } from 'react';
import { siteName, siteNameAlt2, siteEmail } from '../components/config';
import Navbar from '../components/Navbar';
import { client } from '../lib/client';
import Patchswipe from '../components/patchswipe/PatchSwipe.tsx';

import { Product, HeroBanner, Patchcontact } from '../components';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';


const Skapamarken = ({ products, bannerData, ratingsData, announcements, showcasepatches, release }) => {
  
  const [t, i18n] = useTranslation("global");

      // Update the document's title when the component mounts
      useEffect(() => {
        document.title = `${siteNameAlt2 && siteNameAlt2} | ${t("Skapamärken.Skapa dina egna märken")}`;
      }, []);



  
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


  
  const patchesProducts = sortByLanguage(products.filter((product) =>
product.tags && product.tags.includes('patches') && product.showproduct && !product.minovve));


const initialNumberOfProducts = 5; // Set the initial number of products to display
  const [numberOfProducts, setNumberOfProducts] = useState(initialNumberOfProducts);
  
const loadMoreProducts = () => {
    // Increase the number of products to display by 10
    setNumberOfProducts((prevNumber) => prevNumber + 10);
  };
  
  const remainingProducts = patchesProducts.length - numberOfProducts;
  
  
  return (
<div >
<Navbar announcements={announcements} release={release} productsss={products}/>

    <div className="privacy-policy-container">
      <Patchswipe showcasepatches={showcasepatches}/>
    </div>

 
    
{/* Divider */}
<hr className="divider" style={{marginTop: "-100px", border: "1px solid lightgrey"}} /> 
    <Patchcontact />

    

{/* Divider */}
<hr className="divider" style={{border: "1px solid lightgrey"}} /> 

<div className="products-heading">
      <Link href="/filter/patches">

        <div className="heading-container">
          
        <h2 style={{color: "var(--primarycolor)", fontSize: "30px"}}>{t("navbar.Märken")}</h2>
          <a style={{color: "var(--primarycolor)"}}>&gt;</a> {/* Replace ">" with &gt; */}            
          </div>
      </Link>
    </div>
    <div className="products-container">
      {patchesProducts.slice(0, numberOfProducts) /* numberOfProducts */
      .map((product) => <Product key={product.id} product={product} ratingsData={ratingsData} />)}
    </div>


    {remainingProducts > 0 && (
        <div className="load-more-button-container" style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" onClick={loadMoreProducts} className='purchasebuttons' style={{  /* float: 'right', */ backgroundColor: 'var(--secondarycolor)', border: "1px solid var(--secondarycolor)", color: "white"  }} >{t("Skapamärken.Ladda mer")}</button>
        </div>
      )}
      



    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product" && minovve != true && showproduct == true]';
  const products = await client.fetch(query);
  
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

  const showcasepatchesQuery = '*[_type == "showcasepatches"]';
  const showcasepatches = await client.fetch(showcasepatchesQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  return {
    props: { products: productss, bannerData, ratingsData, announcements, showcasepatches, release }
  }
}


export default Skapamarken;