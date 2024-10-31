import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

import { urlFor } from '../../lib/client';
import { useStateContext } from '../../context/StateContext';
import ColorConverter from './ColorConverter';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ovvecolor2 = '/assets/studentlivet/ovvecolorwebb.png';
const ovvecolor = '/assets/studentlivet/ovvecolorwebb2.png';

const ovvefull = '/assets/studentlivet/ovvefullwebb.png';
const ovveoutline = '/assets/studentlivet/ovveoutlinewebb.png';

const rightlegcolor1 = '/assets/studentlivet/rightlegcolor1.png';
const rightlegcolor2 = '/assets/studentlivet/rightlegcolor2.png';


const leftlegcolor1 = '/assets/studentlivet/leftlegcolor1.png';
const leftlegcolor2 = '/assets/studentlivet/leftlegcolor2.png';


const coloredleftarmar1 = '/assets/studentlivet/coloredleftarmar1.png';
const coloredleftarmar2 = '/assets/studentlivet/coloredleftarmar2.png';
const coloredrightarmar1 = '/assets/studentlivet/coloredrightarmar1.png';
const coloredrightarmar2 = '/assets/studentlivet/coloredrightarmar2.png';

const deladleftarm = '/assets/studentlivet/deladleftarm.png';
const deladleftleg = '/assets/studentlivet/deladleftleg.png';
const deladrightarm = '/assets/studentlivet/deladrightarm.png';
const deladrightleg = '/assets/studentlivet/deladrightleg.png';
const kneecolor = '/assets/studentlivet/kneecolor.png';
const revar1 = '/assets/studentlivet/revar1.png';
const revar2 = '/assets/studentlivet/revar2.png';
const revar3 = '/assets/studentlivet/revar3.png';

const ovvetextcolor = '/assets/studentlivet/ovvenamnleft.png';
const ovvetextcolorright = '/assets/studentlivet/ovvenamnright.png';
const ovvetextright =  '/assets/studentlivet/ovvetextright.png';
const ovvetextleft =  '/assets/studentlivet/ovvetextleft.png';


const hangslen = '/assets/studentlivet/hangslen.png';
const collegejacka = '/assets/studentlivet/collegejacka.png';
const vast = '/assets/studentlivet/vast.png';
const frack = '/assets/studentlivet/frack.png';
const rock = '/assets/studentlivet/rock.png';
const tshirt = '/assets/studentlivet/tshirt.png';
const skjortaslips = '/assets/studentlivet/skjortaslips.png';
const ovvevasttroja = '/assets/studentlivet/ovvevasttroja.png';
const ovvevastbasker = '/assets/studentlivet/ovvevastbasker.png';








const Overallersl = ({ slovve, slcity,school,  cityname, isModalOpen, sluniversities } ) => {




  const ovveColorOptions = [
    { title: 'Svart', value: '#000000' },
    { title: 'Vit', value: '#ffffff' },
    { title: 'Lila', value: '#8924a6' },
    { title: 'Rosa', value: '#fa3584' },
    { title: 'Röd', value: '#cd1f20' },
    { title: 'Blå', value: '#1808ff' },
    { title: 'Ljusblå', value: '#02feff' },
    { title: 'Grön', value: '#04ab13' },
    { title: 'Gul', value: '#fffe03' },
    { title: 'Orange', value: '#ff7f00' },
    { title: 'Grå', value: '#B4B4B4' },
    { title: 'Brun', value: '#974a02' },
  ];
  const findOvveColorTitle = () => {
    const colorOption = ovveColorOptions.find((option) => option.title === slovve.ovvecolor[0]);
    return colorOption ? colorOption.value : '';
  };
//Funktion ovan letar upp vilken huvudsaklig ovvefärg e ifylld och letar upp den förbestämda ovvefärgkoden ovan.


const [isHovering, setIsHovering] = useState(false);

const [screenWidth, setScreenWidth] = useState(0);
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





  // Check if sluniversities is undefined or doesn't have a name property
  if (!slovve /*|| !slovve.name*/) {
    return null; // Skip rendering if the data is not available
  }
  
  const smallScreenSize = screenWidth <= 550 ? 150 : 250;
const largeScreenSize = screenWidth <= 600 ? 300 : 500;


  const MAX_NAME_LENGTH = screenWidth <= 550 ? 19 : 30;
  const truncatedName =
      slovve.name ? (slovve.name.length > MAX_NAME_LENGTH
      ? slovve.name.substring(0, MAX_NAME_LENGTH) + '...' : slovve.name) 
      
      : (slovve.utbildning && slovve.utbildning.length > MAX_NAME_LENGTH
      ? slovve.utbildning.substring(0, MAX_NAME_LENGTH) + '...': slovve.utbildning);







      const getCityNameForSchool = (schoolName, ) => {
        if (!schoolName) return '';
        
        const school = sluniversities.find(school => school.name === schoolName);
        if (school && school.location && school.location.length > 0) {
          const city = slcity.find(city => city._id === school.location[0]._ref);
          return city ? city.name : '';
        }
        
        return '';
      };



      const getSchoolNames = (schoolArray, schools) => {
        if (!schoolArray || !Array.isArray(schoolArray) || !Array.isArray(schools)) return [];
        return schoolArray.map(sch => {
          const school = schools.find(school => school._id === sch._ref);
          return school ? school.name : 'Unknown School';
        });
      };
    
      const schoolNames = getSchoolNames(slovve.belongstoschool, sluniversities);


  return (
<div className='entireproduct'>
      <div 
        className={!isModalOpen ? "product-card" : "product-card-openmodal"}
        onMouseEnter={!isModalOpen ? () => setIsHovering(true) : undefined}
        onMouseLeave={!isModalOpen ? () => setIsHovering(false) : undefined}
        style={{maxWidth: "500px"}}

      >
        <div style={{ backgroundColor: " var(--slovvecardbackground)", borderRadius: "15px" }}>

{slovve?.ovvetype === "normal" &&
<>

          <div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${ovvecolor})`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>
          
          { slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('delad') && slovve.deladrightleg !== "" && slovve.deladrightleg !== undefined && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${deladrightleg})`,
              filter: slovve?.deladrightleg && ColorConverter({ targetColor: slovve.deladrightleg }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

        { slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('delad') && slovve.deladleftleg !== "" && slovve.deladleftleg !== undefined && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${deladleftleg})`,
              filter: slovve?.deladleftleg && ColorConverter({ targetColor: slovve.deladleftleg }),
            }}></div>}

{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredknees') && slovve.kneecolor !== "" && slovve.kneecolor !== undefined && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${kneecolor})`,
              filter: slovve?.kneecolor && ColorConverter({ targetColor: slovve.kneecolor }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}


{/* TODO, redo if left leg */}
{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredlegs') && slovve.rightlegcolor1 !== "" && slovve.rightlegcolor1 !== undefined && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${rightlegcolor1})`,
              filter: slovve?.rightlegcolor1 && ColorConverter({ targetColor: slovve.rightlegcolor1 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}


{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredlegs') && slovve.rightlegcolor2 !== "" && slovve.rightlegcolor2 !== undefined && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${rightlegcolor2})`,
              filter: slovve?.rightlegcolor2 && ColorConverter({ targetColor: slovve.rightlegcolor2 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

{/* TODO
{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredlegs') && slovve.leftlegcolor1 !== "" && slovve.leftlegcolor1 !== undefined && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: screenWidth <= 550 ? 150 : 250, height: screenWidth <= 550 ? 150 : 250, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${leftlegcolor1})`,
              filter: slovve?.leftlegcolor1 && ColorConverter({ targetColor: slovve.leftlegcolor1 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}


{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredlegs') && slovve.leftlegcolor2 !== "" && slovve.leftlegcolor2 !== undefined && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: screenWidth <= 550 ? 150 : 250, height: screenWidth <= 550 ? 150 : 250, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${leftlegcolor2})`,
              filter: slovve?.leftlegcolor2 && ColorConverter({ targetColor: slovve.leftlegcolor2 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>} 
            */}

{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredlegs') && slovve.leftlegcolor1 !== "" && slovve.leftlegcolor2 !== undefined && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${leftlegcolor1})`,
              filter: slovve?.leftlegcolor1 && ColorConverter({ targetColor: slovve.leftlegcolor1 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}


{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredlegs') && slovve.leftlegcolor2 !== "" && slovve.leftlegcolor2 !== undefined && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${leftlegcolor2})`,
              filter: slovve?.leftlegcolor2 && ColorConverter({ targetColor: slovve.leftlegcolor2 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}
  


  { slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('flames') && (
            <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ovvelegsflames.png)`,
                //filter: slovve?.ovvetextcolorright && ColorConverter({ targetColor: slovve.ovvetextcolorright }),              //https://codepen.io/sosuke/pen/Pjoqqp
              }}></div>
          )}

      { slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('text') && (
<>
          {slovve.ovvetextcolor !== "" && slovve.ovvetextcolor !== undefined && //för vänster namn "namn"
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${ovvetextcolor})`,
              filter: slovve?.ovvetextcolor && ColorConverter({ targetColor: slovve.ovvetextcolor }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

        {slovve.ovvetextcolorright !== "" && slovve.ovvetextcolorright !== undefined && //för höger namn "namn"
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${ovvetextcolorright})`,
              filter: slovve?.ovvetextcolorright && ColorConverter({ targetColor: slovve.ovvetextcolorright }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}
      
      {slovve.ovvetextleft !== "" && slovve.ovvetextleft !== undefined && //för vänster text "Text"
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${ovvetextleft})`,
              filter: slovve?.ovvetextleft && ColorConverter({ targetColor: slovve.ovvetextleft }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

      {slovve.ovvetextright !== "" && slovve.ovvetextright !== undefined && //för höger text "TEXT"
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${ovvetextright})`,
              filter: slovve?.ovvetextright && ColorConverter({ targetColor: slovve.ovvetextright }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

    </>        
      )}



{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('delad') && slovve.deladrightarm !== "" &&  slovve.deladrightarm !== undefined && 
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${deladrightarm})`,
              filter: slovve?.deladrightarm && ColorConverter({ targetColor: slovve.deladrightarm }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('delad') && slovve.deladleftarm !== "" && slovve.deladleftarm !== undefined && 
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${deladleftarm})`,
              filter: slovve?.deladleftarm && ColorConverter({ targetColor: slovve.deladleftarm }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}



{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredarms') && slovve.coloredleftarmar1 !== "" && slovve.coloredleftarmar1 !== undefined && 
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${coloredleftarmar1})`,
              filter: slovve?.coloredleftarmar1 && ColorConverter({ targetColor: slovve.coloredleftarmar1 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredarms') && slovve.coloredleftarmar2 !== "" && slovve.coloredleftarmar2 !== undefined && 
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${coloredleftarmar2})`,
              filter: slovve?.coloredleftarmar2 && ColorConverter({ targetColor: slovve.coloredleftarmar2 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredarms') && slovve.coloredrightarmar1 !== "" && slovve.coloredrightarmar1 !== undefined && 
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${coloredrightarmar1})`,
              filter: slovve?.coloredrightarmar1 && ColorConverter({ targetColor: slovve.coloredrightarmar1 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredarms') && slovve.coloredrightarmar2 !== "" && slovve.coloredrightarmar2 !== undefined && 
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${coloredrightarmar2})`,
              filter: slovve?.coloredrightarmar2 && ColorConverter({ targetColor: slovve.coloredrightarmar2 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}



{/* Revär armar*/} 
 { slovve.ovveaddons && slovve.ovveaddons.includes &&  //Revär armar höger färg 
          slovve.ovveaddons.includes('revararmar') && slovve.revararmarright !== "" && slovve.revararmarright !== undefined && 
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/armrevarright.png)`,
              filter: slovve?.revararmarright && ColorConverter({ targetColor: slovve.revararmarright }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

 { slovve.ovveaddons && slovve.ovveaddons.includes &&  //Revär armar vänster färg 
          slovve.ovveaddons.includes('revararmar') && slovve.revararmarleft !== "" && slovve.revararmarleft !== undefined && 
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/armrevarleft.png)`,
              filter: slovve?.revararmarleft && ColorConverter({ targetColor: slovve.revararmarleft }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}


{/* schack armar*/} 


{ slovve.ovveaddons && slovve.ovveaddons.includes &&  //schack armar höger färg 
          slovve.ovveaddons.includes('chessarms') && slovve.chessarmleftbase !== "" && slovve.chessarmleftbase !== undefined && 
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/coloredarmleft.png)`,
              filter: slovve?.chessarmleftbase && ColorConverter({ targetColor: slovve.chessarmleftbase }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

 { slovve.ovveaddons && slovve.ovveaddons.includes &&  //schack armar vänster färg 
          slovve.ovveaddons.includes('chessarms') && slovve.chessarmrightbase !== "" && slovve.chessarmrightbase !== undefined && 
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/coloredarmright.png)`,
              filter: slovve?.chessarmrightbase && ColorConverter({ targetColor: slovve.chessarmrightbase }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}



{ slovve.ovveaddons && slovve.ovveaddons.includes &&  //schack armar höger färg 
          slovve.ovveaddons.includes('chessarms') && slovve.chessarmleft !== "" && slovve.chessarmleft !== undefined && 
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/schackarmleft.png)`,
              filter: slovve?.chessarmleft && ColorConverter({ targetColor: slovve.chessarmleft }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

 { slovve.ovveaddons && slovve.ovveaddons.includes &&  //schack armar vänster färg 
          slovve.ovveaddons.includes('chessarms') && slovve.chessarmright !== "" && slovve.chessarmright !== undefined && 
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/schackarmright.png)`,
              filter: slovve?.chessarmright && ColorConverter({ targetColor: slovve.chessarmright }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}


{/* Ben Revär*/} 
{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('1revar') && slovve.ovve1revarcolor !== "" && slovve.ovve1revarcolor !== undefined && 
          <>
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${revar3})`,
              filter: slovve?.ovve1revarcolor && ColorConverter({ targetColor: slovve.ovve1revarcolor }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${revar2})`,
              filter: slovve?.ovve1revarcolor && ColorConverter({ targetColor: slovve.ovve1revarcolor }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${revar1})`,
              filter: slovve?.ovve1revarcolor && ColorConverter({ targetColor: slovve.ovve1revarcolor }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>
          </>}

    { slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('3revar') && 
          <>
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${revar3})`,
              filter: slovve?.ovve3revarcolor3 && ColorConverter({ targetColor: slovve.ovve3revarcolor3 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>


          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${revar2})`,
              filter: slovve?.ovve3revarcolor2 && ColorConverter({ targetColor: slovve.ovve3revarcolor2 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>


          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${revar1})`,
              filter: slovve?.ovve3revarcolor1 && ColorConverter({ targetColor: slovve.ovve3revarcolor1 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>
          </>}




{/* LEFT REVÄR  */}

          { slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('revarleft') && 
          <>
            <div 
              className="ovve-product-image" 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: !isModalOpen ? smallScreenSize : largeScreenSize, 
                height: !isModalOpen ? smallScreenSize : largeScreenSize, 
                backgroundImage: `url(/assets/studentlivet/revar3left.png)`,
                filter: 
                  slovve?.ovverevarleftcolor3 
                    ? ColorConverter({ targetColor: slovve.ovverevarleftcolor3 }) 
                    : (slovve.copyrevarfromright ===true && slovve?.ovve1revarcolor && slovve.ovveaddons.includes('1revar')) 
                      ? ColorConverter({ targetColor: slovve.ovve1revarcolor }) 
                      : (slovve.copyrevarfromright ===true && slovve.ovveaddons.includes('3revar') && slovve.ovve3revarcolor3) 
                        && ColorConverter({ targetColor: slovve.ovve3revarcolor3 }), 
                        
              }}
            ></div>


          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/revar2left.png)`,
              //filter: slovve?.ovve3revarcolor2 && ColorConverter({ targetColor: slovve.ovverevarleftcolor2 }),  
              filter: 
                  slovve?.ovverevarleftcolor2 
                    ? ColorConverter({ targetColor: slovve.ovverevarleftcolor2 }) 
                    : (slovve.copyrevarfromright ===true && slovve?.ovve1revarcolor && slovve.ovveaddons.includes('1revar')) 
                      ? ColorConverter({ targetColor: slovve.ovve1revarcolor }) 
                      : (slovve.copyrevarfromright ===true && slovve.ovveaddons.includes('3revar') && slovve.ovve3revarcolor2) 
                        && ColorConverter({ targetColor: slovve.ovve3revarcolor2 }), 
              
              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>


          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/revar1left.png)`,
              filter: slovve?.ovve3revarcolor1 && ColorConverter({ targetColor: slovve.ovverevarleftcolor1 }), 
              filter: 
                  slovve?.ovverevarleftcolor1 
                    ? ColorConverter({ targetColor: slovve.ovverevarleftcolor1 }) 
                    : (slovve.copyrevarfromright ===true && slovve?.ovve1revarcolor && slovve.ovveaddons.includes('1revar')) 
                      ? ColorConverter({ targetColor: slovve.ovve1revarcolor }) 
                      : (slovve.copyrevarfromright ===true && slovve.ovveaddons.includes('3revar') && slovve.ovve3revarcolor1) 
                        && ColorConverter({ targetColor: slovve.ovve3revarcolor1 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>
          </>}





{/*
        <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: screenWidth <= 550 ? 150 : 250, height: screenWidth <= 550 ? 150 : 250, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${hangslen})`,
              filter: slovve.ovvecolor == "Svart" ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}></div>}

            */} 
            

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${ovveoutline})`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}></div>
</>}

















{slovve?.ovvetype === "hangslen" &&
<> {/* TODO Hängslen */}


<div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ovvehangslen/hangslencolor.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>


{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredknees') && slovve.kneecolor !== "" && slovve.kneecolor !== undefined && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${kneecolor})`,
              filter: slovve?.kneecolor && ColorConverter({ targetColor: slovve.kneecolor }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}



{/* TODO, redo if left leg */}
{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredlegs') && slovve.rightlegcolor1 !== "" && slovve.rightlegcolor1 !== undefined && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${rightlegcolor1})`,
              filter: slovve?.rightlegcolor1 && ColorConverter({ targetColor: slovve.rightlegcolor1 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}


{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('coloredlegs') && slovve.rightlegcolor2 !== "" && slovve.rightlegcolor2 !== undefined && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${rightlegcolor2})`,
              filter: slovve?.rightlegcolor2 && ColorConverter({ targetColor: slovve.rightlegcolor2 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}


{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('flames') && (
            <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ovvelegsflames.png)`,
                //filter: slovve?.ovvetextcolorright && ColorConverter({ targetColor: slovve.ovvetextcolorright }),              //https://codepen.io/sosuke/pen/Pjoqqp
              }}></div>
          )}

{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('text') && (
<>
          {slovve.ovvetextcolor !== "" && slovve.ovvetextcolor !== undefined && //för vänster namn "namn"
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${ovvetextcolor})`,
              filter: slovve?.ovvetextcolor && ColorConverter({ targetColor: slovve.ovvetextcolor }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

        {slovve.ovvetextcolorright !== "" && slovve.ovvetextcolorright !== undefined && //för höger namn "namn"
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${ovvetextcolorright})`,
              filter: slovve?.ovvetextcolorright && ColorConverter({ targetColor: slovve.ovvetextcolorright }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}
      
      {slovve.ovvetextleft !== "" && slovve.ovvetextleft !== undefined && //för vänster text "Text"
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${ovvetextleft})`,
              filter: slovve?.ovvetextleft && ColorConverter({ targetColor: slovve.ovvetextleft }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

      {slovve.ovvetextright !== "" && slovve.ovvetextright !== undefined && //för höger text "TEXT"
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${ovvetextright})`,
              filter: slovve?.ovvetextright && ColorConverter({ targetColor: slovve.ovvetextright }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

    </>        
      )}


{/* TODO delad ovve???? */}

{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('1revar') && slovve.ovve1revarcolor !== "" && slovve.ovve1revarcolor !== undefined && 
          <>
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${revar3})`,
              filter: slovve?.ovve1revarcolor && ColorConverter({ targetColor: slovve.ovve1revarcolor }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${revar2})`,
              filter: slovve?.ovve1revarcolor && ColorConverter({ targetColor: slovve.ovve1revarcolor }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${revar1})`,
              filter: slovve?.ovve1revarcolor && ColorConverter({ targetColor: slovve.ovve1revarcolor }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ovvehangslen/hangslenrevarcover.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>
          </>}




{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('3revar') && 
          <>
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${revar3})`,
              filter: slovve?.ovve3revarcolor3 && ColorConverter({ targetColor: slovve.ovve3revarcolor3 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>


          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${revar2})`,
              filter: slovve?.ovve3revarcolor2 && ColorConverter({ targetColor: slovve.ovve3revarcolor2 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>


          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(${revar1})`,
              filter: slovve?.ovve3revarcolor1 && ColorConverter({ targetColor: slovve.ovve3revarcolor1 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>



          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ovvehangslen/hangslenrevarcover.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>

          
          </>}



{/* LEFT REVÄR  */}

{ slovve.ovveaddons && slovve.ovveaddons.includes && 
          slovve.ovveaddons.includes('revarleft') && 
          <>
            <div 
              className="ovve-product-image" 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: !isModalOpen ? smallScreenSize : largeScreenSize, 
                height: !isModalOpen ? smallScreenSize : largeScreenSize, 
                backgroundImage: `url(/assets/studentlivet/revar3left.png)`,
                filter: 
                  slovve?.ovverevarleftcolor3 
                    ? ColorConverter({ targetColor: slovve.ovverevarleftcolor3 }) 
                    : (slovve.copyrevarfromright ===true && slovve?.ovve1revarcolor && slovve.ovveaddons.includes('1revar')) 
                      ? ColorConverter({ targetColor: slovve.ovve1revarcolor }) 
                      : (slovve.copyrevarfromright ===true && slovve.ovveaddons.includes('3revar') && slovve.ovve3revarcolor3) 
                        && ColorConverter({ targetColor: slovve.ovve3revarcolor3 }), 
                        
              }}
            ></div>


          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/revar2left.png)`,
              //filter: slovve?.ovve3revarcolor2 && ColorConverter({ targetColor: slovve.ovverevarleftcolor2 }),  
              filter: 
                  slovve?.ovverevarleftcolor2 
                    ? ColorConverter({ targetColor: slovve.ovverevarleftcolor2 }) 
                    : (slovve.copyrevarfromright ===true && slovve?.ovve1revarcolor && slovve.ovveaddons.includes('1revar')) 
                      ? ColorConverter({ targetColor: slovve.ovve1revarcolor }) 
                      : (slovve.copyrevarfromright ===true && slovve.ovveaddons.includes('3revar') && slovve.ovve3revarcolor2) 
                        && ColorConverter({ targetColor: slovve.ovve3revarcolor2 }), 
              
              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>


          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/revar1left.png)`,
              filter: slovve?.ovve3revarcolor1 && ColorConverter({ targetColor: slovve.ovverevarleftcolor1 }), 
              filter: 
                  slovve?.ovverevarleftcolor1 
                    ? ColorConverter({ targetColor: slovve.ovverevarleftcolor1 }) 
                    : (slovve.copyrevarfromright ===true && slovve?.ovve1revarcolor && slovve.ovveaddons.includes('1revar')) 
                      ? ColorConverter({ targetColor: slovve.ovve1revarcolor }) 
                      : (slovve.copyrevarfromright ===true && slovve.ovveaddons.includes('3revar') && slovve.ovve3revarcolor1) 
                        && ColorConverter({ targetColor: slovve.ovve3revarcolor1 }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>


<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ovvehangslen/hangslenrevarcoverleft.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>
          </>}




<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ovvehangslen/hangslenoutline.png)`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}></div>

</>}














{slovve?.ovvetype === "collegejacka" &&
<>
<div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/collegejackacolor1.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>


<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/collegejackacolor2.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('secondarycolor') 
                && slovve?.clothescolor2 ? ColorConverter({ targetColor: slovve.clothescolor2 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>    
  

            <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/collegejackaoutline.png)`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}>
          </div>
</>}


{slovve?.ovvetype === "vast" &&
<> 
<div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/vastcolor.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>


<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/vastrightpocket.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('rightbottompocket') 
                && slovve?.clothescolor5 ? ColorConverter({ targetColor: slovve.clothescolor5 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>    

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/vastleftpocket.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('leftbottompocket') 
                &&  slovve?.clothescolor6 ? ColorConverter({ targetColor: slovve.clothescolor6 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>  

<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/vastshades.png)`,
                }}>
            </div> 

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/vastoutline.png)`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}>
          </div>


</>}





{slovve?.ovvetype === "morgonrock" &&
<> 
<div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/morgonrockcolor.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>


<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/morgonrockshade.png)`,
                }}>
            </div> 

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/morgonrockoutline.png)`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}>
          </div>

</>}


{slovve?.ovvetype === "kavaj" &&
<> 
<div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/kavajcolor.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>


<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/kavajshade.png)`,
                }}>
            </div> 

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/kavajoutline.png)`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}>
          </div>

</>}


{slovve?.ovvetype === "byxor" &&
<> 
<div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/pantscolor.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>





          {slovve.pantsnameleft !== "" && slovve.pantsnameleft !== undefined &&            
            <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/pantsnameleft.png)`,
              filter: slovve?.pantsnameleft && ColorConverter({ targetColor: slovve.pantsnameleft }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

          
          {slovve.pantsnameright !== "" && slovve.pantsnameright !== undefined &&            
            <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/pantsnameright.png)`,
              filter: slovve?.pantsnameright && ColorConverter({ targetColor: slovve.pantsnameright }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}

            {slovve.pantstextright !== "" && slovve.pantstextright !== undefined &&            
            <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/pantstextright.png)`,
              filter: slovve?.pantstextright && ColorConverter({ targetColor: slovve.pantstextright }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}
            
            {slovve.pantstextleft !== "" && slovve.pantstextleft !== undefined &&            
            <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/pantstextleft.png)`,
              filter: slovve?.pantstextleft && ColorConverter({ targetColor: slovve.pantstextleft }),              //https://codepen.io/sosuke/pen/Pjoqqp
            }}></div>}




          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/pantsoutline.png)`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}>
          </div>

</>}





{slovve?.ovvetype === "frack" &&
<> 
<div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/frackcolor.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>


<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/frackcolor2.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('secondarycolor') 
                && slovve?.clothescolor2 ? ColorConverter({ targetColor: slovve.clothescolor2 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>    
           
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/frackcolor3shirt.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('neck') 
                && slovve?.clothescolor3 ? ColorConverter({ targetColor: slovve.clothescolor3 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>    
   

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/frackcolor4tie.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('tie') 
                &&  slovve?.clothescolor8 ? ColorConverter({ targetColor: slovve.clothescolor8 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>    

            <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/frackshades2.png)`,
                }}>
            </div> 

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/frackoutline.png)`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}>
          </div>
          
</>}





{slovve?.ovvetype === "rock" &&
<> 
<div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/rockcolor.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>


{slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('secondarycolor') && slovve?.clothescolor2 &&
<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/rockcolorsecondary.png)`,             
              filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('secondarycolor') 
              && slovve?.clothescolor2 ? ColorConverter({ targetColor: slovve.clothescolor2 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>}



{(!(slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('secondarycolor') && slovve?.clothescolor2) ||
    (slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('neck') && slovve?.clothescolor3)) &&
<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/rockcolorneck.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('neck') 
                && slovve?.clothescolor3 ? ColorConverter({ targetColor: slovve.clothescolor3 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>}


{(!(slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('secondarycolor') && slovve?.clothescolor2) ||
    (slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('righttoppocket') && slovve?.clothescolor4)) &&
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/rockcolortoprightpocket.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('righttoppocket') 
                && slovve?.clothescolor4 ? ColorConverter({ targetColor: slovve.clothescolor4 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>   } 
           
            {(!(slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('secondarycolor') && slovve?.clothescolor2) ||
    (slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('rightbottompocket') && slovve?.clothescolor5)) &&            
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/rockcolorrightpocket.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('rightbottompocket') 
                && slovve?.clothescolor5 ? ColorConverter({ targetColor: slovve.clothescolor5 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>   } 

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/rockcolorleftpocket.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('leftbottompocket') 
                &&  slovve?.clothescolor6 ? ColorConverter({ targetColor: slovve.clothescolor6 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>    

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/rockoutline.png)`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}>
          </div>          
</>}



{slovve?.ovvetype === "tshirt" &&
<> 
<div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/tshirtcolor.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>


          { slovve.clothesaddons && slovve.clothesaddons.includes && 
          slovve.clothesaddons.includes('righttoppocket') &&
          <>
            { slovve?.clothescolor4 && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/tshirtpocketcolor.png)`,
                filter: slovve?.clothescolor4 && ColorConverter({ targetColor: slovve.clothescolor4 }),              //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>}

            <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/tshirtpocketoutline.png)`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}></div>                
          </>     
          }

          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/tshirtoutline.png)`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}>
          </div> {/* Maybe todo remove gray border */}
            
</>}






{slovve?.ovvetype === "skjortaslips" &&
<>
<div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/shirtcolor.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>

<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/shirtneck.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('neck') 
                && slovve?.clothescolor3 ? ColorConverter({ targetColor: slovve.clothescolor3 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>  

  
  
  <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/shirtarms.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('secondarycolor') 
                && slovve?.clothescolor2 ? ColorConverter({ targetColor: slovve.clothescolor2 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>    



  <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/shirttie.png)`,
                filter: slovve.clothesaddons && slovve.clothesaddons.includes && slovve.clothesaddons.includes('tie') 
                &&  slovve?.clothescolor8 ? ColorConverter({ targetColor: slovve.clothescolor8 }) : slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>    



{ slovve.clothesaddons && slovve.clothesaddons.includes && 
          slovve.clothesaddons.includes('righttoppocket') &&
          <>
            { slovve?.clothescolor4 && 
          <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/shirtpocket.png)`,
                filter: slovve?.clothescolor4 && ColorConverter({ targetColor: slovve.clothescolor4 }),              //https://codepen.io/sosuke/pen/Pjoqqp
              }}>
            </div>}

            <div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/shirtpocketoutline.png)`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}></div>                
          </>     
          }


<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/shirtinside.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>



<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
                backgroundImage: `url(/assets/studentlivet/ickeovve/shirtshades.png)`,
                }}>
            </div>   

<div className="ovve-product-image" style={{ position: 'absolute', top: 0, left: 0, width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize, //https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/shirtoutline.png)`,
              filter:slovve.ovvecolor && slovve.ovvecolor.includes && slovve.ovvecolor.includes('Svart')  ? "invert(53%) sepia(0%) saturate(1%) hue-rotate(93deg) brightness(95%) contrast(95%)" : "invert(0%) sepia(100%) saturate(0%) hue-rotate(21deg) brightness(97%) contrast(103%)",
            }}>
          </div>

</>
}






{slovve.customimageoverall !== "" && slovve.customimageoverall !== undefined &&
<> 
<div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/ickeovve/fullimages/${slovve?.customimageoverall})`,             
              //filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>
</>}

{/*
{slovve?.ovvetype === "ovvevastbasker" &&
<> {/* TODO Hängslen 
<div className="ovve-product-image" style={{ width: !isModalOpen ? smallScreenSize : largeScreenSize, height: !isModalOpen ? smallScreenSize : largeScreenSize,  //filter: "invert(12%) sepia(57%) saturate(7010%) hue-rotate(294deg) brightness(79%) contrast(112%)",               // https://codepen.io/sosuke/pen/Pjoqqp
              backgroundImage: `url(/assets/studentlivet/${slovve?.ovvetype}.png)`,             
              filter: slovve?.color ? ColorConverter({ targetColor: slovve.color }) : ColorConverter({targetColor: findOvveColorTitle()}), // Apply the filter style here
            }}></div>
</>}

*/}
          </div>


{ !isModalOpen ? (
<>
  <p 
    className="product-name" 
    style={{ 
      fontWeight: slovve?.name ? 'bold' : 'bold', 
      fontStyle: slovve?.name ? 'normal' : 'italic' 
    }}
  >
    {truncatedName}
  </p>

  {school && (
              <div style={{ maxWidth: smallScreenSize, overflowWrap: 'break-word' }}>
                <p style={{ overflowWrap: 'break-word' }}>
                  {school} - {getCityNameForSchool(school)}<span style={{ }}>{schoolNames.length > 1 && '...'}</span>
                </p>
              </div>
            )}

  {slovve?.name && (
    <div style={{ maxWidth: smallScreenSize, overflowWrap: 'break-word' }}>
      <p className="product-price" style={{ fontStyle: 'italic', fontSize: '14px', overflowWrap: 'break-word', textAlign: screenWidth <= 550 ? 'center' : 'left' }}>
        {slovve.utbildning}
      </p>
    </div>
  )}
</>
):(

<>
  <p 
    className="product-name" 
    style={{ 
      fontSize: '24px', 
      fontWeight: 'bold', 
      fontStyle: slovve?.name ? 'normal' : 'italic' 
    }}
  >
    {slovve?.name || slovve?.utbildning}
  </p>


              {schoolNames.map((schoolName, index) => (
                <React.Fragment key={index}>
                  <div style={{ overflowWrap: 'break-word' }}>
                    <p style={{ fontSize: '18px', overflowWrap: 'break-word', margin: '0' }}>
                      {schoolName} - {getCityNameForSchool(schoolName)} 
                      {index < schoolNames.length - 1 && (<span style={{ fontSize: '18px', fontStyle: 'italic' }}> &</span>)}
                    </p>
                  </div>
                  
                </React.Fragment>
              ))}
     

  {slovve?.name && (
    <div style={{ overflowWrap: 'break-word' }}>
      <p className="product-price" style={{ fontStyle: 'italic', fontSize: '16px', overflowWrap: 'break-word', textAlign: 'center' }}>
        {slovve.utbildning}
      </p>
    </div>
  )}
</>
)}

        </div>
    </div>
  );
};

export default Overallersl;