import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { urlForSL } from '../../lib/studentlivetclient';
import { urlFor } from '../../lib/client';
import { useStateContext } from '../../context/StateContext';

// Helper function to get city names from references
const getCityNames = (locationArray, cities) => {
  if (!locationArray || !Array.isArray(locationArray) || !Array.isArray(cities)) return '';
  const cityNames = locationArray.map(loc => {
    const city = cities.find(city => city._id === loc._ref);
    return city ? city.name : '';
  }).filter(Boolean).join(', ');
  return cityNames;
};

// Include `slcity` as a prop
const Studentlivet = ({ sluniversities, cityname, entrycategory, view, slcity }) => {
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

  const extractUserIdFromLink = (facebookProfileLink) => {
    const matches = facebookProfileLink.match(/(?:https?:\/\/(?:www\.)?facebook\.com\/)?(?:\/)?([^\/\?]+)(?:\/)?/);
    return matches && matches[1];
  };

  const extractUserId = () => {
    if (sluniversities.usefacebookprofilepicture) {
      if (sluniversities.facebookprofilelink) {
        const userIdFromLink = extractUserIdFromLink(sluniversities.facebookprofilelink);
        return userIdFromLink;
      } else if (Array.isArray(sluniversities.contactinfo)) {
        const facebookContactInfo = sluniversities.contactinfo
          .filter(contact => contact.service === 'Facebook')
          .slice(0, 1);
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

  const [profilePicture, setProfilePicture] = useState('');
  const [errorFetchingProfilePicture, setErrorFetchingProfilePicture] = useState(false);

  useEffect(() => {
    const userId = extractUserId();
    if (userId) {
      const accessToken = 'your_access_token'; // Replace with your access token
      const imageSize = 300; // Adjust size as needed
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
  }, []);

  if (!sluniversities || !sluniversities.name) {
    return null; // Skip rendering if the data is not available
  }

  const MAX_NAME_LENGTH = screenWidth <= 550 ? 19 : 30;
  const truncatedName = sluniversities?.name.length > MAX_NAME_LENGTH
    ? sluniversities.name.substring(0, MAX_NAME_LENGTH) + '...'
    : sluniversities.name;

  return (
    <div className='entireproduct'>
      <Link href={`/studentlivet/${cityname}/${view}/${sluniversities.slug.current}`}>
        <div className="product-card"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="image-container product-image" style={{width: screenWidth <= 550 ? "150px" : "250px", height: screenWidth <= 550 ? "150px" : "250px", }}>
            {sluniversities.usefacebookprofilepicture ? (
              profilePicture !== "" && !errorFetchingProfilePicture ? (
                <img
                  src={profilePicture}
                  className="product-image-studentlivet"
                  alt="Profile"
                />
              ) : (
                <img
                  src="/assets/noimageavailable.jpg"
                  className="product-image-studentlivet"
                  alt="No image available"
                />
              )
            ) : sluniversities.logo && sluniversities.logo[0] ? (
              <img
                src={isHovering && sluniversities.logo[1] ? urlForSL(sluniversities.logo[1]).url() : urlForSL(sluniversities.logo[0]).url()}
                className="product-image-studentlivet"
                alt="Product front image"
              />
            ) : (
              sluniversities.profileimagelink ? (
                <img
                  src={sluniversities.profileimagelink}
                  className="product-image-studentlivet"
                  alt="No image available"
                />
              ) : (
                <img
                  src="/assets/noimageavailable.jpg"
                  className="product-image-studentlivet"
                  alt="No image available"
                />
              )
            )}
          </div>
          <p className="product-name" style={{ fontWeight: 'bold',  marginTop: "10px" }}>{truncatedName}</p>
          {entrycategory === "Skolor" && (
              <div style={{ maxWidth: screenWidth <= 550 ? 150 : 250, overflowWrap: 'break-word', }}>
                <p style={{ overflowWrap: 'break-word' }}>
                  {sluniversities.category === "university" ? "Universitet" : "Högskola"} i {getCityNames(sluniversities.location, slcity)}
                </p>
              </div>
            )}
        </div>
      </Link>
    </div>
  );
};

export default Studentlivet;



{ /*<div style={{ maxWidth: screenWidth <= 550 ? 150 : 250, overflowWrap: 'break-word', }}>
  <p className="product-price"  style={{ fontStyle: 'italic', fontSize: '14px', overflowWrap: 'break-word', textAlign: screenWidth <= 550 ? "center" :'left' }}>dadadas</p>
</div> */}

      

    {/* 
      <div  className="reviews">
        {  screenWidth >= 551 &&
            <div className="fewleft" style={{marginLeft: "auto"}}>
            <p className="tag-text " style={{color: "white"}}>Få kvar!</p>
          </div>
          }
      </div> 
    */}