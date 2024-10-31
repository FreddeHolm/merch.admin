import React, { useEffect, useState } from 'react';
import { urlFor } from '../../lib/client';
import { urlForSL } from '../../lib/studentlivetclient';

import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";

import { useTranslation } from 'react-i18next';

import { faTimes, faLocationDot, faBars, faEarthAmericas   } from '@fortawesome/free-solid-svg-icons'; //https://fontawesome.com/search?q=globe&o=r&m=free
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*

import { useStateContext } from '../../context/StateContext';
*/

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'; //documentation https://www.react-simple-maps.io/docs/styling/

const cities = [ //https://sv.wikipedia.org/wiki/Lista_%C3%B6ver_universitet_och_h%C3%B6gskolor_i_Sverige
  { name: 'Stockholm', coordinates: [18.0686, 59.3293], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""]},
  { name: 'Göteborg', coordinates: [11.9746, 57.7089], skoltyp: 'universitet', sponsring: [""], universitet: ["Chalmers", "Göteborgs universitet"],  högskola: [""] },
  { name: 'Uppsala', coordinates: [17.6389, 59.8586], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""] },
  { name: 'Linköping', coordinates: [15.6180, 58.4108], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""] },
  { name: 'Norrköping', coordinates: [16.1864, 58.5878], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""] },
  { name: 'Umeå', coordinates: [20.0597, 63.8258], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""] },
  { name: 'Växjö', coordinates: [14.8059, 56.8777], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""] },
  { name: 'Kalmar', coordinates: [15.9663, 56.6743], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""] },
  { name: 'Lund', coordinates: [13.2913, 55.7058], skoltyp: 'universitet', sponsring: [""], universitet: ["Lunds universitet"], högskola: [""] },
  { name: 'Malmö', coordinates: [13.0878, 55.6048], skoltyp: 'universitet', sponsring: [""], universitet: ["Malmö universitet"], högskola: [""] },
  { name: 'Karlstad', coordinates: [13.5036, 59.3798], skoltyp: 'universitet', sponsring: [""], universitet: ["Karlstads universitet"], högskola: [""] },
  { name: 'Sundsvall', coordinates: [17.3120, 62.3921], skoltyp: 'universitet', sponsring: [""], universitet: ["Mittuniversitetet"], högskola: [""] },
  { name: 'Östersund', coordinates: [14.6360, 63.1798], skoltyp: 'universitet', sponsring: [""], universitet: ["Mittuniversitetet"], högskola: [""] },
  { name: 'Luleå', coordinates: [22.0522, 65.5848], skoltyp: 'universitet', sponsring: [""], universitet: ["Luleå tekniska universitet"], högskola: [""] },
  { name: 'Eskilstuna', coordinates: [16.5090, 59.3713], skoltyp: 'universitet', sponsring: [""], universitet: ["Mälardalens universitet"], högskola: [""] },
  { name: 'Västerås', coordinates: [16.5452, 59.6595], skoltyp: 'universitet', sponsring: [""], universitet: ["Mälardalens universitet"], högskola: [""] },
  { name: 'Örebro', coordinates: [15.2020, 59.2753], skoltyp: 'universitet', sponsring: [""], universitet: ["Örebro universitet"], högskola: [""] },
  { name: 'Borås', coordinates: [12.9194, 57.7210], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan i Borås"], högskola: [""] },
  { name: 'Jönköping', coordinates: [14.1690, 57.7826], skoltyp: 'universitet', sponsring: [""], universitet: ["Jönköping University"], högskola: [""] },
  { name: 'Gävle', coordinates: [17.1410, 60.6745], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan i Gävle"], högskola: [""] },
  { name: 'Falun', coordinates: [15.6236, 60.6065], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan Dalarna"], högskola: [""] },
  { name: 'Borlänge', coordinates: [15.3223, 60.3840], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan Dalarna"], högskola: [""] },
  { name: 'Halmstad', coordinates: [12.8557, 56.6745], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan i Halmstad"], högskola: [""] },
  { name: 'Kristianstad', coordinates: [14.1572, 56.0312], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan Kristianstad"], högskola: [""] },
  { name: 'Trollhättan', coordinates: [12.3082, 58.2829], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan Väst"], högskola: [""] },
  { name: 'Skövde', coordinates: [13.8456, 58.3896], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan i Skövde"], högskola: [""] },
  { name: 'Karlskrona', coordinates: [15.5853, 56.1614], skoltyp: 'universitet', sponsring: [""], universitet: ["Blekinge tekniska högskola"], högskola: [""] },
  { name: 'Karlshamn', coordinates: [14.8640, 56.1706], skoltyp: 'universitet', sponsring: [""], universitet: ["Blekinge tekniska högskola"], högskola: [""] },
  { name: 'Gotland', coordinates: [18.2952, 57.6404], skoltyp: 'universitet', sponsring: [""], universitet: ["Uppsala universitet Campus Gotland"], högskola: [""] },
  { name: 'Varberg', coordinates: [12.2508, 57.1056], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Campus Varberg"] },
  // Add more cities here
];





const SwedenMap = ({slcity, sluniversities, selectedCity, setSelectedCity}) => {
  //const [selectedCity, setSelectedCity] = useState(null);
  const [showCities, setShowCities] = useState(true);
  const [t, i18n] = useTranslation("global");


  const handleCityClick = (city) => {
    
    {screenWidth < 700 ?
      setScaleFactor(1.5)
    :
    setScaleFactor(1)
    }

   /* if (selectedCity === city) { // old click code
      // If the same city is clicked again, close the popup
      setSelectedCity(null);
    } else {
      setSelectedCity(city);
    } */
    if (selectedCity && selectedCity.name === city.name) {
      // If the same city is clicked again, redirect to the city page
      window.location.href = `/studentlivet/${city.slug.current}/skolor`;
    } else {
      setSelectedCity(city);
    }

  };

  const handleMapClick = () => {
    // Clear the selected city when clicking on the map background
    setSelectedCity(null);
  };





  const [screenWidth, setScreenWidth] = useState();
  const [scaleFactor, setScaleFactor] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);

      {window.innerWidth < 700 ?
        setScaleFactor(1.5)
      :
      setScaleFactor(1)
      }


    };
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    // Initialize screen width on component mount
    setScreenWidth(window.innerWidth);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);


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








  const slcitySorting = slcity.filter((city) =>  city.show)    
  .sort((a, b) => {
    if (a.importance === undefined && b.importance === undefined) {
      // If both cities have undefined importance, compare by name
      return a.name.localeCompare(b.name);
    }
    if (a.importance === undefined) {
      // If only 'a' has undefined importance, 'b' comes first
      return 1;
    }
    if (b.importance === undefined) {
      // If only 'b' has undefined importance, 'a' comes first
      return -1;
    }

    // Sort by importance first (descending order)
    if (b.importance !== a.importance) {
      return b.importance - a.importance;
    }

    // If importance values are the same, compare by name
    return a.name.localeCompare(b.name);
  });


  const iframeHTML = `

  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2090.221435598616!2d15.63852367726638!3d58.40652698454183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46596ed933a4ad01%3A0x8a353037f9f87d0c!2sRinggatan%2017%2C%20582%2052%20Link%C3%B6ping!5e0!3m2!1ssv!2sse!4v1697857306138!5m2!1ssv!2sse" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>  
  `;


  const [openLocationMenu, setOpenLocationMenu] = useState(true);


  const closeLocationkMenu = () => {
    setOpenLocationMenu(false);
  };

  const handleLocationClick = () => {
    setOpenLocationMenu(!openLocationMenu);
  };

 

  return (
    <div className="SwedenMap" style={{marginBottom: "100px"}} >
 
 <div style={{position: "absolute", zIndex: 10}} >
  <p style={{fontSize: "16px", padding: "5px", marginLeft: "10px", }}> 
          <a className="text-link-style-black" style={{ top: "3px"}}><Link href={`/`} ><HomeIcon style={{ fontSize: "16px" }}/></Link></a>

          /
          <a className="text-link-style-black"><Link href={`/studentlivet/`}>studentlivet</Link></a>
        {/* /
          <a className="text-link-style-black"><Link href={`/studentlivet/${cityData.slug.current}/${slug}`} >{slug}</Link></a>
          */}

</p>

    {/* <div className="MapApp"> */}
      <h1 style={{marginLeft: "10px", zIndex: -10,}}>Sverigekarta</h1>
      </div>      


 {i18n.language !== "sv" && <div style={{ zIndex: 10, position: "relative", marginBottom: "-75px" }}><h4 style={{marginTop: "85px", display: "inline-block", marginLeft: "20px", pointer: "clicker", backgroundColor: "var(--primarycolor)", padding: "5px 8px" }} >This page is currently only in Swedish  </h4></div>}




 {/* <a className="text-link-style-black" style={{ zIndex: 10, position: "relative", marginTop: "75px" }}><Link href={`/studentlivet/allaovvar`}>allaovvar</Link></a>
*/}



{screenWidth <= 600 && (
  <div  style={{
            height:"100px"
            
          }}>
</div>
)}



      <div style={{ backgroundColor: 'transparent',
  width: "100%", //"calc(100% - 50vh)",
  height: "100%", // Adjust the height as needed
  }}
      >
        <div style={{ backgroundColor: 'transparent'}}>
        <ComposableMap
          width={450}
          height={screenWidth >= 1000 ? 690 : 650}
          style={{marginTop: screenWidth >= 1000 ? "-250px" : screenWidth >= 700 ? "-170px" : "-70px",  position: "relative", left: "-50px"}}
          projection="geoAzimuthalEqualArea"
          projectionConfig={{
            rotate: [-15, -63, 0],
            center: [2, 0/*8.5, -1.9*/],
            scale: 2100,
            
          }}
          onClick={handleMapClick}
        >

          <Geographies geography="/assets/swedenmapdata.json">
            {({ geographies }) => {
              //console.log(geographies);
              return geographies.map((geo) => (
                <Geography //the sweden map
                  key={geo.rsmKey}
                  geography={geo}
                  width="100%"
                  fill="var(--secondarycolor)"
                  stroke="var(--secondarycolor)"
                  strokeWidth={2}
                  
                />
              ));
            }}
          </Geographies>
          {slcitySorting.map((city) => (

            
            <Marker
              coordinates={[city.long, city.lat]}
              key={city.name}
              onClick={(event) => {
                event.stopPropagation(); // Prevent map click
                handleCityClick(city);
              }}
            >
               <circle r={8} fill="transparent" stroke="var(--secondarycolor)" strokeWidth={2}       cursor={"pointer"} /> {/* stroke="#FC46AA" */}
              <circle r={7} fill={selectedCity && selectedCity.name === city.name ? '#fde508' : "var(--primarycolor)"} cursor={"pointer"}/>

            </Marker>
          ))}



{slcitySorting.map((city) => (

<Marker
      coordinates={[city.long, city.lat]}
      key={city.name + '-tooltip'}
    >

  {selectedCity && selectedCity.name === city.name && (
    <Link href={`/studentlivet/${city.slug.current}/skolor`}>{/*${slug.current} */}
    <g >
    <rect
  x={12} // Set x to match the text element
  y={-18} // 12, Set y to match the text element
  width={(Math.max(city.name.length, `Uni-& högskolor:`.length)) * 7 * scaleFactor} // Adjust the width as needed
  height={38 * scaleFactor} // Adjust the height as needed
  fill="white"
  rx={3} // Adjust the border radius as needed
  cursor={"pointer"}
/>

<rect
  x={11} // Set x to match the text element
  y={-18} // Adjust the y value as needed
  width={Math.max(city.name.length, `Uni-& högskolor:`.length) * 7 * scaleFactor} // Adjust the width as needed
  height={38 * scaleFactor} // Adjust the height as needed
  fill="none" // Transparent fill
  stroke="black" // Border color
  strokeWidth="2" // Border width
  rx={3} // Adjust the border radius as needed
  cursor={"pointer"}
/>
    
    <text x={12} y={-20} textAnchor="start" style={{ fontSize: 12*scaleFactor, fontWeight: 'bold', fill: 'black', cursor: 'pointer' }}>
      <tspan x={13} dy="1.2em">{city.name} </tspan>
      
      {/*{city.universitet.length > 0 && (
          <tspan x={10} dy="1.2em" style={{ fontSize: 10 }}>{city.universitet.join(', ')}</tspan>
        )}
      */ } 
      
     
      <tspan x={14} dy="1.2em" style={{ fontSize: 10 * scaleFactor }}>
  {sluniversities && `Uni-& högskolor: ${sluniversities.filter(uni => 
    uni.location && uni.location.some(loc => loc._ref === city._id)
  ).length}` || 'No universities'}
</tspan>
      
      {city.sponsring && city.sponsring.length > 0 && (
        city.sponsring.map((item, index) => (
          <tspan key={index} x={14} dy="1.2em" style={{ fontSize: 10*scaleFactor }}>
            {item} 
            
          </tspan>
        ))
      )}

    </text>
    </g>
    </Link>
  )}
</Marker>
))}


        </ComposableMap>
      </div>
      
{/* https://codepen.io/utilitybend/pen/VwBRNwm */
/* https://codepen.io/sowmyaseshadri/pen/PdajzN */}






{/* #region Studentlivet navigation  */}

{/* 
    <div style={{  zIndex: 1000 , right: "0px",  top:  scrolled ? "170px" : "240px", fontFamily: 'Poppins, sans-serif', position: 'fixed',//position: 'absolute',

    }}>

      <div style={{//maxHeight: 'var(--container-height)',
        width: openLocationMenu ? '200px' : "100px",
          border: '2px solid #37392e',
          borderRadius: '5px',
          scrollSnapType: 'y mandatory',
          overscrollBehaviorY: 'contain',
          overflowX: 'hidden',
          overflowY: 'auto',
          margin: 'auto', 
          marginBottom: "100px",
          }}>
        <ul style={{
          margin: '0',
          padding: '0',
          listStyle: 'none',
          background: '#eee5e5',
        }}>

<div style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', padding: '10px 0', justifyContent: openLocationMenu ? 'space-between' : "flex-start" }} onClick={handleLocationClick}>
    <FontAwesomeIcon icon={faLocationDot} className="cart-icon"  style={{ marginLeft: "8px", color: "black", width: "20px", cursor: 'pointer' }} />

    {openLocationMenu && <h2 style={{ marginLeft: "4px", fontSize: '22px' }}>Studentlivet</h2>}

    <FontAwesomeIcon className="cart-icon" style={{ width: "24px", marginTop: openLocationMenu ? "2px" :"3px",  //transform: `scale(${openLocationMenu ? 0.9 : 1})`, 
  marginLeft: openLocationMenu ? "0px" : "10px", marginRight: "8px", color: "black" }} id="bar" icon={openLocationMenu ? faTimes : faBars} />

</div>
         
{openLocationMenu &&
<>

<li  style={{padding: '10px', borderTop: '1px solid var(--primarycolor)',  display: 'flex',  height: "40px",
              alignItems: 'center',   backgroundColor:  'var(--secondarycolor)',  // backgroundColor: 'var(--primarycolor)',
              }}>
                    <FontAwesomeIcon icon={faEarthAmericas}  style={{ marginLeft: "6px", color: 'var(--primarycolor)', width: "20px",  }} />

          <h2 style={{ marginLeft: "8px", fontSize: '24px', color: 'var(--primarycolor)' }}>Sidor</h2>
                
            </li>


          <Link href={`/studentlivet/allaovvar`}>
            <li key={"allaovvar"}  style={{padding: '10px', borderTop: '1px solid var(--secondarycolor)', display: 'flex', cursor: 'pointer', height: "40px",
              alignItems: 'center', justifyContent: 'space-between',  backgroundColor:  'transparent',  // backgroundColor: 'transparent' 'var(--primarycolor)',
              }}>
                <span style={{ fontWeight: 'bold', color: "var(--secondarycolor)" }}>Alla Ovvar</span>
                <Link href={`/studentlivet/allaovvar`}>
                  <div style={{  marginTop:"5px", padding: "7px",  }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>
                </Link>
            </li>
          </Link>







          <li  style={{padding: '10px', borderTop: '1px solid var(--primarycolor)',  display: 'flex',  height: "40px",
              alignItems: 'center',   backgroundColor:  'var(--secondarycolor)',  // backgroundColor: 'var(--primarycolor)',
              }}>
                    <FontAwesomeIcon icon={faLocationDot}  style={{ marginLeft: "8px", color: 'var(--primarycolor)', width: "16px",  }} />

          <h2 style={{ marginLeft: "8px", fontSize: '24px', color: 'var(--primarycolor)' }}>Städer</h2>
                
            </li>

            {  slcitySorting.map((city, index) => ( //.reverse()
              <li key={city.name} onClick={() => handleCityClick(city)} style={{padding: '10px', borderTop:  index === 0 ? '1px solid var(--secondarycolor)' : '1px solid #ccc', display: 'flex', cursor: 'pointer', height: "40px",
              alignItems: 'center', justifyContent: 'space-between',  backgroundColor: selectedCity && selectedCity.name === city.name ? 'var(--primarycolor)' : 'transparent',
              }}>
                {city.name} {sluniversities && "("+sluniversities.filter(uni => uni.location.toLowerCase() === city.name.toLowerCase()).length+")"}  
                <Link href={`/studentlivet/${city.slug.current}/skolor`}>
                  <div style={{  marginTop:"5px", padding: "7px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px',  }}/></div>
                </Link>
              </li>
            ))}
            </>}
          </ul>
        </div>
    </div> */}
    
{/*#endregion Studentlivet navigation  */}






{/* */}





{screenWidth <= 1000 && (
        <div 
        //style= {{borderBottom: '1px solid #ccc'}}
        
        style={{cursor: "pointer"}}
        >
          
 <div style={{pointer: "clicker", zIndex: 1, position: "relative", }}><h2 style={{marginTop: "5px", marginLeft: "20px", pointer: "clicker"}} onClick={() => setShowCities(!showCities)}>Städer  {showCities ? '-' : '+'}</h2></div>


{showCities && (
    <div  style={{
            right: "0px",
            top: "240px",
            fontFamily: "Poppins, sans-serif",
            display: "flex",
            flexDirection: "row", // Change the direction to left-to-right
            flexWrap: "wrap", // Allow items to wrap to the next row
            alignItems: 'center',
            justifyContent: 'center',
            
          }}>

            
          {slcitySorting.map((city) => ( //.reverse()
            <div
              key={city.name}
              onClick={() => handleCityClick(city)}
              style={{
                width: '150px',
                height: "40px",
                border: '2px solid #37392e',
                borderRadius: '5px',
                overflowX: 'hidden',
                overflowY: 'auto',
                margin: '0px -20px', // Add margin between items
                backgroundColor:
                  selectedCity && selectedCity.name === city.name
                    ? 'var(--primarycolor)'
                    : 'transparent',  //transparent    #e6e5e5      
                display: 'flex', // Display contents as flex
                flexDirection: 'row', // Stack contents vertically
                alignItems: 'center',   
                alignItems: 'center', 
                justifyContent: 'space-between',  
                cursor: 'pointer',
                scale: "0.7"
                , zIndex: 1, 
                
              }}
            >
              <span style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft:"4px", whiteSpace: 'nowrap', }}>
              {city.name} 
              {sluniversities && `(${sluniversities.filter(uni => uni.location && uni.location.some(loc => loc._ref === city._id)).length})`}

              </span>
              <Link href={`/studentlivet/${city.slug.current}/skolor`}>
                <div style={{ marginTop: '5px', padding: '7px' }}>
                  <ArrowForwardIos fontSize="small" style={{ fontSize: '16px' }} />
                </div>
              </Link>
            </div>
          ))}
        </div>
       )}
       
       </div>
      )}
      
  


        </div>
    </div>
  );
};






export default SwedenMap;