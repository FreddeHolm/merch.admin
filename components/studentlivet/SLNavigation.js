import React, { useEffect, useState, useRef  } from 'react';
import Link from 'next/link';
import { faTimes, faLocationDot, faBars, faEarthAmericas, faCity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import { useRouter } from 'next/router';

const StudentlivetNavigation = ({ slcity, sluniversities, defaultOpen, selectedCityName, selectedCategory, cityname, setSelectedCategory, selectedCitySchool, selectedCityOvve, selectedCityForening, selectedCityKarer, selectedCitySektioner, adminpage, relativepositionheigth,
  selectedCity: propSelectedCity,
  setSelectedCity: propSetSelectedCity

  }) => {
  const [openLocationMenu, setOpenLocationMenu] = useState(defaultOpen ? defaultOpen : false);
  //const [selectedCity, setSelectedCity] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCity, setSelectedCity] = useState(propSelectedCity || null);

  const [openCityNavMenu, setOpenCityNavMenu] = useState(true);
  const [containerHeight, setContainerHeight] = useState('auto');

  const containerRef = useRef(null);
  const router = useRouter();

  const handleCityClick = (city) => {
    if (selectedCity && selectedCity.name === city.name) {
      window.location.href = `/studentlivet/${city.slug.current}/skolor`;
    } else {
      if (propSetSelectedCity) {
        propSetSelectedCity(city);
      } else {
        setSelectedCity(city);
      }
    }
  };

  const handleLocationClick = () => {
    setOpenLocationMenu(!openLocationMenu);
    if (openCityNavMenu === false && openLocationMenu === false) {
      setOpenCityNavMenu(true);
    }
    if (openCityNavMenu === true && openLocationMenu === true) {
      setOpenCityNavMenu(false);
    }
  };

  
  const handleCityNavClick = () => {
    setOpenCityNavMenu(!openCityNavMenu);
  };


  const handleSidebarClick = (category) => {
    setSelectedCategory(category);
    router.push(`/studentlivet/${cityname}/${category}`);
  
};


  const slcitySorting = slcity.filter((city) => city.show).sort((a, b) => {
    if (a.importance === undefined && b.importance === undefined) {
      return a.name.localeCompare(b.name);
    }
    if (a.importance === undefined) {
      return 1;
    }
    if (b.importance === undefined) {
      return -1;
    }
    if (b.importance !== a.importance) {
      return b.importance - a.importance;
    }
    return a.name.localeCompare(b.name);
  });




  const [screenWidth, setScreenWidth] = useState();
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
      

      if (containerRef.current) {
        const windowHeight = window.innerHeight;
        const containerTop = containerRef.current.getBoundingClientRect().top;
        setContainerHeight(`${windowHeight - containerTop - 1000}px`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Call the function initially to set the correct width and height
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    if (propSelectedCity) {
      setSelectedCity(propSelectedCity);
    }
  }, [propSelectedCity]);


  
  const FullSidebarItem = ( {selectedCityName, selectedCategory, selectedCitySchool, selectedCityOvve, selectedCityForening, selectedCityKarer, selectedCitySektioner,  } ) => {
    return (

        
        <div style={{ zIndex: 1001, right: openLocationMenu ? (screenWidth > 410 ? (openCityNavMenu ? "400px" : "300px") : (openCityNavMenu ? "340px" : "270px")) : (screenWidth > 410 ? (openCityNavMenu ? "200px" : "100px") : (openCityNavMenu ? "170px" : "100px") ), top: "70px", fontFamily: 'Poppins, sans-serif', position: 'fixed' }}>

      <div style={{
        position: 'absolute',
        top: scrolled ? "160px" : "220px",
        width: openCityNavMenu ? (screenWidth > 410 ? '200px' : '170px') : "100px",
        border: '2px solid #37392e',
        borderRadius: '5px',
        scrollSnapType: 'y mandatory',
        overscrollBehaviorY: 'contain',
        overflowX: 'hidden',
        overflowY: 'auto',
        margin: 'auto',
        zIndex: 1000,
      }}>
        <ul style={{
          margin: '0',
          padding: '0',
          listStyle: 'none',
          background: '#eee5e5',
          
        }}>


          <div style={{  display: 'flex', cursor: 'pointer', alignItems: 'center', padding: '10px 0', justifyContent: openCityNavMenu ? 'space-between' : "flex-start" }} onClick={handleCityNavClick}>
              <FontAwesomeIcon icon={faCity} className="cart-icon" style={{ marginLeft: "8px", color: "black", width: "28px", cursor: 'pointer' }} />
                
              {openCityNavMenu && <h2 style={{ marginLeft: "4px", fontSize: screenWidth > 410 ? '22px' : "18px" }}>            {selectedCityName.charAt(0).toUpperCase() + selectedCityName.slice(1)} </h2>}
              
              <FontAwesomeIcon className="cart-icon" style={{ width: "24px", marginTop: openCityNavMenu ? "2px" : "3px", marginLeft: openCityNavMenu ? "0px" : "10px", marginRight: "8px", color: "black" }} id="bar" icon={openCityNavMenu ? faTimes : faBars} />
            </div>
          
{openCityNavMenu && (
<>

          {/* Assuming selectedCitySchool, handleSidebarClick, selectedCategory, selectedCityOvve, selectedCityForening, selectedCityKarer, selectedCitySektioner are defined */}
          <li key={selectedCitySchool?.id} onClick={() => handleSidebarClick("skolor")} style={{
            padding: '10px',
            borderTop: '1px solid #ccc',
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: selectedCategory === "skolor" ? 'var(--primarycolor)' : 'transparent',
          }}>
            {"Skolor: (" + (selectedCitySchool?.length || 0) + ")"}
            <div style={{ marginTop: "5px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px' }} /></div>
          </li>

          <li key={selectedCityOvve?.id} onClick={() => handleSidebarClick("ovvar")} style={{
            padding: '10px',
            borderTop: '1px solid #ccc',
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: selectedCategory === "ovvar" ? 'var(--primarycolor)' : 'transparent',
          }}>
            {"Overaller: (" + (selectedCityOvve?.length || 0) + ")"}
            <div style={{ marginTop: "5px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px' }} /></div>
          </li>
{/* 
          <li key={selectedCityForening?.id} onClick={() => handleSidebarClick("foreningar")} style={{
            padding: '10px',
            borderTop: '1px solid #ccc',
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: selectedCategory === "foreningar" ? 'var(--primarycolor)' : 'transparent',
          }}>
            {"Föreningar: (" + (selectedCityForening?.length || 0) + ")"}
            <div style={{ marginTop: "5px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px' }} /></div>
          </li>

          <li key={selectedCityKarer?.id} onClick={() => handleSidebarClick("karer")} style={{
            padding: '10px',
            borderTop: '1px solid #ccc',
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: selectedCategory === "karer" ? 'var(--primarycolor)' : 'transparent',
          }}>
            {"Studentkårer: (" + (selectedCityKarer?.length || 0) + ")"}
            <div style={{ marginTop: "5px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px' }} /></div>
          </li>

          <li key={selectedCitySektioner?.id} onClick={() => handleSidebarClick("sektioner")} style={{
            padding: '10px',
            borderTop: '1px solid #ccc',
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: selectedCategory === "sektioner" ? 'var(--primarycolor)' : 'transparent',
          }}>
            {"Sektioner: (" + (selectedCitySektioner?.length || 0) + ")"}
            <div style={{ marginTop: "5px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px' }} /></div>
          </li>
      {/* //todo: enable   */ }

          </>)}

       

        </ul>

      

      </div>
      </div>
    );
  };

  return (
    <div>
      
      
      {selectedCityName && <FullSidebarItem  selectedCityName={selectedCityName} selectedCategory={selectedCategory} selectedCitySchool={selectedCitySchool} selectedCityOvve={selectedCityOvve} selectedCityForening={selectedCityForening} selectedCityKarer={selectedCityKarer} selectedCitySektioner={selectedCitySektioner} />}
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      <div style={{ 
zIndex: 1000, right: "0px", top: adminpage ? (relativepositionheigth ? relativepositionheigth : (screenWidth > 700 ?"300px" : "250px")): (scrolled ? "170px" : "230px"), fontFamily: 'Poppins, sans-serif', position: adminpage ? "absolute": 'fixed',  }}>
        <div style={{ width: openLocationMenu ? (screenWidth > 410 ? '200px' : '170px'): "100px", border: '2px solid #37392e', borderRadius: '5px', scrollSnapType: 'y mandatory', overscrollBehaviorY: 'contain', overflowX: 'hidden', overflowY: 'auto', margin: 'auto', }}>
          <ul style={{ margin: '0', padding: '0', listStyle: 'none', background: '#eee5e5' }}>
            <div style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', padding: '10px 0', justifyContent: openLocationMenu ? 'space-between' : "flex-start", borderBottom: openLocationMenu ? '2px solid var(--secondarycolor)' : "none" }} onClick={handleLocationClick}>
              <FontAwesomeIcon icon={faLocationDot} className="cart-icon" style={{ marginLeft: openLocationMenu ? "8px" : "12px", color: "black", width: "20px", cursor: 'pointer' }} />
              {openLocationMenu && <h2 style={{ marginLeft: "4px", fontSize: screenWidth > 410 ? '22px' : "18px" }}>Studentlivet</h2>}
              <FontAwesomeIcon className="cart-icon" style={{ width: "24px", marginTop: openLocationMenu ? "2px" : "3px", marginLeft: openLocationMenu ? "0px" : "14px", marginRight: "8px", color: "black" }} id="bar" icon={openLocationMenu ? faTimes : faBars} />
            </div>












            
            {openLocationMenu && <>
                <div style={{ height: "68vh", overflowY: 'auto' }}>
              <li style={{ padding: '10px',  display: 'flex', height: "40px", alignItems: 'center', backgroundColor: 'var(--secondarycolor)' }}>
                <FontAwesomeIcon icon={faEarthAmericas} style={{ marginLeft: "6px", color: 'var(--primarycolor)', width: "20px" }} />
                <h2 style={{ marginLeft: "8px", fontSize: '24px', color: 'var(--primarycolor)' }}>Sidor</h2>
              </li>
{/* //todo: enable  
              <Link href={`/studentlivet/allaovvar`}>
                <li key={"allaovvar"} style={{ padding: '10px', borderTop: '1px solid var(--secondarycolor)', display: 'flex', cursor: 'pointer', height: "40px", alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
                  <span style={{ fontWeight: 'bold', color: "var(--secondarycolor)" }}>Alla Ovvar</span>
                  <div style={{ marginTop: "5px", padding: "7px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px' }} /></div>
                </li>
              </Link>
             */}
              <Link href={`/studentlivet`}>
                <li key={"karta"} style={{ padding: '10px', borderTop: '1px solid var(--secondarycolor)', display: 'flex', cursor: 'pointer', height: "40px", alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
                  <span style={{ fontWeight: 'bold', color: "var(--secondarycolor)" }}>Karta</span>
                  <div style={{ marginTop: "5px", padding: "7px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px' }} /></div>
                </li>
              </Link>
        {/* //todo: enable  
              <Link href={`/studentlivet/admin`}>
                <li key={"admin"} style={{ padding: '10px', borderTop: '1px solid var(--secondarycolor)', display: 'flex', cursor: 'pointer', height: "40px", alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
                  <span style={{ fontWeight: 'bold', color: "var(--secondarycolor)" }}>Admin</span>
                  <div style={{ marginTop: "5px", padding: "7px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px' }} /></div>
                </li>
              </Link>
                   */}
              <li style={{ padding: '10px', borderTop: '1px solid var(--secondarycolor)', display: 'flex', height: "40px", alignItems: 'center', backgroundColor: 'var(--secondarycolor)' }}>
                <FontAwesomeIcon icon={faLocationDot} style={{ marginLeft: "8px", color: 'var(--primarycolor)', width: "16px" }} />
                <h2 style={{ marginLeft: "8px", fontSize: '24px', color: 'var(--primarycolor)' }}>Städer</h2>
              </li>

              
                      {slcitySorting.map((city, index) => (
                        <li
                          key={city._id}
                          onClick={() => handleCityClick(city)}
                          style={{
                            padding: '10px',
                            borderTop: index === 0 ? '1px solid var(--secondarycolor)' : '1px solid #ccc',
                            display: 'flex',
                            cursor: 'pointer',
                            height: '40px',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: selectedCity && selectedCity._id === city._id ? 'var(--primarycolor)' : 'transparent',
                          }}
                        >
                          {city.name}{' '}
                          {sluniversities && `(${sluniversities.filter(uni => 
                            Array.isArray(uni.location) && uni.location.some(loc => loc._ref === city._id)
                          ).length})`}
                          <Link href={`/studentlivet/${city.slug.current}/skolor`}>
                            <div style={{ marginTop: '5px', padding: '7px' }}>
                              <ArrowForwardIos fontSize="small" style={{ fontSize: '16px' }} />
                            </div>
                          </Link>
                        </li>
                      ))}
              </div>

            </>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentlivetNavigation;