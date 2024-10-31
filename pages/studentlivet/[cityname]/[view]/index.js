import React, { useState, useEffect } from 'react';
import { client } from '../../../../lib/client';
import { studentlivetclient, urlForSL  } from '../../../../lib/studentlivetclient';
import { useRouter } from 'next/router';

import Select from 'react-select';
import { Product, Navbar } from '../../../../components';
import { Studentlivet, Overallersl } from '../../../../components';

import { customStyles } from '../../../../components/filterPageUtils';
import { siteName, siteNameAlt2, siteEmail } from '../../../../components/config';
import { urlFor } from '../../../../lib/client';
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import ErrorIcon from '@material-ui/icons/Error';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import StudentlivetNavigation from '../../../../components/studentlivet/SLNavigation';

const SLCitySlug = ({ products, slsektioner, announcements, release, slcity, slovve, sluniversities,  slkarhus, slforening }) => {
  const [backgroundImage, setBackgroundImage] = useState();
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCategoryName, setSelectedCategoryName] = useState();
  const [selectedOvve, setSelectedOvve] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { cityname, view, slug } = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1); // Get hash without the '#'
      if (hash) {
        const selectedOvve = slovve.find(item => item.slug.current === hash);
        if (selectedOvve) {
          const skola = mapSchoolReferences(selectedOvve, sluniversities, selectedCityName);
          setSelectedOvve(selectedOvve);
          setSelectedSchool(skola);  // Set selected school
          setIsModalOpen(true);
        }
      }
    }
  }, [typeof window !== 'undefined' ? window.location.hash : null, slovve]);

  const [scrollPosition, setScrollPosition] = useState(0);  

// In your component where you open the modal
const openModal = (ovve, skola) => {
  setScrollPosition(window.scrollY);
  //document.body.style.overflow = 'hidden';  // Disable background scroll
  setSelectedOvve(ovve);
  setSelectedSchool(skola);
  setIsModalOpen(true);
  router.push(`#${ovve.slug.current}`, undefined, { shallow: true });
};

const closeModal = () => {
  //document.body.style.overflow = '';  // Enable background scroll
  setSelectedOvve(null);
  setSelectedSchool(null);  // Reset selectedSchool
  setIsModalOpen(false);
  router.push(`#`, undefined, { shallow: true });
  setTimeout(() => {
    window.scrollTo(0, scrollPosition);  // Restore the initial scroll position after closing the modal
  }, 0);  // Delay to ensure the modal close transition completes
};

  const handleSidebarClick = (category) => {
 
      setSelectedCategory(category);
      router.push(`/studentlivet/${cityname}/${category}`);
    
  };
  
  const categoryNames = {
    skolor: "Skolor",
    ovvar: "Overaller",
    foreningar: "Föreningar",
    karer: "Studentkårer",
    sektioner: "Sektioner"
  };

  useEffect(() => {
    setSelectedCategoryName(categoryNames[selectedCategory] || "");
  }, [selectedCategory]);

  useEffect(() => {
    //console.log( "view" + view);

    if (!view || !["skolor", "ovvar", "foreningar", "karer", "sektioner"].includes(view)) {
      // If no view specified, redirect to the default view ('skolor')
      router.push(`/studentlivet/${cityname}/skolor`);
      setSelectedCategory("skolor"); // Set the default category
    } else {
      // Set the selected category based on the view in the URL
      setSelectedCategory(view);
    }
  }, [cityname, view]);






  const [currentScreenSize, setCurrentScreenSize] = useState();

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {

      setCurrentScreenSize(window.innerWidth);
    };

    // Attach event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup: Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const selectedCityData = slcity?.find((city) => city.slug.current === cityname && city.show);
  const selectedCityName = selectedCityData ? selectedCityData.name : 'City Not Found';
  
  const selectedCityImage = selectedCityData?.image && selectedCityData.image[0] ? selectedCityData.image[0] : null;
//console.log(selectedCityData);
//console.log(selectedCityImage );

const containsCityReference = (locationArray, cityId) => {
  return Array.isArray(locationArray) && locationArray.some(location => location._ref === cityId);
};


const selectedCityOvve = slovve?.filter((ovve) => containsCityReference(ovve.location, selectedCityData._id) && ovve.show && !ovve.outdated);
const selectedCitySchool = sluniversities?.filter((school) => containsCityReference(school.location, selectedCityData._id));

const selectedCityKarer = slkarhus?.filter((karhus) => containsCityReference(karhus.location, selectedCityData._id));
const selectedCitySektioner = slsektioner?.filter((sektioner) => containsCityReference(sektioner.location, selectedCityData._id));
const selectedCityForening = slforening?.filter((forening) => containsCityReference(forening.location, selectedCityData._id));


const fallbackImageUrl = `/assets/studentlivet/stadbilder/${selectedCityData?.name.toLowerCase()}.jpg`;



  //console.log(selectedCityOvve);
  useEffect(() => {
    const selectedCity = cityname;


    setSelectedCity(cityname);
    setBackgroundImage(selectedCityImage);



    // Update the document's title when the component mounts

      document.title = `${siteNameAlt2 && siteNameAlt2} | ${[selectedCityName]}`;


  }, [cityname, selectedCityImage]);


//console.log("HEEEEEEEEEEEEEELP" + selectedCitySchool);


const selectedCityOvveBySkola = {};



const mapSchoolReferences = (ovve, schools, selectedCityName) => {
  if (ovve.belongstoschool && ovve.belongstoschool.length > 0) {
    // Check if any of the belongstoschool references is located in the selectedCityName
    if (ovve.belongstoschool.length > 1) {
      const matchingSchool = ovve.belongstoschool.find(ref => {
        const school = schools.find(s => s._id === ref._ref);
        if (!school) return false;
        // Check if the school is located in the selectedCityName
        return school.location.some(location => {
          const city = slcity.find(city => city._id === location._ref);
          return city && city.name.toLowerCase() === selectedCityName.toLowerCase();
        });
      });
      if (matchingSchool) {
        const school = schools.find(s => s._id === matchingSchool._ref);
        return school ? school.name : "error";
      }
    }
    // Default to the first reference if no match is found in the selectedCityName
    const school = schools.find(s => s._id === ovve.belongstoschool[0]._ref);
    return school ? school.name : "error";
  }
  return "undefined";
};

// Group selectedCityOvve by school
selectedCityOvve.forEach((ovve) => {
  const skola = mapSchoolReferences(ovve, sluniversities, selectedCityName);
  if (!selectedCityOvveBySkola[skola]) {
    selectedCityOvveBySkola[skola] = [];
  }
  selectedCityOvveBySkola[skola].push(ovve);
});


const FullSidebarItem = () => {
  return (
    
<div style={{
        width: '200px',
        border: '2px solid #37392e',
        borderRadius: '5px',
        scrollSnapType: 'y mandatory',
        overscrollBehaviorY: 'contain',
        overflowX: 'hidden',
        overflowY: 'auto',
        margin: 'auto',
        float: currentScreenSize < 500 ? "right" : "none",
        marginTop: currentScreenSize < 500 ? "-200px" : "150px", // TODO ENABLE LATER, set to none :  marginTop:  currentScreenSize < 500 ? "-200px" : "none",
    //marginBottom: "100px"


    }}>


  <ul style={{
    margin: '0',
    padding: '0',
    listStyle: 'none',
   background: '#eee5e5', //background: '#eee5e5',
  }}>
          <h2 style={{paddingLeft: "5px"}}>{selectedCityName.charAt(0).toUpperCase() + selectedCityName.slice(1)}</h2>


   {/* {selectedCitySchool?.length > 0 &&  (   */}
        <li key={selectedCitySchool.id} onClick={() => handleSidebarClick("skolor")} style={{padding: '10px', borderTop: '1px solid #ccc', display: 'flex', cursor: 'pointer', 
        alignItems: 'center', justifyContent: 'space-between',  backgroundColor: selectedCategory === "skolor" ? 'var(--primarycolor)' : 'transparent',
        }}>
          {"Skolor: ("+ selectedCitySchool.length+")"}
          <div style={{  marginTop:"5px"}}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>

          {/*<Link href={`/studentlivet/${city.current}`}>
            <div style={{ backgroundColor: "orange", marginTop:"5px", padding: "7px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>
          </Link>*/}
        </li>

   {/*    )} 
    {selectedCityOvve?.length > 0 &&  (     */}
        <li key={selectedCityOvve.id} onClick={() => handleSidebarClick("ovvar")} style={{padding: '10px', borderTop: '1px solid #ccc', display: 'flex', cursor: 'pointer',
        alignItems: 'center', justifyContent: 'space-between',  backgroundColor: selectedCategory === "ovvar" ? 'var(--primarycolor)' : 'transparent',
        }}>
          {"Overaller: ("+ selectedCityOvve.length+")"}
          <div style={{  marginTop:"5px"}}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>

          {/*<Link href={`/studentlivet/${city.current}`}>
            <div style={{ backgroundColor: "orange", marginTop:"5px", padding: "7px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>
          </Link>*/}
        </li>



 {/*  TODO, ENABLE LATER */}

               <li key={selectedCityForening.id} onClick={() => handleSidebarClick("foreningar")} style={{padding: '10px', borderTop: '1px solid #ccc', display: 'flex', cursor: 'pointer', 
               alignItems: 'center', justifyContent: 'space-between',  backgroundColor: selectedCategory === "foreningar" ? 'var(--primarycolor)' : 'transparent',
               }}>
                 {"Föreningar: ("+ selectedCityForening.length+")"}
                 <div style={{  marginTop:"5px"}}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>
           

               </li>



    <li key={selectedCityKarer.id} onClick={() => handleSidebarClick("karer")} style={{padding: '10px', borderTop: '1px solid #ccc', display: 'flex', cursor: 'pointer',
    alignItems: 'center', justifyContent: 'space-between',  backgroundColor: selectedCategory === "karer" ? 'var(--primarycolor)' : 'transparent',
    }}>
      {"Studentkårer: ("+ selectedCityKarer.length+")"}
      <div style={{  marginTop:"5px"}}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>


    </li>


  <li key={selectedCitySektioner.id} onClick={() => handleSidebarClick("sektioner")} style={{padding: '10px', borderTop: '1px solid #ccc', display: 'flex', cursor: 'pointer',
    alignItems: 'center', justifyContent: 'space-between',  backgroundColor: selectedCategory === "sektioner" ? 'var(--primarycolor)' : 'transparent',
    }}>
      {"Sektioner: ("+ selectedCitySektioner.length+")"}
      <div style={{  marginTop:"5px"}}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>

    </li>
         {/*  */}
            
      
    </ul>
  </div>
  );
};



  return (
    <div  >
    <Navbar announcements={announcements} release={release} productsss={products}/>

      <div className={announcements.filter((announcement) => announcement.showannouncement).length > 0 ? "entirefilterpage2" : "entirefilterpage"}>
        
{ /*
      <div
  className="filterbgimage"
  style={{
    backgroundImage: `url(${fallbackImageUrl})`, //backgroundImage ? `url(${urlForSL(backgroundImage).url()})` : `url(${fallbackImageUrl})`,    
    backgroundSize: 'cover', // Adjust this as needed
    backgroundPosition: 'center', // Adjust this as needed
    width: '100%',
    height: '30vh'
  }}

></div> */}

<div className='slinfopagecoverphotodiv'  style={{ position: 'relative' }} >
  <img
    src={fallbackImageUrl}
    
    alt="Profile Picture"
    className='slinfopagecoverphoto'
    
  />
  

</div>

{/* 
{currentScreenSize < 500 &&  ( 
  <div style={{ zIndex: 100, position: 'relative' }}>
<FullSidebarItem/>
</div>
 )} 

 */}

<p style={{fontSize: "16px", padding: "5px", marginLeft: "10px"}}> 
          <a className="text-link-style-black" style={{ top: "3px"}}><Link href={`/`} ><HomeIcon style={{ fontSize: "16px" }}/></Link></a>

          /
          <a className="text-link-style-black"><Link href={`/studentlivet/`}>studentlivet</Link></a>
           /
          <a className="text-link-style-black"><Link href={`/studentlivet/${selectedCityData.slug.current}`}>{selectedCityData.slug.current}</Link></a>
          /
          <a className="text-link-style-black"><Link href={`/studentlivet/${selectedCityData.slug.current}/${view}`}>{view}</Link></a>
        {/* /
          <a className="text-link-style-black"><Link href={`/studentlivet/${cityData.slug.current}/${slug}`} >{slug}</Link></a>
          */}
</p>

<p style={{fontSize: "16px", paddingLeft: "5px", marginLeft: "10px", }}> 
          <a className="text-link-style-black" style={{ top: "3px"}}  href="https://docs.google.com/forms/d/e/1FAIpQLScNjc54LGBTvMv8i-BP7jjfuk0MdMoM_pE3E_TZ_hal-BD0dA/viewform?usp=sf_link"  target="_blank"
  rel="noopener noreferrer"><ErrorIcon style={{ fontSize: "16px" }}/></a>

          
          <a className="text-link-style-black" style={{ left: "2px"}} href="https://docs.google.com/forms/d/e/1FAIpQLScNjc54LGBTvMv8i-BP7jjfuk0MdMoM_pE3E_TZ_hal-BD0dA/viewform?usp=sf_link"  target="_blank"
  rel="noopener noreferrer">Error och Feedback</a>
        {/* /
          <a className="text-link-style-black"><Link href={`/studentlivet/${cityData.slug.current}/${slug}`} >{slug}</Link></a>
          */}
</p>


     {/*  Facebook profile TODO: 
      {profilePicture && <img src={profilePicture} alt="Profile" style={{ }} />}
      
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



*/}


        
      <div className="products-heading">
      <h2>{selectedCategoryName} - {selectedCityName}</h2>
      {selectedCategory==="ovvar" && (      
      Object.keys(selectedCityOvveBySkola).map((skola) => (
  <div key={skola}>
    <h3 style={{ marginTop: "20px", fontSize: "20px" }}>{skola} ({selectedCityOvveBySkola[skola].length})</h3>
    <ul>
      <div className="products-container">
        {selectedCityOvveBySkola[skola].slice(0, 999).map((ovve) => (
          <div key={ovve.id} onClick={() => openModal(ovve, skola)}>
            <Overallersl sluniversities={sluniversities} slcity={slcity} key={ovve.id} cityname={cityname} school={skola} view={view} slovve={ovve} />
          </div>
        ))}
      </div>
    </ul>
  </div>
)))}

{isModalOpen && selectedOvve && (
  <div>
    <div onClick={closeModal}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}
    ></div>
    <div className="modal" style={{ zIndex: 10000, borderRadius: "15px" }}>
      <Overallersl 
        sluniversities={sluniversities} 
        slcity={slcity} 
        key={selectedOvve.id} 
        cityname={cityname} 
        view={view} 
        slovve={selectedOvve} 
        school={selectedSchool}  // Pass the selected school
        isModalOpen={isModalOpen} 
      />
      <FontAwesomeIcon className="cart-icon" style={{ width: "30px", position: 'absolute', top: '10px', right: '12px', cursor: 'pointer' }} id="bar" onClick={closeModal} icon={faTimes} />
    </div>
  </div>
)}

      {selectedCategory==="skolor" && (

            selectedCitySchool.length > 0 ? (
              <div>
                <h3>{selectedCitySchool.length} st {categoryNames[selectedCategory].charAt(0).toLowerCase() + categoryNames[selectedCategory].slice(1)} i  {selectedCityName.charAt(0).toUpperCase() + selectedCityName.slice(1)}</h3>
                <ul>

                <div className='products-container'>
                  {selectedCitySchool.slice(0, 999).map((school) => (
                      //<h4 key={school._id}>{school.name}</h4>
                      <Studentlivet key={school.id} cityname={cityname} view={view} sluniversities={school} slcity={slcity} entrycategory={categoryNames[selectedCategory]} />

                    ))}
                 </div>
                </ul>
              </div>
              ) :(
                <div style={{height: "200px"}}>
                  <h3>{selectedCitySchool.length} st {categoryNames[selectedCategory].charAt(0).toLowerCase() + categoryNames[selectedCategory].slice(1)} i  {selectedCityName.charAt(0).toUpperCase() + selectedCityName.slice(1)}</h3>

                </div> )    
            )}

    
      {selectedCategory==="foreningar" &&  (

          selectedCityForening.length > 0 ? (
              <div>
                <h3>{selectedCityForening.length} st {categoryNames[selectedCategory].charAt(0).toLowerCase() + categoryNames[selectedCategory].slice(1)} i  {selectedCityName.charAt(0).toUpperCase() + selectedCityName.slice(1)}</h3>

                <ul>

                <div className='products-container'>
                  {selectedCityForening.slice(0, 999).map((school) => (
                      //<h4 key={school._id}>{school.name}</h4>
                      <Studentlivet key={school.id} cityname={cityname} view={view} sluniversities={school} slcity={slcity} entrycategory={categoryNames[selectedCategory]}/>

                    ))}
                 </div>
                </ul>
              </div>
              ) :(
                <div style={{height: "200px"}}>
                  <h3>{selectedCityForening.length} st {categoryNames[selectedCategory].charAt(0).toLowerCase() + categoryNames[selectedCategory].slice(1)} i  {selectedCityName.charAt(0).toUpperCase() + selectedCityName.slice(1)}</h3>
  
                </div> )
            )}


      {selectedCategory==="karer" &&  (

selectedCityKarer.length > 0 ? (
              <div>
                <h3>{selectedCityKarer.length} st {categoryNames[selectedCategory].charAt(0).toLowerCase() + categoryNames[selectedCategory].slice(1)} i  {selectedCityName.charAt(0).toUpperCase() + selectedCityName.slice(1)}</h3>

                <ul>

                <div className='products-container'>
                  {selectedCityKarer.slice(0, 999).map((school) => (
                      //<h4 key={school._id}>{school.name}</h4>
                      <Studentlivet key={school.id} cityname={cityname} view={view} sluniversities={school} slcity={slcity} entrycategory={categoryNames[selectedCategory]}/>

                    ))}
                 </div>
                </ul>
              </div>
              ) :(
              <div style={{height: "200px"}}>
                <h3>{selectedCityKarer.length} st {categoryNames[selectedCategory].charAt(0).toLowerCase() + categoryNames[selectedCategory].slice(1)} i  {selectedCityName.charAt(0).toUpperCase() + selectedCityName.slice(1)}</h3>

              </div> )
            )}


{selectedCategory==="sektioner" &&  (

selectedCitySektioner.length > 0 ? (
              <div>
                <h3>{selectedCitySektioner.length} st {categoryNames[selectedCategory].charAt(0).toLowerCase() + categoryNames[selectedCategory].slice(1)} i  {selectedCityName.charAt(0).toUpperCase() + selectedCityName.slice(1)}</h3>

                <ul>

                <div className='products-container'>
                  {selectedCitySektioner.slice(0, 999).map((school) => (
                      //<h4 key={school._id}>{school.name}</h4>
                      <Studentlivet key={school.id} cityname={cityname} view={view} sluniversities={school} slcity={slcity} entrycategory={categoryNames[selectedCategory]}/>

                    ))}
                 </div>
                </ul>
              </div>
              ) :(
              <div style={{height: "200px"}}>
                <h3>{selectedCitySektioner.length} st {categoryNames[selectedCategory].charAt(0).toLowerCase() + categoryNames[selectedCategory].slice(1)} i  {selectedCityName.charAt(0).toUpperCase() + selectedCityName.slice(1)}</h3>

              </div> )
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


        <StudentlivetNavigation slcity={slcity} sluniversities={sluniversities} selectedCityName={selectedCityName}  cityname={cityname} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedCitySchool={selectedCitySchool} selectedCityOvve={selectedCityOvve} selectedCityForening={selectedCityForening} selectedCityKarer={selectedCityKarer} selectedCitySektioner={selectedCitySektioner}   />

 {/* 
{currentScreenSize >= 500 &&  ( 
    <div style={{ zIndex: 100, position: 'relative' }}>
    <StudentlivetNavigation slcity={slcity} sluniversities={sluniversities} />


  </div>
 )} 
*/}


</div>




      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { cityname } = params;
  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  const slovveQuery = '*[_type == "slovve"]';
  const slovve = await studentlivetclient.fetch(slovveQuery);

  const slcityQuery = '*[_type == "slcity"]';
  const slcity = await studentlivetclient.fetch(slcityQuery);

  const sluniversitiesQuery = '*[_type == "sluniversities"  && show == true]';
  const sluniversities = await studentlivetclient.fetch(sluniversitiesQuery);

  const slkarhusQuery = '*[_type == "slkarhus"]';
  const slkarhus = await studentlivetclient.fetch(slkarhusQuery);

  const slsektionerQuery = '*[_type == "slsektioner"]';
  const slsektioner = await studentlivetclient.fetch(slsektionerQuery);


  const slforeningQuery = '*[_type == "slforening"]';
  const slforening = await studentlivetclient.fetch(slforeningQuery);

  const query = '*[_type == "product" && minovve != true && showproduct == true]';
  const products = await client.fetch(query);
  const productss = products.map(product => {
    return {
      ...product,
      hiddenLink: "https://www.studentshoppen.com/studentlivet"
    };
  });
  return {
    props: { products: productss, announcements, slsektioner, slcity, slovve, sluniversities, release, cityname, slkarhus, slforening },
  };
};

export default SLCitySlug;