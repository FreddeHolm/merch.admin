import React, { ChangeEvent, FormEvent, useRef, useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'; //find icons here: https://react-icons.github.io/react-icons/search?q=star
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs'; //find icons here: https://react-icons.github.io/react-icons/search?q=star
import {FaMinusSquare, FaPlusSquare } from 'react-icons/fa'; //find icons here: https://react-icons.github.io/react-icons/search?q=star
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import {  customStyles } from '../../components/filterPageUtils';
import { siteName, siteNameAlt2, siteEmail, siteInsta, siteFb } from '../../components/config';
import { useTranslation } from 'react-i18next';


import { client, urlFor } from '../../lib/client';
import Select from 'react-select'; // Add this line //SOURCE: https://react-select.com/styles

import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import profilePic from './ratingprofilepic.png'; // Import the image
import { parseISO } from 'date-fns';

import { NextApiResponse } from 'next';

const ProductDetails = ({ product, products, ratingsData, announcements, fewleft, release }) => {
  const { id, image, name, details, price, previousprice, variations, tags, nameeng, detailseng } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, setQty, onAdd, onAddVariation, setShowCart } = useStateContext();
  const [t, i18n] = useTranslation("global");


  useEffect(() => {
    document.title = `${siteNameAlt2 && siteNameAlt2} | ${name}`;
  }, [name]); // Watch for changes in the 'name' prop


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

}, [product]);




  useEffect(() => {
    setSelectedVariation(null);
    setIndex(0); //fixes error with 

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

    try {
      await client.create({
        _type: 'productratings',
        
        ...{
        id: `rating-${Date.now()}`,
        date: new Date().toISOString().split('T')[0], 
        productId: product.id,
        name: displayname,
        age: age,
        email: email,
        subscribeToNewsletter: subscribeToNewsletter,
        heading: heading,
        details: reviewdetails,
        rating: rating,}

        

      });
  
      console.log({
        id: `rating-${Date.now()}`,
        date: new Date().toISOString(),  //new Date().toISOString().split('T')[0]
        productId: product.id,
        name: displayname,
        age: age,
        email: email,
        subscribeToNewsletter: subscribeToNewsletter,
        heading: heading,
        details: reviewdetails,
        rating: rating,}
      );
  
      // Clear the fields after successful submission
      setFormSubmitted("success");
      setReviewdetails('');
      setRating(0);
      setDisplayname('');
      setAge('');
      setEmail('');
      setSubscribeToNewsletter(false);
      setHeading('');
      
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
    onAdd(product, qty, hasPatchesTag);
    setShowCart(true);
  }

  const handleAddToCart = () => {
    onAdd(product, qty, hasPatchesTag);

    
  }


  const handleAddToCartVariations = () => {
    onAddVariation(product, qty, selectedVariation, selectedVariationImgIndex, hasPatchesTag);

  }
  
  const handleBuyNowVariations = () => {
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
          console.log("running p");
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
            console.log("running p");
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

  return (
    <div>
    <Navbar announcements={announcements} release={release} productsss={products}/>
      <div className="product-detail-container">
      <div>
  <div className="image-container">
    <img src={urlFor(image && image[index >= (image?.length || 0) ? 0 : index])} className="product-detail-image" alt="Product image" />
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

{ totalLength > 700 && 
<div>       
{variations && variations.length > 0 && (
        <div style={{marginTop: "10px"}}>
          <h2>{t("productslug.Varianter")} {i18n.language === "sv" || !selectedVariation?.nameeng  ? selectedVariation?.name : selectedVariation?.nameeng}</h2>
          <div className="variation-buttons">
            {variations.map((variation) => (
              <div key={variation.name} className={`variation-button ${selectedVariation === variation ? 'selected' : ''}`}>
                <input
                  type="radio"
                  id={variation.name}
                  name="variation"
                  value={variation.name}
                  checked={selectedVariation === variation}
                  onChange={() => handleVariationChange(variation)}
                />
                <label htmlFor={variation.name}>{i18n.language === "sv" || !variation?.nameeng  ? variation?.name : variation?.nameeng} </label>
              </div>
            ))}
          </div>
        </div>
      )}

          <div style={{display: "flex"}}>
            <p className="price" style={{ marginRight: "15px", color: previousprice ? "red" : " #324d67"}} >
              {variations && variations.length > 0 && !selectedVariation?.name && (<span style={{ color: "#324d67" }}>{t("productslug.Från")} </span>) } 
              {/* alternative todo {variations && variations.length > 0 && !selectedVariation?.name ? (<span style={{ color: "#324d67" }}>Från </span>) : (<>{selectedVariation?.name && (<span style={{ color: "#324d67" }}>{selectedVariation.name}: </span>)}</>)} */}
              {i18n.language === "sv" ? (!selectedVariation ? price+t("universal.currency") : selectedVariation.price+t("universal.currency")) : (!selectedVariation ? t("universal.currency")+price/10 : t("universal.currency")+selectedVariation.price/10)}</p>
              
              {previousprice && (<p className="price previous-price-style" style={{ color: "#324d67"}}>
                {i18n.language === "sv" ? (selectedVariation && selectedVariation.previousprice !== undefined ? selectedVariation.previousprice +t("universal.currency") : previousprice +t("universal.currency")) : (selectedVariation && selectedVariation.previousprice !== undefined ? t("universal.currency")+selectedVariation.previousprice/10 : t("universal.currency")+previousprice/10)} </p> )}
            {/*todo {previousprice && (<p className="price previous-price-style" style={{ color: "#324d67"}}>{!selectedVariation?.name ? previousprice : selectedVariation.previousprice} kr</p> )} */}


            
          </div>
          <div className="quantity">
            <h3>{t("productslug.Antal")}</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          {variations && variations.length > 0 ? 
            <div className="buttons">
              <button type="button" disabled={!selectedVariation ? true : false} className="add-to-cart" onClick={handleAddToCartVariations}>{t("productslug.LäggKundvagn")}</button>
              <button type="button" disabled={!selectedVariation ? true : false} className="buy-now" onClick={handleBuyNowVariations}>{t("productslug.Köp nu")}</button>
            </div>
          :
            <div className="buttons">
              <button type="button"  className="add-to-cart" onClick={handleAddToCart}>{t("productslug.LäggKundvagn")}</button>
              <button type="button"  className="buy-now" onClick={handleBuyNow}>{t("productslug.Köp nu")}</button>
            </div>
          }
  </div>
        }  


          <h3 className="product-price-color" style={{marginTop:"20px", marginBottom:"-3px"}}>{t("productslug.Produktdetaljer")} </h3>
          
          <div className="my-4">
  
          {elements}

          


              {i18n.language === "sv" ? ((id === "1684686741829" || id === "1684686752010") &&<div><br/><h6  className="heading-6">Produkttest:</h6> <p>Se vårat egna test och läs mer <a className="text-link-style" ><Link href="/test"  >här!</Link></a></p></div>)
              :((id === "1684686741829" || id === "1684686752010") &&<div><br/><h6  className="heading-6">Product Test:</h6><p>Check out our own test and read more <a className="text-link-style" ><Link href="/test" >here!</Link></a></p></div>)}
          </div>
          


          <div className="orange-info-box">
    </div>

    {variations && variations.length > 0 && (
        <div style={{marginTop: "30px"}}>
 <h2>{t("productslug.Varianter")} {i18n.language === "sv" || !selectedVariation?.nameeng  ? selectedVariation?.name : selectedVariation?.nameeng}</h2>
          <div className="variation-buttons">
            {variations.map((variation) => (
              <div key={variation.name} className={`variation-button ${selectedVariation === variation ? 'selected' : ''}`}>
                <input
                  type="radio"
                  id={variation.name}
                  name="variation"
                  value={variation.name}
                  checked={selectedVariation === variation}
                  onChange={() => handleVariationChange(variation)}
                />
                <label htmlFor={variation.name}>{i18n.language === "sv" || !variation?.nameeng  ? variation?.name : variation?.nameeng} </label>
              </div>
            ))}
          </div>
        </div>
      )}

          <div style={{display: "flex"}}>
            <p className="price" style={{ marginRight: "15px", color: previousprice ? "red" : " #324d67"}} >
              {variations && variations.length > 0 && !selectedVariation?.name && (<span style={{ color: "#324d67" }}>{t("productslug.Från")} </span>) } 
              {/* alternative todo {variations && variations.length > 0 && !selectedVariation?.name ? (<span style={{ color: "#324d67" }}>Från </span>) : (<>{selectedVariation?.name && (<span style={{ color: "#324d67" }}>{selectedVariation.name}: </span>)}</>)} */}
              {i18n.language === "sv" ? (!selectedVariation ? price+t("universal.currency") : selectedVariation.price+t("universal.currency")) : (!selectedVariation ? t("universal.currency")+price/10 : t("universal.currency")+selectedVariation.price/10)}</p>
              
              {previousprice && (<p className="price previous-price-style" style={{ color: "#324d67"}}>
                {i18n.language === "sv" ? (selectedVariation && selectedVariation.previousprice !== undefined ? selectedVariation.previousprice +t("universal.currency") : previousprice +t("universal.currency")) : (selectedVariation && selectedVariation.previousprice !== undefined ? t("universal.currency")+selectedVariation.previousprice/10 : t("universal.currency")+previousprice/10)} </p> )}
            {/*todo {previousprice && (<p className="price previous-price-style" style={{ color: "#324d67"}}>{!selectedVariation?.name ? previousprice : selectedVariation.previousprice} kr</p> )} */}


            
          </div>
          <div className="quantity">
            <h3>{t("productslug.Antal")}</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          {variations && variations.length > 0 ? 
            <div className="buttons">
              <button type="button" disabled={!selectedVariation ? true : false} className="add-to-cart" onClick={handleAddToCartVariations}>{t("productslug.LäggKundvagn")}</button>
              <button type="button" disabled={!selectedVariation ? true : false} className="buy-now" onClick={handleBuyNowVariations}>{t("productslug.Köp nu")}</button>
            </div>
          :
            <div className="buttons">
              <button type="button"  className="add-to-cart" onClick={handleAddToCart}>{t("productslug.LäggKundvagn")}</button>
              <button type="button"  className="buy-now" onClick={handleBuyNow}>{t("productslug.Köp nu")}</button>
            </div>
          }
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
    <form className="contact-form reviewrow" style={{ paddingBottom: "20px", borderBottom: "1px solid var(--primarycolor)", borderLeft: "1px solid var(--primarycolor)", borderRight: "1px solid var(--primarycolor)", marginLeft: "10px", marginRight: "10px", width: "auto"  }}>
      {formSubmitted === "success" && (<h4 style={{ color: 'green' }}>{t("productslug.TackRecension")}</h4>)}
      {formSubmitted === "error" && (<h4 style={{ color: 'red' }}>{t("productslug.ErrorRecension")}</h4>)}
      {formSubmitted === "moreinfo" && (<h4 style={{ color: 'orange' }}>{t("productslug.skickades ej")}</h4>)}
      {formSubmitted === "skickar" && (<h4 style={{ color: 'orange' }}>{t("productslug.Skickar")}</h4>)}

      <div className="form-row">
        <div className="form-field" style={{ flex: 1 }}>
          <input type="text" placeholder=" " className="input-text" onChange={(e) => setDisplayname(e.target.value)} id="name" value={displayname} maxLength={40} />
          <label className="label"><h4 className='product-price-color'><span style={{ color: 'var(--primarycolor)' }}></span>{t("Skapamärken.Namn")} </h4></label>
        </div>

        <div style={{ marginLeft: '10px' }}>
          <div className="form-field" style={{ width: "70px" }}>
            <input type="text" pattern="[0-9]*" inputMode="numeric" maxLength={3} placeholder=" " className="input-text" onChange={(e) => { const inputAge = parseInt(e.target.value); if (!isNaN(inputAge)) { setAge(Math.abs(inputAge)); } else { setAge(""); } }} id="age" value={age} />
            <label className="label"><h4 className='product-price-color'><span style={{ color: 'var(--primarycolor)' }}></span>{t("productslug.Ålder")}</h4></label>
          </div>
        </div>
      </div>

      <div className="form-field" style={{ width: "100%" }}>
        <input type="text" placeholder=" " className="input-text" onChange={(e) => setHeading(e.target.value)} id="heading" value={heading} maxLength={50}  />
        <label className="label"><h4 className='product-price-color'><span style={{ color: 'var(--primarycolor)' }}></span>{t("productslug.Rubrik")}</h4></label>
      </div>

      <div className="form-field" style={{ marginTop: "10px" }}>
        <textarea className="input-text noresize-textarea" onChange={(e) => setReviewdetails(e.target.value)} id="message"  value={reviewdetails} ref={textareaRef} onInput={textAreaChange} maxLength={1500} />
        <label className="label"><h4 className='product-price-color'><span style={{ color: 'var(--primarycolor)' }}></span>{t("productslug.Recension")}</h4></label>
      </div>

      <div>
        <h4 className='product-price-color' style={{ fontSize: "18px", marginLeft: "10px", marginBottom: "5px" }}><span style={{ color: 'var(--primarycolor)' }}>*</span>{t("productslug.Betyg")}</h4>
        <div style={{ display: 'flex', alignItems: 'center' }} required>
          {[1, 2, 3, 4, 5].map((value) => (
            <BsStarFill
              key={value}
              onClick={() => setRating(value)}
              color={rating >= value ? 'var(--primarycolor)' : 'gray'}
              size={22}
              style={{ cursor: 'pointer' }}
            />
          ))}
          <p className="product-price product-price-color" style={{ marginTop: "1px", marginLeft: "5px", fontSize: "18px" }}>{rating}/5</p>
        </div>
      </div>

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
      {rating.details && (<p style={{ overflowWrap: 'break-word' }} className="product-price-color">
            {rating.id === expandedRatingId
              ? String(rating.details).substring(0, 1500)
              : String(rating.details).substring(0, 500)} 
              { rating.details.length > 500 && rating.id !== expandedRatingId && (<a onClick={() => handleShowMore(rating.id)} style={{ marginTop: '10px', color: "var(--primarycolor)", cursor: "pointer" }}>{t("productslug.Visa mer")}</a>)}
              
          </p>)} 


      <br/>
    </div>
  ))}
</div>
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
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product?.slug?.current || ''
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && minovve != true && showproduct == true && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product" && minovve != true && showproduct == true]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  const ratingsQuery = '*[_type == "productratings"]';
  const ratingsData = await client.fetch(ratingsQuery);

  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  
  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  console.log(product);

  return {
    props: { products, product, ratingsData, announcements, release },
    revalidate: 10,
  }
}


export default ProductDetails