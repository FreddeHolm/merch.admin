import React, { useEffect, useState, useRef  } from 'react';
import { useAuth } from './AuthContext';
import Login from './Login';
import { studentlivetclient } from '../../lib/studentlivetclient';
import { AiOutlineShopping, AiOutlineSearch } from 'react-icons/ai'; //https://react-icons.github.io/react-icons/search?q=AiOutlineShopping
import Switch from 'react-switch';
import { urlForSL } from '../../lib/studentlivetclient';
import AvatarEditor from 'react-avatar-editor';
import ImageEditPopup from './ImageEditPopup';
import draftToHtml from 'draftjs-to-html';
import { TiDeleteOutline } from 'react-icons/ti';
import {  customStyles } from '../filterPageUtils';
import Select from 'react-select'; // Add this line //SOURCE: https://react-select.com/styles
import Fab from '@material-ui/core/Fab';
import PlusIcon from '@material-ui/icons/Add';
import Link from 'next/link';
import RichTextEditor from './RichTextEditor';
import StudentlivetNavigation from '../studentlivet/SLNavigation';
import { faTimes, faLocationDot, faBars, faEarthAmericas, faCity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

let Editor;
if (typeof window !== 'undefined') {
  Editor = require('react-draft-wysiwyg').Editor;
  require('react-draft-wysiwyg/dist/react-draft-wysiwyg.css');
}


const serviceOptions = [
  { title: 'Telefon', value: 'Telefon', descriptiontext: "Telefonnummer" },
  { title: 'Mail', value: 'Mail', descriptiontext: "Mailadress" },
  { title: 'Adress', value: 'Adress', descriptiontext: "Adress" },
  { title: 'Hemsida', value: 'Hemsida', descriptiontext: "Länk" },
  { title: 'Twitter/X', value: 'Twitter', descriptiontext: "Länk" },
  { title: 'Instagram', value: 'Instagram', descriptiontext: "Länk" },
  { title: 'YouTube', value: 'Youtube', descriptiontext: "Länk" },
  { title: 'Facebook', value: 'Facebook', descriptiontext: "Länk" },
  { title: 'Linkedin', value: 'Linkedin', descriptiontext: "Länk" },
  { title: 'TikTok', value: 'TikTok', descriptiontext: "Länk" },
  { title: 'Other', value: 'Other', descriptiontext: "Länk" },
];

const Adminsida = ({ slforening, slsektioner, sluniversities, slkarhus, slovve, slforeningfromusers, slcity }) => {
  const { currentUser, logout } = useAuth();
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [formData, setFormData] = useState({});
  const [categoryVisibility, setCategoryVisibility] = useState({});
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [uploadImageWhere, setUploadImageWhere] = useState(null);
  const [logoimageFile, setLogoimageFile] = useState(null);
  const [coverimageFile, setCoverimageFile] = useState(null);
  const [descriptionText, setDescriptionText] = useState(null);
  const [uploadAspectRatio, setUploadAspectRatio] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState("");
  const [formChanged, setFormChanged] = useState(false);
  const [formChangedTextEditor, setFormChangedTextEditor] = useState(false);
  const [mapError, setMapError] = useState('');
  
  const [initialFormData, setInitialFormData] = useState({});
  const [initialcontactInfo, setInitialcontactInfo] = useState({});
  const [currentSelectedCitySlug, setCurrentSelectedCitySlug] = useState();
  const [fbprofilePicture, setFbprofilePicture] = useState('');
  const [errorFetchingfbprofilePicture, setErrorFetchingfbprofilePicture] = useState(false);
  const [contactInfo, setContactInfo] = useState([{ service: '', link: '', customLinkName: '', adressrad: '', ortrad: '' }]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [refreshMessage, setRefreshMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const richTextEditorRef = useRef(null); 

  const [mapUrl, setMapUrl] = useState('');

  const [primaryColorSwitch, setPrimaryColorSwitch] = useState('#000');
  const [secondaryColorSwitch, setSecondaryColorSwitch] = useState('#fff');

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setPrimaryColorSwitch(rootStyles.getPropertyValue('--primarycolor').trim());
    setSecondaryColorSwitch(rootStyles.getPropertyValue('--secondarycolor').trim());
  }, []);
  

  const convertToHTML = (contentState) => {
    const rawContentState = convertToRaw(contentState);
    return draftToHtml(rawContentState);
  };

  const handleEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  const saveDescription = () => {
    const content = convertToHTML(editorState.getCurrentContent());
    // Send the content to your backend for storage
  };

  const handleContactInputChange = (index, field, value) => {
    setContactInfo((prevInfo) => {
      const updatedContactInfo = [...prevInfo];
      const contactToUpdate = updatedContactInfo[index];
      contactToUpdate[field] = value;
      return updatedContactInfo;
    });
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



  const getCityName = (location, slcity) => {
    if (!location) {
      return 'No location';
    }
  
    let cityId = null;
    if (Array.isArray(location)) {
      cityId = location[0]?._ref || location[0]?._id;
    } else {
      cityId = location?._ref || location?._id;
    }
  
    if (cityId) {
      const selectedCity = slcity.find(city => city._id === cityId);
      return selectedCity ? selectedCity.name : 'City not found';
    } else {
      console.error("City ID not found in location", location);
      return 'City ID not found';
    }
  };


  const populateContactInfo = () => {
    if (selectedEntry) {
      const entryContactInfo = selectedEntry.contactinfo || [];
      const updatedContactInfo = entryContactInfo.map(contact => ({ ...contact }));
      setContactInfo(updatedContactInfo);
      setInitialcontactInfo(updatedContactInfo);
    }
  };

  const populateDescriptionText = () => {
    if (selectedEntry) {
      setDescriptionText(selectedEntry.description);
    }
  };

  useEffect(() => {
    const isFormChanged = JSON.stringify(contactInfo) !== JSON.stringify(initialcontactInfo);
    setFormChanged(isFormChanged);
  }, [contactInfo, initialcontactInfo]);

  const handleDeleteContact = (index) => {
    setContactInfo((prevInfo) => {
      const updatedContactInfo = [...prevInfo];
      updatedContactInfo.splice(index, 1);
      return updatedContactInfo;
    });
  };


  const handleLocationChange = (selectedLocation) => {
    setFormData((prevData) => ({
        ...prevData,
        location: selectedLocation,
    }));
};

  const handleAddContact = () => {
    setContactInfo((prevInfo) => [...prevInfo, { _key: generateKey("ContactInfo"), service: '', link: '', customLinkName: '', adressrad: '', ortrad: '' }]);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
  };

  const handleSaveEditedImage = (editedImage, wheretosave) => {
    if (wheretosave === "logo") {
      setLogoimageFile(editedImage);
    }
    if (wheretosave === "cover") {
      setCoverimageFile(editedImage);
    }
    setFormChanged(true);
  };
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      return <Login slforening={slforening} sluniversities={sluniversities} slkarhus={slkarhus} slsektioner={slsektioner} slovve={slovve} slforeningfromusers={slforeningfromusers} slcity={slcity} />;
    }
  }, [currentUser]);

  const handleClick = (entry) => {
    setSelectedEntry(entry);
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const isNewSection = (currentIndex) => {
    if (currentIndex === 0) return true;

    const currentEntryType = allFilteredEntries[currentIndex]._type;
    const previousEntryType = allFilteredEntries[currentIndex - 1]._type;
    const cleanCurrentEntryType = currentEntryType.replace('fromusers', '');
    const cleanPreviousEntryType = previousEntryType.replace('fromusers', '');

    return cleanCurrentEntryType !== cleanPreviousEntryType;
  };

  const handleCategoryToggle = (category) => {
    setCategoryVisibility(prevState => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const typeMappings = {
    slovve: 'Overall',
    slkarhus: 'Studentkårer',
    slsektioner: "Sektioner",
    sluniversities: 'Universitet',
    slforening: 'Förening',
   // slovvefromusers: 'Overall',
   // slkarhusfromusers: 'Studentkårer',
    // sluniversitiesfromusers: 'Universitet',
   //  slforeningfromusers: 'Förening'
  };

  const linkMappings = {
    slovve: 'ovvar',
    slkarhus:  'karer',
    slsektioner: 'sektioner',
    sluniversities: 'skolor',
    slforening: 'foreningar',
    //slovvefromusers: 'ovvar',
    //slkarhusfromusers: 'karer',
    //sluniversitiesfromusers: 'skolor',
    //slforeningfromusers: 'foreningar'
  };

  useEffect(() => {
    const isFormChanged = Object.keys(formData).some(key => formData[key] !== initialFormData[key]);
    setFormChanged(isFormChanged);
    setFormChangedTextEditor(false);
  }, [formData, initialFormData]);

  const populateFormData = () => {
    if (selectedEntry) {
      const formDataValues = {
        name: selectedEntry.name || '',
        subname: selectedEntry.subname || '',
        facebookprofilelink: selectedEntry.facebookprofilelink || '',
        profileimagelink: selectedEntry.profileimagelink || '',
        mapsurl: selectedEntry.mapsurl || '',
        usefacebookprofilepicture: selectedEntry.usefacebookprofilepicture || false,
        contactinfo: selectedEntry.contactinfo || [], 
        location: selectedEntry.location ? selectedEntry.location[0] : null,
      };
      setFormData(formDataValues);
      setInitialFormData(formDataValues);
    }
  };

  useEffect(() => {
    const message = localStorage.getItem('refreshMessage');
    if (message) {
      setRefreshMessage(message);
      localStorage.removeItem('refreshMessage'); // Remove the message after displaying
    }
  }, []);

  useEffect(() => {
    populateFormData();
    populateContactInfo();
    populateDescriptionText();
    setLogoimageFile(null);
    setCoverimageFile(null);

    
    
    /*setCurrentSelectedCitySlug(slcity.find(city =>
      city.name.toLowerCase() === (selectedEntry?.location ? selectedEntry?.location.toLowerCase() : selectedEntry?.location?.toLowerCase())
    )?.slug.current);

    */

    //setFbprofilePicture("");
    //setErrorFetchingfbprofilePicture(false);
    

  }, [selectedEntry]);


/*
  const populateLocation = () => {
    if (selectedEntry) {
      const entrylocation = selectedEntry.location || [];
      const updatedContactInfo = entrylocation.map(location => ({ ...location }));

    }
  }; 
  */

  useEffect(() => {
    console.log("running , [selectedEntry, slcity]);");
    if (selectedEntry?.location) {
        let cityId = null;
        if (Array.isArray(selectedEntry.location)) {
            cityId = selectedEntry.location[0]._ref || selectedEntry.location[0]._id;
        } else {
            cityId = selectedEntry.location._ref || selectedEntry.location._id;
        }
        
        if (cityId) {
            const selectedCity = slcity.find(city => city._id === cityId);
            setCurrentSelectedCitySlug(selectedCity?.slug.current);
            setFormData(prevData => ({
              ...prevData,
              location: { name: selectedCity.name, _id: selectedCity._id }
            }));
            console.log("selectedEntry?.location ", selectedEntry.location);
            console.log("cityId ", cityId);
            console.log("selectedCity ", selectedCity);
            console.log("selectedCity.name ", selectedCity.name);
        } else {
            console.error("City ID not found in selectedEntry.location", selectedEntry.location);
        }
    }
}, [selectedEntry, slcity]);




  useEffect(() => {
    if (selectedEntry) {
      handleFBPreview(formData.facebookprofilelink, contactInfo);
    }
  }, [formData.facebookprofilelink, contactInfo, formData.profileimagelink]);


  useEffect(() => {
    if (selectedEntry ) {
      const newMapUrl = extractGoogleMapsURL(formData.mapsurl);
      setMapUrl(newMapUrl);
    }
  }, [formData.mapsurl]);

  

  const handleInputChange = (field, value, type, index) => {
    setFormData((prevData) => {
      let updatedData;
  
      if (type === 'boolean') {
        updatedData = {
          ...prevData,
          [field]: value,
        };
      } else if (type === 'text') {
        if (field.startsWith('contactinfo')) {
          const updatedContactInfo = [...prevData.contactinfo];
          updatedContactInfo[index][field.split('.')[1]] = value;
          updatedData = {
            ...prevData,
            contactinfo: updatedContactInfo,
          };
        } else {
          updatedData = {
            ...prevData,
            [field]: typeof value === 'boolean' ? value : value.trim(),
          };
        }
      }
  
      if (field === 'mapsurl') {
        const mapUrl = extractGoogleMapsURL(value);
        setMapUrl(mapUrl);
      }
  
      return updatedData;
    });
  };

  const generateKey = (value) => value + Date.now() + Math.random().toString(36).substring(2, 15);

  const handleSave = async () => {
    setFormSubmitted("Skickar");
    setIsLoading(true); 
    try {
      const filteredContactInfo = contactInfo.filter(contact => contact.service !== '');

      const patch = studentlivetclient.patch(selectedEntry._id);
      patch.set(formData);
      patch.set({ contactinfo: filteredContactInfo });

      const contentState = editorState.getCurrentContent();
      const htmlContent = convertToHTML(contentState);

      if (logoimageFile) {
        const imageAsset = await studentlivetclient.assets.upload('image', logoimageFile);
        patch.set({ logo: [{ _key: generateKey("logo"), _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } }] });
      }

      if (coverimageFile) {
        const imageAsset = await studentlivetclient.assets.upload('image', coverimageFile);
        patch.set({ coverimage: [{ _key: generateKey("logo"), _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } }] });
      }

      await richTextEditorRef.current.handleSaveinEditor(); // Add this line
      await patch.commit();
      setFormData({});
      localStorage.setItem('refreshMessage', "Om dina ändringar inte visas efter du sparat dem, testa att ladda om sidan några gånger. ");      
      setTimeout(() => { 
        setIsLoading(false); 
        window.location.reload(); 
        }, 3000);
    } catch (error) {
      console.error('Error updating entry:', error.message);
      window.alert('Error updating entry: ', error.message);
      setIsLoading(false);
    }
  };

  const extractUserIdFromLink = (facebookProfileLink) => {
    const matches = facebookProfileLink.match(/(?:https?:\/\/(?:www\.)?facebook\.com\/)?(?:\/)?([^\/\?]+)(?:\/)?/);
    return matches && matches[1];
  };

  const extractUserId = (facebookProfileLink) => {
    if (formData.usefacebookprofilepicture) {
      if (facebookProfileLink) {
        const userIdFromLink = extractUserIdFromLink(facebookProfileLink);
        return userIdFromLink;
      } else {
        const facebookContactInfo = contactInfo
          .filter(contact => contact.service === 'Facebook')
          .slice(0, 1);
        if (facebookContactInfo.length > 0) {
          const userIdFromContact = extractUserIdFromLink(facebookContactInfo[0].link);
          if (userIdFromContact) {
            return userIdFromContact;
          }
        }
      }
    } else {
      console.error('Invalid Facebook profile link');
      return null;
    }
  };

  const handleFBPreview = (aaa, bbb) => {
    setFbprofilePicture("");
    setErrorFetchingfbprofilePicture(false);
    const userId = extractUserId(aaa ? aaa : bbb?.filter(contact => contact.service === 'Facebook').slice(0, 1)?.link);

    if (userId) {
      const accessToken = 'your_access_token';
      const imageSize = 300;
      fetch(`https://graph.facebook.com/v13.0/${userId}/picture?type=large&width=${imageSize}&height=${imageSize}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error fetching profile picture');
          }
          return response.url;
        })
        .then(url => setFbprofilePicture(url))
        .catch(error => {
          console.error(error);
          setErrorFetchingfbprofilePicture(true);
        });
    }
  };

  if (!currentUser) {
    return <Login slcity={slcity} sluniversities={sluniversities} />;
  }

  const allFilteredEntries = sluniversities
    .concat(slkarhus) //todo fixa sektioner
    .concat(slforening)
    .concat(slsektioner)
    //.concat(slforeningfromusers)
    .concat(slovve)
    .filter(entry => 
      (entry.contentmanager && entry.contentmanager.includes(currentUser.email)) ||
      (entry.contactinfo && entry.contactinfo.some(contact => contact.service === 'Mail' && contact.link === currentUser.email))
    );

    const getServiceDescription = (service) => {
      const serviceOption = serviceOptions.find(option => option.value === service);
      return serviceOption ? serviceOption.descriptiontext : "Länk";
    };


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
    };
*/

    const extractGoogleMapsURL = (mapsurl) => {
      const urlPattern = /(?:https:\/\/www\.google\.com\/maps\/embed\?pb=|https:\/\/www\.google\.com\/maps\/place\/)([^\s]+)/;
      const match = mapsurl?.match(urlPattern);
      if (match) {
        setMapError(false);
        return `https://www.google.com/maps/embed?pb=${match[1]}`;
      }
      setMapError(true);
      return '';
    };

    const sidePadding = screenWidth < 500 ? '7px' : '20px'; // Define your variable
    const imageSizeWidth = screenWidth < 500 ? 200 : 250; // Define your variable
    const imageSizeHeigth = screenWidth < 500 ? 92 : 115; // Define your variable

    
  // If the user is logged in, render the content with a logout button
  return (
    <div style={{ margin: screenWidth > 490 && " 0px 5px", marginLeft: screenWidth >970 &&"20%",  
      
    }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <h1>Welcome to the Admin Panel</h1>
    <button
      onClick={handleLogout}
      style={{
        width: '100px',
        padding: '0.5rem',
        fontSize: screenWidth > 410 ? '1rem' : "11px",
        backgroundColor: 'var(--primarycolor)',
        color: 'white',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        border: "1px solid var(--primarycolor)",
        alignSelf: 'flex-start'
      }}
    >
      Sign out
    </button>
</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

      <p style={{marginTop: screenWidth < 500 && "32px"}}>You are logged in as: <b /* style={{color: "var(--primarycolor)"}} */ >{currentUser.email}</b></p>
      

      <StudentlivetNavigation slcity={slcity} sluniversities={sluniversities} adminpage={true}/>
</div>
{refreshMessage && 
  <div style={{backgroundColor: "var(--secondarycolor)", padding: "6px 12px", marginTop: "16px",  display: "inline-block"}}>
  <p style={{fontSize:"11px", color: 'white'}}><b style={{ color: "var(--primarycolor)"}}>OBS: </b>{refreshMessage}</p>
</div>}


      <div style={{ display: 'flex',   width: "100%", marginLeft: screenWidth > 500 && "5px", marginRight: screenWidth > 500 && "5px", marginTop: "15px", }}>
   <div  style={{ flex: 1, borderRight: "1px #D9DDDC solid", 
maxWidth: screenWidth > 750 ? "260px" : (screenWidth > 500 ? "150px" : "120px"), minWidth: screenWidth > 750 ? "260px" : (screenWidth > 500 ? "150px" : "120px"), 



  }}>
  {/* Display all entries inside this div */}
 {/* <div className="searchBox2">
    <AiOutlineSearch className="searchIcon" />
    <input
      className="searchInput2"
      style={{ width: "120%" }}
      type="text"
      placeholder="Sök produkter"
      value={searchText}
      onChange={handleSearchInputChange}
    />
  </div>{/* TODO, SEARCH FUNCTION  */}
    
    {/* TODO, hide side menu
    <div style={{width: "42px", height: "42px", backgroundColor: "var(--secondarycolor)"}}>
    <FontAwesomeIcon className="cart-icon" style={{ width: "24px", marginTop: "8px", marginLeft: "9px",  color: "var(--primarycolor)" }} id="bar" icon={faTimes :  faBars} /> 
    </div>
    */}

<div className="searchBox3" style={{ textAlign: "center", padding: "0 0" , paddingTop: screenWidth < 501 ? "5px" :"2px",}}>
    <h2 style={{color: "var(--primarycolor)",  fontSize: screenWidth < 501 && "20px"}}>Dina Sidor</h2>
  </div>

  {allFilteredEntries.map((entry, index) => (
  <React.Fragment key={entry.id}>
    {isNewSection(index) && (
      <div onClick={() => handleCategoryToggle(typeMappings[entry._type])}
      style={{
        cursor: "pointer",
        borderBottom: "1px #D9DDDC solid",
        paddingTop: '2px',
        marginTop:"10px",
        paddingBottom: '5px',
        fontWeight: 'bold',

       
        
        backgroundColor: !categoryVisibility[typeMappings[entry._type]] ? "var(--primarycolor)" : "#fcd22c", 
      }}>
      <p style={{marginLeft:"5px",
 overflow: "hidden",
 whiteSpace: "nowrap",
 textOverflow: "ellipsis",

      }}
        
      >
        {typeMappings[entry._type]}
        {!categoryVisibility[typeMappings[entry._type]] ? " -" : " +"}
      </p>
      </div>
    )}

    {!categoryVisibility[typeMappings[entry._type]] && (
      <div
        onClick={() => handleClick(entry)}
        style={{
          cursor: "pointer",
          marginBottom: "10px",
          backgroundColor: entry === selectedEntry ? "lightgray" : "white",
          borderBottom: "1px #D9DDDC solid",
          paddingLeft: "5px",
        }}
      >
        {/* Display relevant information from the entry */}
        <h2  style={{fontSize: screenWidth > 750 ? "20px" : "15px", 

overflow: "hidden",
whiteSpace: "nowrap",
textOverflow: "ellipsis",

        }}  >{entry.name}</h2>
       { /* todo enable
        <p style={{overflow: "hidden",
whiteSpace: "nowrap",
textOverflow: "ellipsis",}}>{entry.location} </p> */}
<p style={{overflow: "hidden",
whiteSpace: "nowrap",
textOverflow: "ellipsis",}}>{getCityName(entry.location, slcity)} </p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          
          <p style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",}}> {typeMappings[entry._type]}</p>
          
          {entry._type.includes('fromusers') && (
            <span style={{ marginLeft: '5px', color: 'blue', overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", }}> - Users</span>
          )}
        </div>
      </div>
    )}
  </React.Fragment>
))}
</div>






{/* RIGHT SIDE*/}
<div style={{ maxWidth: screenWidth > 500 ? '500px' : "350px" //screenWidth > 400 ? "350px" : "230px" 

}}>
{selectedEntry && (
  <div style={{ flex: 1, marginLeft: screenWidth > 500 && '20px', padding: screenWidth > 500 ? '20px':`20px ${sidePadding}`,marginBottom: '20px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
    <h2 style={{  fontSize: '24px' }}>{selectedEntry.name}{/*selectedEntry._type */}</h2>
    {/*<a target="_blank"  rel="noopener noreferrer" href={`/studentlivet/${currentSelectedCitySlug}/${linkMappings[selectedEntry._type]}/${selectedEntry?.slug?.current}`}>
    <p >/studentlivet/{currentSelectedCitySlug}/{linkMappings[selectedEntry._type]}/{linkMappings[selectedEntry._type]}/{selectedEntry?.slug?.current}</p></a>*/}
<p></p>


    { linkMappings[selectedEntry._type] === "ovvar" ?
    (selectedEntry.location && <a className="text-link-style" style={{float: "Right", }} 
    href={`/studentlivet/${currentSelectedCitySlug}/${linkMappings[selectedEntry._type]}`}
    target="_blank" 
    rel="noopener noreferrer">Visa sida
     {/*<Link href={`/studentlivet/${selectedEntry?.location}/skolor/${selectedEntry?.slug.current}`}  >View entry</Link> */}
     </a>)


    :
    (selectedEntry.location && selectedEntry.slug.current && <a className="text-link-style" style={{float: "Right", }} 
     href={`/studentlivet/${currentSelectedCitySlug}/${linkMappings[selectedEntry._type]}/${selectedEntry.slug.current}`}
     target="_blank"
     rel="noopener noreferrer"><p>Visa sida</p>
      {/*<Link href={`/studentlivet/${selectedEntry?.location}/skolor/${selectedEntry?.slug.current}`}  >View entry</Link> */}
      </a>)}

    
    <div style={{ marginBottom: '20px', marginTop: '36px', borderTop: '1px solid #e1e1e1', borderRadius: '8px' }}>
      <label htmlFor="name" style={{ fontSize: '16px', marginBottom: '5px' }}><b>Namn:<span style={{ color: 'var(--primarycolor)', position: 'relative', top: '-2px' }}>*</span></b></label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value, 'text')}
        placeholder="Namn"
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%',          
          backgroundColor: '#e2e2e2' /*#d6d6d6 */,color: '#999', }} disabled  
      />
    </div>

    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="Underrubrik" style={{ fontSize: '16px', marginBottom: '5px' }}><b>Underrubrik:</b></label>
      <input
        type="text"
        value={formData.subname}
        onChange={(e) => handleInputChange('subname', e.target.value, 'text')}
        placeholder="Underrubrik"
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />
    </div>

    {/* old location //#d6d6d6
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="location" style={{ fontSize: '16px', marginBottom: '5px' }}><b>Stad:<span style={{ color: 'var(--primarycolor)', position: 'relative', top: '-2px' }}>*</span></b></label>
      <input
        type="text"
        value={selectedEntry?.location || ''}
        //onChange={(e) => handleInputChange('location', e.target.value, 'text')}
        placeholder="Stad"
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%',  backgroundColor: '#e2e2e2' ,color: '#999',   }}
        disabled  
      />
    </div>
    */}

    <div style={{ marginBottom: '20px' }}>
    <label htmlFor="location" style={{ fontSize: '16px', marginBottom: '5px' }}><b>Stad:<span style={{ color: 'var(--primarycolor)', position: 'relative', top: '-2px' }}>*</span></b></label>
    <Select
        value={formData.location ? { label: formData.location.name, value: formData.location._id } : null}
        onChange={(selectedOption) => handleLocationChange(selectedOption)} //TODO, kan fortfarande inte välja eller uppdatera stad. 
        options={slcity.map(city => ({ label: city.name, value: city._id }))}
        placeholder="Välj stad"
        styles={{
          ...customStyles, // Spread the existing customStyles 
          control: (provided) => ({
            ...provided,
            //padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '100%',
            backgroundColor: '#e2e2e2',
            color: '#999',
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#999',
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#999',
          })
        }}
        isDisabled={true}

    />
</div>


{/*
    {(selectedEntry._type === "slkarhus" || selectedEntry._type === "slkarhusfromusers") && (
    <div style={{ marginBottom: '30px' }}>
    <label htmlFor="issektion" style={{ fontSize: '16px', marginBottom: '5px' }}><b>Verksamhet:<span style={{ color: 'var(--primarycolor)', position: 'relative', top: '-2px' }}>*</span></b></label>
    <input
      type="text"
      value={selectedEntry?.issektion ? "Sektion" : "Kårhus"}
      //onChange={(e) => handleInputChange('location', e.target.value, 'text')}
      placeholder="issektion"
      style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%',  backgroundColor: '#e2e2e2' ,color: '#999',   }} //#d6d6d6 
      disabled  
    />
  </div>)}
  */}


   

    {/* TODO, belong to finns ej längre
    
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="belongsto" style={{ fontSize: '16px', marginBottom: '5px' }}>belongsto:</label>
      <input
        type="text"
        value={selectedEntry?.belongsto || ''}
        //onChange={(e) => handleInputChange('location', e.target.value, 'text')}
        placeholder="belongsto"
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%',  backgroundColor: '#e2e2e2' ,color: '#999',   }} //#d6d6d6 
        disabled  
      />
    </div>*/}

    
{/* Use Facebook Profile Picture Switch */}

<div style={{ margin: `0px -${sidePadding}`, padding: `10px ${sidePadding}`, borderRadius: "4px", border: '1px solid gray',}}> 

<p style={{fontSize: "18px", marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}><b>Välj Profilbild</b> <span style={{fontSize: "12px", wordBreak: 'break-all' }} >(1:1 bildförhållande)</span></p>

    <div style={{ marginBottom: '20px' }}>
    <label htmlFor="name" style={{ fontSize: '16px', marginBottom: '5px' }}><b>Använd facebook profilbild?</b></label>

    <label style={{ fontSize: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{fontSize: screenWidth < 500 && "12px" }}>Använd din Facebook profilbild som profilbild? </span>

        <Switch
          onChange={(checked) => handleInputChange('usefacebookprofilepicture', checked, 'boolean')}
          checked={formData.usefacebookprofilepicture || false}
          style={{ marginRight: '10px' }}
          onColor={primaryColorSwitch}
          offColor={secondaryColorSwitch}
          //onHandleColor="#2693e6"
          //offHandleColor="#444"
          //handleDiameter={30}
          //uncheckedIcon={false}
          //checkedIcon={false}
          //boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          //activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          //height={20}
          //width={48}


          //checkedChildren="Fall" //{<Starsvg/>} 
          //unCheckedChildren="All"
          //className='switch-style'
        />
      </label>
    </div>



    {formData.usefacebookprofilepicture &&
    <div style={{backgroundColor: "var(--secondarycolor)", padding: "10px", marginBottom: "16px", wordBreak: 'break-all'}}>
    <p style={{fontSize:"12px", color: 'white'}}><b style={{ color: "var(--primarycolor)"}}>OBS:</b> Denna funktion fungerar endast för:</p>
<ul style={{margin: "0px", paddingLeft: "20px", fontSize:"11px",  color: 'white', wordBreak: 'break-all'}}>
    <li>Sidor och INTE privata konton</li>
    <li>Sidorna måste ha länkar likt <a className="text-link-style" href="https://www.facebook.com/studentshoppen" target="_blank" rel="noopener noreferrer">https://www.facebook.com/studentshoppen</a> och inte länkar likt <a href="https://www.facebook.com/profile.php?id=10006487" className="text-link-style" target="_blank" rel="noopener noreferrer">https://www.facebook.com/profile.php?id=10006487</a></li>
</ul>
</div>}



{!formData.usefacebookprofilepicture ? (
  <>


<div style={{backgroundColor: "var(--secondarycolor)", padding: "10px", marginBottom: "16px"}}>
    <p style={{fontSize:"12px", color: 'white'}}>Välj bild genom att kopiera in bildlänk eller genom att ladda upp bild.</p>
</div>

    <div style={{ marginBottom: '20px' }}>
    <label htmlFor="profileimagelink" style={{ fontSize: '16px', marginBottom: '5px' }}><b>Bildlänk:</b></label>
    <input
      type="text"
      value={formData.profileimagelink}
      onChange={(e) => handleInputChange('profileimagelink', e.target.value, 'text')}
      placeholder="Bildlänk"
      style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
    />

  </div>
<p style={{marginTop:"-9px", fontSize: "11px", marginBottom: "10px",  display: 'flex', flexDirection: 'column', alignItems: 'center',}}> eller</p>

  <div style={{ marginBottom: '20px',  display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
    {/*<label htmlFor="name" style={{ fontSize: '16px', marginBottom: '5px' }}>Logo:</label> */}
    {/* {!showEditPopup && } */}
    <button onClick={() => {setUploadImageWhere("logo");setShowEditPopup(true);setUploadAspectRatio(1)}} style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: 'var(--primarycolor)', color: 'white', border: 'none', cursor: 'pointer' }}>Ladda upp bild</button>
  </div>


  <label htmlFor="facebookprofilelink" style={{ display: 'block', fontSize: '16px', marginBottom: '5px' }}>
      <b>Profilbild:</b>
    </label>
    


    <div style={{textAlign: 'center'}}>
    
    {formData.profileimagelink ? (
      <div style={{textAlign: 'center'}}>
    <img
      style={{ border: '1px solid #ccc' }}
          src={formData.profileimagelink}            
          width={imageSizeWidth} // Adjust image width based on screen width
          height={imageSizeWidth} // Adjust image height based on screen width
          className="product-image"
          alt="Product front image"
          
        />
        </div>
    ):(
      logoimageFile ? (

        <img style={{ border: '1px solid #ccc' }} src={URL.createObjectURL(logoimageFile)} className="product-image" width={imageSizeWidth} height={imageSizeWidth} alt="Product front image" />
      
      ) : selectedEntry.logo && selectedEntry.logo[0] ? (
        <img 
        style={{ border: '1px solid #ccc' }}
          src={urlForSL(selectedEntry.logo[0]).url()}            
          width={imageSizeWidth} // Adjust image width based on screen width
          height={imageSizeWidth} // Adjust image height based on screen width
          className="product-image"
          alt="Product front image"
          
        />

        
      ) : (
        <img
        style={{ border: '1px solid #ccc' }}
          src="/assets/noimageavailable.jpg"
          className="product-image" width={imageSizeWidth} height={imageSizeWidth} alt="Product front image"
        />
      )

      )
    }
</div>

    </>
):( // facebookprofilelink
  <div style={{ marginBottom: '20px' }}>
  <label htmlFor="facebookprofilelink" style={{ fontSize: '16px', marginBottom: '5px' }}><b>Facebook profil länk:</b></label>
  <input 
    type="text"
    value={formData.facebookprofilelink}
    onChange={(e) => {
      handleInputChange('facebookprofilelink', e.target.value, 'text');
      //handleFBPreview(formData.facebookprofilelink, contactInfo);
    }}    
    placeholder="Länk till Facebooksida"
    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '78%' }}
  />
<button onClick={() => handleFBPreview(formData.facebookprofilelink, contactInfo)}  style={{ marginLeft: "2%", width: "20%", padding: screenWidth <600 ? '10px 1px' : '10px 12px', borderRadius: '4px', border: '1px solid #ccc', overflow: 'hidden', color: "white", fontSize: screenWidth <600 && "10px",  backgroundColor: !fbprofilePicture ? "green" :'#009e00', cursor: 'pointer' }}>{!fbprofilePicture ? "Preview" : "Update" }</button>

{fbprofilePicture && formData.facebookprofilelink ==="" && (
      <div style={{backgroundColor: "var(--secondarycolor)", padding: "6px", marginTop: "16px"}}>
    <p style={{fontSize:"11px", color: 'white'}}><b style={{ color: "var(--primarycolor)"}}>OBS:</b> Nuvarande bild genereras från ÖVERSTA Facebook profilen under relevanta länkar.</p>
    </div>
    )}

{errorFetchingfbprofilePicture && (
  <p style={{color: "red"}}>Error fetching profile picture, enter another url</p>
)}
{fbprofilePicture ? (
  <div style={{marginTop: "24px"}} >
    <label htmlFor="facebookprofilelink" style={{ display: 'block', fontSize: '16px', marginBottom: '5px' }}>
      <b>Profilbild:</b>
    </label>
    <div style={{textAlign: 'center'}}>
    <img
      style={{ border: '1px solid #ccc' }}
      src={fbprofilePicture && !errorFetchingfbprofilePicture ? fbprofilePicture : "/assets/noimageavailable.jpg"}
      className="product-image"
      width={imageSizeWidth}
      height={imageSizeWidth}
      alt="Profile Picture"
    />
    </div>
  </div>
):
(<div style={{marginTop: "24px"}}>
  <label htmlFor="facebookprofilelink" style={{ display: 'block', fontSize: '16px', marginBottom: '5px' }}>
      <b>Profilbild:</b>
    </label>
    <div style={{textAlign: 'center'}}>
  <img
  style={{ border: '1px solid #ccc' }}
    src="/assets/noimageavailable.jpg"
    className="product-image" width={imageSizeWidth} height={imageSizeWidth} alt="Product front image"
  />
  </div>
  </div>
)}

</div>

// ? selectedEntry.facebookprofilelink : selectedEntry.usefacebookprofilepicture && selectedEntry?.contactinfo?.filter(contact => contact.service === 'Facebook').slice(0, 1)?.link  


)}

</div>


{/*Coverimage*/}




<div style={{ margin: `20px -${sidePadding}`, padding: `10px ${sidePadding}`,  borderRadius: "4px", border: '1px solid gray',

}}>  

<p style={{fontSize: "18px", marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',   }}><b>Välj omslagsbild</b> <span style={{fontSize: "12px", wordBreak: 'break-all' }} >(2.18:1 bildförhållande)</span></p>





<div style={{ marginBottom: '20px' }}>
    <label htmlFor="profileimagelink" style={{ fontSize: '16px', marginBottom: '5px' }}><b>Bildlänk:</b></label>
    <input
      type="text"
      //value={formData.profileimagelink} //TODO omslagsbildlänk
      //onChange={(e) => handleInputChange('profileimagelink', e.target.value, 'text')}
      placeholder="Bildlänk"
      style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
    />

  </div>
<p style={{marginTop:"-9px", fontSize: "11px", marginBottom: "10px",  display: 'flex', flexDirection: 'column', alignItems: 'center',}}> eller</p>

  <div style={{ marginBottom: '20px',  display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

      {/* {!showEditPopup && } */}
 
    {/*<label htmlFor="name" style={{ fontSize: '16px', marginBottom: '5px' }}>Logo:</label> */}
    {/* {!showEditPopup && } */}
          <button onClick={() => {setUploadImageWhere("cover");setShowEditPopup(true);setUploadAspectRatio(2.18);}} style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: 'var(--secondarycolor)', color: 'white', border: 'none', cursor: 'pointer' }}>Ladda upp bild</button>

</div>
          <label htmlFor="facebookprofilelink" style={{ display: 'block', fontSize: '16px', marginBottom: '8px' }}>
      <b>Omslagsbild:</b>
    </label>

    <div style={{ marginBottom: '20px',  display: 'flex', flexDirection: 'column', alignItems: 'center', }}> 
      {coverimageFile ? (
        <img       style={{ border: '1px solid #ccc' }}
        src={URL.createObjectURL(coverimageFile)} className="product-image" width={imageSizeWidth} height={imageSizeHeigth} alt="Product front image" />
      ) : selectedEntry.coverimage && selectedEntry.coverimage[0] ? (
        <img       
          style={{ border: '1px solid #ccc' }}
          src={urlForSL(selectedEntry.coverimage[0]).url()}            
          width={imageSizeWidth} // Adjust image width based on screen width
          height={imageSizeHeigth} // Adjust image height based on screen width ASPECT RATIO: 2.18 (aspect ratio caluclation W/H = aspect)
          className="product-image"
          alt="Product front image"
          
        />
      ) : (
        <img
          style={{ border: '1px solid #ccc' }}
          src="/assets/noimageavailable.jpg"
          className="product-image" width={imageSizeWidth} height={imageSizeHeigth} alt="Product front image"
        />
      )}
    </div>
    </div>


    {/*CONTACTINFO*/}

    <div style={{ position: 'relative', padding: '10px 0px', borderRadius: '4px', border: '1px solid gray', margin: `20px -${sidePadding}`, padding: `0px ${sidePadding}`, marginBottom: '30px', paddingBottom: '30px' }}>
      <p style={{ fontSize: '18px', margin: '15px 0px', display: 'flex' }}><b>Relevanta Länkar</b></p>
      <div style={{ borderBottom: '1px solid gray', paddingTop: '1px' }} />
      {contactInfo.map((contact, index) => (
        <div key={index} style={{ borderBottom: '1px solid gray', padding: '10px 0px' }}>
          <div style={{ marginBottom: '6px', margin: '0px 4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: '0 0 70px' }}>
                <label style={{ fontSize: '10px', marginBottom: '5px', display: 'block' }}>Typ:</label>
                <select
                  value={contact.service}
                  onChange={(e) => handleContactInputChange(index, 'service', e.target.value)}
                  style={{ padding: '0px 0px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', height: '38px' }}
                >
                  <option value="" disabled hidden>Välj</option>
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.title}</option>
                  ))}
                </select>
              </div>

              {contact.service === 'Adress' ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label htmlFor={`address${index}`} style={{ fontSize: '10px', marginBottom: '5px' }}>Address:</label>
                  <input
                    type="text"
                    value={contact.adressrad}
                    onChange={(e) => handleContactInputChange(index, 'adressrad', e.target.value)}
                    placeholder="Adress"
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', marginBottom: '10px' }}
                  />
                  <label htmlFor={`city${index}`} style={{ fontSize: '10px', marginBottom: '5px' }}>Stad:</label>
                  <input
                    type="text"
                    value={contact.ortrad}
                    onChange={(e) => handleContactInputChange(index, 'ortrad', e.target.value)}
                    placeholder="Ort & Postnummer"
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                  />
                </div>
              ) : (
                <div style={{ flex: 1 }}>
                  <label htmlFor={`link${index}`} style={{ fontSize: '10px', marginBottom: '5px', display: 'block' }}>
                    {getServiceDescription(contact.service)}:
                  </label>
                  <input
                    type="text"
                    value={contact.link}
                    onChange={(e) => handleContactInputChange(index, 'link', e.target.value)}
                    placeholder="Länk"
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                  />
                </div>
              )}

              <button className="remove-item" onClick={() => handleDeleteContact(index)} style={{ marginLeft: '10px', marginTop: '26px' }}>
                <TiDeleteOutline />
              </button>
            </div>
          </div>
        </div>
      ))}
      <Fab onClick={handleAddContact} style={{ position: 'absolute', bottom: '-22px', right: '15px', width: '40px', height: '40px', backgroundColor: 'var(--secondarycolor)' }}>
        <PlusIcon style={{ display: 'inline-block', width: '90%', height: '90%', color: 'white' }} />
      </Fab>
    </div>


    <div style={{ position: 'relative', padding: '10px 0px', borderRadius: '4px', border: '1px solid gray', margin: `20px -${sidePadding}`, padding: `0px ${sidePadding}`, marginBottom: '30px', paddingBottom: '30px' }}>
      <p style={{ fontSize: '18px', margin: '15px 0px', display: 'flex' }}><b>Inbäddad karta</b></p>
      <div style={{backgroundColor: "var(--secondarycolor)", padding: "10px", marginBottom: "16px"}}>
    <p style={{fontSize:"12px", color: 'white'}}>Inne i Google Maps, klicka på &quot;Dela&quot; -&gt; &quot;Bädda in en karta&quot; -&gt; &quot;Kopiera HTML&quot;.
      Klistra sedan in länken nedan
    </p>
    <img
      style={{ border: '1px solid #ccc', width: "100%" }}
          src={"/assets/images/kartaexempel.jpg"}            
          className="product-image"
          alt="Product front image"
          
        />
</div>


<div style={{ marginBottom: '10px' }}>
      <label htmlFor="mapsurl" style={{ fontSize: '16px', marginBottom: '5px' }}><b>Kartlänk:</b></label>
      
      <input
        type="text"
        value={formData.mapsurl}
        onChange={(e) => handleInputChange('mapsurl', e.target.value, 'text')}
        placeholder='Google Maps "Kopiera HTML" länk'
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />
          {mapError && formData.mapsurl && formData.mapsurl !=="" && (
            <p style={{color: "red"}}>Error fetching map, enter another map url</p>
          )}
    </div>


<label htmlFor="mapsurl" style={{ fontSize: '16px', marginBottom: '5px', marginTop: '5px' }}><b>Karta:</b></label>

{mapUrl ? 
    <div style={{ border: '2px solid var(--secondarycolor)', borderRadius: '8px', overflow: 'hidden' }}>
      <iframe
        src={mapUrl}
        width="100%"
        height="200"
        style={{ border: 'none' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>


    </div>
    :     
    <div style={{ border: '2px solid var(--secondarycolor)', borderRadius: '8px', overflow: 'hidden', height: "100px",
       display: 'flex', alignItems: 'center', justifyContent: 'center'
     }}>
      <p>Ingen karta hittades</p>
    </div> 
}


{/* 
<button onClick={() => extractGoogleMapsURL(formData.mapsurl)}  style={{ marginLeft: "2%", width: "20%", padding: '10px 12px', borderRadius: '4px', border: '1px solid #ccc', color: "white", backgroundColor: !fbprofilePicture ? "green" :'#009e00', cursor: 'pointer' }}>{!fbprofilePicture ? "Preview" : "Uppdatera" }</button>
*/}




{/* todo: generera karta */}


</div>

    {/* <div style={{marginTop: "-10px"}}><span style={{ fontWeight: "bold" }}>Om:</span> {elements} </div>
*/}

    <p style={{ fontSize: '18px', margin: '15px 0px', display: 'flex' }}><b>Beskrivning</b></p>
    
      {/*<h3>{selectedEntry._id}</h3>*/}
        <RichTextEditor
          ref={richTextEditorRef}
          key={selectedEntry._id} // Add this line
          initialContent={selectedEntry.description}
          onSave={handleSave}
          selectedentryid={selectedEntry._id}
          setFormChangedTextEditor={setFormChangedTextEditor}
        />
      

    {/* Add other fields based on your schema */}
    {/* INSERT INFO HERE */}
    <button className='purchasebuttons'style={{ backgroundColor: formChanged || formChangedTextEditor ? 'green' : 'var(--primarycolor)', border: formChanged && "1px green solid",  color: 'white' }}  onClick={handleSave}>{formSubmitted === "Skickar" ? "Sparar...": "Spara ändringar"}</button>

{/* IMAGE UPLOAD */}
{showEditPopup && (
        <ImageEditPopup 
          isOpen={showEditPopup}
          onClose={handleCloseEditPopup} 
          onSave={(editedImage, savelocation) => handleSaveEditedImage(editedImage, savelocation)} 
          saveimagelocation={uploadImageWhere}
          uploadAspectRatio={uploadAspectRatio}
        />
      )}

  </div>
)}
</div>

{isLoading && (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
)}


    </div>

      {/* Other components or content */}
    </div>
  );
};

export default Adminsida;


   {/* <Select
      value={{ label: contact.service, value: contact.service }} // Set initial value based on contact.service
      onChange={(selectedOption) => handleContactInputChange(index, 'service', selectedOption)}
      options={serviceOptions.map(option => ({ value: option.value, label: option.title }))}
      isSearchable={false}
      styles={{
        container: (provided) => ({
          ...provided,
          width: '130px', // Set your desired width
        }),
        ...customStyles // Merge custom styles if needed
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 10,
        colors: {
          ...theme.colors,
          primary25: 'var(--primarycolor)',
          primary: 'var(--secondarycolor)',
        },
      })}
    />*/}

    {/*<Editor
  editorState={editorState}
  onEditorStateChange={setEditorState}
  toolbar={{
    options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
  }}
/>*/}

      {/*           <button type="button" className='purchasebuttons' style={{    /*float: 'right', backgroundColor: "var(--primarycolorshade)", color: "white",  border: "1px solid var(--primarycolorshade)"   }} >{t("product.buttonVarianter")}</button>
        </Link> </>) :
        /*(<button type="button" className='purchasebuttons' style={{ float: 'right', backgroundColor: 'var(--primarycolor)', color: "white"  }} onClick={handleBuyNow}>Köp nu</button>) 
        (<button type="button" className='purchasebuttons' style={{  /* float: 'right', ----- backgroundColor: 'var(--primarycolor)', color: "white"  }} onClick={handleAdd}>{t("product.buttonLägg till")}</button>)
 */}