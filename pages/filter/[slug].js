import React, { useState, useEffect } from 'react';
import { client } from '../../lib/client';
import Select from 'react-select';
import { Product, Navbar } from '../../components';
import { customStyles } from '../../components/filterPageUtils';
import { siteName, siteNameAlt2, siteEmail } from '../../components/config';
import { useTranslation } from 'react-i18next';


const FilteredPageSlug = ({ products, bannerData, ratingsData, announcements, slug, release }) => {
  const [backgroundImage, setBackgroundImage] = useState('/assets/filterproductimgs/all.jpg');
  const [selectedFilter, setSelectedFilter] = useState(slug);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    // Filter products based on the selected slug
    const filteredProducts = products.filter((product) =>
      product.tags && product.tags.includes(slug) && product.showproduct && !product.minovve
    );

    setFilteredProducts(filteredProducts);

    // Set the background image based on the selected slug
    const backgroundImageMap = {
      all: '/assets/filterproductimgs/all.jpg',
      festen: '/assets/filterproductimgs/festen.jpg',
      'bra-att-ha': '/assets/filterproductimgs/bra-att-ha.jpg',
      patches: '/assets/filterproductimgs/patches.jpg',
      ovven: '/assets/filterproductimgs/ovven.jpg',
      featured: '/assets/filterproductimgs/featured.jpg',
    };
    setBackgroundImage(backgroundImageMap[slug] || '/assets/filterproductimgs/all.jpg');


    // Update the document's title when the component mounts

      document.title = `${siteNameAlt2 && siteNameAlt2} | ${[slug]}`;


  }, [slug, products]);

  const filterOptions = [
    { value: 'all', label: t("navbar.Alla Produkter")},
    { value: 'featured', label: t("navbar.Bästsäljande")},
    { value: 'bra-att-ha', label:t("navbar.Bra Att Ha")},
    { value: 'festen', label: t("navbar.Till Festen")},
    { value: 'ovven', label: t("navbar.Till Ovven")},
    { value: 'patches', label: t("navbar.Märken")}, 
    
    /*{ value: 'all', label: 'Alla produkter' },
    { value: 'featured', label: 'Bästsäljande' },
    { value: 'bra-att-ha', label: 'Bra att ha' },
    { value: 'festen', label: 'Till Festen' },
    { value: 'ovven', label: 'Till Ovven' },
    { value: 'patches', label: 'Märken' }, */
  ];


  useEffect(() => {
    // Find the filter option with the matching value (slug)
    const selectedOption = filterOptions.find(option => option.value === slug);
    
    // Use the label from the selected option to set the document title
    document.title = `${siteNameAlt2 && siteNameAlt2} | ${selectedOption ? selectedOption.label : 'Alla produkter'}`;
  }, [slug, filterOptions]);




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



  const handleFilterChange = (selectedOption) => {
    const selectedValue = selectedOption.value;
    setSelectedFilter(selectedValue);

    switch (selectedValue) { // image template ratio 1:2.18 (tex 4032x1851)
      case 'festen':
        setFilteredProducts(festProducts);
        setBackgroundImage('/assets/filterproductimgs/festen.jpg');
        break;
      case 'bra-att-ha':
        setFilteredProducts(braProducts);
        setBackgroundImage('/assets/filterproductimgs/bra-att-ha.jpg');
        break;
      case 'patches':
        setFilteredProducts(patchesProducts);
        setBackgroundImage('/assets/filterproductimgs/patches.jpg');
        break;
      case 'ovven':
        setFilteredProducts(ovvenProducts);
        setBackgroundImage('/assets/filterproductimgs/ovven.jpg');
        break;
      case 'featured':
        setFilteredProducts(featuredProducts);
        setBackgroundImage('/assets/filterproductimgs/featured.jpg');
        break;
      default:
        setFilteredProducts(allProducts);
        setBackgroundImage('/assets/filterproductimgs/all.jpg');
    }

  };



  const allProducts = 
  sortByLanguage(products.filter((product) => product.showproduct && !product.minovve));
  


  
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
  

let displayedProducts;
let headingText;

switch (selectedFilter) {
  case 'festen':
    displayedProducts = festProducts;
    headingText = t("navbar.Till Festen");
    break;
  case 'bra-att-ha':
    displayedProducts = braProducts;
    headingText = t("navbar.Bra Att Ha");
    break;
  case 'patches':
    displayedProducts = patchesProducts;
    headingText = t("navbar.Märken");
    break;
  case 'ovven':
    displayedProducts = ovvenProducts;
    headingText = t("navbar.Till Ovven");
    break;
  case 'featured':
    displayedProducts = featuredProducts;
    headingText = t("filters.Bästsäljande Produkter");
    break;
  default:
    displayedProducts = allProducts;
    headingText = t("navbar.Alla Produkter");
}


  return (
    <div>
    <Navbar announcements={announcements} release={release} productsss={products}/>
      <div className={announcements.filter((announcement) => announcement.showannouncement).length > 0 ? "entirefilterpage2" : "entirefilterpage"}>
        
      <div className="filterbgimage" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div style={{ width: "100%", height: '30vh' }}></div>
        </div>
        
        
      <div className="products-heading">
          <h2>{headingText}</h2>
         {/*
        <select value={selectedFilter} onChange={handleFilterChange}>
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        */}
  
          <div style={{ width: "200px", margin: "10px auto 0 auto" }}>
            <Select // Replace the standard HTML select with react-select component
                value={{ value: selectedFilter, label: headingText }}
                options={filterOptions}
                onChange={handleFilterChange}
                isSearchable={false}
                styles={customStyles}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 10,
                  colors: {
                    ...theme.colors,
                    primary25: 'var(--primarycolor)',
                    primary: 'var(--secondarycolor)',
                  },/**/
                })}
              />
            </div>
        </div>


        <div className="products-container">
          {displayedProducts.map((product) => (
            <Product key={product.id} product={product} ratingsData={ratingsData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
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
    props: { products: productss, bannerData, ratingsData, announcements, slug, release },
  };
};

export default FilteredPageSlug;