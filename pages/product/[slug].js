import React, { ChangeEvent, FormEvent, useRef, useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'; //find icons here: https://react-icons.github.io/react-icons/search?q=star
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs'; //find icons here: https://react-icons.github.io/react-icons/search?q=star
import {FaMinusSquare, FaPlusSquare } from 'react-icons/fa'; //find icons here: https://react-icons.github.io/react-icons/search?q=star
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import {  customStyles } from '../../components/filterPageUtils';
import { siteName, siteNameAlt2, siteEmail, siteInsta, siteFb } from '../../components/config';
import { useTranslation } from 'react-i18next';
import ImageEditPopup from '../../components/studentlivetadmin/ImageEditPopup';

import { client, urlFor } from '../../lib/client';
import Select from 'react-select'; // Add this line //SOURCE: https://react-select.com/styles

import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import profilePic from './ratingprofilepic.png'; // Import the image
import { parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

import { NextApiResponse } from 'next';




const ProductDetails = ({ product, products, ratingsData, announcements, fewleft, release }) => {
  const { id, image, name, details, price, previousprice, variations, tags, nameeng, detailseng, outOfStock, expectedRestockDate, backInStock } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, setQty, onAdd, onAddVariation, setShowCart } = useStateContext();
  const [t, i18n] = useTranslation("global");


  const [uploadImageWhere, setUploadImageWhere] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [uploadAspectRatio, setUploadAspectRatio] = useState(null);
  const [logoimageFile, setLogoimageFile] = useState(null);

  const [isModalOpenReview, setIsModalOpenReview] = useState(false);
  const [selectedReviewImage, setSelectedReviewImage] = useState(null);

  const [uploadedReviewImage, setUploadedReviewImage] = useState(null);

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



  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
  };


  const handleSaveEditedImage = (editedImage, wheretosave) => {
    //console.log("wheretosave" + wheretosave);
    if (wheretosave === "review"){
      setLogoimageFile(editedImage);
      //console.log("save in logo");
    } 
  
};


const handleRemoveImage = () => {
  setLogoimageFile(null);
};



  useEffect(() => {
    document.title = `${siteNameAlt2 && siteNameAlt2} | ${name}`;
  }, [name]); // Watch for changes in the 'name' prop

  const handleImageClick = (imageUrl) => {
    setSelectedReviewImage(imageUrl);
    setIsModalOpenReview(true);
  };

  const closeModalReview = () => {
    setIsModalOpenReview(false);
    setSelectedReviewImage(null);
  };

  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedVariationImgIndex, setSelectedVariationImgIndex] = useState(0);

  const handleVariationChange = (variation) => {
    /*console.log("handleVariationChange resault: "+variation)
    console.log("handleVariationChange name: "+variation.name)
    console.log("handleVariationChange image: "+ urlFor(variation.image).url())
    console.log(" urlFor(image && image[index]).url()) image: "+ urlFor(image && image[index]).url())*/

    // changes the image when selecting an option
    //console.log("Image index: " + image.findIndex((item) => urlFor(item).url() === urlFor(variation.image).url()));
    //todo -
    setIndex(image.findIndex((item) => urlFor(item).url() === urlFor(variation.image).url()));

    setSelectedVariationImgIndex(image.findIndex((item) => urlFor(item).url() === urlFor(variation.image).url()))
    setSelectedVariation(variation);
   //todo -console.log("selectedVariation resault: "+selectedVariation?.name)
   //todo -console.log("(selectedVariation?.image).url(): "+urlFor(selectedVariation?.image))
  };


  const [hasPatchesTag, setHasPatchesTag] = useState(false);

  // Use useEffect to check for the "patches" tag when the component mounts or when the tags prop changes
  
  const checkPatchesTag = () => {
    if (tags && tags.includes('patches') && !tags.includes('premium')) {
      setHasPatchesTag(true);
    } else {
      setHasPatchesTag(false);
    }
  };

  useEffect(() => {
    checkPatchesTag();
    setLogoimageFile(null);

}, [product]);




  useEffect(() => {
    setSelectedVariation(null);
    setIndex(0); //fixes error with 
    setLogoimageFile(null);
  }, []);

  useEffect(() => {
    setSelectedVariation(null);
    setIndex(0); //fixes error with 

  }, [product]);





  /* Use this red: bf0000  */

  const filteredRatings = ratingsData.filter((rating) => rating.productId === id);
  const totalRatings = filteredRatings.length;
  const sumRatings = filteredRatings.reduce((sum, rating) => sum + rating.rating, 0);
  const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(2) : 0;


  const handleCheckboxChange = () => {
    setSubscribeToNewsletter(!subscribeToNewsletter);
  };

  const setCacheControlHeaders = (res) => {
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
  };



  const [reviewdetails, setReviewdetails] = useState('');
  const [rating, setRating] = useState(0);
  const [displayname, setDisplayname] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const [heading, setHeading] = useState('');

  const [formSubmitted, setFormSubmitted] = useState("");
  const [expandedRatingId, setExpandedRatingId] = useState('');

  const handleShowMore = (ratingId) => {
    setExpandedRatingId(ratingId);
  };


  const [visibleReviews, setVisibleReviews] = useState(5);
  const handleLoadMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 5);
  };

  const sortReviewsByDate = (a, b) => { //Sorting date
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Sort in descending order (most recent to oldest)
  };
  const sortedRatings = [...filteredRatings].sort(sortReviewsByDate); //Sorting date

  //const shownRatings = filteredRatings.slice(0, visibleReviews); //unsorted
  const shownRatings = sortedRatings.slice(0, visibleReviews); //Sorting date
  
  const [showWriteReview, setShowWriteReview] = useState(false);

  const toggleWriteReview = () => {
    setShowWriteReview(!showWriteReview);
  };




/* Shuffle products */

  const [shuffledProducts, setShuffledProducts] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Shuffle the products array when it changes
    setShuffledProducts(shuffleArray(products.filter((product) => product.showproduct && !product.minovve)));
  }, [products]);


  
  
// Textresizearea____________________________________________________ //flytta till eget dokument om möjligt
  const textareaRef = useRef(null);
  // The value of the textarea
  const [value, setValue] = useState();
    // This function is triggered when textarea changes
  const textAreaChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setIndex(0); //fixes error with 

    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);
  // Textresizearea____________________________________________________

  useEffect(() => {
    // Filter variations to exclude those where showVariant is false
    const displayedVariations = variations?.filter((variation) => variation.showVariant !== false);
  
    if (displayedVariations && displayedVariations.length > 0) {
      setSelectedVariation(displayedVariations[0]);
      setIndex(
        image.findIndex(
          (item) => urlFor(item).url() === urlFor(displayedVariations[0].image).url()
        )
      );
    } else {
      setSelectedVariation(null);
      setIndex(0);
    }
  }, [variations]);
  const displayedVariations = variations?.filter((variation) => variation.showVariant !== false);
  
  


 // Determine out-of-stock status
 let isOutOfStock = outOfStock;

 // Check displayed variations for stock status
 if (displayedVariations && displayedVariations.length > 0) {
   const allDisplayedVariationsOutOfStock = displayedVariations.every(
     (variation) => variation.outOfStock
   );
   isOutOfStock = allDisplayedVariationsOutOfStock;
 }

 // Determine the expected restock date
 let restockDate = expectedRestockDate;

 if (isOutOfStock && displayedVariations && displayedVariations.length > 0) {
  const restockDates = displayedVariations
    .map((variation) => variation.expectedRestockDate)
    .filter((date) => date);
  if (restockDates.length > 0) {
    restockDate = restockDates.reduce((earliest, current) =>
      current < earliest ? current : earliest
    );
  }
}

const formatDate2 = (date) => {
    if (!date) return null;
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('sv-SE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };



  const handleReviewSubmit = async () => {
    event.preventDefault();
    // Perform any validation on the fields if necessary
    setFormSubmitted("skickar");

if (/* heading.trim() !== '' && reviewdetails.trim() !== '' &&  /*kräver rubrik och beskrivning*/ rating !== 0) { //all conditions need to be true
// if (heading.trim() !== '' || reviewdetails.trim() !== '' || rating !== 0) { // one of the conditions need to be true
const generateKey = (value) => value+Date.now()+Math.random().toString(36).substring(2, 15);

const generated_Id = generateKey("reviewid")
const generatedId = `rating-${Date.now()}`;
try {
  // Create the review entry in Sanity
  const createdDocument = await client.create({
    _type: 'productratings',
    _id: generated_Id,

    id: generatedId,
    date: new Date().toISOString().split('T')[0], 
    productId: product.id,
    name: displayname,
    age: age,
    email: email,
    subscribeToNewsletter: subscribeToNewsletter,
    heading: heading,
    details: reviewdetails,
    rating: rating,
  });

  //console.log('Document created:', createdDocument);

  if (logoimageFile) {
    // Upload the image to Sanity
    const imageAsset = await client.assets.upload('image', logoimageFile);

    //console.log('Image uploaded:', imageAsset);

    // Patch the review entry with the image reference
    const patchedDocument = await client.patch(generated_Id).set({
      productImage: [{
        _key: generateKey("review"),
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id }
      }]
    }).commit(); // Ensure to commit the patch

    //console.log('Document patched with image:', patchedDocument);
  }

  /*console.log('Review submission data:', {
    _id: generated_Id,
    
    id: generatedId,
    date: new Date().toISOString(),
    productId: product.id,
    name: displayname,
    age: age,
    email: email,
    subscribeToNewsletter: subscribeToNewsletter,
    heading: heading,
    details: reviewdetails,
    rating: rating,
  }); */
  
      // Clear the fields after successful submission
      setFormSubmitted("success");
      setReviewdetails('');
      setRating(0);
      setDisplayname('');
      setAge('');
      setEmail('');
      setSubscribeToNewsletter(false);
      setHeading('');
      setLogoimageFile("");
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      setFormSubmitted("error");

    }

  }
  else{
    setFormSubmitted("moreinfo");

  }
  }; 


  const handleBuyNow = () => {
    if (isOutOfStock) {
      return;
    }
    onAdd(product, qty, hasPatchesTag);
    setShowCart(true);
  }

  const handleAddToCart = () => {
    if (isOutOfStock) {
      return;
    }
    onAdd(product, qty, hasPatchesTag);
    console.log("product: " + JSON.stringify(product, null, 2));
    console.log("hasPatchesTag" + hasPatchesTag);

  }


  const handleAddToCartVariations = () => {
    if (!selectedVariation || selectedVariation.outOfStock) {
      return;
    }
    onAddVariation(product, qty, selectedVariation, selectedVariationImgIndex, hasPatchesTag);
  }
  
  const handleBuyNowVariations = () => {
    if (!selectedVariation || selectedVariation.outOfStock) {
      return;
    }
    onAddVariation(product, qty, selectedVariation, selectedVariationImgIndex, hasPatchesTag);
    setShowCart(true);
  }


  const elements = [];  
  let totalLength = 0;
  
  {i18n.language === "sv" || (!detailseng) ?
  (details &&
    Array.isArray(details) &&
    details.map((detail, index) => {
      const { _type, children, listItem, style, marks } = detail;
      const fullText = children.map((child) => child.text).join(' ');
  
      // Check the _type of the detail and apply appropriate styling
      if (_type === 'block') {
        if (listItem === 'bullet') {
          elements.push(
            <ul key={index} style={{ listStylePosition: "inside", paddingLeft: "0" }}>
              <li style={{ marginLeft: "0.5em" }}>{fullText}</li>
            </ul>
          );
        } else if (listItem === 'number') {
          elements.push(
            <ol key={index} style={{ listStylePosition: "inside", paddingLeft: "0" }}>
              <li style={{ marginLeft: "0.5em" }}>{fullText}</li>
            </ol>
          );
        } else if (style === 'normal') {
          let formattedText = fullText;
          if (children[0].marks && Array.isArray(children[0].marks)) {
            children[0].marks.forEach((mark) => {
              if (mark === 'strong') {
                formattedText = <strong>{formattedText}</strong>;
              } else if (mark === 'em') {
                formattedText = <em>{formattedText}</em>;
              } else if (mark === 'code') {
                formattedText = <code>{formattedText}</code>;
              }
            });
          }
  
          elements.push(<p key={index} className="regular-text">{formattedText}</p>);
        } else if (style === 'h1') {
          elements.push(<h1 key={index} className="heading-1">{fullText}</h1>);
        } else if (style === 'h2') {
          elements.push(<h2 key={index} className="heading-2">{fullText}</h2>);
        } else if (style === 'h3') {
          elements.push(<h3 key={index} className="heading-3">{fullText}</h3>);
        } else if (style === 'h4') {
          elements.push(<h4 key={index} className="heading-4">{fullText}</h4>);
        } else if (style === 'h5') {
          elements.push(<h5 key={index} className="heading-5">{fullText}</h5>);
        } else if (style === 'h6') {
          elements.push(<h6 key={index} className="heading-6">{fullText}</h6>);
        } else if (style === 'blockquote') {
          elements.push(<blockquote key={index}>{fullText}</blockquote>);
        } else if (style === 'blockComment') {
          elements.push(<p key={index} className="hidden-text">{fullText}</p>);
        } else {
          //console.log("running p");
          elements.push(
            <p key={index} className="regular-text">
              {fullText}
            </p>
          );
        }
  
        totalLength += fullText.length;
      }
  
      return elements;
  
    }).flat()
    ) : (
      
      detailseng &&
      Array.isArray(detailseng) &&
      detailseng.map((detailseng, index) => {
        const { _type, children, listItem, style, marks } = detailseng;
        const fullText = children.map((child) => child.text).join(' ');
    
        // Check the _type of the detail and apply appropriate styling
        if (_type === 'block') {
          if (listItem === 'bullet') {
            elements.push(
              <ul key={index} style={{ listStylePosition: "inside", paddingLeft: "0" }}>
                <li style={{ marginLeft: "0.5em" }}>{fullText}</li>
              </ul>
            );
          } else if (listItem === 'number') {
            elements.push(
              <ol key={index} style={{ listStylePosition: "inside", paddingLeft: "0" }}>
                <li style={{ marginLeft: "0.5em" }}>{fullText}</li>
              </ol>
            );
          } else if (style === 'normal') {
            let formattedText = fullText;
            if (children[0].marks && Array.isArray(children[0].marks)) {
              children[0].marks.forEach((mark) => {
                if (mark === 'strong') {
                  formattedText = <strong>{formattedText}</strong>;
                } else if (mark === 'em') {
                  formattedText = <em>{formattedText}</em>;
                } else if (mark === 'code') {
                  formattedText = <code>{formattedText}</code>;
                }
              });
            }
    
            elements.push(<p key={index} className="regular-text">{formattedText}</p>);
          } else if (style === 'h1') {
            elements.push(<h1 key={index} className="heading-1">{fullText}</h1>);
          } else if (style === 'h2') {
            elements.push(<h2 key={index} className="heading-2">{fullText}</h2>);
          } else if (style === 'h3') {
            elements.push(<h3 key={index} className="heading-3">{fullText}</h3>);
          } else if (style === 'h4') {
            elements.push(<h4 key={index} className="heading-4">{fullText}</h4>);
          } else if (style === 'h5') {
            elements.push(<h5 key={index} className="heading-5">{fullText}</h5>);
          } else if (style === 'h6') {
            elements.push(<h6 key={index} className="heading-6">{fullText}</h6>);
          } else if (style === 'blockquote') {
            elements.push(<blockquote key={index}>{fullText}</blockquote>);
          } else if (style === 'blockComment') {
            elements.push(<p key={index} className="hidden-text">{fullText}</p>);
          } else {
            //console.log("running p");
            elements.push(
              <p key={index} className="regular-text">
                {fullText}
              </p>
            );
          }
    
          totalLength += fullText.length;
        }
    
        return elements;
    
      }).flat()
      )
  }







    const [selectedFilter, setSelectedFilter] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const filterOptions = [
      { value: 'all', label: t("productslug.Alla recensioner") },
      { value: 'written', label: t("productslug.Endast med text") },
    ];


    const handleFilterChange = (selectedOption) => {
      const selectedValue = selectedOption.value; //for old select: const selectedValue = event.target.value;
      setSelectedFilter(selectedValue);
  
      switch (selectedValue) { // image template ratio 1:2.18 (tex 4032x1851)
        case 'all':
          setFilteredProducts(allReviews);
          break;
        case 'written':
          setFilteredProducts(writtenReviews);
          break;
      }
    };
    
    const allReviews = 
    shownRatings.filter((reviews) => reviews)
    .sort((a, b) => {
      if (a.importance === undefined && b.importance === undefined) {return 0;}
      if (a.importance === undefined) {return 1;}
      if (b.importance === undefined) {return -1;}
      return a.importance - b.importance; 
    }); //.reverse()
  
    const writtenReviews =       
    shownRatings.filter((reviews) => reviews.heading || reviews.details)    
    .sort((a, b) => {
      if (a.importance === undefined && b.importance === undefined) {return 0;}
      if (a.importance === undefined) {return 1;}
      if (b.importance === undefined) {return -1;}
      return a.importance - b.importance; 
    }); //.reverse()
  
      let displayedReviews;
let headingText;

switch (selectedFilter) {
  case 'all':
    displayedReviews = allReviews;
    headingText = t("productslug.Alla recensioner");
    break;
  case 'written':
    displayedReviews = writtenReviews;
    headingText = t("productslug.Endast med text");
    break;
}

useEffect(() => {
  // Trigger AdSense ads after the component has mounted
  (window.adsbygoogle = window.adsbygoogle || []).push({});
}, []);

const handleInputChange = (setter) => (e) => {
  setter(e.target.value);
  setFormSubmitted("");
};



const renderPurchaseSection = () => {
  // Check if selected variation is out of stock
  const variationOutOfStock = selectedVariation && selectedVariation.outOfStock;
  // Use the restock date from the selected variation or fall back to the product's restock date
  const selectedRestockDate = selectedVariation?.expectedRestockDate || restockDate;


  return (
    <div>
       {displayedVariations && displayedVariations.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <h2>
            {t("productslug.Varianter")}{" "}
            {i18n.language === "sv" || !selectedVariation?.nameeng
              ? selectedVariation?.name
              : selectedVariation?.nameeng}
          </h2>
          <div className="variation-buttons">
            {displayedVariations.map((variation) => (
              <div
                key={variation.name}
                className={`variation-button ${
                  selectedVariation === variation ? "selected" : ""
                } ${variation.outOfStock ? "disabled" : ""}`}
              >
                <input
                  type="radio"
                  id={variation.name}
                  name="variation"
                  value={variation.name}
                  checked={selectedVariation === variation}
                  onChange={() => handleVariationChange(variation)}
                  // Allow selecting out-of-stock variants
                  // Remove 'disabled' attribute to make all variants selectable
                />
                <label htmlFor={variation.name}>
                  {i18n.language === "sv" || !variation?.nameeng
                    ? variation?.name
                    : variation?.nameeng}
                { /* {variation.outOfStock && " - " + t("product.tillfälligtSlut")} */}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

{variationOutOfStock && (
        <div
          className="out-of-stock-overlay"
          style={{
            position: "relative",
            marginTop: "15px",
            marginBottom: "-15px",

            width: "100%",
            maxWidth: "300px",
            height: "auto",
            padding: "10px",
            backgroundColor: "rgba(128, 128, 128, 0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <p
            style={{
              fontSize: "1.5em",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t("product.tillfälligtSlut")}
          </p>
          {selectedRestockDate && (
            <p
              style={{
                marginTop: "5px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "14px",
              }}
            >
              {t("product.expectedRestockDate", {
                date: formatDate(selectedRestockDate),
              })}
            </p>
          )}
        </div>
      )}

      <div style={{ display: "flex" }}>
        <p
          className="price"
          style={{
            marginRight: "15px",
            color: previousprice ? "red" : " #324d67",
          }}
        >
          {variations && variations.length > 0 && !selectedVariation?.name && (
            <span style={{ color: "#324d67" }}>{t("productslug.Från")} </span>
          )}
          {i18n.language === "sv"
            ? !selectedVariation
              ? price + t("universal.currency")
              : selectedVariation.price + t("universal.currency")
            : !selectedVariation
            ? t("universal.currency") + price / 10
            : t("universal.currency") + selectedVariation.price / 10}
        </p>

        {previousprice && (
          <p
            className="price previous-price-style"
            style={{ color: "#324d67" }}
          >
            {i18n.language === "sv"
              ? selectedVariation && selectedVariation.previousprice !== undefined
                ? selectedVariation.previousprice + t("universal.currency")
                : previousprice + t("universal.currency")
              : selectedVariation && selectedVariation.previousprice !== undefined
              ? t("universal.currency") + selectedVariation.previousprice / 10
              : t("universal.currency") + previousprice / 10}{" "}
          </p>
        )}
      </div>

      {/* Display out-of-stock overlay when selected variation is out of stock */}
      


{isOutOfStock && (
        <div
          className="out-of-stock-overlay"
          style={{
            position: "relative",
            marginTop: "10px",
            width: "100%",
            height: "auto",
            padding: "10px",
            backgroundColor: "rgba(128, 128, 128, 0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          >
            <p
              style={{
                fontSize: '1.5em',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {t('product.tillfälligtSlut')}
            </p>
            {restockDate && (
              <p
                style={{
                  marginTop: '5px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: "14px",
                }}
              >
                {t('product.expectedRestockDate', {
                  date: formatDate(restockDate),
                })}
              </p>
            )}
          </div>
        )}

      <div className="quantity">
        <h3>{t("productslug.Antal")}</h3>
        <p className="quantity-desc">
          <span className="minus" onClick={decQty}>
            <AiOutlineMinus />
          </span>
          <span className="num">{qty}</span>
          <span className="plus" onClick={incQty}>
            <AiOutlinePlus />
          </span>
        </p>
      </div>

      <div className="buttons">
        {variations && variations.length > 0 ? (
          <>
            <button
              type="button"
              disabled={!selectedVariation || selectedVariation.outOfStock}
              className={
                !selectedVariation ? "add-to-cart":
                selectedVariation.outOfStock
                  ? "add-to-cart-nostock"
                  : "add-to-cart"
              }
              onClick={handleAddToCartVariations}
            >
              {t("productslug.LäggKundvagn")}
            </button>
            <button
              type="button"
              disabled={!selectedVariation || selectedVariation.outOfStock}
              className={
                !selectedVariation ? "buy-now" :
                  selectedVariation.outOfStock
                  ? "buy-now-nostock"
                  : "buy-now"
              }
              onClick={handleBuyNowVariations}
            >
              {t("productslug.Köp nu")}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={isOutOfStock ? "add-to-cart-nostock" : "add-to-cart"}
              onClick={handleAddToCart}
            >
              {t("productslug.LäggKundvagn")}
            </button>
            <button
              type="button"
              className={isOutOfStock ? "buy-now-nostock" : "buy-now"}
              onClick={handleBuyNow}
            >
              {t("productslug.Köp nu")}
            </button>
          </>
        )}
      </div>
    </div>
  );
};












  return (
    <div>
    <Navbar announcements={announcements} release={release} productsss={products}/>
    <div className="product-detail-container">
      <div>
        <div className="image-container">
          <img src={urlFor(image && image[index >= (image?.length || 0) ? 0 : index])} className="product-detail-image" alt="Product image" />
          {/* Out-of-Stock Overlay */}
          
        </div>
        <div className="small-images-container">
          {image?.map((item, i) => (
            <div key={i} className="image-wrapper">
              <img
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
                alt="Product image"
              />
            </div>
          ))}
        </div>
      </div>

        <div className="product-detail-desc">
          <h1>{i18n.language === "sv" || !nameeng  ? name : nameeng} {hasPatchesTag && " "+ t("universal.imärke")}</h1>
          {/* <h2> {hasPatchesTag.toString()}</h2>*/}

          {/*<div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p style={{marginTop:"-7px" }}>
              (20)
            </p>
          </div> */}

          <div className="reviews" style={{ maxWidth: "450px"}}>
          <div >
              {Array.from({ length: 5 }, (_, index) => {
                if (index < Math.floor(averageRating)) {
                  return <BsStarFill key={index} />;
                } else if (
                  index === Math.floor(averageRating) &&
                  averageRating % 1 >= 0.75
                ) {
                  return <BsStarFill key={index} />;
                } else if (
                  index === Math.floor(averageRating) &&
                  averageRating % 1 >= 0.25 &&
                  averageRating % 1 < 0.75
                ) {
                  return <BsStarHalf key={index} />;
                } else {
                  return <BsStar key={index} />;
                }
              })}
            </div>

            <p className="product-price" style={{marginTop:"-4px" }}>{averageRating}</p>
            <p style={{ marginTop: '-6px' }}>{`(${totalRatings})`}</p>
          

            { product.fewleft &&
            <div className="fewleft-slug hidesmall">
              <p className="tag-text-slug" style={{color: "white"}}>{t("product.tagFå kvar")}</p>
            </div>
          }
            { hasPatchesTag &&
            <div className="orange-box-slug hidesmall">
              <p className="tag-text-slug" style={{color: "var(--buymorebutton)"}}>{t("productslug.Köp 10")}</p>
            </div>
          }
          
    
          </div>
<div className='infodealboxes hidebig' >
  <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
          { hasPatchesTag &&
            <div className="orange-box-slug">
              <p className="tag-text-slug" style={{color: "var(--buymorebutton)"}}>{t("productslug.Köp 10")}</p>
            </div>
          }
          { product.fewleft &&
            <div className="fewleft-slug">
              <p className="tag-text-slug" style={{color: "white"}}>{t("product.tagFå kvar")}</p>
            </div>
          }
</div>
</div>









{totalLength > 700 && renderPurchaseSection()}


          <h3 className="product-price-color" style={{marginTop:"20px", marginBottom:"-3px"}}>{t("productslug.Produktdetaljer")} </h3>
          
          <div className="my-4">
  
          {elements}

          


              
          </div>
          


          <div className="orange-info-box">
    </div>





      {/*ALternative out of stock */}
 {/*
{isOutOfStock && (
            <div
              className="out-of-stock-overlay"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: 'auto',
                padding: '10px',
                backgroundColor: 'rgba(128, 128, 128, 0.8)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <p
                style={{
                  fontSize: '1.5em',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {t('product.tillfälligtSlut')}
              </p>
              {restockDate && (
                <p
                  style={{
                    marginTop: '5px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: "14px",
                  }}
                >
                  {t('product.expectedRestockDate', {
                    date: formatDate(restockDate),
                  })}
                </p>
              )}
            </div>
          )}
*/}

    {renderPurchaseSection()}
  </div>
      </div>



      <div className="maylike-products-wrapper">
          <h2>{t("productslug.AndraPopulära")}</h2>
          <div className="marquee">
            <div className="maylike-products-container track"> {/* ta bort track för att bilderna ska vara still */}

              {shuffledProducts               //.reverse()
              .map((item) => (
                item.id !== id && (
                <div  key={item.id} style={{ marginRight: '10px' }}>
                <Product key={item.id} product={item} ratingsData={ratingsData}/>
                </div>
                )
              ))}
            </div>
          </div>
      </div>


      <ins className="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-5860074326686436"
     data-ad-slot="3101164220"
     data-ad-format="auto"
     data-full-width-responsive="true">
  </ins>


<section className="reviewsectiondiv">
  <div className={showWriteReview ? "expandborder" : "notexpandedborder"} onClick={toggleWriteReview} style={{marginLeft: "10px",marginRight: "10px" }}>
    <h1 className="cooltitle other-reviews-flex" style={{marginBottom: "-20px"}}>
    {t("productslug.Betygsätt")}
      <div style={{ fontSize: "35px", color: "var(--primarycolor)", marginLeft: "10px", marginRight: "10px", marginTop: "20px", }}>
        {showWriteReview ? <FaMinusSquare /> : <FaPlusSquare />}
      </div>
    </h1>
  </div>

  {showWriteReview && (
    <form className="contact-form reviewrow" style={{ paddingBottom: "20px", borderBottom: "1px solid var(--primarycolor)", borderLeft: "1px solid var(--primarycolor)", borderRight: "1px solid var(--primarycolor)", marginLeft: "10px", marginRight: "10px", width: "auto" }}>
  {formSubmitted === "success" && (<h4 style={{ color: 'green' }}>{t("productslug.TackRecension")}</h4>)}
  {formSubmitted === "error" && (<h4 style={{ color: 'red' }}>{t("productslug.ErrorRecension")}</h4>)}
  {formSubmitted === "moreinfo" && (<h4 style={{ color: 'orange' }}>{t("productslug.skickades ej")}</h4>)}
  {formSubmitted === "skickar" && (<h4 style={{ color: 'orange' }}>{t("productslug.Skickar")}</h4>)}

  <div className="form-row">
    <div className="form-field" style={{ flex: 1 }}>
      <input 
        type="text" 
        placeholder=" " 
        className="input-text" 
        onChange={handleInputChange(setDisplayname)} 
        id="name" 
        value={displayname} 
        maxLength={40} 
      />
      <label className="label">
        <h4 className='product-price-color'><span style={{ color: 'var(--primarycolor)' }}></span>{t("Skapamärken.Namn")} </h4>
      </label>
    </div>

    <div style={{ marginLeft: '10px' }}>
      <div className="form-field" style={{ width: "70px" }}>
        <input 
          type="text" 
          pattern="[0-9]*" 
          inputMode="numeric" 
          maxLength={3} 
          placeholder=" " 
          className="input-text" 
          onChange={(e) => { const inputAge = parseInt(e.target.value); handleInputChange(setAge)(e); }} 
          id="age" 
          value={age} 
        />
        <label className="label">
          <h4 className='product-price-color'><span style={{ color: 'var(--primarycolor)' }}></span>{t("productslug.Ålder")}</h4>
        </label>
      </div>
    </div>
  </div>

  <div className="form-field" style={{ width: "100%", marginBottom: "0px" }}>
    <input 
      type="text" 
      placeholder=" " 
      className="input-text" 
      onChange={handleInputChange(setEmail)} 
      id="email" 
      value={email} 
      maxLength={70} 
    />
    <label className="label">
      <h4 className='product-price-color'><span style={{ color: 'var(--primarycolor)' }}></span>Email <span style={{ fontSize:"10px"}}>(frivilligt - visas ej på hemsidan)</span></h4>
    </label>
  </div>

  <div className="form-field" style={{ width: "100%" }}>
    <input 
      type="text" 
      placeholder=" " 
      className="input-text" 
      onChange={handleInputChange(setHeading)} 
      id="heading" 
      value={heading} 
      maxLength={50} 
    />
    <label className="label">
      <h4 className='product-price-color'><span style={{ color: 'var(--primarycolor)' }}></span>{t("productslug.Rubrik")}</h4>
    </label>
  </div>

  <div className="form-field" style={{ marginTop: "10px" }}>
    <textarea 
      className="input-text noresize-textarea" 
      onChange={handleInputChange(setReviewdetails)} 
      id="message"  
      value={reviewdetails} 
      ref={textareaRef} 
      onInput={textAreaChange} 
      maxLength={1500} 
    />
    <label className="label">
      <h4 className='product-price-color'><span style={{ color: 'var(--primarycolor)' }}></span>{t("productslug.Recension")}</h4>
    </label>
  </div>

  <div>
    <h4 className='product-price-color' style={{ fontSize: "18px", marginLeft: "10px", marginBottom: "5px" }}><span style={{ color: 'var(--primarycolor)' }}>*</span>{t("productslug.Betyg")}</h4>
    <div style={{ display: 'flex', alignItems: 'center' }} required>
      {[1, 2, 3, 4, 5].map((value) => (
        <BsStarFill
          key={value}
          onClick={() => { setRating(value); setFormSubmitted(""); }}
          color={rating >= value ? 'var(--primarycolor)' : 'gray'}
          size={22}
          style={{ cursor: 'pointer' }}
        />
      ))}
      <p className="product-price product-price-color" style={{ marginTop: "1px", marginLeft: "5px", fontSize: "18px" }}>{rating}/5</p>
    </div>
  </div>

  <div className="form-field" style={{ marginBottom: '20px', marginTop: '50px' }}>  
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <h4 className='product-price-color' style={{ margin: '0' }}>Ladda upp bild:</h4>
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
        <button 
          type="button" 
          onClick={() => { setUploadImageWhere("review"); setShowEditPopup(true); setUploadAspectRatio(1); setFormSubmitted(""); }} 
          style={{ marginLeft: screenWidth < 500 ? "11px" : "111px", padding: '10px 20px', borderRadius: '4px', backgroundColor: 'var(--primarycolor)', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Upload Image
        </button>
      </div>
    </div>
    {logoimageFile && (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <img 
          src={URL.createObjectURL(logoimageFile)} 
          className="product-image"   
          width={screenWidth < 500 ? 250 : 350} 
          height={screenWidth < 500 ? 250 : 350} 
          alt="Product front image" 
        />
        <button 
          type="button" 
          onClick={handleRemoveImage} 
          style={{ marginTop: '10px', padding: '5px 10px', borderRadius: '4px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Remove Image
        </button>
      </div>
    )}
  </div>


  {formSubmitted === "success" && (<h4 style={{ color: 'green' }}>{t("productslug.TackRecension")}</h4>)}
  {formSubmitted === "error" && (<h4 style={{ color: 'red' }}>{t("productslug.ErrorRecension")}</h4>)}
  {formSubmitted === "moreinfo" && (<h4 style={{ color: 'orange' }}>{t("productslug.skickades ej")}</h4>)}
  {formSubmitted === "skickar" && (<h4 style={{ color: 'orange' }}>{t("productslug.Skickar")}</h4>)}

  <button onClick={handleReviewSubmit} className="buy-now" style={{ marginTop: "20px", marginLeft: "0px" }}>{formSubmitted === "skickar" ? t("productslug.Skickar") : t("productslug.Skicka")}</button>
</form>
  )}
</section>


  <div   className="get-in-touch other-reviews" style={{ cursor: "auto", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "-10px"}}  /*onClick={toggleWriteReview} */>
    <h1 className="cooltitle other-reviews-flex" >{t("productslug.RecensionAndra")}
    {/*<div style={{ fontSize: "35px", color: "var(--primarycolor)", marginLeft: "10px", marginRight: "10px", marginTop: "20px" }}>{showWriteReview ? <FaMinusSquare /> :  <FaPlusSquare />}</div> /* Todo dont work*/}
  </h1></div>

  <div style={{width: "200px", margin: "10px auto 0 auto" }}>
<Select // Replace the standard HTML select with react-select component
          value={{ value: selectedFilter, label: headingText }}
          options={filterOptions}
          onChange={handleFilterChange}
          isSearchable={false}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: 10,
            colors: {
              ...theme.colors,
              primary25: 'var(--primarycolor)',
              primary: 'var(--secondarycolor)',
            },/**/
          })}
        />
    </div>


<div className="reviews-container" style={{paddingLeft: "10px", paddingRight: "10px", }}>
{displayedReviews//shownRatings
  .map((rating, index) => (
    
    <div key={index} className="review-item">

    <div  style={{display: "flex", alignItems: "center"}}>
      <img src="/assets/ratingprofilepic2.png" alt="Profile Picture" style={{width:"40px", height:"auto", display: "inline-block", 
      filter: "invert(57%) sepia(99%) saturate(379%) hue-rotate(354deg) brightness(93%) contrast(88%)",}} /> {/* https://codepen.io/sosuke/pen/Pjoqqp */}

      {/* <p>ID: {rating.id}</p> */}
      <h4 className="product-price-color" style={{ display: "inline-block", margin: "0 10px", overflowWrap: 'break-word' }}>
      {rating.name ? String(rating.name).substring(0, 40) : t("productslug.Anonym")}
      {rating.age &&", " +String(rating.age).substring(0, 3) + t("productslug.år")} 
      </h4>
      {/* <p>Product ID: {rating.productId}</p> */}
    </div>

    <div className="reviews">
    <div >
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>
            {i < rating.rating ? (
              <BsStarFill />
            ) : (
              <BsStar />
            )}
          </span>
        ))}
        </div >          
        <p className="product-price" style={{marginTop:"2px" }}>{rating.rating}/5</p>
        <p className="product-price" style={{marginTop:"0px", marginLeft:"10px", color: "darkgray" }}>{formatDate(rating.date)}</p>
        

      </div>
      {/*<p>Email: {rating.email}</p>
      <p>Subscribe to Newsletter: {rating.subscribeToNewsletter ? 'Yes' : 'No'}</p> */}
      {rating.heading && (<h4 style={{ overflowWrap: 'break-word' }} className="product-price-color">{String(rating.heading).substring(0, 50)}</h4>)}
      
      {/* review details*/}
      {rating.details && (<p style={{ overflowWrap: 'break-word' }} className="product-price-color">
            {rating.id === expandedRatingId
              ? String(rating.details).substring(0, 1500)
              : String(rating.details).substring(0, 500)} 
              { rating.details.length > 500 && rating.id !== expandedRatingId && (<a onClick={() => handleShowMore(rating.id)} style={{ marginTop: '10px', color: "var(--primarycolor)", cursor: "pointer" }}>{t("productslug.Visa mer")}</a>)}
              
          </p>)} 
{/* review bild*/}
          {rating.productImage && (
          <>
          <p className="product-price-color" style={{ fontStyle: 'italic', marginTop:"15px" }}>{t("productslug.Bild")}:</p>
          <img 
          src={urlFor(rating.productImage[0]).url()}           
          width={150} // Adjust image width based on screen width
          height={150} // Adjust image height based on screen width
          className="product-image"
          alt="Product front image"
          style={{ cursor: 'pointer' }}
          onClick={() => handleImageClick(urlFor(rating.productImage[0]).url())}
        />
          </>

            )}


      <br/>
    </div>
  ))}
</div>
{showEditPopup && ( //todo todo todo , få till hela review funktionen
        <ImageEditPopup 
          isOpen={showEditPopup}
          onClose={handleCloseEditPopup} 
          onSave={(editedImage, savelocation) => handleSaveEditedImage(editedImage, savelocation)} 
          saveimagelocation={uploadImageWhere}
          uploadAspectRatio={uploadAspectRatio}
        />
      )}


{isModalOpenReview && selectedReviewImage && (
        <div>
          <div onClick={closeModalReview}
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

          <div className="modal" style={{zIndex: 10000, borderRadius: "15px", display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', width: '80%', maxHeight:"700px", maxWidth: "700px", minHeight:"300px", minWidth: "300px"  }}>
            <img src={selectedReviewImage} style={{ width: '100%', height: '100%', position: "relative" }} alt="Enlarged review image" />
            <FontAwesomeIcon className="cart-icon" style={{ width: "30px", position: 'absolute', top: '10px', right: '12px', cursor: 'pointer' }} id="bar" onClick={closeModalReview} icon={faTimes} />
          </div>
        </div>
  )}


    <div className="load-more-container">
    {shownRatings.length < filteredRatings.length && (
            <button className="buy-now" style={{marginTop: "-10px", width:"150px"}} onClick={handleLoadMoreReviews}>{t("productslug.Mer Recensioner")}</button>
          )}
    </div>


    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product" && minovve != true && showproduct == true] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product?.slug?.current || ''
    }
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // Redirect to homepage if the slug is "sjaelvfoersvarsspray"
  if (slug === 'sjaelvfoersvarsspray') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const query = `*[_type == "product" && minovve != true && showproduct == true && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product" && minovve != true && showproduct == true]';
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  const ratingsQuery = '*[_type == "productratings"]';
  const ratingsData = await client.fetch(ratingsQuery);

  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { products, product, ratingsData, announcements, release },
    revalidate: 10,
  };
};


export default ProductDetails