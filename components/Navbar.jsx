import React, { useEffect, useState } from 'react';
import { client } from '../lib/client';
import Link from 'next/link';
import { AiOutlineShopping, AiOutlineSearch } from 'react-icons/ai'; //https://react-icons.github.io/react-icons/search?q=AiOutlineShopping
import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import Announcements from './Announcements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
/*
import { fiflag } from '/assets/languages/flags/fiflag.jpg';
import { svflag } from '/assets/languages/flags/svflag.jpg';
import { ukflag } from '/assets/languages/flags/ukflag.jpg';  */
import { useTranslation } from 'react-i18next';

const Navbar = ({announcements = [], slug, release = [], productsss = [] }) => {

  const { showCart, setShowCart, totalQuantities,  } = useStateContext();
  const [clicked, setClicked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
  //const [selectedLanguage, setSelectedLanguage] = useState('sv'); // Default language
  const [t, i18n] = useTranslation("global");


  const [isExpanded2, setIsExpanded2] = useState(false);




const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };


 

  }, []);



const router = useRouter();
const currentPath = router.pathname;

const isActiveLink = (href) => {
  return href === currentPath ? 'active' : '';
};




const closeClickMenu = () => {
    setClicked(false);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };




  const [screenWidth, setScreenWidth] = useState();
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
  
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
  
    // Initialize screen width on component mount
    setScreenWidth(window.innerWidth);
  
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);





  const toggleLanguageDropdown = () => {
    setLanguageDropdownVisible(!languageDropdownVisible);
  };

  /*const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setLanguageDropdownVisible(false);
    // You can add logic to update the language in your application here
  }; */

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    //console.log("Current Language:", i18n.language);
    setLanguageDropdownVisible(false);
  };

  const getFlagImageUrl = (language) => {
    switch (language) {
      case 'sv':
        return "/assets/languages/flags/svflag.jpg";
      case 'en':
        return "/assets/languages/flags/ukflag.jpg";
      /*case 'fi':
        return "/assets/languages/flags/fiflag.jpg";*/
      // Add more cases for other languages if needed
      default:
        return "/assets/languages/flags/svflag.jpg";
    }
  };
  /* enable todo*/


  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const toggleExpansion2 = () => {
    setIsExpanded2(!isExpanded2);
  };




//without dropdown:
  const toggleLanguage = () => {
    const newLang = i18n.language === 'sv' ? 'en' : 'sv';
    i18n.changeLanguage(newLang);
  };


  return (
    <div>

      <div className="navbarTopPadding" ></div>
      <div style={{ top: "0", position: 'fixed', left: "0", width: '100%', zIndex: 1099, paddingTop: "62px" }}>
        {announcements.length > 0 && (
          <Announcements announcements={announcements.filter(announcement => announcement.showannouncement)} />
        )}

        <div className={`navbar-container ${scrolled ? 'scrolled' : 'notscrolled'}`}
          style={{
            ...(announcements.length === 0 && { top: "0px" }),
            borderBottom: "2px solid var(--primarycolor)"
          }}>


          <div style={{ width: "30px", display: "flex", alignItems: "center" }} id="mobile" //onClick={handleClick}
          >
           {/* <FontAwesomeIcon className="cart-icon" style={{ width: "100%" }} id="bar" icon={clicked ? faTimes : faBars} /> */}
          </div>
          
          <p className="logo" style={{ cursor: "pointer" }}>
            
            <Link href="/"> 
            
            {screenWidth < 410 ? (  
              <img style={{ height: "62px", marginRight: "-40px" }} src="/assets/Studentshoppensmalllogo.png" alt="Company Logo" />


            ) : (
              <img style={{ maxWidth: "260px", marginRight: screenWidth < 550 ? "-40px": "-60px" }} src="/assets/NEWSTUDENTSTORELOGO3.png" alt="Company Logo w text" />

            )}
            


            </Link>
          </p>

    <div className="icons-container">     







<div  style={{position: "relative",}}>
  <button  type="button" className='language-select'
   style={{
    marginTop: "5px",
    height: "25px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    cursor: "pointer",  
    border: "none", 
    marginRight: "0px"

  }}
  //widthout dropdown
  //onClick={toggleLanguage} 
  
  //with dropdown:   
  //onClick={toggleLanguageDropdown}
  >
   {/*  <img 
      src={getFlagImageUrl(i18n.language)}
      alt="Selected Flag"
      style={{height: "100%"}}
    />
*/} 

  </button>
 
  
  {languageDropdownVisible && (
    <LanguageDropdown style={{zIndex: 20005}} selectedLanguage={i18n.language}  handleChangeLanguage={handleChangeLanguage} languageDropdownVisible={languageDropdownVisible}  />
  )}
    
</div> 



          <button type="button" className="search-icon" style={{ marginTop: "10px" }}>
         {/*  <Link href="/search">  
    
    

    <a>
     <AiOutlineSearch /> 
    </a>
  </Link> */} 
          </button>
          <button type="button" className="cart-icon" style={{ marginTop: "5px" }} //onClick={() => setShowCart(true)}
            >
           {/*  <AiOutlineShopping />
            <span className="cart-item-qty">{totalQuantities}</span>*/} 
          </button>
        </div>

          {showCart && <Cart productsss ={productsss}/>}
        </div>
      </div>
      

      <div style={{zIndex: 1098,}} className={
      announcements.filter(announcement => announcement.showannouncement).length > 0
        ? `navbaridthing ${scrolled ? 'navbaridscrolled' : 'navbaridnotscrolled'}`
        : `navbaridthing ${scrolled ? 'WAnnouncementsNavbaridscrolled' : 'WAnnouncementsNavbaridnotscrolled'}`
    }>

        <ul id="navbarid1" className={clicked ? "navbar active navbaridthing" : "navbar navbaridthing"}
        style={{maxHeight: '100vh', overflow: 'auto', paddingBottom: "150px" }}>
           <li className="nav-item " style={{width: '100%',}}>
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',  position: "relative", }}>
          <Link href="/studentlivet">
            <a className={`text-link-style ${router.pathname.startsWith('/studentlivet') ? 'active' : ''}`} onClick={closeClickMenu}>{t("navbar.Studentlivet")}</a>
          </Link>
          <FontAwesomeIcon icon={isExpanded ? faMinus : faPlus} onClick={toggleExpansion} style={{position: "relative", right: "10px", cursor: 'pointer', marginTop: "4px", width: "20px", color: "var(--primarycolor)" }} />
        </div>

            {isExpanded && (
              <ul className="sub-menu" style={{ marginBottom: "-15px"}}>
                <li style={{marginTop: "15px", marginBottom: "15px"}}>
                  <Link href="/studentlivet">
                    <a className={`text-link-style ${router.pathname === '/studentlivet' ? 'active' : ''}`} onClick={closeClickMenu}> • {t("navbar.Karta")}</a>
                  </Link>
                </li>

              </ul>
            )}
          
          </li>
          
         


          <li className="nav-item ">
            <Link href="/skapamarken">
              <a className={`text-link-style ${router.pathname === '/skapamarken' ? 'active' : ''}`} 
              onClick={closeClickMenu}>{t("navbar.Skapa Märken")}</a>
            </Link>
          </li>




{isExpanded2 && (
              <ul className="sub-menu" style={{ marginBottom: "-15px"}}>
                <li style={{marginTop: "15px", marginBottom: "15px"}}>
                  <Link href="/create">
                    <a className={`text-link-style `} onClick={closeClickMenu}>• {t("navbar.Märken")}</a>
                  </Link>
                </li>
 
                <li style={{marginTop: "15px", marginBottom: "15px"}}> 
                  <Link href="/create">
                    <a className={`text-link-style `} onClick={closeClickMenu}>• {t("navbar.Klistermärken")}</a>
                  </Link>
                </li>
              
             
              </ul>
            )}
            


           <li className="nav-item">
            <Link href="/release">
              <a className={`text-link-style ${router.pathname === '/release' ? 'active' : ''}`}
                onClick={closeClickMenu}>{t("navbar.Förbeställ märken")}</a>
            </Link>
          </li>




          <li className="nav-item ">
            <Link href="/filter/all">
              <a className={`text-link-style ${slug === '/filter/all' ? 'active' : ''}`} 
              onClick={closeClickMenu}>   &nbsp;&nbsp;- {t("navbar.Alla Produkter")}</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/filter/patches">
            <a className={`text-link-style ${router.pathname === '/filter/patches' ? 'active' : ''}`} 
              onClick={closeClickMenu}>   &nbsp;&nbsp;- {t("navbar.Märken")}</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/filter/featured">
            <a className={`text-link-style ${router.pathname === '/filter/featured' ? 'active' : ''}`} 
              onClick={closeClickMenu}>   &nbsp;&nbsp;- {t("navbar.Bästsäljande")}</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/filter/bra-att-ha">
            <a className={`text-link-style ${router.pathname === '/filter/bra-att-ha' ? 'active' : ''}`} 
              onClick={closeClickMenu}>   &nbsp;&nbsp;- {t("navbar.Bra Att Ha")}</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/filter/festen">
            <a className={`text-link-style ${router.pathname === '/filter/festen' ? 'active' : ''}`} 
              onClick={closeClickMenu}>   &nbsp;&nbsp;- {t("navbar.Till Festen")}</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/filter/ovven">
            <a className={`text-link-style ${router.pathname === '/filter/ovven' ? 'active' : ''}`} 
              onClick={closeClickMenu}>  &nbsp;&nbsp;- {t("navbar.Till Ovven")}</a>
            </Link>
          </li>

        </ul>
        
      </div>
      

    </div>
  );
};

const LanguageDropdown = ({ languageDropdownVisible, selectedLanguage, handleChangeLanguage }) => {

  return (
  <div className="language-dropdown" style={{display: languageDropdownVisible ? 'flex' :"none", }}>
    <div className="language-option" onClick={() => {handleChangeLanguage('sv'); }}  style={{borderBottom:'1px solid #ccc', display: 'flex', alignItems: 'center', backgroundColor: selectedLanguage === 'sv' ? 'var(--secondarycolor)' : "",
  borderTopLeftRadius: "8px", borderTopRightRadius: "8px",}}>
      <img src="/assets/languages/flags/svflag.jpg" alt="SV Flag" style={{height: "25px", border:'1px solid #ccc '}}/>
      <span style={{marginLeft: "10px", color: selectedLanguage === 'sv' ? 'white' : "black"}}>Sv</span>
    </div>

    <div className="language-option" onClick={() => {  handleChangeLanguage('en'); }} style={{ display: 'flex', alignItems: 'center', backgroundColor: selectedLanguage === 'en' ? 'var(--secondarycolor)' : "", 
    borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px",}}>
      <img src="/assets/languages/flags/ukflag.jpg" alt="En Flag" style={{height: "25px", border:'1px solid #ccc '}}/>
      <span style={{marginLeft: "10px", color: selectedLanguage === 'en' ? 'white' : "black"}}>En</span>
    </div>
    
   <div className="language-option" onClick={() => selectLanguage('fi')} style={{ display: 'flex', alignItems: 'center', backgroundColor: i18n.language === 'fi' ? 'var(--secondarycolor)' : "", 
    borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px",}}>
      <img src="/assets/languages/flags/fiflag.jpg" alt="FI Flag" style={{height: "25px", border:'1px solid #ccc '}}/>
      <span style={{marginLeft: "10px", color: i18n.language === 'fi' ? 'white' : "black"}}>Fi</span>
    </div> 



  </div>
);};

/*
export const getServerSideProps = async () => { //also import import { client } from '../lib/client';

  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  return {
    props: { announcements },
  };
};
*/

export default Navbar;