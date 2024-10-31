import React, { useState, useEffect } from 'react';
import { client } from '../../lib/client';
import { studentlivetclient } from '../../lib/studentlivetclient';
import { useRouter } from 'next/router';

import { Navbar } from '../../components';
import { Studentlivet, Overallersl } from '../../components';
import { customStyles } from '../../components/filterPageUtils';
import { siteNameAlt2 } from '../../components/config';
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import ErrorIcon from '@material-ui/icons/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLocationDot  } from '@fortawesome/free-solid-svg-icons';

import StudentlivetNavigation from '../../components/studentlivet/SLNavigation';

const AllaOvvar = ({ products, announcements, release, slcity, slovve, sluniversities, slsektioner, slkarhus, slforening }) => {
  const [backgroundImage, setBackgroundImage] = useState();
  const [selectedCategory, setSelectedCategory] = useState("ovvar");
  const [selectedCategoryName, setSelectedCategoryName] = useState();
  const [selectedOvve, setSelectedOvve] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { view, slug } = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1); // Get hash without the '#'
      if (hash) {
        const selectedOvve = slovve.find(item => item.slug.current === hash);
        if (selectedOvve) {
          setSelectedOvve(selectedOvve);
          setIsModalOpen(true);

          //const skola = mapSchoolReferences(selectedOvve, sluniversities);

          //setSelectedSchool(skola.length > 0 ? skola[0] : null);  // Set selected school
        }
      }
    }
  }, [typeof window !== 'undefined' ? window.location.hash : null, slovve]);

  const [scrollPosition, setScrollPosition] = useState(0);  

// In your component where you open the modal
const openModal = (ovve, skola) => {
  setScrollPosition(window.scrollY);
  document.body.style.overflow = 'hidden';  // todo? disable?   Disable background scroll
  setSelectedOvve(ovve);
  setSelectedSchool(skola);
  setIsModalOpen(true);
  router.push(`#${ovve.slug.current}`, undefined, { shallow: true });
};

const closeModal = () => {

  document.body.style.overflow = '';  //  todo? disable? Enable background scroll
  setSelectedOvve(null);
  setSelectedSchool(null);
  setIsModalOpen(false);
  router.push(`#`, undefined, { shallow: true });
  window.scrollTo(0, scrollPosition);  // Restore the initial scroll position after closing the modal
};

  const handleSidebarClick = (category) => {
    setSelectedCategory(category);
    router.push(`/studentlivet/${category}`);
  };

  const [currentScreenSize, setCurrentScreenSize] = useState();

  useEffect(() => {
    const handleResize = () => {
      setCurrentScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const selectedCityOvve = slovve?.filter((ovve) => ovve.show && !ovve.outdated);




  const fallbackImageUrl = `/assets/studentlivet/stadbilder/Sundsvall.jpg`;
//olika för specifik sida samt för alla ovvar
const mapSchoolReferences = (ovve, schools) => {
  if (ovve.belongstoschool && ovve.belongstoschool.length > 0) {
    return ovve.belongstoschool.map(ref => {
      const school = schools.find(s => s._id === ref._ref);
      return school ? school.name : "error";
    });
  }
  return ["undefined"];
};

const selectedCityOvveBySkola = {};

selectedCityOvve.forEach((ovve) => {
  const skolor = mapSchoolReferences(ovve, sluniversities);
  skolor.forEach(skola => {
    if (!selectedCityOvveBySkola[skola]) {
      selectedCityOvveBySkola[skola] = [];
    }
    selectedCityOvveBySkola[skola].push(ovve);
  });
});
  

  return (
    <div>
      <Navbar announcements={announcements} release={release} productsss={products} />
      <StudentlivetNavigation slcity={slcity} sluniversities={sluniversities} />

      <div className={announcements.filter((announcement) => announcement.showannouncement).length > 0 ? "entirefilterpage2" : "entirefilterpage"}>
        <div className='slinfopagecoverphotodiv' style={{ position: 'relative' }}>
          <img src={fallbackImageUrl} alt="Profile Picture" className='slinfopagecoverphoto' />
        </div>
        {currentScreenSize < 500 && (
          <div style={{ zIndex: 100, position: 'relative' }}>
            {/* <FullSidebarItem /> */}
          </div>
        )}
        <p style={{ fontSize: "16px", padding: "5px", marginLeft: "10px" }}>
          <a className="text-link-style-black" style={{ top: "3px" }}><Link href={`/`} ><HomeIcon style={{ fontSize: "16px" }} /></Link></a>
          /
          <a className="text-link-style-black"><Link href={`/studentlivet/`}>studentlivet</Link></a>
          /
          <a className="text-link-style-black"><Link href={`/studentlivet/allaovvar`}>allaovvar</Link></a>
        </p>
        <p style={{ fontSize: "16px", paddingLeft: "5px", marginLeft: "10px", }}>
          <a className="text-link-style-black" style={{ top: "3px" }} href="https://docs.google.com/forms/d/e/1FAIpQLScNjc54LGBTvMv8i-BP7jjfuk0MdMoM_pE3E_TZ_hal-BD0dA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer"><ErrorIcon style={{ fontSize: "16px" }} /></a>
          <a className="text-link-style-black" style={{ left: "2px" }} href="https://docs.google.com/forms/d/e/1FAIpQLScNjc54LGBTvMv8i-BP7jjfuk0MdMoM_pE3E_TZ_hal-BD0dA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">Error och Feedback</a>
        </p>
        <div className="products-heading">


          <h2>Alla ovvar - {"Overaller: (" + selectedCityOvve.length + ")"}</h2>
          {selectedCityOvve.length > 0 ? (
            <div>
              
              <h3>{selectedCityOvve.length} st Ovvar i Sverige</h3> 
              {Object.keys(selectedCityOvveBySkola).map((skola) => (
                <div key={skola}>
                  <h3 style={{ marginTop: "20px", fontSize: "20px" }}>{skola} ({selectedCityOvveBySkola[skola].length})</h3>
                  <ul>
                    <div className="products-container">
                      {selectedCityOvveBySkola[skola].slice(0, 999).map((ovve) => (
                        <div key={ovve.id} onClick={() => openModal(ovve, skola)}>
                          <Overallersl key={ovve.id} cityname={"cityname"} view={view} slovve={ovve} sluniversities={sluniversities} school={skola}  slcity={slcity} /> {/* cityname={""} måste finnas med av nån anledning*/}
                        </div>
                      ))}
                    </div>
                  </ul>
                </div>
              ))}
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
                    <Overallersl key={selectedOvve.id} view={view} slovve={selectedOvve} isModalOpen={isModalOpen} slcity={slcity}  sluniversities={sluniversities} cityname={"cityname"} school={selectedSchool}/>
                    <FontAwesomeIcon className="cart-icon" style={{ width: "30px", position: 'absolute', top: '10px', right: '12px', cursor: 'pointer' }} id="bar" onClick={closeModal} icon={faTimes} />
                    
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ height: "200px" }}>
              <h3>{selectedCityOvve.length} st Ovvar i Sverige</h3>
            </div>
          )}
        </div>
        <div style={{ position: 'absolute', right: "0px", top: "240px", fontFamily: 'Poppins, sans-serif' }}>
          {currentScreenSize >= 500 && (
            <div style={{ zIndex: 100, position: 'relative' }}>
              {/* <FullSidebarItem /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
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
    props: { products: productss, announcements, slcity, slovve, sluniversities, release, slkarhus, slsektioner, slforening },
  };
};

export default AllaOvvar;