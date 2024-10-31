import React, { useState, useEffect } from 'react';
import { client } from '../../../../../lib/client';
import { studentlivetclient, urlForSL } from '../../../../../lib/studentlivetclient';
import Select from 'react-select';
import { Product, Navbar, Studentlivet } from '../../../../../components';
import { customStyles } from '../../../../../components/filterPageUtils';
import { siteName, siteNameAlt2, siteEmail } from '../../../../../components/config';
import { urlFor } from '../../../../../lib/studentlivetclient';
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos"; //https://mui.com/material-ui/material-icons/?query=image
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import HomeIcon from '@material-ui/icons/Home';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ErrorIcon from '@material-ui/icons/Error';
import Twitter from '@material-ui/icons/Twitter';
import Phone from '@material-ui/icons/Phone';
import { IoIosMail} from 'react-icons/io';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';
import { FaTiktok, FaFacebook, FaFacebookSquare} from 'react-icons/fa';
import LocationOn from '@material-ui/icons/LocationOn'; //Place
import Language from '@material-ui/icons/Language';
import YouTube from '@material-ui/icons/YouTube';
import LinkedIn from '@material-ui/icons/LinkedIn';
import Otherlink from '@material-ui/icons/Link';

import { InstagramEmbed } from 'react-social-media-embed';

import StudentlivetNavigation from '../../../../../components/studentlivet/SLNavigation';



const iframeHTML = `

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2090.221435598616!2d15.63852367726638!3d58.40652698454183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46596ed933a4ad01%3A0x8a353037f9f87d0c!2sRinggatan%2017%2C%20582%2052%20Link%C3%B6ping!5e0!3m2!1ssv!2sse!4v1697857306138!5m2!1ssv!2sse" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>  
`;

/* OLD extractGoogleMapsURL function 
function extractGoogleMapsURL(iframeHTML) {
  // Use a regular expression to extract the URL
  const regex = /src="(.*?)"/;
  const match = iframeHTML.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return 'URL not found';
  }
}
*/

const extractGoogleMapsURL = (mapsurl) => {
  const urlPattern = /(?:https:\/\/www\.google\.com\/maps\/embed\?pb=|https:\/\/www\.google\.com\/maps\/place\/)([^\s]+)/;
  const match = mapsurl.match(urlPattern);
  if (match) {
    return `https://www.google.com/maps/embed?pb=${match[1]}`;
  }
  return '';
};


const SLCitySlug = ({ products, announcements, release, slcity, slsektioner, slovve, sluniversities, slug, slkarhus, slforening }) => {
  const [backgroundImage, setBackgroundImage] = useState();
  const [logoImage, setLogoImage] = useState();
  const [selectedFilter, setSelectedFilter] = useState(slug);
  const [selectedCity, setSelectedCity] = useState([]);
  //const [selectedCategory, setSelectedCategory] = useState("school");

  const handleSidebarClick = (category) => {
 
      //setSelectedCategory(category);
    
  };
  const router = useRouter();
  const { cityname, view } = router.query;


const [show1049, setShow1049] = useState();
const [show825, setShow825] = useState();
const [currentScreenSize, setCurrentScreenSize] = useState();

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      // Check window width and set showDiv accordingly
      if (window.innerWidth <= 1049 && window.innerWidth >825) {
        setShow1049(true);
        setShow825(false);
      } 
      else if (window.innerWidth <= 825) {
        setShow1049(false);
        setShow825(true);
      }
      
      else {
        setShow1049(false);
        setShow825(false);
      }

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

  //console.log("sluniversities" + sluniversities);
  //console.log("slkarhus" + slkarhus);
  //console.log("slforening" + slforening);

  let selecteddatabase;
  switch (view) {
    case "skolor":
      selecteddatabase = sluniversities;
      break;
    case "karer":
      selecteddatabase = slkarhus;
      break;
    case "sektioner":
        //case "karer":
        selecteddatabase = slsektioner;
        break;
    case "foreningar":
      selecteddatabase = slforening;
      break;
    default:
      console.error("Invalid view selected");
  }

  //for the current data/slug
  const selectedCityData = selecteddatabase?.find((slugstuff) => slugstuff.slug.current === slug) ?? {};
  //console.log(selectedCityData);


  if (!selectedCityData) {
    console.error('City not found');
  }


  const selectedCityLocation = (selectedCityData.location && selectedCityData.location.length > 0) ? selectedCityData.location[0]._ref : null;
  const cityData = slcity.find((citydata) => citydata._id === selectedCityLocation);


  const allobjectsinlocation = selecteddatabase.filter((allinlocation) => {
    const locationId = (allinlocation.location && allinlocation.location.length > 0) ? allinlocation.location[0]._ref : null;
    
      return locationId === selectedCityLocation;
    
  });
  //console.log(allobjectsinlocation);
  //console.log(allobjectsinlocation.length);

  const currentIndex = allobjectsinlocation.findIndex((school) => school.slug.current === selectedCityData.slug.current);

  //console.log('Index of current school:', currentIndex);

  const previousSlug = currentIndex === 0 ? allobjectsinlocation[allobjectsinlocation.length - 1].slug.current : allobjectsinlocation[currentIndex - 1].slug.current;

  const nextSlug = currentIndex === allobjectsinlocation.length - 1 ? allobjectsinlocation[0].slug.current : allobjectsinlocation[currentIndex + 1].slug.current;




  const selectedCityName = selectedCityData ? selectedCityData.name : 'City Not Found';

  const selectedCityImage = (selectedCityData.coverimage && selectedCityData.coverimage.length > 0) ? selectedCityData.coverimage[0] : null;
  const selectedCityLogo = (selectedCityData.logo && selectedCityData.logo.length > 0) ? selectedCityData.logo[0] : null;



//const selectedCityOvve = slovve.filter((ovve) => ovve.ovvecity.toLowerCase() === selectedCityName.toLowerCase());
//const selectedCitySchool = selecteddatabase.filter((school) => school.location.toLowerCase() === selectedCityName.toLowerCase());


  useEffect(() => {
    const selectedCity = slug;


    setSelectedCity(slug);
    setBackgroundImage(selectedCityImage || fallbackImageUrl);
    setLogoImage(selectedCityLogo || fallbackImageUrl);



    // Update the document's title when the component mounts

      document.title = `${siteNameAlt2 && siteNameAlt2} | ${[slug]}`;


  }, [slug, selectedCityImage, selectedCityName]);


  const fallbackImageUrl = `/assets/studentlivet/stadbilder/${cityData?.name.toLowerCase()}.jpg`;


  const elements = [];  
  let totalLength = 0;
  


  const marginBottomValue = "10px";

  {selectedCityData.description &&
      Array.isArray(selectedCityData.description) &&
      selectedCityData.description.map((detail, index) => {
        const { _type, children, listItem, style, marks } = detail;
        const fullText = children.map((child) => child.text).join(' ');
    
        // Check the _type of the detail and apply appropriate styling
        if (_type === 'block') {
          // Define the style object with margin bottom
          const blockStyle = { marginBottom: marginBottomValue };
          
          if (listItem === 'bullet') {
            elements.push(
              <ul key={index} style={{ listStylePosition: "inside", paddingLeft: "0", ...blockStyle }}>
                <li style={{ marginLeft: "0.5em" }}>{fullText}</li>
              </ul>
            );
          } else if (listItem === 'number') { //doesnt work properly
            elements.push(
              <ol key={index} style={{ listStylePosition: "inside", paddingLeft: "0", ...blockStyle }}>
                <li style={{ marginLeft: "0.5em" }}>{fullText}</li>
              </ol>
            );
          } else if (style === 'h1') {
            elements.push(<h1 key={index} className="heading-1" style={blockStyle}>{fullText}</h1>);
          } else if (style === 'h2') {
            elements.push(<h2 key={index} className="heading-2" style={blockStyle}>{fullText}</h2>);
          } else if (style === 'h3') {
            elements.push(<h3 key={index} className="heading-3" style={blockStyle}>{fullText}</h3>);
          } else if (style === 'h4') {
            elements.push(<h4 key={index} className="heading-4" style={blockStyle}>{fullText}</h4>);
          } else if (style === 'h5') {
            elements.push(<h5 key={index} className="heading-5" style={blockStyle}>{fullText}</h5>);
          } else if (style === 'h6') {
            elements.push(<h6 key={index} className="heading-6" style={blockStyle}>{fullText}</h6>);
          } else if (style === 'blockquote') {
            elements.push(<blockquote key={index} style={blockStyle}>{fullText}</blockquote>);
          } else if (style === 'blockComment') {
            elements.push(<p key={index} className="hidden-text" style={blockStyle}>{fullText}</p>);
          }
          
          
          else if (style === 'normal' || !style) {
            let formattedChildren = children.map((child, childIndex) => {
              const { text, marks } = child;
              let formattedText = text;
      
              marks && marks.forEach((mark) => {
                  if (mark === 'strong') {
                      formattedText = <strong style={{ fontWeight: 'bold' }}>{formattedText}</strong>;
                  } else if (mark === 'em') {
                      formattedText = <em>{formattedText}</em>;
                  } else if (mark === 'code') {
                      formattedText = <code>{formattedText}</code>;
                  }
              });
      
              return <span key={childIndex}>{formattedText}</span>;
          });
      
          elements.push(
              <p key={index} className="regular-text" style={blockStyle}>
                  {formattedChildren}
              </p>
          );

        } /* else {
            console.log("else");

            let formattedText = fullText;
            if (children.marks && Array.isArray(children.marks)) {
              children.marks.forEach((mark) => {
                if (mark === 'strong') {
                  formattedText = <strong style={{ fontWeight: 'bold' }}>{formattedText}</strong>;
                } else if (mark === 'em') {
                  formattedText = <em>{formattedText}</em>;
                } else if (mark === 'code') {
                  formattedText = <code>{formattedText}</code>;
                }
              });
            }
            elements.push(<p key={index} className="regular-text" style={blockStyle}>{formattedText}</p>);

          }*/
    
          totalLength += fullText.length;
        }
    
        return elements;
    
      }).flat()}

//capitalizes the first letter
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //const testnext = selecteddatabase.filter((school) => school.location.toLowerCase() === selectedCityName.toLowerCase());



    //Update date formating
    const dateObject = new Date(selectedCityData._updatedAt); //selectedCityData._createdA
    {selectedCityData._createdAt}
    const formattedDate1 = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`;
    // Format the date as "20:10 27-10-2023"
    const formattedDate2 = `${dateObject
      .getHours()
      .toString()
      .padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')} ${dateObject.getDate().toString().padStart(2, '0')}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getFullYear()}`;
    // Output the results
    //console.log(formattedDate1); // Output: "2023-10-27 20:10:55"
    //console.log(formattedDate2);





    const [profilePicture, setProfilePicture] = useState('');
const [errorFetchingProfilePicture, setErrorFetchingProfilePicture] = useState(false);

useEffect(() => {
  // Make a request to the Facebook Graph API to get user profile picture
  // Replace 'FestN1' with the actual user ID or username

  const extractUserIdFromLink = (facebookProfileLink) => {
    const matches = facebookProfileLink.match(/(?:https?:\/\/(?:www\.)?facebook\.com\/)?(?:\/)?([^\/\?]+)(?:\/)?/);
    return matches && matches[1];
  };

const extractUserId = () => {
  if (selectedCityData.usefacebookprofilepicture) {

    if (selectedCityData.facebookprofilelink) {
    const userIdFromLink = extractUserIdFromLink(selectedCityData.facebookprofilelink);
    
      return userIdFromLink;
    } else if (Array.isArray(sluniversities.contactinfo)){  
      const facebookContactInfo = selectedCityData.contactinfo
            .filter(contact => contact.service === 'Facebook')
            .slice(0, 1);

          //console.log("facebookContactInfo", facebookContactInfo);

          if (facebookContactInfo.length > 0) {
            const userIdFromContact = extractUserIdFromLink(facebookContactInfo[0].link);
            if (userIdFromContact) {
              return userIdFromContact;
            }
          }
    }
  
  }
  console.error('Invalid Facebook profile link');
  return null;
};





  const userId = extractUserId();

  if (userId) {
  const accessToken = 'your_access_token'; // Replace with your access token
  const imageSize = 300;//screenWidth <= 550 ? 150 : 250;
  fetch(`https://graph.facebook.com/v13.0/${userId}/picture?type=large&width=${imageSize}&height=${imageSize}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching profile picture');
      }
      return response.url;
    })
    .then(url => setProfilePicture(url))
    .catch(error => {
      console.error(error);
      setErrorFetchingProfilePicture(true);
    });
  }
}, [selectedCityName]);


function shortenLink(link) {
  // Write logic to extract the relevant part of the link based on the service
  let extractedPart;
  if (link.includes('.com')) {
    extractedPart = link.split('.com/')[1];
  } else if (link.includes('.se')) {
    extractedPart = link.split('.se/')[1];
  } else if (link.includes('.org')) {
    extractedPart = link.split('.org/')[1];
  } else {
    return link;
  }

  // Split the extracted part again using '/'
  const parts = extractedPart.split('/');
  // Take the first part only
  const organizationName = parts[0];

  return organizationName;
}


function shortenLinkLinkedin(link) {
  // Write logic to extract the relevant part of the link based on the service
  let extractedPart;
  if (link.includes('.com/company/')) {
    extractedPart = link.split('.com/company/')[1];
  } else if (link.includes('.se/company/')) {
    extractedPart = link.split('.se/company/')[1];
  } else if (link.includes('.org/company/')) {
    extractedPart = link.split('.org/company/')[1];
  } 
  else if (link.includes('.com/school/')) {
    extractedPart = link.split('.com/school/')[1];
  } else if (link.includes('.se/school/')) {
    extractedPart = link.split('.se/school/')[1];
  } else if (link.includes('.org/school/')) {
    extractedPart = link.split('.org/school/')[1];
  } 
  else if (link.includes('.com')) {
    extractedPart = link.split('.com/')[1];
  } else if (link.includes('.se')) {
    extractedPart = link.split('.se/')[1];
  } else if (link.includes('.org')) {
    extractedPart = link.split('.org/')[1];
  } 
  else {
    return link;
  }

  // Split the extracted part again using '/'
  const parts = extractedPart.split('/');
  // Take the first part only
  const organizationName = parts[0];

    // Decode any URL-encoded characters in the organization name
    let organizationNameDecode = organizationName;
   organizationNameDecode = organizationNameDecode.replace(/%C3%A5/g, 'å');
   organizationNameDecode = organizationNameDecode.replace(/%C3%A4/g, 'ä');
   organizationNameDecode = organizationNameDecode.replace(/%C3%B6/, 'ö');



  return organizationNameDecode;
}

function shortenWebsiteLink(link) {
  // Remove prefixes from the link
  const prefixesToRemove = ['http://', 'https://www.', 'https://', 'http://www.', 'www.'];
  let shortenedLink = link;
  prefixesToRemove.forEach(prefix => {
    if (shortenedLink.startsWith(prefix)) {
      shortenedLink = shortenedLink.substring(prefix.length);
    }
  });
  return shortenedLink;
}



  return (
    <div>
    <Navbar announcements={announcements} release={release} productsss={products}/>
    <StudentlivetNavigation slcity={slcity} sluniversities={sluniversities} />

      <div className={announcements.filter((announcement) => announcement.showannouncement).length > 0 ? "entirefilterpage2" : "entirefilterpage"}>
        

    {/*  <div
  style={{
    backgroundImage: `url(${fallbackImageUrl})`,//backgroundImage ? `url(${urlForSL(backgroundImage).url()})` : `url(${fallbackImageUrl})`,    
    backgroundSize: 'cover', // Adjust this as needed
    backgroundPosition: 'center', // Adjust this as needed
  }}

  className='slinfopagecoverphoto'

></div> 
*/}
  {/*<div style={{ border: '2px solid var(--secondarycolor)', borderRadius: '8px', overflow: 'hidden' }}> </div> */}

<div className='slinfopagecoverphotodiv'>
  <img
    src={selectedCityData.coverimage && selectedCityData.coverimage[0] ? urlForSL(selectedCityData.coverimage[0]).url() : fallbackImageUrl}
    
    alt="Profile Picture"
    className='slinfopagecoverphoto'
    
  />
  

</div>




    {/* ROW 1 */}


<div style={{ display: 'flex', justifyContent: 'space-between'}}>
<div style={{ flex: 1, textAlign: 'left' }}>
{currentScreenSize >= 480 && (
<>
<p style={{fontSize: currentScreenSize < 680 ? "11px" : "16px", padding: "5px", marginLeft: "10px"}}> 
            <a className="text-link-style-black" style={{ top: "3px"}}><Link href={`/`} ><HomeIcon style={{ fontSize: "16px" }}/></Link></a>
            /
            <a className="text-link-style-black"><Link href={`/studentlivet/`}>studentlivet</Link></a>
            /
            <a className="text-link-style-black"><Link href={`/studentlivet/${cityData.slug.current}`}>{cityData.slug.current}</Link></a>
            /
            <a className="text-link-style-black"><Link href={`/studentlivet/${cityData.slug.current}/${view}`}>{view}</Link></a>
            /
            <a className="text-link-style-black"><Link href={`/studentlivet/${cityData.slug.current}/${view}/${slug}`} >{slug}</Link></a>
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
</>

        )} 
      </div>
        

{/* aaaa todo */}
<div style={{ display: 'flex', marginLeft:"25px", justifyContent: 'center', marginTop: "-100px", textAlign: "center" }}>
  <div
    className="profile-image"
    style={{
      width: '200px', // Adjust the size as needed
      height: '200px', // Keep the same size to maintain a square aspect ratio
      borderRadius: '50%', // Make the image round
      marginRight: '20px', // Adjust the spacing between the image and other content
      overflow: 'hidden', // Clip the image to the specified size
      border: '2px solid lightgray',
      backgroundColor: "white"
    }}
  >

    {/*<img
      src={fallbackImageUrl}//{logoImage ? `url(${urlForSL(logoImage).url()})` : `url(${fallbackImageUrl})`} // Replace with your profile image URL
      //backgroundImage ? `url(${urlForSL(backgroundImage).url()})` : `url(${fallbackImageUrl})`,
      alt="Profile Picture"
      style={{
        width: '100%', // Use 100% width for the contained image
        height: '100%', // Use 100% height for the contained image
        objectFit: 'cover', // Maintain the image's aspect ratio and cover the container
      }}
    />*/}
    
    {selectedCityData.usefacebookprofilepicture ? (
          profilePicture != "" && !errorFetchingProfilePicture ? (
            <img
              src={profilePicture}
              alt="Profile Picture"
              style={{
                width: '100%', // Use 100% width for the contained image
                height: '100%', // Use 100% height for the contained image
                objectFit: 'cover', // Maintain the image's aspect ratio and cover the container
              }}
            />
          ) : (
            <img
              src="/assets/noimageavailable.jpg"
              alt="Profile Picture"
              style={{
                width: '100%', // Use 100% width for the contained image
                height: '100%', // Use 100% height for the contained image
                objectFit: 'cover', // Maintain the image's aspect ratio and cover the container
              }}
            />
          )
        ) : selectedCityData.logo && selectedCityData.logo[0] ? (
          <img
            src={
              //isHovering && selecteddatabase.logo[0]
              selecteddatabase?.logo
              ? urlForSL(selectedCityData.logo[0]).url()
              : urlForSL(selectedCityData.logo[0]).url()
            }
            alt="Profile Picture"
            style={{
              width: '100%', // Use 100% width for the contained image
              height: '100%', // Use 100% height for the contained image
              objectFit: 'cover', // Maintain the image's aspect ratio and cover the container
            }}
          />
        ) : (
          selectedCityData.profileimagelink ? (
          <img
            src={selectedCityData.profileimagelink}
            alt="Profile Picture"
            style={{
              width: '100%', // Use 100% width for the contained image
              height: '100%', // Use 100% height for the contained image
              objectFit: 'cover', // Maintain the image's aspect ratio and cover the container
            }}
          />)
          :( 
          <img
            src="/assets/noimageavailable.jpg"
            alt="Profile Picture"
            style={{
              width: '100%', // Use 100% width for the contained image
              height: '100%', // Use 100% height for the contained image
              objectFit: 'cover', // Maintain the image's aspect ratio and cover the container
            }}
          />)
        )}


  </div>
</div>



      <div style={{ flex: 1, textAlign: 'right' }}>
      {currentScreenSize >= 480 && ( <><div style={{ 
          /*display: 'flex', justifyContent: 'space-between' */ }}>
          <Link href={`/studentlivet/${cityData.slug.current}/${view}/${previousSlug}`} ><ArrowBackIos style={{ height: "12px", cursor:"pointer"}}/></Link>
              {currentIndex + 1}/{allobjectsinlocation.length}
          <Link href={`/studentlivet/${cityData.slug.current}/${view}/${nextSlug}`} >
            <ArrowForwardIos style={{ height: "12px", cursor:"pointer"}}/>
          </Link>
        </div>
        <div>
        <p style={{fontSize:  currentScreenSize < 680 ? "10px" : "14px", padding: "5px", marginRight: "10px", top: 0, }}>
          Uppdaterat: <br></br>
          {formattedDate2}
        </p>
        </div>
        </>
      )}


      </div>

</div>





   




<div className="products-heading" style={{marginTop:"10px"}}>






{/* ROW 2 */}

<div style={{ display: 'flex', justifyContent: 'space-between'}}>

    {/*<div style={{ flex: 1, textAlign: 'left', bacgroundColor: "red", height: "10px", width: "100%" }}>
      <p>adqweda</p>
      </div>*/}

<div style={{ flex: 1,  width:"100%", overflow: "visible" }}>
  {selectedCityName && <h2 style={{ fontSize: currentScreenSize < 600 ? "30px" : "" }}>{selectedCityName}</h2> }
  {selectedCityData.category  || selectedCityLocation ? (
    <h3>
        {selectedCityData.category && selectedCityData.category === "university" ? "Universitet" : selectedCityData.category === "highschool" && "Högskola"} 
        {selectedCityLocation && selectedCityData.category && " i "} 
        {selectedCityLocation && selectedCityData.category && capitalizeFirstLetter(cityData?.name || '')}
    </h3>
) : null}
  {selectedCityData.subname && <h4 style={{fontWeight:'normal', fontStyle: 'italic', paddingLeft: "5vw", paddingRight:"5vw"}}> {selectedCityData.subname} </h4>}
</div>

      {/*<div style={{ flex: 1, textAlign: 'right' }}>
        
      </div>*/}
</div>   



{/* ROW 2.5 */}
{currentScreenSize < 480 && ( <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "20px", marginBottom: "-20px"
}}>

    <div style={{ flex: 1, textAlign: 'left' }}>
      <p style={{fontSize: currentScreenSize < 680 ? "13px" : "16px", padding: "5px", marginLeft: "10px"}}> 
            <a className="text-link-style-black" style={{ top: "3px"}}><Link href={`/`} ><HomeIcon style={{ fontSize: "16px" }}/></Link></a>
            /
            <a className="text-link-style-black"><Link href={`/studentlivet/`}>studentlivet</Link></a>
            /
            <a className="text-link-style-black"><Link href={`/studentlivet/${cityData.slug.current}`}>{cityData.slug.current}</Link></a>
            /
            <a className="text-link-style-black"><Link href={`/studentlivet/${cityData.slug.current}/${slug}`} >{slug}</Link></a>
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

        
    </div>

      

      <div style={{ flex: 1, textAlign: 'right' }}>
         <><div style={{ 
          /*display: 'flex', justifyContent: 'space-between' */ }}>
          <Link href={`/studentlivet/${cityData.slug.current}/${previousSlug}`} ><ArrowBackIos style={{ height: "12px", cursor:"pointer"}}/></Link>
              {currentIndex + 1}/{allobjectsinlocation.length}
          <Link href={`/studentlivet/${cityData.slug.current}/${nextSlug}`} >
            <ArrowForwardIos style={{ height: "12px", cursor:"pointer"}}/>
          </Link>
        </div>
        <div>
        <p style={{fontSize:  currentScreenSize < 680 ? "10px" : "14px", padding: "5px", marginRight: "10px", top: 0, }}>
          Uppdaterat: <br></br>
          {formattedDate2}
        </p>
        </div>
        </>
      
      </div>
</div>)}  



{/* ROW 2.7 */}
{currentScreenSize <= 825  && (  
  <div style={{ display: 'flex', justifyContent: 'space-between'}}>

<div style={{ flex: 2, textAlign: currentScreenSize <= 1049 && currentScreenSize >825 ? "left" : "center", marginBottom: "40px", padding: currentScreenSize <= 420 ? "0px 10px" : "0px 20px"}}>
      {/* {selectedCityData.category || selectedCityData.location ? (<h3>{selectedCityData.category && selectedCityData.category === "university" ? "Universitet" : "Högskola" } {selectedCityData.location && selectedCityData.category && "i"} {selectedCityData.location && capitalizeFirstLetter(selectedCityData.location)}</h3>) : null}
      {selectedCityData.subname && <h4 style={{fontWeight:'normal', fontStyle: 'italic'}}> {selectedCityData.subname} </h4>}*/}
      <br></br>
      <br></br>
      
      {selectedCityData.description && <div style={{marginTop: "-10px"}}><span style={{ fontWeight: "bold" }}>Om:</span> {elements} 

  
      </div>}

      
        </div>
      </div>
)}


{/* Row3 */}
<div style={{ display: 'flex', justifyContent: 'space-between'}}>

<div style={{ flex: 1, textAlign: 'left', }}>

    {selectedCityData.contactinfo && selectedCityData.contactinfo.length > 0 && (
      <div style={{maxWidth: "250px", backgroundColor:"var(--primarycolor)" /*Date.now() % 2 === 0 ? "lightgray" : "var(--primarycolor)"*/, overflow: "hidden", paddingLeft: "5px", borderRadius: "8px", paddingBottom: "6px", paddingTop: "6px", marginTop: currentScreenSize <= 825 ? "0px" : "70px"}}>
        <h3 style={{marginBottom: "7px"}}>{selectedCityData.contactinfo && "Relevanta länkar: " /*+ selectedCityData.contactinfo.length*/}</h3>
      
          {selectedCityData.contactinfo.filter(contact => contact.service === 'Telefon').map((contact, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
              <a href={`tel:${contact.link}`}  target="_blank" rel="noopener noreferrer" className="regular-link-style"><Phone  style={{ height: "18px", cursor:"pointer"}} /></a>
                <a href={`tel:${contact.link}`}  target="_blank" rel="noopener noreferrer" className="text-link-style-black" style={{marginTop: "-5px", marginLeft: "1px"}}>{contact.customLinkName ? contact.customLinkName : contact.link}</a>  {/* <p className="text-link-style-black">{contact.service}</p> */}
            </div>))}

          {selectedCityData.contactinfo.filter(contact => contact.service === 'Mail').map((contact, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
              <a href={`mailto:${contact.link}`}  target="_blank" rel="noopener noreferrer" className="regular-link-style"><IoIosMail style={{ height: "20px", width:"auto", cursor:"pointer",   marginLeft: "3px"}} /></a>
                <a href={`mailto:${contact.link}`}  target="_blank" rel="noopener noreferrer" className="text-link-style-black" style={{marginTop: "-5px", marginLeft: "1px"}}>{contact.customLinkName ? contact.customLinkName : contact.link}</a>  {/* <p className="text-link-style-black">{contact.service}</p> */}
            </div>))}

            {selectedCityData.contactinfo.filter(contact => contact.service === 'Hemsida').map((contact, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
                <a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="regular-link-style">
                  <Language style={{ height: "18px", cursor: "pointer" }} />
                </a>
                <a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="text-link-style-black" style={{ marginTop: "-6px", marginLeft: "1px" }}>
                  {contact.customLinkName ? contact.customLinkName : shortenWebsiteLink(contact.link)}
                </a>
              </div>
            ))}

            {selectedCityData.contactinfo.filter(contact => contact.service === 'Adress').map((contact, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", flexDirection: "column", alignItems: "flex-start", marginTop: "3px" }}>
                <span><LocationOn style={{ height: "18px" }} />
                {contact.adressrad && <div className="regular-link-style" style={{ top: "-3px" }}>{contact.adressrad}</div>}</span> 
                {contact.ortrad && <div className="regular-link-style" style={{ marginTop: "-4px", marginLeft: "24px" }}>{contact.ortrad}</div>}
              </div>))}

            {selectedCityData.contactinfo.filter(contact => contact.service === 'Instagram').map((contact, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
              <a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="regular-link-style"><AiFillInstagram href={contact.link} target="_blank" rel="noopener noreferrer" style={{ height: "20px", width:"auto",  cursor:"pointer", marginLeft: "3px"}} />
              </a><a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="text-link-style-black" style={{marginTop: "-7px", marginLeft: "1px"}}>{contact.customLinkName ? contact.customLinkName : shortenLink(contact.link)}</a>  {/* <p className="text-link-style-black">{contact.service}</p> */}
            </div>))}

            {selectedCityData.contactinfo.filter(contact => contact.service === 'Facebook').map((contact, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
              <a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="regular-link-style"><FaFacebookSquare href={contact.link} target="_blank" rel="noopener noreferrer" style={{ height: "18px", cursor:"pointer", marginLeft: "5px"}} />
              </a><a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="text-link-style-black" style={{marginTop: "-5px", marginLeft: "4px"}}>{contact.customLinkName ? contact.customLinkName :shortenLink(contact.link)}</a>  {/* <p className="text-link-style-black">{contact.service}</p> */}
            </div>))}

            {selectedCityData.contactinfo.filter(contact => contact.service === 'Twitter').map((contact, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
              <a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="regular-link-style"><Twitter href={contact.link} target="_blank" rel="noopener noreferrer" style={{ height: "18px", cursor:"pointer"}} />
              </a><a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="text-link-style-black" style={{marginTop: "-5px", marginLeft: "0px"}}>{contact.customLinkName ? contact.customLinkName : shortenLink(contact.link)}</a>  {/* <p className="text-link-style-black">{contact.service}</p> */}
            </div>))}

            {selectedCityData.contactinfo.filter(contact => contact.service === 'Linkedin').map((contact, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
              <a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="regular-link-style"><LinkedIn href={contact.link} target="_blank" rel="noopener noreferrer" style={{ height: "18px", cursor:"pointer"}} />
              </a><a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="text-link-style-black" style={{marginTop: "-5px", marginLeft: "1px"}}>{contact.customLinkName ? contact.customLinkName : shortenLinkLinkedin(contact.link)}</a>  {/* <p className="text-link-style-black">{contact.service}</p> */}
            </div>))}

            {selectedCityData.contactinfo.filter(contact => contact.service === 'TikTok').map((contact, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
              <a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="regular-link-style"><FaTiktok href={contact.link} target="_blank" rel="noopener noreferrer" style={{ height: "18px", cursor:"pointer",  marginLeft: "5px"}} />
              </a><a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="text-link-style-black" style={{marginTop: "-5px", marginLeft: "4px"}}>{contact.customLinkName ? contact.customLinkName : shortenLink(contact.link)}</a>  {/* <p className="text-link-style-black">{contact.service}</p> */}
            </div>))}

            {selectedCityData.contactinfo.filter(contact => contact.service === 'Other').map((contact, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
              <a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="regular-link-style"><Otherlink  style={{ height: "18px", cursor:"pointer"}} />
              </a><a href={contact.link.startsWith('http') ? contact.link : `https://${contact.link}`} target="_blank" rel="noopener noreferrer" className="text-link-style-black" style={{marginTop: "-8px", marginLeft: "1px"}}>{contact.customLinkName ? contact.customLinkName : contact.link}</a>  {/* <p className="text-link-style-black">{contact.service}</p> */}
            </div>))}

                
      </div>
    )}

</div>


{currentScreenSize > 825  && (  <div style={{ flex: 2, textAlign: currentScreenSize <= 1049 && currentScreenSize >825 ? "left" : "center", paddingRight: currentScreenSize <= 1049 && currentScreenSize >825 ? "20px" : "0px" }}>
      {/* {selectedCityData.category || selectedCityData.location ? (<h3>{selectedCityData.category && selectedCityData.category === "university" ? "Universitet" : "Högskola" } {selectedCityData.location && selectedCityData.category && "i"} {selectedCityData.location && capitalizeFirstLetter(selectedCityData.location)}</h3>) : null}
      {selectedCityData.subname && <h4 style={{fontWeight:'normal', fontStyle: 'italic'}}> {selectedCityData.subname} </h4>}*/}
      
      
      {selectedCityData.description && <div style={{marginTop: "20px"}}><span style={{ fontWeight: "bold" }}>Om:</span> {elements}  </div>}

      
      </div>
)}
      {currentScreenSize > 1049  && (
      <div style={{ flex: 1, textAlign: 'right', }}>
      </div>
      )}
</div>      






    













        </div>



        <div style={{ position: 'absolute', right: "0px", top: "240px", fontFamily: 'Poppins, sans-serif'}}>







</div>



 {/* react-social-media-embed   https://www.npmjs.com/package/react-social-media-embed */}
{/*
{selectedCityData.mapsurl &&
<div style={{ display: 'flex', justifyContent: 'center',  transform: 'scale(0.8)',  }}>
  <div style={{ margin: '0 5px' }}>
      <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} height={430} />
    </div>
    <div style={{ margin: '0 5px' }}>
      <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} height={430} />
    </div>
    <div style={{ margin: '0 5px' }}>
      <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} height={430}/>
    </div>
    <div style={{ margin: '0 5px' }}>
      <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} height={430}/>
    </div>

</div>
}

*/}



  {selectedCityData.mapsurl &&
  <div style={{ border: '2px solid var(--secondarycolor)', borderRadius: '8px', overflow: 'hidden' }}>
    <iframe
      src={extractGoogleMapsURL(selectedCityData.mapsurl)}
      width="100%"
      height="200"
      style={{ border: 'none' }} // Remove border from the iframe itself
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
    </div>
  }



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
  const slovve = await studentlivetclient.fetch(slovveQuery);

  const slcityQuery = '*[_type == "slcity"]';
  const slcity = await studentlivetclient.fetch(slcityQuery);

  const sluniversitiesQuery = '*[_type == "sluniversities"]';
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
    props: { products: productss, announcements, slcity, slovve, sluniversities, slkarhus, slsektioner,slforening, release, slug },
  };
};

export default SLCitySlug;