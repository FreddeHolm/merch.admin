import React, { useEffect, useState } from 'react';
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

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

let Editor;
if (typeof window !== 'undefined') {
  Editor = require('react-draft-wysiwyg').Editor;
  require('react-draft-wysiwyg/dist/react-draft-wysiwyg.css');
}


const serviceOptions = [
  { title: 'Telefon', value: 'Telefon' },
  { title: 'Mail', value: 'Mail' },
  { title: 'Adress', value: 'Adress' },
  { title: 'Hemsida', value: 'Hemsida' },
  { title: 'Twitter/X', value: 'Twitter' },
  { title: 'Instagram', value: 'Instagram' },
  { title: 'YouTube', value: 'Youtube' },
  { title: 'Facebook', value: 'Facebook' },
  { title: 'Linkedin', value: 'Linkedin' },
  { title: 'TikTok', value: 'TikTok' },
  { title: 'Other', value: 'Other' },
];

const Adminsida = ({ slforening, sluniversities, slkarhus, slovve, slforeningfromusers, slcity }) => {
  const { currentUser, logout } = useAuth();
  //const [filteredEntries, setFilteredEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchText, setSearchText] = useState(''); // Add search text state
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

  const [initialFormData, setInitialFormData] = useState({});
  const [initialcontactInfo, setInitialcontactInfo] = useState({});

  const [currentSelectedCitySlug, setCurrentSelectedCitySlug] = useState();


  const [fbprofilePicture, setFbprofilePicture] = useState('');
  const [errorFetchingfbprofilePicture, setErrorFetchingfbprofilePicture] = useState(false);

  const [contactInfo, setContactInfo] = useState([
    // Initialize with empty contact information
    { service: '', link: '', customLinkName: '', adressrad: '', ortrad: '' },
  ]);

  const convertToHTML = (contentState) => {
    const rawContentState = convertToRaw(contentState);
    return draftToHtml(rawContentState);
  };

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const handleEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  const saveDescription = () => {
    const content = convertToHTML(editorState.getCurrentContent());
    // Send the content to your backend for storage
  };



  
  const handleContactInputChange = (index, field, selectedOption) => {
    setContactInfo((prevInfo) => {
      const updatedContactInfo = [...prevInfo];
      // Access the correct contact object using the index
      const contactToUpdate = updatedContactInfo[index];
      // Update the specific field of the contact object
      contactToUpdate[field] = selectedOption.value; // Extract value from the selected option object
      return updatedContactInfo;
    });
    
  };

  const populateContactInfo = () => {
    if (selectedEntry) {
      const entryContactInfo = selectedEntry.contactinfo || [];
      // Clone the existing contact info
      const updatedContactInfo = [...contactInfo];
      // Clear existing contact info
      updatedContactInfo.splice(0, updatedContactInfo.length);
      // Add each contact info entry from selectedEntry
      entryContactInfo.forEach(contact => {
        updatedContactInfo.push({ ...contact });
      });
      // Update the contactInfo state
      setContactInfo(updatedContactInfo);
      setInitialcontactInfo(updatedContactInfo);
      console.log("updatedContactInfo" + updatedContactInfo);
      updatedContactInfo.forEach((contact, index) => {
        console.log(`Contact ${index + 1}:`, contact);
      });
    }
  };


  const populateDescriptionText = () => {
    if (selectedEntry) {

      setDescriptionText(selectedEntry.description);

    }
  };
  
  useEffect(() => {
    const isFormChanged = JSON.stringify(contactInfo) !== JSON.stringify(initialcontactInfo);
    console.log("JSON.stringify(contactInfo)" + JSON.stringify(contactInfo));
    console.log(" JSON.stringify(initialcontactInfo)" +  JSON.stringify(initialcontactInfo));

    setFormChanged(isFormChanged);
  }, [contactInfo, initialcontactInfo]);

  const handleDeleteContact = (index) => {
    setContactInfo((prevInfo) => {
      const updatedContactInfo = [...prevInfo];
      // Remove the contact info entry at the specified index
      updatedContactInfo.splice(index, 1);
      return updatedContactInfo;
    });
  };
  
  const handleAddContact = () => {
    setContactInfo((prevInfo) => [...prevInfo, { _key: generateKey("ContactInfo"), service: '', link: '', customLinkName: '', adressrad: '', ortrad: '' }]);
  };




  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
  };

  const handleSaveEditedImage = (editedImage, wheretosave) => {
    console.log("wheretosave" + wheretosave);
    if (wheretosave === "logo"){
      setLogoimageFile(editedImage);
      console.log("save in logo");
    } 
    if (wheretosave === "cover"){
      setCoverimageFile(editedImage);
      console.log("save in cover");
    }
    setFormChanged(true);
};


  
  // If the user is not logged in, show the Login component
  if (!currentUser) {
    return <Login />;
  }

  const handleLogout = async () => {
    try {
      // Call your logout function from the AuthContext
      await logout();
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };





  /*
  console.log('Loged in user:', `${currentUser.email}`);
    const filteredslforening = slforening?.filter(entry => entry.contentmanager && entry.contentmanager.includes(currentUser.email));
    const filteredsluniversities = sluniversities?.filter(entry => entry.contentmanager && entry.contentmanager.includes(currentUser.email));
    const filteredslkarhus = slkarhus?.filter(entry => entry.contentmanager && entry.contentmanager.includes(currentUser.email));
    const filteredslovve = slovve?.filter(entry => entry.contentmanager && entry.contentmanager.includes(currentUser.email));
*/
    const allFilteredEntries = sluniversities 
    .concat(slkarhus)
    .concat(slforening)
    .concat(slforeningfromusers)
    .concat(slovve)
    .filter(entry => entry.contentmanager && entry.contentmanager.includes(currentUser.email));

    //console.log(allFilteredEntries);

      // Initialize the visibility state based on unique categories
  /* useEffect(() => {
    const uniqueCategories = [...new Set(allFilteredEntries.map(entry => typeMappings[entry._type]))];
    const initialVisibility = uniqueCategories.reduce((acc, category) => {
      acc[category] = true; // Set all categories to initially visible
      return acc;
    }, {});
    setCategoryVisibility(initialVisibility);
  }, [allFilteredEntries]); */

    const handleClick = (entry) => {
      // Set the selected entry when clicked
      setSelectedEntry(entry);
    };


    const handleSearchInputChange = (e) => {
      setSearchText(e.target.value);
    };

    const isNewSection = (currentIndex) => {
      if (currentIndex === 0) return true; // Always start with a new section for the first entry
    
      const currentEntryType = allFilteredEntries[currentIndex]._type;
      const previousEntryType = allFilteredEntries[currentIndex - 1]._type;
    
      // Remove 'fromusers' suffix for comparison
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
      slkarhus: 'Kårhus',
      sluniversities: 'Universitet',
      slforening: 'Förening',

      slovvefromusers: 'Overall',
      slkarhusfromusers: 'Kårhus',
      sluniversitiesfromusers: 'Universitet',
      slforeningfromusers: 'Förening'
    };
    const linkMappings = {
      slovve: 'ovvar',
      slkarhus: selectedEntry?.issektion ? 'sektioner' : 'karer',
      sluniversities: 'skolor',
      slforening: 'foreningar',

      slovvefromusers: 'ovvar',
      slkarhusfromusers: selectedEntry?.issektion ? 'sektioner' : 'karer',
      sluniversitiesfromusers: 'skolor',
      slforeningfromusers: 'foreningar'
    };



    useEffect(() => {
      // Check if formData has changed from its initial state
      const isFormChanged = Object.keys(formData).some(key => formData[key] !== initialFormData[key]);
      setFormChanged(isFormChanged);
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
          contactinfo: selectedEntry.contactinfo || []
          // Add other fields based on your schema
        };
    
        setFormData(formDataValues);
        setInitialFormData(formDataValues);

      }
    };
    
    useEffect(() => {
      populateFormData();
      populateContactInfo(); 
      populateDescriptionText();
      setLogoimageFile(null);
      setCoverimageFile(null);
      

      setCurrentSelectedCitySlug(slcity.find(city => 
        city.name.toLowerCase() === (selectedEntry?.ovvecity ? selectedEntry?.ovvecity.toLowerCase() : selectedEntry?.location?.toLowerCase())
      )?.slug.current);

      setFbprofilePicture("");
      setErrorFetchingfbprofilePicture(false);

 

    }, [selectedEntry]);

    const handleInputChange = (field, value, type, index) => {
      setFormData((prevData) => {
        if (type === 'boolean') {
          return {
            ...prevData,
            [field]: value, // Update boolean value directly
          };
        } else if (type === 'text') {
          if (field.startsWith('contactinfo')) {
            const updatedContactInfo = [...prevData.contactinfo];
            updatedContactInfo[index][field.split('.')[1]] = value;
            return {
              ...prevData,
              contactinfo: updatedContactInfo,
            };
          } else {
            return {
              ...prevData,
              [field]: typeof value === 'boolean' ? value : value.trim(),
            };
          }
        }
      });
    };

    const generateKey = (value) => value+Date.now()+Math.random().toString(36).substring(2, 15);


    const handleSave = async () => {
      setFormSubmitted("Skickar");
      try {
        // Filter out contact info entries with the placeholder service value
        const filteredContactInfo = contactInfo.filter(contact => contact.service !== '');
        
        // Check the entry type and update the corresponding sanity document
        const patch = studentlivetclient.patch(selectedEntry._id);
    
        // Update fields using set method
        patch.set(formData);
        patch.set({ contactinfo: filteredContactInfo }); // Use filtered contact info


        const contentState = editorState.getCurrentContent();
        const htmlContent = convertToHTML(contentState);
        //patch.set({ description: htmlContent}); 
    
        // Check if an image file is present
        if (logoimageFile) {
          // Upload the image to Sanity
          const imageAsset = await studentlivetclient.assets.upload('image', logoimageFile);
    
          // Check if the logo field exists, and set it accordingly
          if (selectedEntry && selectedEntry.logo && selectedEntry?.logo[0]) {
            // If the logo field exists, update the existing asset references
            patch.set({ logo: [{  _key: generateKey("logo"), _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } }] });
          } else {
            // If the logo field does not exist, create it
            patch.set({ logo: [{  _key: generateKey("logo"), _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } }] });
          }
        }

        if (coverimageFile) {
          // Upload the image to Sanity
          const imageAsset = await studentlivetclient.assets.upload('image', coverimageFile);
    
          // Check if the logo field exists, and set it accordingly
          if (selectedEntry && selectedEntry.logo && selectedEntry?.logo[0]) {
            // If the logo field exists, update the existing asset references
            patch.set({ coverimage: [{  _key: generateKey("logo"), _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } }] });
          } else {
            // If the logo field does not exist, create it
            patch.set({ coverimage: [{  _key: generateKey("logo"), _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } }] });
          }
        }
    
        // Commit the changes
        await patch.commit();
    
        // Update the local state with the form data
       /* setSelectedEntry((prevSelectedEntry) => ({
          ...prevSelectedEntry,
          ...formData,
        }));
        */
    
        // Optionally, you can update the local state or perform additional actions after saving
        // For example, you might clear the form data or display a success message
    
        // Clear the form data and image file state
        setFormData({});
        //setImageFile(null);
        setTimeout(() => {window.location.reload();}, 3000);
      } catch (error) {
        console.error('Error updating entry:', error.message);
        // Handle error, show error message, etc.
      }
    };






    // Generate profileimage from fb

    const extractUserIdFromLink = (facebookProfileLink) => {
      const matches = facebookProfileLink.match(/(?:https:\/\/www\.facebook\.com\/)?(?:\/)?([^\/\?]+)(?:\/)?/);
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
    
              //console.log("facebookContactInfo", facebookContactInfo);
    
              if (facebookContactInfo.length > 0) {
                const userIdFromContact = extractUserIdFromLink(facebookContactInfo[0].link);
                if (userIdFromContact) {
                  return userIdFromContact;
                }
              }
        }
      
      }
        
        
        else {
          console.error('Invalid Facebook profile link');
          return null;
        }
    };
    
    

  const handleFBPreview = (aaa, bbb) => {
    setFbprofilePicture("");
    setErrorFetchingfbprofilePicture(false);
      const userId = extractUserId(aaa ? aaa : bbb?.filter(contact => contact.service === 'Facebook').slice(0, 1)?.link );
    
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
        .then(url => setFbprofilePicture(url))
        .catch(error => {
          console.error(error);
          setErrorFetchingfbprofilePicture(true);
        });
      }
    };


  // If the user is logged in, render the content with a logout button
  return (
    <div style={{ margin: " 0px 5px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Welcome to the Admin Panel</h1>
        <button
          onClick={handleLogout}
          style={{
            width: '100px',
            padding: '0.5rem',
            fontSize: '1rem',
            backgroundColor: ' var(--primarycolor)',
            color: 'white',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            border: "1px solid var(--primarycolor)"
          }}
        > Sign out </button>
      </div>
      <p>You are logged in as: {currentUser.email}</p>




      <div style={{ display: 'flex', margin: " 0px 5px", marginTop: "15px", width: "100%" }}>
   <div className='admincolumn1' style={{ flex: 1, borderRight: "1px #D9DDDC solid", 

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

<div className="searchBox3" style={{ textAlign: "center" }}>
    <h2 style={{color: "var(--primarycolor)", paddingTop: "2px"}}>Dina Sidor</h2>
  </div>

  {allFilteredEntries.map((entry, index) => (
  <React.Fragment key={entry.id}>
    {isNewSection(index) && (
      <div
        onClick={() => handleCategoryToggle(typeMappings[entry._type])}
        style={{
          cursor: "pointer",
          borderBottom: "1px #D9DDDC solid",
          paddingTop: '2px',
          marginTop:"10px",
          paddingBottom: '5px',
          fontWeight: 'bold',
          backgroundColor: !categoryVisibility[typeMappings[entry._type]] ? "var(--primarycolor)" : "#fcd22c", 
        }}
      >
        {typeMappings[entry._type]}
        {!categoryVisibility[typeMappings[entry._type]] ? " -" : " +"}
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
        <h2  className='admintexth2'  >{entry.name}</h2>
        <p>{entry.location} </p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>{typeMappings[entry._type]}</p>
          {entry._type.includes('fromusers') && (
            <span style={{ marginLeft: '5px', color: 'blue' }}> - Users</span>
          )}
        </div>
      </div>
    )}
  </React.Fragment>
))}
</div>






{/* RIGHT SIDE*/}
<div style={{ maxWidth: '500px' }}>
{selectedEntry && (
  <div style={{ flex: 1, marginLeft: '20px', padding: '20px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
    <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>{selectedEntry.name} {selectedEntry._type}</h2>
    <p>{selectedEntry?.slug?.current}</p>

    { linkMappings[selectedEntry._type] === "ovvar" ?
    (selectedEntry.ovvecity && <a className="text-link-style" style={{float: "Right", marginTop: "-20px"}} 
    href={`/studentlivet/${currentSelectedCitySlug}/${linkMappings[selectedEntry._type]}`}
    target="_blank" 
    rel="noopener noreferrer">View entry
     {/*<Link href={`/studentlivet/${selectedEntry?.location}/skolor/${selectedEntry?.slug.current}`}  >View entry</Link> */}
     </a>)


    :
    (selectedEntry.location && selectedEntry.slug.current && <a className="text-link-style" style={{float: "Right", marginTop: "-20px"}} 
     href={`/studentlivet/${currentSelectedCitySlug}/${linkMappings[selectedEntry._type]}/${selectedEntry.slug.current}`}
     target="_blank"
     rel="noopener noreferrer">View entry
      {/*<Link href={`/studentlivet/${selectedEntry?.location}/skolor/${selectedEntry?.slug.current}`}  >View entry</Link> */}
      </a>)}

    
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="name" style={{ fontSize: '16px', marginBottom: '5px' }}>Name:</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value, 'text')}
        placeholder="Name"
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />
    </div>

    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="subname" style={{ fontSize: '16px', marginBottom: '5px' }}>SubName:</label>
      <input
        type="text"
        value={formData.subname}
        onChange={(e) => handleInputChange('subname', e.target.value, 'text')}
        placeholder="SubName"
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />
    </div>

    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="location" style={{ fontSize: '16px', marginBottom: '5px' }}>Location:</label>
      <input
        type="text"
        value={selectedEntry?.location || ''}
        //onChange={(e) => handleInputChange('location', e.target.value, 'text')}
        placeholder="location"
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%',  backgroundColor: '#e2e2e2' /*#d6d6d6 */,color: '#999',   }}
        disabled  
      />
    </div>



    {(selectedEntry._type === "slkarhus" || selectedEntry._type === "slkarhusfromusers") && (
    <div style={{ marginBottom: '20px' }}>
    <label htmlFor="issektion" style={{ fontSize: '16px', marginBottom: '5px' }}>issektion:</label>
    <input
      type="text"
      value={selectedEntry?.issektion ? "Sektion" : "Kårhus"}
      //onChange={(e) => handleInputChange('location', e.target.value, 'text')}
      placeholder="issektion"
      style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%',  backgroundColor: '#e2e2e2' ,color: '#999',   }} //#d6d6d6 
      disabled  
    />
  </div>)}


   

    {/*<div style={{ marginBottom: '20px' }}>
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

    <div style={{ marginBottom: '20px' }}>
    <label htmlFor="name" style={{ fontSize: '16px', marginBottom: '5px' }}>Använd facebook:</label>

    <label style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>
    <span>Use Facebook profile picture as profile pic</span>

        <Switch
          onChange={(checked) => handleInputChange('usefacebookprofilepicture', checked, 'boolean')}
          checked={formData.usefacebookprofilepicture || false}
          style={{ marginRight: '10px' }}
          //checkedChildren="Fall" //{<Starsvg/>} 
          //unCheckedChildren="All"
          //className='switch-style'
        />
      </label>
    </div>








{!formData.usefacebookprofilepicture ? (
  <>
    <div style={{ marginBottom: '20px' }}>
    <label htmlFor="profileimagelink" style={{ fontSize: '16px', marginBottom: '5px' }}>profileimagelink:</label>
    <input
      type="text"
      value={formData.profileimagelink}
      onChange={(e) => handleInputChange('profileimagelink', e.target.value, 'text')}
      placeholder="profileimagelink"
      style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
    />

  </div>


  <div style={{ marginBottom: '20px' }}>
    <label htmlFor="name" style={{ fontSize: '16px', marginBottom: '5px' }}>Logo:</label>
    {/* {!showEditPopup && } */}
    <button onClick={() => {setUploadImageWhere("logo");setShowEditPopup(true);setUploadAspectRatio(1)}} style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: 'var(--primarycolor)', color: 'white', border: 'none', cursor: 'pointer' }}>Upload Image</button>
  </div>

    {formData.profileimagelink ? (
      <img 
          src={formData.profileimagelink}            
          width={250} // Adjust image width based on screen width
          height={250} // Adjust image height based on screen width
          className="product-image"
          alt="Product front image"
          
        />
    ):(
      logoimageFile ? (

        <img src={URL.createObjectURL(logoimageFile)} className="product-image" width={250} height={250} alt="Product front image" />
      
      ) : selectedEntry.logo && selectedEntry.logo[0] ? (
        <img 
          src={urlForSL(selectedEntry.logo[0]).url()}            
          width={250} // Adjust image width based on screen width
          height={250} // Adjust image height based on screen width
          className="product-image"
          alt="Product front image"
          
        />

        
      ) : (
        <img
          src="/assets/noimageavailable.jpg"
          className="product-image" width={250} height={250} alt="Product front image"
        />
      )

      )
    }
    </>
):( // facebookprofilelink
  <div style={{ marginBottom: '20px' }}>
  <label htmlFor="facebookprofilelink" style={{ fontSize: '16px', marginBottom: '5px' }}>facebookprofilelink:</label>
  <input
    type="text"
    value={formData.facebookprofilelink}
    onChange={(e) => {
      handleInputChange('facebookprofilelink', e.target.value, 'text');
      //handleFBPreview(formData.facebookprofilelink, contactInfo);
    }}    
    placeholder="facebookprofilelink"
    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '78%' }}
  />
<button onClick={() => handleFBPreview(formData.facebookprofilelink, contactInfo)}  style={{ marginLeft: "2%", width: "20%", padding: '10px 12px', borderRadius: '4px', border: '1px solid #ccc', color: "white", backgroundColor: !fbprofilePicture ? "green" :'#009e00', cursor: 'pointer' }}>{!fbprofilePicture ? "Preview" : "Uppdatera" }</button>

{!formData.facebookprofilelink && (<p>Bild genereras nu från Facebook profilen under kontaktinfo </p>)}

{errorFetchingfbprofilePicture && (
  <p style={{color: "red"}}>Error fetching profile picturem, enter another url</p>
)}
{fbprofilePicture &&
        <img
          src={fbprofilePicture && !errorFetchingfbprofilePicture ? fbprofilePicture : "/assets/noimageavailable.jpg"}
          className="product-image"
          width={250}
          height={250}
          alt="Profile Picture"
        />
}

</div>

// ? selectedEntry.facebookprofilelink : selectedEntry.usefacebookprofilepicture && selectedEntry?.contactinfo?.filter(contact => contact.service === 'Facebook').slice(0, 1)?.link  


)}




{/*Coverimage*/}

    <div style={{ marginBottom: '20px' }}>
<label htmlFor="name" style={{ fontSize: '16px', marginBottom: '5px' }}>coverimage:</label>

      {/* {!showEditPopup && } */}
      <button onClick={() => {setUploadImageWhere("cover");setShowEditPopup(true);setUploadAspectRatio(2.18);}} style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: 'var(--secondarycolor)', color: 'white', border: 'none', cursor: 'pointer' }}>Upload Image</button>
      
      {coverimageFile ? (
        <img src={URL.createObjectURL(coverimageFile)} className="product-image" width={250} height={115} alt="Product front image" />
      ) : selectedEntry.coverimage && selectedEntry.coverimage[0] ? (
        <img 
          src={urlForSL(selectedEntry.coverimage[0]).url()}            
          width={250} // Adjust image width based on screen width
          height={115} // Adjust image height based on screen width ASPECT RATIO: 2.18 (aspect ratio caluclation W/H = aspect)
          className="product-image"
          alt="Product front image"
          
        />
      ) : (
        <img
          src="/assets/noimageavailable.jpg"
          className="product-image" width={250} height={250} alt="Product front image"
        />
      )}
    </div>

    {/*CONTACTINFO*/}

<div style={{backgroundColor: "darkgray"}}> 
<label htmlFor="name" style={{ fontSize: '16px', marginBottom: '5px' }}>Name:</label>

    {contactInfo.map((contact, index) => (
  <div key={index} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', borderTop:"1px solid gray" }}>
    <label  style={{ fontSize: '16px', marginBottom: '5px' }}>Typ:</label>
    <select
      value={contact.service}
      onChange={(e) => handleContactInputChange(index, 'service', e.target.value)}
      style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100px', marginRight: '10px' }}
    >
      <option value="" disabled hidden>Typ</option>
      {serviceOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>

    {contact.service === 'Adress' ? (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor={`address${index}`} style={{ fontSize: '16px', marginBottom: '5px' }}>Address:</label>
        <input
          type="text"
          value={contact.adressrad}
          onChange={(e) => handleContactInputChange(index, 'adressrad', e.target.value)}
          placeholder="Adressrad"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', marginBottom: '10px' }}
        />
         <label htmlFor={`city${index}`} style={{ fontSize: '16px', marginBottom: '5px' }}>City:</label>
        <input
          type="text"
          value={contact.ortrad}
          onChange={(e) => handleContactInputChange(index, 'ortrad', e.target.value)}
          placeholder="Ort"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
        />
      </div>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor={`link${index}`} style={{ fontSize: '16px', marginBottom: '5px' }}>Link:</label>
        <input
          type="text"
          value={contact.link}
          onChange={(e) => handleContactInputChange(index, 'link', e.target.value)}
          placeholder="Link"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' /*, marginBottom: '10px'*/ }}
        />
        {/*<input
          type="text"
          value={contact.customLinkName}
          onChange={(e) => handleContactInputChange(index, 'customLinkName', e.target.value)}
          placeholder="Custom Link Name"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
        />*/}
      </div>
    )}
    {/* Add other contact fields based on your schema */}
    <button className="remove-item" onClick={() => handleDeleteContact(index)}><TiDeleteOutline /></button>
  </div>
))}
{/* <button onClick={handleAddContact}>Add Contact</button> */}
<Fab  onClick={handleAddContact} style={{width: "40px", height: "40px", backgroundColor: "#942525" }} >
    <PlusIcon style={{
  display: 'inline-block',
  width: '90%',
  height: '90%',
  position: 'absolute',
  left: 'auto',
  top: 'auto',
  marginLeft: 'auto',
  marginTop: 'auto', 
  color: "white"
}}/>
  </Fab>

</div>




<div style={{ marginBottom: '20px' }}>
      <label htmlFor="mapsurl" style={{ fontSize: '16px', marginBottom: '5px' }}>mapsurl:</label>
      <input
        type="text"
        value={formData.mapsurl}
        onChange={(e) => handleInputChange('mapsurl', e.target.value, 'text')}
        placeholder="mapsurl"
        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
      />
    </div>

    {/* <div style={{marginTop: "-10px"}}><span style={{ fontWeight: "bold" }}>Om:</span> {elements} </div>
*/}
    <h1>Edit Content</h1>
      <h3>{selectedEntry._id}</h3>
        <RichTextEditor
          key={selectedEntry._id} // Add this line
          initialContent={selectedEntry.description}
          onSave={handleSave}
          selectedentryid={selectedEntry._id}
        />
      

    {/* Add other fields based on your schema */}
    {/* INSERT INFO HERE */}
    <button className='purchasebuttons'style={{ backgroundColor: formChanged ? 'green' : 'var(--primarycolor)', border: formChanged && "1px green solid",  color: 'white' }}  onClick={handleSave}>{formSubmitted === "Skickar" ? "Sparar...": "Spara ändringar"}</button>

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