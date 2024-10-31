import React, { useState, useEffect, useRef } from 'react';
import { client } from '../lib/client';
import { createclient, urlForCreate } from '../lib/createclient';
import Navbar from '../components/Navbar';
import 'react-datepicker/dist/react-datepicker.css';
import { TiDeleteOutline } from 'react-icons/ti';
import dynamic from 'next/dynamic'; 
import { Widget } from "@uploadcare/react-widget";
import axios from 'axios';
// If you plan to use reCAPTCHA, import it as well
import ReCAPTCHA from 'react-google-recaptcha';
import InputLabel from '../components/InputLabel';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import Flag from 'react-world-flags';
import CountrySelect from '../components/CountrySelect';

//https://fontawesome.com/search
//good svg page https://devicon.dev/



/* Todo
-Ink/ex moms matris + frakt etc
-Order confirmation sida (och rensa kakor)
-(kvitto i pdf)
-spara allt man skrivit i kakor
-återskapa order från kakor
-fixa collect sidan + faktura sidan


-produkter + bilder i databas
-Texter
-priser på allt
-extra priser


*/

/* Todo frammåt
-föreslagna leveransdatum, (när det är gratis)
-(pris går ner från dag för dag istället för allt på en gång)
-(automatiska offerter/fakturor??)
*/

import RepresentOption from '../components/RepresentOption';

// Import date-fns functions
import {
  addDays,
  format,
  isAfter,
  isSameDay,
  isToday,
  startOfDay,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  isBefore,
  isEqual,
  getISOWeek,
} from 'date-fns';

// Import i18n and locales
import { useTranslation } from 'react-i18next';
import { sv, enUS } from 'date-fns/locale';


//todo later
//Flera ordrar samtidigt
//exempel/testamonials

const Create = ({ products, types, announcements, release, productsss }) => {
  const { t, i18n } = useTranslation();

  // State variables
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [availableTypes, setAvailableTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPriceEntry, setSelectedPriceEntry] = useState(null);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    zipCode: '',
    city: '',
    country: '',
    represent: '',
    organizationNumber: '',
    organizationName: '',
    otherRepresent: '',
    comment: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [step, setStep] = useState(1);


  const [exactNumber, setExactNumber] = useState("");
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [recaptchaToken, setReCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const [focusedField, setFocusedField] = useState(''); 
  const [sortedProducts, setSoretedProducts] = useState([]);
  const [isVatIncluded, setIsVatIncluded] = useState(false);

  const options = countryList().getData();

  const [deliveryInfo, setDeliveryInfo] = useState({
    deliveryName: '',
    deliveryAddress: '',
    deliveryZipTown: '',
    deliveryCountry: { label: 'Sweden', value: 'SE' }, // Initialize with Sweden
  });

const formId = "9HpCVM7p"; //"iOV4vDBK"; // Unique form ID from Formspark
const formSparkUrl = `https://submit-form.com/${formId}`; // Formspark submission URL

const recaptchaKey = '6Lec8rseAAAAALV9dXXceNUq48ok3nGWMbAtgwJa'; // Your site key for reCAPTCHA


  const [renderOnClient, setRenderOnClient] = useState(false);

  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scrollHeight
    }
  }, [contactInfo.comment]); // Runs whenever contactInfo.comment changes

  useEffect(() => {
    setRenderOnClient(true);
    setSoretedProducts(sortByImportance(products));
  }, []);

  // New state variables for date selection and week navigation
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(null);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const [uploadFiles, setUploadFiles] = useState([]); // To store uploaded file URLs
  const [uploadFileNames, setUploadFileNames] = useState([]); // To store uploaded file names
  const [uploadError, setUploadError] = useState(null);

  const [formState, setFormState] = useState([]);

  const [linkToFile, setLinkToFile] = useState([]);
 const typeSectionRef = useRef(null);
  const [key, setKey] = useState(Math.random().toString(36).substring(7)); // Initial key for the upload widget
 
const handleUploadChange = (info) => {
  const id = "file";
  const value = info.cdnUrl ?? ""; // If null, set to empty string
  const updatedFormState = { ...formState };
  updatedFormState[id] = value;
console.log("value" + value);
  setLinkToFile(value)
  setUploadFileName(info.name);
  setFormState(updatedFormState);
  setKey(key); // Update key to trigger re-render
};

const uploadFileSelect = (file) => {
  setUpdateList(false);
  if (file) {
    file.progress((info) =>
      console.log("File progress: ")
    );
    file.done((info) => setUpdateList(true));
  }
};

const sortByImportance = (array) => {
  if (!Array.isArray(array)) return [];

  return array
    .filter(item => item != null) // Remove null or undefined elements
    .sort((a, b) => {
      const importanceA = a?.importance ?? Infinity; // Use optional chaining and default to Infinity
      const importanceB = b?.importance ?? Infinity;
      return importanceA - importanceB;
    });
};


useEffect(() => {
  // Only scroll if a product is selected and it's not "Övrigt"
  if (selectedProduct && selectedProduct._id !== 'ovrigt' && availableTypes.length > 0 && typeSectionRef.current) {
    typeSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [selectedProduct, availableTypes]);

// Handler to remove a specific file
const handleRemoveFile = (index) => {
  const newUploadFiles = [...uploadFiles];
  const newUploadFileNames = [...uploadFileNames];
  newUploadFiles.splice(index, 1);
  newUploadFileNames.splice(index, 1);
  setUploadFiles(newUploadFiles);
  setUploadFileNames(newUploadFileNames);
};

// Optionally, handle errors
const handleUploadError = (error) => {
  console.error("Upload error:", error);
  setUploadError("Failed to upload file. Please try again.");
};


const ovrtProduct = {
  _id: "ovrigt",
  name: "Övrigt",
  image: '/assets/questions.png', // No image needed or use a placeholder
  popular: false, // You can change this if needed
};



const calculateExVat = (price) => {
  return (price / 1.25).toFixed(2); // Assuming VAT is 25%
};

// Helper function to format price display
const formatPrice = (price) => {
  const exVat = calculateExVat(price);

  if (isVatIncluded) {
    return `${price.toFixed(2)} kr (ex moms ${exVat} kr)`;
  } else {
    return `${exVat} kr (ink moms ${price.toFixed(2)} kr)`;
  }
};


useEffect(() => {
  setRenderOnClient(true);
  
  // Append "Övrigt" (Others) to the products
  

  setSoretedProducts([...sortByImportance(products), ovrtProduct]);
}, []);

useEffect(() => {
  if (selectedProduct && selectedProduct._id === "ovrigt") {
    // Clear available types when "Övrigt" is selected
    setAvailableTypes([]);
    setStep(6); // Jump to the contact info step directly when Övrigt is selected
  }
}, [selectedProduct]);

useEffect(() => {
  if (selectedType && selectedType._id === "ovrigt") {
    setStep(6); // Skip directly to contact info if Övrigt is selected
  }
}, [selectedType]);



useEffect(() => {
  if (!selectedType) return;

  const addOnServices = selectedType.addOnServices || selectedProduct?.addOnServices;

  if (!addOnServices || !Array.isArray(addOnServices)) return;

  const initialSelectedAddOns = [];

  addOnServices.forEach((service) => {
    if (service?.preselected) {
      if (service.type === 'boolean') {
        initialSelectedAddOns.push({
          serviceKey: service._id,
          option: {
            _key: service._id,
            optionName: service.name,
            price: service.price,
          },
        });
      } else if (service.type === 'singleChoice') {
        const firstOption = service.options && service.options[0];
        if (firstOption) {
          initialSelectedAddOns.push({
            serviceKey: service._id,
            option: firstOption,
          });
        }
      }
    }
  });

  console.log('Preselected Add-Ons:', initialSelectedAddOns); // For debugging
  setSelectedAddOns(initialSelectedAddOns);
}, [selectedType, selectedProduct]); 




const prepareContactInfo = () => {
  const { comment, ...rest } = contactInfo;
  const transformed = {};

  Object.entries(rest).forEach(([key, value]) => {
    // Append " --------" to each value
    transformed[key] = `${value} --------`;
  });

  return transformed;
};

const prepareComment = () => contactInfo.comment;

const prepareProductInfo = () => {
  const productInfo = {};
  selectedType?.neededInformation?.forEach((info) => {
    const value = neededInfoData[info.id];
    if (value !== undefined) {
      productInfo[i18n.language === 'sv' ? info.name : info.engname] = value + " --------";
    }
    
  });
  return productInfo;
};


const prepareAddOns = () => {
  return selectedAddOns.map((addOn) => {
    const service = (selectedType ? selectedType.addOnServices : selectedProduct.addOnServices)?.find(
      (s) => s._id === addOn.serviceKey
    );
    const option = addOn.option;
    return {
      serviceName: service?.name || 'Unknown Service',
      optionName: option?.optionName || 'Unknown Option',
      price: (option?.price + "kr" || 0+"kr") + " --------",
      
      // Include additional fields if necessary
    };
  });
};




const submitOrder = async () => {
  // Ensure reCAPTCHA is completed
  if (!recaptchaToken) {
    setMessage({
      class: "error",
      text: t("Please verify that you are not a robot."),
    });
    return;
  }

  setSubmitting(true);

  // Prepare transformed data
  const transformedContactInfo = prepareContactInfo();
  const comment = prepareComment();
  const productInfo = prepareProductInfo();
  const transformedAddOns = prepareAddOns();

  // Calculate ex moms prices
  const exTotalPrice = parseFloat((totalPrice / 1.25).toFixed(2));
  const exSelectedPriceEntryTotal = selectedPriceEntry ? selectedPriceEntry.price * exactNumber / 1.25 : 0;

  // Construct the payload
  const payload = {
    ...formState,
    product: selectedProduct?.name + "-->" + selectedType?.name || t('Not selected'),
    size_WxH: (width ? width : "undefined") + " x " + (height ? height : "undefined") + (selectedType.priceMatrixMeasurementUnit && (" (" + selectedType.priceMatrixMeasurementUnit + ")")) || t('Not selected'),
    quantity: exactNumber || t('Not specified'),

    ProductInfo: productInfo,

    basePrice: selectedPriceEntry?.price + "kr -------- price is for: size " + selectedPriceEntry?.size + selectedType?.priceMatrixMeasurementUnit + " ---and quantity " + selectedPriceEntry?.quantity || t('Not selected'),
    deliveryDate: selectedDeliveryDate ? format(selectedDeliveryDate, 'yyyy-MM-dd') + "----- extra delivery price: +" + selectedDeliveryOption?.extraPrice + "kr" : t('Not selected'),
    deliveryInfo: `${deliveryInfo.deliveryName}\n\n---\n\n
                  ${deliveryInfo.deliveryAddress}\n\n---\n\n
                  ${deliveryInfo.deliveryZipTown}\n\n---\n\n
                  ${deliveryInfo.deliveryCountry.label}`,

    addOns: transformedAddOns,

    // Include both VAT-inclusive and VAT-exclusive prices
    totalPriceInklMoms: `${totalPrice.toFixed(2)} kr`,
    totalPriceExklMoms: `${exTotalPrice} kr`,

    contactInfo: transformedContactInfo,
    comment: comment,

    uploadFiles: linkToFile, // Include file URLs
    "g-recaptcha-response": recaptchaToken, // If using reCAPTCHA
  };

  try {
    await axios.post(formSparkUrl, payload);
    setMessage({
      class: "success",
      text: t("Your order has been submitted successfully!"),
    });
    setSubmitting(false);
    // Optionally, reset the form or redirect the user
  } catch (error) {
    setMessage({
      class: "error",
      text: t("There was an error submitting your order. Please try again."),
    });
    setSubmitting(false);
  }
};



  const [neededInfoData, setNeededInfoData] = useState({});
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Handle Add-On Services Change
  const handleAddOnChange = (service, option) => {
    const existingAddOn = selectedAddOns.find((addOn) => addOn.serviceKey === service._id);
    
    if (existingAddOn) {
      if (service.type === 'boolean') {
        // For boolean add-ons, toggle off
        setSelectedAddOns(selectedAddOns.filter((addOn) => addOn.serviceKey !== service._id));
      } else if (service.type === 'singleChoice') {
        // For singleChoice add-ons, update the selected option
        setSelectedAddOns(
          selectedAddOns.map((addOn) =>
            addOn.serviceKey === service._id ? { ...addOn, option } : addOn
          )
        );
      }
    } else {
      // Add new add-on
      setSelectedAddOns([...selectedAddOns, { serviceKey: service._id, option }]);
    }
  };

  
  // Calculate Total Price
  const calculateTotalPrice = () => {
    let total = 0;
    
    // Parse exactNumber to a float. Default to 0 if invalid.
    const parsedQuantity = parseFloat(exactNumber) || 0;
    
    // Multiply price per unit by quantity
    if (selectedPriceEntry) {
      total += selectedPriceEntry.price * parsedQuantity;
    }
    
    // Add delivery option extra price
    if (selectedDeliveryOption) {
      total += selectedDeliveryOption.extraPrice;
    }
    
    // Add-ons prices
    if (selectedAddOns.length > 0) {
      total += selectedAddOns.reduce((sum, addOn) => {
        if (addOn.option) {
          return sum + addOn.option.price;
        }
        return sum;
      }, 0);
    }
  
    // Needed Information prices
    if (selectedType?.neededInformation && Object.keys(neededInfoData).length > 0) {
      selectedType.neededInformation.forEach((info) => {
        if (neededInfoData[info.id]) {
          if (info.answerType === 'multiChoice') {
            // Sum prices for selected multi-choice options
            info.options.forEach((option) => {
              if (neededInfoData[info.id].includes(option.optionName) && option.price) {
                total += option.price;
              }
            });
          } else if (info.answerType === 'boolean') {
            // Add price if boolean is true
            if (neededInfoData[info.id] && info.price) {
              total += info.price;
            }
          } else if (info.answerType === 'number') {
            // Example: Multiply by a factor if validation is present
            const value = parseFloat(neededInfoData[info.id]);
            if (!isNaN(value) && info.validation) {
              const multiplierMatch = info.validation.match(/multiplier:(\d+)/);
              if (multiplierMatch) {
                const multiplier = parseFloat(multiplierMatch[1]);
                total += value * multiplier;
              }
            }
          }
          // Handle other answer types as needed
        }
      });
    }
  
    setTotalPrice(total);
  };

  // Call calculateTotalPrice whenever relevant state changes
  useEffect(() => {
    calculateTotalPrice();
  }, [selectedPriceEntry, selectedDeliveryOption, selectedAddOns, neededInfoData, exactNumber]);


  // Define your primary and secondary colors
  const primaryColor = "var(--primarycolor)"//'#0070f3'; // Replace with your primary color
  const secondaryColor = '#333'; // Replace with your secondary color


  const representationOptions = [
    {
      id: 'Företag',
      name: 'represent',
      value: 'Företag',
      imageSrc: '/assets/svgs/briefcase.svg',
      labelText: t('Företag'),
    },
    {
      id: 'Förening',
      name: 'represent',
      value: 'Förening',
      imageSrc: '/assets/svgs/studentwhite.svg',
      labelText: t('Förening'),
    },
    {
      id: 'Privatperson',
      name: 'represent',
      value: 'Privatperson',
      imageSrc: '/assets/svgs/oneperson2.png',
      labelText: t('Privatperson'),
    },
    {
      id: 'Övrigt',
      name: 'represent',
      value: 'Övrigt',
      imageSrc: '/assets/svgs/other.svg',
      labelText: t('Övrigt'),
    },
  ];


  const inputContainerStyle = {
    position: 'relative',
    marginBottom: '20px',
  };

  // Styles for inputs
  const inputStyle = {
    width: '100%',
    padding: '12px 12px 12px 0',
    fontSize: '16px',
    border: 'none',
    borderBottom: '2px solid var(--primarycolor)',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    outline: 'none',
  };

  // Styles for labels
  const labelStyle = {
    position: 'absolute',
    top: '12px',
    left: '0',
    fontSize: '16px',
    color: '#aaa',
    transition: '0.2s',
    pointerEvents: 'none',
  };

  // Focused styles
  const labelFocusedStyle = {
    top: '-20px',
    fontSize: '12px',
    color: primaryColor,
  };


  // Render Representation Options
  const renderRepresentationOptions = () => (
    <div style={{ margin: '20px 0' }}>
      <h3>{t('I represent')}:</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginTop: '20px',
        }}
      >
        {representationOptions.map((option) => (
          <RepresentOption
            key={option.id}
            id={option.id}
            name={option.name}
            value={option.value}
            checked={contactInfo.represent === option.value}
            onChange={(e) => setContactInfo({ ...contactInfo, represent: e.target.value })}
            imageSrc={option.imageSrc}
            labelText={option.labelText}
          />
        ))}
      </div>
    </div>
  );








  // Step 1: Product Selection
  const renderProductSelection = () => (
    <div style={{ marginBottom: '40px', marginTop: "20px" }}>
      <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>{t('Select a Product')}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>        
        
        {sortedProducts.map((product) => (
          <div
            key={product._id}
            style={{
              position: 'relative', // Added to make child absolute positioning relative to this container
              //flex: '1 1 calc(33.333% - 20px)',
              //maxWidth: 'calc(33.333% - 20px)',

              width:  screenWidth > 800 ? "300px" : (screenWidth < 500 ? "145px" : "200px") ,
              //heigth:  screenWidth > 800 ? "300px" : (screenWidth < 500 ? "160px" : "200px") ,
              backgroundColor: '#f5f5f5',
              borderRadius: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              boxSizing: 'border-box',
              ...(selectedProduct && selectedProduct._id === product._id
                ? { border: `2px solid ${primaryColor}` }
                : {}),
            }}
            onClick={() => {
              setSelectedProduct(product);
              setSelectedType(null);
              setSelectedPriceEntry(null);
              setSelectedDeliveryOption(null);
              //setSelectedAddOns([]);
              setContactInfo({ name: '', email: '', phone: '' });
              setSelectedDeliveryDate(null);
            

              
              

              if (product._id === 'ovrigt') {
                // If "Övrigt" is selected as the product, skip types
                setAvailableTypes([]);
                setStep(6); // Jump to the contact info step directly when Övrigt is selected
              } else {
                // Get types for the selected product
                let productTypes = [];
                if (product.contentTypes && product.contentTypes.length > 0) {
                  productTypes = types.filter((type) =>
                    product.contentTypes.some((ref) => ref._ref === type._id)
                  );
                }
                // Sort productTypes
                productTypes = sortByImportance(productTypes);
            
                // Add "Övrigt" type to available types
                setAvailableTypes([...productTypes, ovrtProduct]);
              }
            }}
          >


        {product.image && (
            <img
            src={product._id === "ovrigt" ? "/assets/questions.png" : urlForCreate(product.image).url()}
            alt={product.name}
            style={{
              width: '100%',
              objectFit: 'cover',
              borderRadius: '20px',
              border: "1px solid #ccc",
              aspectRatio: screenWidth < 500 ? '1 / 1' : '2 / 1',
            }}
          />
          )}


{product.popular && (
    <div
      className="newproduct"
      style={{
        position: 'absolute',
        top: '10px', // Adjust as needed
        left: '10px', // Adjust as needed
        //backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for readability
        padding: '5px 10px',
        borderRadius: '5px',
      }}
    >
      <p className="tag-text" style={{ color: 'white', margin: 0 }}>
        {t('Populärt')}
      </p>
    </div>
  )}

            <h3 style={{ marginTop: '10px', fontSize: '18px' }}>{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 2: Product Type Selection
  const renderTypeSelection = () => {
    if (!selectedProduct || availableTypes.length === 0) return null;

    return (
      <div ref={typeSectionRef} style={{ marginBottom: '40px' }}>
        <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>
          {t('Select a Type for')} {selectedProduct.name}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px',  justifyContent: screenWidth < 620 ? 'center' : "left", alignItems: 'center' /**/ }}>        
          {availableTypes.map((type) => (
            <div
              key={type._id}
              style={{
                position: 'relative', // Added to make child absolute positioning relative to this container
              //flex: '1 1 calc(33.333% - 20px)',
              //maxWidth: 'calc(33.333% - 20px)',

              width:  screenWidth > 700 ? "calc(25% - 20px)" : (screenWidth < 500 ? "145px" : "180px") ,
              //heigth:  screenWidth > 800 ? "300px" : (screenWidth < 500 ? "160px" : "200px") ,
              backgroundColor: '#f5f5f5',
              borderRadius: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              padding: '10px',
              boxSizing: 'border-box',
                ...(selectedType && selectedType._id === type._id
                  ? { border: `2px solid ${primaryColor}` }
                  : {}),
              }}
              onClick={() => {
                setSelectedType(type);
                setSelectedPriceEntry(null);
                setSelectedDeliveryOption(null);
                //setSelectedAddOns([]);
                setContactInfo({ name: '', email: '', phone: '' });
                setSelectedDeliveryDate(null);
              }}
            >

{type.image && (
    <img
      src={type._id === "ovrigt" ? "/assets/questions.png" :urlForCreate(type.image).url()}
      alt={type.name}
      style={{
        width: '100%',
        objectFit: 'cover',
        border: "1px solid #ccc",

        borderRadius: '20px',
        aspectRatio: '1 / 1',
      }}
    />
  )}

  {/* 'Populär' Text */}
  {type.popular && (
    <div
      className="newproduct"
      style={{
        position: 'absolute',
        top: '10px', // Adjust as needed
        left: '10px', // Adjust as needed
        //backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '5px 10px',
        borderRadius: '5px',
      }}
    >
      <p className="tag-text" style={{ color: 'white', margin: 0 }}>
        {t('Populärt val')}
      </p>
    </div>
  )}
            
              <h3 style={{ marginTop: '10px', fontSize: '18px' }}>{type.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };



// Step 2.5: Needed Information
const renderNeededInformation = () => {
  if (!selectedType?.neededInformation || selectedType.neededInformation.length === 0) return null;

  // Sort neededInformation by importance
  const sortedNeededInformation = sortByImportance(selectedType.neededInformation);

  return (
    <div style={{ marginBottom: '40px' }}>
      <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>{t('Additional Information')}</h1>
      {sortedNeededInformation.map((info) => (
        <div key={info.id} style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
            {i18n.language === 'sv' ? info.name : info.engname}
            {info.description && (
              <span style={{ fontSize: '12px', color: '#555' }}>
                {i18n.language === 'sv' ? info.description : info.engdescription}
              </span>
            )}
            {/* Render input based on answerType */}
            {info.answerType === 'string' && (
              <div style={inputContainerStyle}>
                <input
                  type="text"
                  id={info.id}
                  style={inputStyle}
                  value={neededInfoData[info.id] || ''}
                  onChange={(e) =>
                    setNeededInfoData({ ...neededInfoData, [info.id]: e.target.value })
                  }
                  onFocus={() => setFocusedField(info.id)}
                  onBlur={() => setFocusedField('')}
                  required={info.required}
                />
                <InputLabel
                  htmlFor={info.id}
                  //labelText={i18n.language === 'sv' ? info.name : info.engname}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  isFocused={focusedField === info.id || neededInfoData[info.id] !== ''}
                />
              </div>
            )}
            {info.answerType === 'number' && (
              <div style={inputContainerStyle}>
                <input
                  type="number"
                  id={info.id}
                  style={inputStyle}
                  value={neededInfoData[info.id] || ''}
                  onChange={(e) =>
                    setNeededInfoData({ ...neededInfoData, [info.id]: e.target.value })
                  }
                  onFocus={() => setFocusedField(info.id)}
                  onBlur={() => setFocusedField('')}
                  required={info.required}
                  onWheel={(e) => e.target.blur()} // Prevent number input scroll
                />
                <InputLabel
                  htmlFor={info.id}
                  //labelText={i18n.language === 'sv' ? info.name : info.engname}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  isFocused={focusedField === info.id || neededInfoData[info.id] !== ''}
                />
              </div>
            )}
            {info.answerType === 'boolean' && (
              <div style={{ marginTop: '5px' }}>
                <button
                  type="button"
                  onClick={() =>
                    setNeededInfoData({ ...neededInfoData, [info.id]: !neededInfoData[info.id] })
                  }
                  style={{
                    padding: '10px 20px',
                    backgroundColor: neededInfoData[info.id] ? primaryColor : '#e0e0e0',
                    color: neededInfoData[info.id] ? 'white' : '#000',
                    border: 'none',
                    //borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  {neededInfoData[info.id] ? t('Yes') : t('No')}
                </button>
              </div>
            )}
            {info.answerType === 'multiChoice' && (
              <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {info.options.map((option) => (
                  <button
                    key={option._key}
                    style={{
                      backgroundColor: neededInfoData[info.id]?.includes(option.optionName)
                        ? primaryColor
                        : '#e0e0e0',
                      color: neededInfoData[info.id]?.includes(option.optionName) ? 'white' : '#000',
                      padding: '10px 20px',
                      border: 'none',
                      //borderRadius: '5px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                    }}
                    onClick={() => {
                      const currentSelections = neededInfoData[info.id] || [];
                      if (currentSelections.includes(option.optionName)) {
                        // Remove the option
                        setNeededInfoData({
                          ...neededInfoData,
                          [info.id]: currentSelections.filter((name) => name !== option.optionName),
                        });
                      } else {
                        // Add the option
                        setNeededInfoData({
                          ...neededInfoData,
                          [info.id]: [...currentSelections, option.optionName],
                        });
                      }
                    }}
                  >
                    {i18n.language === 'sv' ? option.optionName : option.engOptionName}
                    {option.price && ` (+${option.price} kr)`}
                  </button>
                ))}
              </div>
            )}
            {info.answerType === 'singleChoice' && (
              <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {info.options.map((option) => (
                  <button
                    key={option._key}
                    style={{
                      backgroundColor: neededInfoData[info.id] === option.optionName ? primaryColor : '#e0e0e0',
                      color: neededInfoData[info.id] === option.optionName ? 'white' : '#000',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                    }}
                    onClick={() => {
                      setNeededInfoData({ ...neededInfoData, [info.id]: option.optionName });
                    }}
                  >
                    {i18n.language === 'sv' ? option.optionName : option.engOptionName}
                    {option.price && ` (+${option.price} kr)`}
                  </button>
                ))}
              </div>
            )}
          </label>
        </div>
      ))}
    </div>
  );
};



// Step 2.6: Upload Designs
const renderUploadDesigns = () => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>{t('Upload your designs')}</h1>
      
      {/* Optional descriptive text */}
      <p>{t('Please upload your design files in PDF, JPG, or PNG format.')}</p>
      
      <div className="upload-widget-container" style={{ marginTop: '20px', position: 'relative' }}>
      {renderOnClient &&
        <Widget
          publicKey={"7c1188549576c89ee04e"} // Replace with your actual public key
          multiple
          clearable
          tabs="file camera url"
          effects="crop, flip, rotate, blur, mirror, sharp, invert, grayscale, enhance"
          onChange={handleUploadChange}
          onFileSelect={uploadFileSelect}
          onError={handleUploadError}
          // Optionally, customize the widget's appearance
          locale={i18n.language === 'sv' ? 'sv' : 'en'} // Dynamic locale based on language
        />
      }

        {/* Display uploaded file names with remove option */}
        
        
        {/* Display upload error if any */}
        {uploadError && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {uploadError}
          </div>
        )}
      </div>
              
         {/* this code dont  reset when the field is cleared

      {linkToFile && linkToFile.length >0 &&  (
        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {(() => {
            // Regular expression to extract the number of files (N) from linkToFile
            const regex = /~(\d+)\/$/;
            const match = linkToFile.match(regex);
            const numFiles = match ? parseInt(match[1], 10) : 1; // Default to 1 if not found
            
            // Remove the trailing slash for base URL
            const baseUrl = linkToFile.endsWith('/') ? linkToFile.slice(0, -1) : linkToFile;
            
            // Generate image URLs
            const imageUrls = Array.from({ length: numFiles }, (_, index) => `${baseUrl}/nth/${index}/`);
            
            return imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Uploaded design ${idx + 1}`}
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
            ));
          })()}
        </div>
      )}

       */}
    </div>
  );
};

  // Step 3: Price Matrix Selection
  const renderPriceMatrix = () => {
    // Use optional chaining and ensure priceMatrix exists
    const priceMatrix = selectedType?.priceMatrix || selectedProduct?.priceMatrix;
  
    // Safely return null if priceMatrix is not available
    if (!priceMatrix) return null;
  
    // Define maximum number of quantity columns
    const maxColumns = 9;
  
    // Get unique sizes and quantities, limiting quantities to maxColumns
    const sizes = [...new Set(priceMatrix.map((entry) => entry.size))];
    const allQuantities = [...new Set(priceMatrix.map((entry) => entry.quantity))];
    const quantities = allQuantities.slice(0, maxColumns); // Limit to first 9 quantities
  
    const numberOfQuantities = quantities.length;
  
    // Define column widths
    const sizeColumnWidth = 10; // Percentage for 'Size' column
    const quantityColumnWidth = numberOfQuantities > 0 ? (90 / numberOfQuantities).toFixed(2) : 90; // Percentage for each quantity column
  
    // Define responsive font sizes and padding based on screenWidth
    let fontSize, padding;
    if (screenWidth <= 500) {
      fontSize = '10px';
      padding = '5px';
    } else if (screenWidth <= 600) {
      fontSize = '12px';
      padding = '8px';
    } else {
      fontSize = '14px';
      padding = '10px';
    }
  
    // Build matrix
    const buildMatrix = () => {
      return sizes.map((size) => {
        const row = {
          size,
          prices: quantities.map((quantity) => {
            const entry = priceMatrix.find(
              (e) => e.size === size && e.quantity === quantity
            );
            return entry || null;
          }),
        };
        return row;
      });
    };



    const parseSize = (sizeString) => {
      if (!sizeString) {
        return { width: '', height: '' };
      }
      if (typeof sizeString !== 'string') {
        sizeString = String(sizeString);
      }
      const parts = sizeString.split('x');
      if (parts.length === 2) {
        return { width: parts[0].trim(), height: parts[1].trim() };
      } else if (parts.length === 1) {
        return { width: parts[0].trim(), height: parts[0].trim() };
      } else {
        return { width: '', height: '' };
      }
    };

  
    const matrix = buildMatrix();
  
    return (
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>
          {t('Select Size and Quantity')}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <label style={{ marginRight: '10px' }}>{t('Price Mode')}:</label>
          <label className="createswitch">
            <input
              type="checkbox"
              checked={isVatIncluded}
              onChange={() => setIsVatIncluded(!isVatIncluded)}
            />
            <span className="createslider round"></span>
          </label>
          <span style={{ marginLeft: '10px' }}>
            {isVatIncluded ? t('Inklusive moms') : t('Exklusive moms')}
          </span>
        </div>
        
        <table
          style={{
            width:  screenWidth <= 430 ? '109%' : "100%",
            borderCollapse: 'collapse',
            tableLayout: 'fixed',
            marginLeft: screenWidth <= 430 ? "-18px" : "0px",
            marginRight: screenWidth <= 430 ? "-18px" : "0px",

          }}
        >
          <thead>
            <tr>
              {/* Size Column Header */}
              <th
                style={{
                  border: '1px solid #ccc',
                  textAlign: 'center',
                  padding: '10px 0px', // Reduced padding for smaller screens

                  fontSize,
                  width: `${sizeColumnWidth}%`,
                }}
              >
                {t('Antal')}
              </th>
              {/* Quantity Column Headers */}
              {quantities.map((quantity) => (
                <th
                  key={quantity}
                  style={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    padding: '10px 0px', // Reduced padding for smaller screens

                    fontSize,
                    width: `${quantityColumnWidth}%`,
                  }}
                >
                  {quantity}+
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row) => (
              <tr key={row.size}>
                {/* Size Cell */}
                <td
                  style={{
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    padding: '10px 0px', // Reduced padding for smaller screens

                    fontSize,
                    width: `${sizeColumnWidth}%`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.size}{selectedType.priceMatrixMeasurementUnit && selectedType.priceMatrixMeasurementUnit}
                </td>
                {/* Price Cells */}
                {row.prices.map((entry, index) => (
                  <td
                    key={index}
                    style={{
                      border: '1px solid #ccc',
                      textAlign: 'center',
                      //padding,
                      fontSize,
                      width: `${quantityColumnWidth}%`,
                    }}
                  >
                    {entry ? (
                      <button
                        style={{
                          backgroundColor:
                            selectedPriceEntry && selectedPriceEntry._key === entry._key
                              ? primaryColor
                              : secondaryColor,
                          color:
                            selectedPriceEntry && selectedPriceEntry._key === entry._key
                              ? secondaryColor
                              : 'white',
                          width: '100%',
                          padding: '10px 0px', // Reduced padding for smaller screens
                         
                          fontSize: fontSize, // Inherit font size
                          border: 'none',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap', // Prevent text wrapping
                          overflow: 'hidden',
                          //textOverflow: 'ellipsis', // Add ellipsis if text is too long
                        }}
                        onClick={() => {
                          setSelectedPriceEntry(entry);
                          setSelectedDeliveryOption(null);
                          //setSelectedAddOns([]);
                          setContactInfo({ name: '', email: '', phone: '' });
                          setSelectedDeliveryDate(null);
                        
                          console.log('Selected entry:', entry);
                          console.log('entry.size:', entry.size);
                        
                          // Parse size and set width and height
                          const { width: entryWidth, height: entryHeight } = parseSize(entry.size);
                          setWidth(entryWidth);
                          setHeight(entryHeight);
                          setExactNumber(entry.quantity);
                        }}
                        title={`${entry.price} kr`} // Tooltip for full price
                      >
                        {entry.price} kr
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>




        <div style={{ marginTop: '20px' }}>
  <h2>{t('Ange exakt antal och dimensioner')}</h2>
  

    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '10px',
      marginTop: "20px"
    }}>
      {/* Exakt antal märken */}
      <div style={{ flex: '1', padding: '10px' }}>
        <div style={inputContainerStyle}>
          <input
            type="number"
            id="exactNumber"
            style={inputStyle}
            value={exactNumber}
            onChange={(e) => setExactNumber(Number(e.target.value))}
            onFocus={() => setFocusedField('exactNumber')}
            onBlur={() => setFocusedField('')}
            onWheel={(e) => e.target.blur()}
            required
          />
          <InputLabel
            htmlFor="exactNumber"
            labelText={t('Antal')}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            isFocused={focusedField === 'exactNumber' || exactNumber !== ''}
          />
        </div>
      </div>
      {/* Bredd */}
      <div style={{ flex: '1', padding: '10px' }}>
        <div style={inputContainerStyle}>
          <input
            type="number"
            id="width"
            style={inputStyle}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            onFocus={() => setFocusedField('width')}
            onBlur={() => setFocusedField('')}
            onWheel={(e) => e.target.blur()}
            required
          />
          <InputLabel
            htmlFor="width"
            labelText={t('Bredd')}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            isFocused={focusedField === 'width' || width !== ''}
          />
        </div>
      </div>
      {/* Höjd */}
      <div style={{ flex: '1', padding: '10px' }}>
        <div style={inputContainerStyle}>
          <input
            type="number"
            id="height"
            style={inputStyle}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            onFocus={() => setFocusedField('height')}
            onBlur={() => setFocusedField('')}
            onWheel={(e) => e.target.blur()}
            required
          />
          <InputLabel
            htmlFor="height"
            labelText={t('Höjd')}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            isFocused={focusedField === 'height' || height !== ''}
          />
        </div>
      </div>
    </div>
  
  {/* Pris per märke */}
  <div style={{ marginTop: '20px' }}>
    {t('Pris per märke')}: {selectedPriceEntry?.price.toFixed(2) || 0} kr
  </div>
  {/* Totalpris */}
  <div style={{fontWeight: "Bold"}}>
  {selectedPriceEntry?.price && exactNumber ? (
            isVatIncluded
              ? `${(selectedPriceEntry.price * exactNumber).toFixed(2)} kr (ex moms ${((selectedPriceEntry.price * exactNumber) / 1.25).toFixed(2)} kr)`
              : `${(selectedPriceEntry.price * exactNumber / 1.25).toFixed(2)} kr (inkl moms ${(selectedPriceEntry.price * exactNumber).toFixed(2)} kr)`
          ) : t('Not selected')}
  </div>
</div>


      </div>
    );
  };

  // Step 4: Delivery Options (Updated)
  const renderDeliveryOptions = () => {
    // Use optional chaining to safely access deliveryPrices
    const deliveryPrices = selectedType?.deliveryPrices || selectedProduct?.deliveryPrices;
    const minimumDeliveryTime = 1+ (
      selectedType?.minimumdeliverytime ?? selectedProduct?.minimumdeliverytime ?? 0);

    // Safely return null if selectedPriceEntry or deliveryPrices is not available
    if (!selectedPriceEntry || !deliveryPrices) return null;

    const today = startOfDay(new Date());
    const earliestSelectableDate = addDays(today, minimumDeliveryTime);

    const generateCalendar = () => {
      const startDate = startOfWeek(addWeeks(today, currentWeekOffset), { weekStartsOn: 1 });
      const endDate = addWeeks(startDate, 4); // Show 5 weeks total

      const weeks = [];
      let currentWeekStart = startDate;

      while (currentWeekStart <= endDate) {
        const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
        const days = eachDayOfInterval({ start: currentWeekStart, end: weekEnd });

        const weekNumber = getISOWeek(currentWeekStart);

        // Get months present in the week
        const monthsInWeek = [
          ...new Set(
            days.map((d) =>
              format(d, 'MMMM', { locale: i18n.language === 'sv' ? sv : enUS })
            )
          ),
        ];

        // Determine the month to display
        let monthToDisplay;
        if (monthsInWeek.length === 1) {
          monthToDisplay = monthsInWeek[0];
        } else {
          // Choose the month with the most days in the week
          const monthCounts = {};
          days.forEach((d) => {
            const month = format(d, 'MMMM', { locale: i18n.language === 'sv' ? sv : enUS });
            monthCounts[month] = (monthCounts[month] || 0) + 1;
          });
          monthToDisplay = Object.keys(monthCounts).reduce((a, b) =>
            monthCounts[a] > monthCounts[b] ? a : b
          );
        }

        weeks.push({
          weekNumber,
          days,
          month: monthToDisplay,
        });
        currentWeekStart = addDays(currentWeekStart, 7);
      }

      return weeks;
    };

    const calendar = generateCalendar();

    const getExtraPriceForDate = (date) => {
      const daysFromEarliestSelectableDate = Math.ceil(
        (date - earliestSelectableDate) / (1000 * 60 * 60 * 24)
      );

      let extraPrice = 0;

      // Sort deliveryPrices by 'deliveryDays' ascending
      const sortedDeliveryPrices = [...deliveryPrices].sort(
        (a, b) => a.deliveryDays - b.deliveryDays
      );

      for (const option of sortedDeliveryPrices) {
        if (daysFromEarliestSelectableDate <= option.deliveryDays) {
          extraPrice = option.extraPrice;
          return extraPrice;
        }
      }

      // If no delivery option applies, extraPrice is 0
      return extraPrice;
    };

    const isDateSelectable = (date) => {
      return isAfter(date, earliestSelectableDate) || isSameDay(date, earliestSelectableDate);
    };

    const handleDateSelection = (date) => {
      if (!isDateSelectable(date)) return;

      setSelectedDeliveryDate(date);

      // Determine which delivery option applies
      const daysFromEarliestSelectableDate = Math.ceil(
        (date - earliestSelectableDate) / (1000 * 60 * 60 * 24)
      );

      // Find the applicable delivery option
      const sortedDeliveryPrices = [...deliveryPrices].sort(
        (a, b) => a.deliveryDays - b.deliveryDays
      );

      let selectedOption = null;

      for (const option of sortedDeliveryPrices) {
        if (daysFromEarliestSelectableDate <= option.deliveryDays) {
          selectedOption = option;
          break;
        }
      }

      if (!selectedOption) {
        // No delivery option applies, create a default one with 0 extraPrice
        selectedOption = { deliveryDays: daysFromEarliestSelectableDate, extraPrice: 0 };
      }

      setSelectedDeliveryOption(selectedOption);
    };

    // Weekdays Header (localized)
    const weekdays =
      i18n.language === 'sv'
        ? ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']
        : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>{t('Select Delivery Date')}</h1>

        {/* Navigation buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <button
            onClick={() => setCurrentWeekOffset(currentWeekOffset - 3)}
            disabled={currentWeekOffset <= 0}
            style={{
              padding: '5px',
              cursor: currentWeekOffset <= 0 ? 'not-allowed' : 'pointer',
            }}
          >
            &lt;
          </button>
          <h2>
            {format(
              addWeeks(startOfWeek(addWeeks(today, currentWeekOffset), { weekStartsOn: 1 }), 0),
              'MMMM yyyy',
              { locale: i18n.language === 'sv' ? sv : enUS }
            )}
          </h2>
          <button
            onClick={() => setCurrentWeekOffset(currentWeekOffset + 3)}
            style={{ padding: '5px', cursor: 'pointer' }}
          >
            &gt;
          </button>
        </div>

        {/* Weekdays Header */}
        <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
          {/* Week Number Header */}
          <div style={{width: screenWidth <600 ? '0px':'50px', textAlign: 'center', fontWeight: 'bold', }}>
            {/* Empty or "Week" */}
          </div>
          {weekdays.map((day) => (
            <div key={day} style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar rendering */}
        {calendar.map((week, weekIndex) => (
          <div
            key={weekIndex}
            style={{ display: 'flex', marginBottom: '5px', alignItems: 'center' }}
          >
            {/* Week Number */}
            <div style={{ width: screenWidth <600 ? '25px':'50px', textAlign: 'center', fontWeight: 'bold',marginTop: '-15px', marginLeft: screenWidth <600 ? '-20px':'0px', marginRight: screenWidth <600 ? '-8px':'0px', }}>
              {week.weekNumber}
            </div>

            {week.days.map((date, index) => {
              const isSelectable = isDateSelectable(date);
              const extraPrice = getExtraPriceForDate(date);
              const isSelected = selectedDeliveryDate && isSameDay(date, selectedDeliveryDate);
              const isCurrentDay = isToday(date);

              // Determine if the month changes at this date
              const monthChanges =
                index > 0 && format(date, 'M') !== format(week.days[index - 1], 'M');

              const monthLabel =
                index === 0 || format(date, 'M') !== format(week.days[index - 1], 'M')
                  ? format(date, 'MMMM', { locale: i18n.language === 'sv' ? sv : enUS })
                  : null;

              return (
                <React.Fragment key={date}>
                  {monthChanges && index > 0 && (
                    <div
                      style={{
                        width: '2px',
                        height: '40px',
                        backgroundColor: 'var(--secondarycolor)',
                        marginLeft: '3px',
                        marginRight: '-5px',
                        marginTop: "-12px",
                        position: 'relative',
                        //zIndex: 20, 
                         //overflow: 'visible',
                      }}
                    />
                  )}
                  <div
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      position: 'relative',
                      margin: screenWidth <400 ?'3px' : "4px",
                      marginTop: screenWidth <400 ? "10px" : "4px",
                      width: '100%',
                      padding: 'auto 20px',
                    }}
                  >
                    {monthLabel && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-15px',
                          left: '5px', //left: '50%',
                          //transform: 'translateX(-50%)',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        {screenWidth < 580 ? monthLabel.slice(0, 3) : monthLabel}
                      </div>
                    )}
                    <button
                      onClick={() => handleDateSelection(date)}
                      style={{
                        marginTop: '4px',
                        marginBottom: '4px',
                        marginRight: screenWidth <400 ? '-5px':'4px',
                        marginLeft: screenWidth <400 ? '6px' : '4px',
                        width:  screenWidth <400 ? "40px" : '100%',
                        padding: '10px',
                        backgroundColor: isSelected
                          ? primaryColor
                          : isCurrentDay
                          ? '#FDC12A' // Yellow color for current date
                          : isSelectable
                          ? secondaryColor
                          : '#ccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isSelectable ? 'pointer' : 'not-allowed',
                      }}
                      disabled={!isSelectable}
                    >
                      {format(date, 'd')}
                    </button>
                    {/* Display extra price below the date, only if date is selectable */}
                    {isSelectable ? (
                      <div
                        style={{
                          fontSize: '12px',
                          marginTop: '-3px',
                          color: 'var(--secondarycolor)',
                          overflow: 'hidden', // Allow overflow
      //textOverflow: 'ellipsis', // Adds "..." if text is too long
      whiteSpace: 'nowrap', // Keeps text in one line
                        }}
                      >
                        {screenWidth <400 ? extraPrice > 0 ? `+${extraPrice}` : '+0': extraPrice > 0 ? `+${extraPrice}kr` : '+0kr'}
                      </div>
                    ) : <div
                    style={{
                      height:"12px",

                      fontSize: '12px',
                      marginTop: '2px',
                      color: 'var(--secondarycolor)',
                    }}
                  >
                    
                  </div>
                  }
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // Step 5: Add-On Services
  const renderAddOns = () => {
    const addOnServices = selectedType?.addOnServices || selectedProduct?.addOnServices;

    if (!selectedDeliveryOption || !addOnServices) return null;

    // Sort addOnServices
    const sortedAddOnServices = sortByImportance(addOnServices);

    return (
      <div style={{ marginBottom: '40px' }}>
        {sortedAddOnServices.length !== 0 && (
          <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>
            {t('Select Add-On Services')}
          </h1>
        )}
        {sortedAddOnServices.map((service) => (
  <div key={service._id} style={{ marginBottom: '20px' }}>
    <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{service.name}</h3>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {service.type === 'singleChoice' &&
        service.options.map((option) => (
          <button
            key={option._key}
            style={{
              backgroundColor: selectedAddOns.some(
                (addOn) =>
                  addOn.serviceKey === service._id &&
                  addOn.option._key === option._key
              )
                ? primaryColor
                : '#e0e0e0',
              color: selectedAddOns.some(
                (addOn) =>
                  addOn.serviceKey === service._id &&
                  addOn.option._key === option._key
              )
                ? 'white'
                : '#000',
              padding: '10px',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => handleAddOnChange(service, option)}
          >
            {option.optionName} (+{option.price} kr)
          </button>
        ))}
      {service.type === 'boolean' && (
        <button
          style={{
            backgroundColor: selectedAddOns.some(
              (addOn) => addOn.serviceKey === service._id
            )
              ? primaryColor
              : '#e0e0e0',
            color: selectedAddOns.some(
              (addOn) => addOn.serviceKey === service._id
            )
              ? 'white'
              : '#000',
            padding: '10px',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => handleAddOnChange(service)}
        >
          {t('Include')} {service.name} (+{service.price} kr)
        </button>
      )}
    </div>
    {/* If selected option has handlesshipping, render delivery input fields */}
    {selectedAddOns.some(
      (addOn) =>
        addOn.serviceKey === service._id &&
        addOn.option?.handlesshipping
    ) && (
      // Render delivery input fields
      <div style={{ marginTop: '10px' }}>
        <h4>{t('Delivery Information')}</h4>
        {/* Delivery Name */}
        <div style={{ padding: '10px', marginTop: "20px" }}>
          <div style={inputContainerStyle}>
            <input
              type="text"
              id="deliveryName"
              style={inputStyle}
              value={deliveryInfo.deliveryName}
              onChange={(e) =>
                setDeliveryInfo({ ...deliveryInfo, deliveryName: e.target.value })
              }
              onFocus={() => setFocusedField('deliveryName')}
              onBlur={() => setFocusedField('')}
              required
            />
            <InputLabel
              htmlFor="deliveryName"
              labelText={t('Delivery Name')}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              isFocused={focusedField === 'deliveryName' || deliveryInfo.deliveryName}
            />
          </div>
        </div>
        {/* Delivery Address */}
        <div style={{ padding: '10px' }}>
          <div style={inputContainerStyle}>
            <input
              type="text"
              id="deliveryAddress"
              style={inputStyle}
              value={deliveryInfo.deliveryAddress}
              onChange={(e) =>
                setDeliveryInfo({ ...deliveryInfo, deliveryAddress: e.target.value })
              }
              onFocus={() => setFocusedField('deliveryAddress')}
              onBlur={() => setFocusedField('')}
              required
            />
            <InputLabel
              htmlFor="deliveryAddress"
              labelText={t('Delivery Address')}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              isFocused={
                focusedField === 'deliveryAddress' || deliveryInfo.deliveryAddress
              }
            />
          </div>
        </div>
        {/* Delivery Zip + Town */}
        <div style={{ padding: '10px' }}>
          <div style={inputContainerStyle}>
            <input
              type="text"
              id="deliveryZipTown"
              style={inputStyle}
              value={deliveryInfo.deliveryZipTown}
              onChange={(e) =>
                setDeliveryInfo({ ...deliveryInfo, deliveryZipTown: e.target.value })
              }
              onFocus={() => setFocusedField('deliveryZipTown')}
              onBlur={() => setFocusedField('')}
              required
            />
            <InputLabel
              htmlFor="deliveryZipTown"
              labelText={t('Delivery Zip + Town')}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              isFocused={
                focusedField === 'deliveryZipTown' || deliveryInfo.deliveryZipTown
              }
            />
          </div>
        </div>
        {/* Country Dropdown */}
        <div style={{ padding: '10px' }}>
  <div style={inputContainerStyle}>
  <CountrySelect
  options={options}
  value={deliveryInfo.deliveryCountry}
  onChange={(selectedOption) =>
    setDeliveryInfo({ ...deliveryInfo, deliveryCountry: selectedOption })
  }
  onFocus={() => setFocusedField('deliveryCountry')}
  onBlur={() => setFocusedField('')}
  required
  primaryColor={primaryColor}
  secondaryColor={secondaryColor}
/>
    <InputLabel
      htmlFor="deliveryCountry"
      labelText={t('Country')}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      isFocused={
        focusedField === 'deliveryCountry' || deliveryInfo.deliveryCountry.label
      }
    />
  </div>
</div>
      </div>
    )}
  </div>
))}
      </div>
    );
  };

  // Step 6: Contact Information
  const renderContactInformation = () => {
     if (!selectedDeliveryOption && selectedProduct?._id !== "ovrigt" && selectedType?._id !== "ovrigt") return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedProduct?._id === "ovrigt" || selectedType?._id === "ovrigt") {
      // Handle Övrigt form submission directly via Formspark
      await submitOrder();
    } else {
      setStep(7); // Continue normal flow for other products/types
    }
  };

    // Styles for input containers
   
    return (
      <div style={{ marginBottom: '40px' }}>
        <h1
          style={{
            textAlign: 'left',
            marginBottom: '20px',
          }}
        >
          {t('Contact Information')}
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Name, Email, Phone Fields */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: screenWidth < 700 ? 'column' : 'row', // Conditional flex direction
            }}
          >
            {/* Name Field */}
            <div
              style={{
                flex: screenWidth < 700 ? '1 1 100%' : '1 1 33%', // Full width on small screens
                padding: '10px',
              }}
            >
              <div style={inputContainerStyle}>
                <input
                  type="text"
                  id="name"
                  style={inputStyle}
                  value={contactInfo.name}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, name: e.target.value })
                  }
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  required
                />
                <InputLabel
                  htmlFor="name"
                  required
                  labelText={t('Skapamärken.Namn')}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  isFocused={
                    focusedField === 'name' || contactInfo.name
                  }
                />
              </div>
            </div>

            {/* Email Field */}
            <div
              style={{
                flex: screenWidth < 700 ? '1 1 100%' : '1 1 33%', // Full width on small screens
                padding: '10px',
              }}
            >
              <div style={inputContainerStyle}>
                <input
                  type="email"
                  id="email"
                  style={inputStyle}
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, email: e.target.value })
                  }
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  required
                />
                <InputLabel
                  htmlFor="email"
                  required
                  labelText={t('Skapamärken.Email')}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  isFocused={
                    focusedField === 'email' || contactInfo.email
                  }
                />
              </div>
            </div>

            {/* Phone Field */}
            <div
              style={{
                flex: screenWidth < 700 ? '1 1 100%' : '1 1 33%', // Full width on small screens
                padding: '10px',
              }}
            >
              <div style={inputContainerStyle}>
                <input
                  type="tel"
                  id="phone"
                  style={inputStyle}
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, phone: e.target.value })
                  }
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField('')}
                  required
                />
                <InputLabel
                  htmlFor="phone"
                  required
                  labelText={t('Skapamärken.Telefon')}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  isFocused={
                    focusedField === 'phone' || contactInfo.phone
                  }
                />
              </div>
            </div>
          </div>


          {/* Representation Options */}
           {/* Representation Options */}
           <div style={{ margin: '20px 0' }}>
            <h3>{t('I represent')}:</h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: screenWidth <600 ?'10px' : "22px", // Controls space between buttons
                marginTop: '20px',
                marginLeft: screenWidth <400 ? "-20px" : "0px",
                marginRight: screenWidth <400 ? "-20px" : "0px",
              }}
            >
              {representationOptions.map((option) => (
                <RepresentOption
                  key={option.id}
                  id={option.id}
                  name="represent"
                  value={option.value}
                  checked={contactInfo.represent === option.value}
                  onChange={(e) => setContactInfo({ ...contactInfo, represent: e.target.value })}
                  imageSrc={option.imageSrc}
                  labelText={option.labelText}
                  primaryColor={primaryColor}
                />
              ))}
            </div>
          </div>

          {/* Conditional Fields */}
          {(contactInfo.represent === 'Företag' || contactInfo.represent === 'Förening') && (
            <>
              {/* Organization Number */}
              <div style={{ padding: '10px' }}>
                <div style={inputContainerStyle}>
                  <input
                    type="text"
                    id="organizationNumber"
                    style={inputStyle}
                    value={contactInfo.organizationNumber}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, organizationNumber: e.target.value })
                    }
                    onFocus={() => setFocusedField('organizationNumber')}
                    onBlur={() => setFocusedField('')}
                    required
                  />
                  <InputLabel
                        htmlFor="organizationNumber"
                        //required
                        labelText={t('Organization Number')}
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                        isFocused={focusedField === 'organizationNumber' || contactInfo.organizationNumber}
                      />
                </div>
              </div>
              {/* Organization Name */}
              <div style={{ padding: '10px' }}>
                <div style={inputContainerStyle}>
                  <input
                    type="text"
                    id="organizationName"
                    style={inputStyle}
                    value={contactInfo.organizationName}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, organizationName: e.target.value })
                    }
                    onFocus={() => setFocusedField('organizationName')}
                    onBlur={() => setFocusedField('')}
                    required
                  />
                  <InputLabel
                    htmlFor="organizationName"
                    //required
                    labelText={t('Organization Name')}
                    primaryColor={primaryColor}
                    //secondaryColor={secondaryColor}
                    isFocused={focusedField === 'organizationName' || contactInfo.organizationName}
                  />
                </div>
              </div>
            </>
          )}
          {contactInfo.represent === 'Övrigt' && (
            <div style={{ padding: '10px' }}>
              <div style={inputContainerStyle}>
                <input
                  type="text"
                  id="otherRepresent"
                  style={inputStyle}
                  value={contactInfo.otherRepresent}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, otherRepresent: e.target.value })
                  }
                  onFocus={() => setFocusedField('otherRepresent')}
                  onBlur={() => setFocusedField('')}
                />
                <InputLabel
                  htmlFor="otherRepresent"
                  labelText={t('Please specify')}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  isFocused={focusedField === 'otherRepresent' || contactInfo.otherRepresent}
                />
              </div>
            </div>
          )}

          {/* Comment Field */}
          <div style={{ padding: '10px' }}>
          <div style={inputContainerStyle}>
            <textarea
              id="comment"
              ref={textareaRef}
              style={{
                ...inputStyle,
                resize: 'none',
                padding: '0 12px 12px 0',
              }}
              value={contactInfo.comment}
              onChange={(e) => setContactInfo({ ...contactInfo, comment: e.target.value })}
              required={selectedProduct?._id === "ovrigt" || selectedType?._id === "ovrigt"} // Make required for Övrigt
            />
            <InputLabel
              htmlFor="comment"
              labelText={selectedProduct?._id === "ovrigt" || selectedType?._id === "ovrigt"
                ? t('collect.Meddelande for Övrigt') // Custom label
                : t('collect.Meddelande')}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              isFocused={focusedField === 'comment' || contactInfo.comment}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            backgroundColor: primaryColor,
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px',
            fontSize: '16px',
            borderRadius: '5px',
          }}
        >
          {selectedProduct?._id === "ovrigt" || selectedType?._id === "ovrigt"
            ? t('Submit')
            : t('Sammanfatta order')}
        </button>
      </form>
    </div>
    );
  };

  // Step 7: Order Summary
  const renderOrderSummary = () => {
    if (step !== 7) return null;
    console.log('Files to be uploaded:', uploadFiles);
    return (
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ textAlign: 'left', marginBottom: '20px' }}>{t('Order Summary')}</h1>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <label style={{ marginRight: '10px' }}>{t('Price Mode')}:</label>
          <label className="createswitch">
            <input
              type="checkbox"
              checked={isVatIncluded}
              onChange={() => setIsVatIncluded(!isVatIncluded)}
            />
            <span className="createslider round"></span>
          </label>
          <span style={{ marginLeft: '10px' }}>
            {isVatIncluded ? t('Inklusive moms') : t('Exklusive moms')}
          </span>
        </div>


        <p>
          <strong>{t('Product')}:</strong> {selectedProduct?.name || t('Not selected')}
        </p>
        {selectedType && (
          <p>
            <strong>{t('Type')}:</strong> {selectedType.name}
          </p>
        )}
        <p>
          <strong>{t('Size (W x H)')}:</strong> {(width ? width:"undefined") + " x " + (height ? height :"undefined") + (selectedType.priceMatrixMeasurementUnit  && (" ("+selectedType.priceMatrixMeasurementUnit+")"))  || t('Not selected')}
        </p>
        <p>
          <strong>{t('Quantity')}:</strong> {exactNumber + " st" || t('Not selected')}
        </p>
        <p>
          <strong>{t('Price per unit')}:</strong>{' '}
          {selectedPriceEntry?.price ? `${selectedPriceEntry.price} kr` : t('Not selected')}
        </p>

        <p>
          <strong>{t('Pris för märken')}: </strong>{' '}
          {selectedPriceEntry?.price && exactNumber ? (
            isVatIncluded
              ? `${(selectedPriceEntry.price * exactNumber).toFixed(2)} kr (ex moms ${((selectedPriceEntry.price * exactNumber) / 1.25).toFixed(2)} kr)`
              : `${(selectedPriceEntry.price * exactNumber / 1.25).toFixed(2)} kr (inkl moms ${(selectedPriceEntry.price * exactNumber).toFixed(2)} kr)`
          ) : t('Not selected')}
        </p>


<br/>
        {selectedType?.neededInformation && (
  <div>
    <strong>{t('Additional Information')}:</strong>
    <ul>
      {selectedType.neededInformation.map((info) => (
        <li key={info.id} style={{ marginLeft: '30px' }}>
          <strong>{i18n.language === 'sv' ? info.name : info.engname}:</strong>{' '}
          {neededInfoData[info.id] ? (
            Array.isArray(neededInfoData[info.id])
              ? neededInfoData[info.id].join(', ')
              : neededInfoData[info.id].toString()
          ) : t('Not provided')}
        </li>
      ))}
    </ul>
  </div>
)}




        <p>_____________________________________________</p>

        <p>
          <strong>{t('Requested Delivery Date')}:</strong>{' '}
          {selectedDeliveryDate ? format(selectedDeliveryDate, 'yyyy-MM-dd') : t('Not selected')} (+
          {selectedDeliveryOption?.extraPrice || 0} kr)
        </p>
        <br/>
        {deliveryInfo.deliveryName && (
          <div>
              <strong>{t('Delivery Details')}: </strong> 

              <p style={{marginLeft: "15px"}}>
                {deliveryInfo.deliveryName}
              </p>
            
              <p style={{marginLeft: "15px"}}>
                 {deliveryInfo.deliveryAddress}
              </p>
            
              <p style={{marginLeft: "15px"}}>
                {deliveryInfo.deliveryZipTown}
              </p>
            
              <p style={{marginLeft: "15px"}}>
              <Flag code={deliveryInfo.deliveryCountry.value} height="16" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                {deliveryInfo.deliveryCountry.label}
              </p>
              </div>
            )}


       
       

<p>_____________________________________________</p>


        <p>
          <strong>{t('Contact Info')}:</strong>
        </p>
        <p style={{marginLeft: "15px"}}>
          {contactInfo.name}
        </p>
        <p style={{marginLeft: "15px"}}>
          {contactInfo.email}
        </p>
        <p style={{marginLeft: "15px"}}>
          {contactInfo.phone}
        </p>
<br/>

        <p>
  <strong>{t('Representation')}:</strong> {contactInfo.represent && contactInfo.represent}  {contactInfo.organizationName && "---" + contactInfo.organizationName}
</p>

{contactInfo.organizationNumber && (
  <p>
    <strong>{t('Organization Number')}:</strong> {contactInfo.organizationNumber}
  </p>
)}
{contactInfo.otherRepresent && (
  <p>
    <strong>{t('Other Representation')}:</strong> {contactInfo.otherRepresent}
  </p>
)}
{contactInfo.comment && <p>
  <strong>{t('Comment')}:</strong> {contactInfo.comment}
</p>}

<p>_____________________________________________</p>

<p><strong>{t('Leveranstid')}: </strong> +{selectedDeliveryOption?.extraPrice || 0} kr </p>
{selectedAddOns.length > 0 && (
          <div>
            <strong>{t('Add-Ons')}:</strong>
            <ul>
            {selectedAddOns.map((addOn) => {
              const service = (
                selectedType ? selectedType.addOnServices : selectedProduct.addOnServices
              )?.find((s) => s._id === addOn.serviceKey); // Changed _key to _id
              return (
                <li key={addOn.serviceKey} style={{marginLeft: "30px"}}>
                  <strong>{service?.name}:</strong> {addOn.option ? (
                    service.type === 'boolean'
                      ? `${t('Yes')} (+${addOn.option.price} kr)` // Display 'Yes' for boolean add-ons
                      : `${addOn.option.optionName} (+${addOn.option.price} kr)` // Display option name for singleChoice
                  ) : ''}
                </li>
              );
            })}
            </ul>
          </div>
        )}

<p style={{color: "#ccc"}}>_______________________</p>
<p>
  <strong>{t('Total Price')}:</strong> {formatPrice(totalPrice)}
</p>






{/* Display submission message */}
{message && (
        <div style={{ color: message.class === 'success' ? 'green' : 'red', marginTop: '20px' }}>
          {message.text}
        </div>
      )}


<div style={{ marginTop: '20px' }}>
  <ReCAPTCHA
    ref={recaptchaRef}
    sitekey={recaptchaKey}
    onChange={(token) => setReCaptchaToken(token)}
  />
</div>

      {/* Send Order Button */}
      <button
        onClick={submitOrder}
        disabled={submitting}
        style={{
          backgroundColor: primaryColor,
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px',
          fontSize: '16px',
          borderRadius: '5px',
        }}
      >
        
        {submitting ? t('Submitting...') : t('Send Order')}
      </button>






      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', paddingTop: '0px' }}>
      <Navbar announcements={announcements} release={release} productsss={productsss} />
      {renderProductSelection()}
      {renderTypeSelection()}
      
      
      {renderPriceMatrix()}
      {selectedType && renderUploadDesigns()}
      {renderNeededInformation()} 
      {renderDeliveryOptions()}
      {renderAddOns()}
      {renderContactInformation()}
      {renderOrderSummary()}
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product" && minovve != true && showproduct == true]';
  const productss = await client.fetch(query);
  const productsss = productss.map((product) => {
    return {
      ...product,
      hiddenLink: 'https://www.studentshoppen.com/studentlivet',
    };
  });

  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  const createproductQuery = '*[_type == "createproduct" && show == true]';
  const products = await createclient.fetch(createproductQuery);
  

  const createtypesQuery = `*[_type == "createtypes" && show == true]{
    ...,
    "addOnServices": addOnServices[]->{
      ...,
      options[]{
        ...
      }
    }
  }`;
  const types = await createclient.fetch(createtypesQuery);



  return {
    props: {
      productss: productsss,
      announcements,
      release,
      types,
      products,
    },
  };
};

export default Create;
