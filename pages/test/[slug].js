import React, { useState, useEffect } from 'react';
import { client } from '../../lib/client';
import Select from 'react-select';
import { Product, Navbar, Studentlivet } from '../../components';
import { customStyles } from '../../components/filterPageUtils';
import { siteName, siteNameAlt2, siteEmail } from '../../components/config';
import { urlFor } from '../../lib/client';
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";



const fallbackImageUrl = '/assets/filterproductimgs/all.jpg';

const SLCitySlug = ({ products, announcements, release, slcity, slovve, sluniversities, slug }) => {
  const [backgroundImage, setBackgroundImage] = useState();
  const [selectedFilter, setSelectedFilter] = useState(slug);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("school");

  const handleSidebarClick = (category) => {
 
      setSelectedCategory(category);
    
  };



  const selectedCityData = slcity.find((city) => city.slug.current === slug);
  const selectedCityName = selectedCityData ? selectedCityData.name : 'City Not Found';
  
  const selectedCityImage = selectedCityData.image && selectedCityData.image[0] ? selectedCityData.image[0] : null;

//console.log(selectedCityImage );

const selectedCityOvve = slovve.filter((ovve) => ovve.location.toLowerCase() === selectedCityName.toLowerCase());
const selectedCitySchool = sluniversities.filter((school) => school.location.toLowerCase() === selectedCityName.toLowerCase());


  //console.log(selectedCityOvve);
  useEffect(() => {
    const selectedCity = slug;


    setSelectedCity(slug);
    setBackgroundImage(selectedCityImage || fallbackImageUrl);



    // Update the document's title when the component mounts

      document.title = `${siteNameAlt2 && siteNameAlt2} | ${[slug]}`;


  }, [slug, selectedCityImage]);

  return (
    <div>
          <Navbar announcements={announcements} release={release} productsss={products}/>
      <div className={announcements.filter((announcement) => announcement.showannouncement).length > 0 ? "entirefilterpage2" : "entirefilterpage"}>
        
 
      <div
  className="filterbgimage"
  style={{
    backgroundImage: backgroundImage ? `url(${urlFor(backgroundImage).url()})` : `url(${fallbackImageUrl})`,    
    backgroundSize: 'cover', // Adjust this as needed
    backgroundPosition: 'center', // Adjust this as needed
    width: '100%',
    height: '30vh'
  }}

></div>

        
        
      <div className="products-heading">
      <h2>{selectedCityName}, {selectedCategory}</h2>
      
      {selectedCategory==="ovve" && selectedCityOvve.length > 0 && (
        <div>
          <h3>Ovvar {selectedCityOvve.length} matching entries:</h3>
          <ul>
            {selectedCityOvve.map((ovve) => (
                <h4 key={ovve._id}>{ovve.location}</h4>
              ))}
          </ul>
        </div>
      )}

      {selectedCategory==="school" && selectedCitySchool.length > 0 && (
              <div>
                <h3>Skolor {selectedCitySchool.length} matching entries:</h3>
                <ul>
                  {selectedCitySchool.map((school) => (
                      //<h4 key={school._id}>{school.name}</h4>
                      <Studentlivet key={school.id} previousslug={slug} sluniversities={school} slcity={slcity} />

                    ))}
                </ul>
              </div>
            )}


         {/*
        <select value={selectedFilter} onChange={handleFilterChange}>
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        */}
  
          {/*<div style={{ width: "200px", margin: "10px auto 0 auto" }}>
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
                  },
                })}
              />
            </div>*/}
        </div>


        {/*
        <div className="products-container">
          {displayedProducts.map((product) => (
            <Product key={product.id} product={product} ratingsData={ratingsData} />
          ))}
        </div> 
        */}


        <div style={{ position: 'absolute', right: "0px", top: "240px", fontFamily: 'Poppins, sans-serif'}}>






<div style={{//maxHeight: 'var(--container-height)',
  width: '200px',
    border: '2px solid #37392e',
    borderRadius: '5px',
    scrollSnapType: 'y mandatory',
    overscrollBehaviorY: 'contain',
    overflowX: 'hidden',
    overflowY: 'auto',
    margin: 'auto'
    }}>
  <ul style={{
    margin: '0',
    padding: '0',
    listStyle: 'none',
    background: '#eee5e5',
  }}>
          <h2>List of Cities</h2>


    {selectedCitySchool.length > 0 &&  (
        <li key={selectedCitySchool.id} onClick={() => handleSidebarClick("school")} style={{padding: '10px', borderTop: '1px solid #ccc', display: 'flex', 
        alignItems: 'center', justifyContent: 'space-between',  backgroundColor: selectedCategory === "school" ? 'yellow' : 'transparent',
        }}>
          {"Skolor: ("+ selectedCitySchool.length+")"}
          <div style={{ backgroundColor: "orange", marginTop:"5px"}}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>

          {/*<Link href={`/studentlivet/${city.current}`}>
            <div style={{ backgroundColor: "orange", marginTop:"5px", padding: "7px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>
          </Link>*/}
        </li>
      )} 
    {selectedCityOvve.length > 0 &&  (
        <li key={selectedCityOvve.id} onClick={() => handleSidebarClick("ovve")} style={{padding: '10px', borderTop: '1px solid #ccc', display: 'flex', 
        alignItems: 'center', justifyContent: 'space-between',  backgroundColor: selectedCategory === "ovve" ? 'yellow' : 'transparent',
        }}>
          {"Overaller: ("+ selectedCityOvve.length+")"}
          <div style={{ backgroundColor: "orange", marginTop:"5px"}}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>

          {/*<Link href={`/studentlivet/${city.current}`}>
            <div style={{ backgroundColor: "orange", marginTop:"5px", padding: "7px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>
          </Link>*/}
        </li>
      )} 



            
      
    </ul>
  </div>
</div>




      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  const slovveQuery = '*[_type == "slovve"]';
  const slovve = await client.fetch(slovveQuery);

  const slcityQuery = '*[_type == "slcity"]';
  const slcity = await client.fetch(slcityQuery);

  const sluniversitiesQuery = '*[_type == "sluniversities"]';
  const sluniversities = await client.fetch(sluniversitiesQuery);

  const query = '*[_type == "product" && minovve != true && showproduct == true]';
  const products = await client.fetch(query);
  const productss = products.map(product => {
    return {
      ...product,
      hiddenLink: "https://www.studentshoppen.com/studentlivet"
    };
  });
  
  return {
    props: { products: productss, announcements, slcity, slovve, sluniversities, release, slug },
  };
};

export default SLCitySlug;