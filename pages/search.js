import React, { useState, useEffect } from 'react';
import { client } from '../lib/client';
import Select from 'react-select';
import { Product, Navbar } from '../components';
import { customStyles } from '../components/filterPageUtils';
import { AiOutlineShopping, AiOutlineSearch } from 'react-icons/ai'; //https://react-icons.github.io/react-icons/search?q=AiOutlineShopping
import { siteName, siteNameAlt2, siteEmail, siteFb, siteInsta  } from '../components/config';
import { useTranslation } from 'react-i18next';



const SearchPage = ({ products, bannerData, ratingsData, announcements, /* slug,*/ release }) => {
    const [t, i18n] = useTranslation("global");

      // Update the document's title when the component mounts
      useEffect(() => {
        document.title = `${siteNameAlt2 && siteNameAlt2} | ${t("filters.Sök produkter")}`;
      }, []);
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState(''); // Add search text state

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
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

  
  useEffect(() => {

    const filteredProducts = sortByLanguage(products
    .filter((product) => {
      const searchRegex = new RegExp(searchText, 'i'); // Case-insensitive search
  
      
      const detailsTextLanguage = (i18n.language === "sv" ? product.details : product.detailseng) || [];

      const detailsText = detailsTextLanguage
        .map((block) => block.children.map((child) => child.text).join(' ')) // Extract text from blocks
        .join(' '); // Concatenate text from blocks
  
      const nameMatch = searchRegex.test( i18n.language === "sv" ? product.name : (product.nameeng ? product.nameeng : product.name));
      const tagMatch = product.tags && product.tags.some((tag) => searchRegex.test(tag));
      const detailsMatch = searchRegex.test(detailsText);
  
      // Include the product only if any of the matches is true
      return nameMatch || tagMatch || detailsMatch;
    })
    .map((product) => {
      const searchRegex = new RegExp(searchText, 'i'); // Case-insensitive search
  
      const detailsTextLanguage = (i18n.language === "sv" ? product.details : product.detailseng) || [];

      const detailsText = detailsTextLanguage
        .map((block) => block.children.map((child) => child.text).join(' ')) // Extract text from blocks
        .join(' '); // Concatenate text from blocks
  
      const nameMatch = searchRegex.test(i18n.language === "sv" ? product.name : (product.nameeng ? product.nameeng : product.name));
      const tagMatch = product.tags && product.tags.some((tag) => searchRegex.test(tag));
      const detailsMatch = searchRegex.test(detailsText);
  
      // Assign a sorting priority based on matches
      let priority = 0;
  
      if (nameMatch) priority += 3; // Higher priority for name match
      if (tagMatch) priority += 2;
      if (detailsMatch) priority += 1;
  
      return { product, priority };
    })
    .sort((a, b) => b.priority - a.priority) // Sort by priority, highest first
    .map((result) => result.product) // Extract the product object
    .filter((product) => product.showproduct === true && !product.minovve)); // Filter by showproduct
  

    setFilteredProducts(filteredProducts);

  }, [ products, searchText, i18n.language]);

  



  return (
    <div>
    <Navbar announcements={announcements} release={release} productsss={products}/>
      <div className={announcements.filter((announcement) => announcement.showannouncement).length > 0 ? "entirefilterpage2" : "entirefilterpage"}>
        
      <div className="filterbgimage searchbarimage" style={{ backgroundImage: `url(/assets/filterproductimgs/search.jpg)` }}>
          <div style={{ width: "100%", height: '30vh' }}></div>
        </div>
        
        
      <div className="products-heading">
          <h2>{t("filters.Sök produkter")}</h2>
            
          <div className="searchBox">
            <AiOutlineSearch className="searchIcon" /> {/* Add this line */}
            <input
              className="searchInput"
              type="text"
              placeholder={t("filters.Sök produkter")}
              value={searchText}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>


        <div className="products-container" style={{marginTop: "80px"}}>
  {filteredProducts.map((product) => (
    <Product key={product.id} product={product} ratingsData={ratingsData} />
    ))}
</div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  //const { slug } = params;
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

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  return {
    props: { products: productss, bannerData, ratingsData, announcements, /*slug,*/ release },
  };
};

export default SearchPage;