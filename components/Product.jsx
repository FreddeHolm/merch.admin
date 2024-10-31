import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

import { urlFor } from '../lib/client';
import { useStateContext } from './../context/StateContext';
import { useTranslation } from 'react-i18next';


const Product = ({ product: { id, image, name, nameeng, slug, price, previousprice, variations, tags, fewleft, newproduct, outOfStock, backInStock,
  expectedRestockDate,  }, ratingsData } ) => {
 
  const [t, i18n] = useTranslation("global");

  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

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

  const [hasPatchesTag, setHasPatchesTag] = useState(false);

  const checkPatchesTag = () => {
    if (tags && tags.includes('patches') && !tags.includes('premium')) {
      setHasPatchesTag(true);
    } else {
      setHasPatchesTag(false);
    }
  };

  useEffect(() => {
    checkPatchesTag();
  }, [tags]);

  const handleBuyNow = () => {
    onAdd({ id, image, name, nameeng, slug, price, previousprice }, 1, hasPatchesTag);
    setShowCart(true);
  };

  const handleAdd = () => {
    onAdd({ id, image, name, nameeng, slug, price, previousprice }, 1, hasPatchesTag);
  };

  // Calculate average rating
  const filteredRatings = ratingsData.filter((rating) => rating.productId === id);
  const totalRatings = filteredRatings.length;
  const sumRatings = filteredRatings.reduce((sum, rating) => sum + rating.rating, 0);
  const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(2) : 0;

  const MAX_NAME_LENGTH = screenWidth <= 550 ? 17 : 30; // Set the maximum length for the product name

  const translatedName =
    i18n.language === 'sv'
      ? name
        ? name
        : ''
      : nameeng
      ? nameeng
      : name
      ? name
      : '';

  const translatedAmdJaspatchName = hasPatchesTag
    ? translatedName + ' ' + t('universal.imärke')
    : translatedName;

  const truncatedName =
    translatedAmdJaspatchName.length > MAX_NAME_LENGTH
      ? translatedAmdJaspatchName.substring(0, MAX_NAME_LENGTH) + '...'
      : translatedAmdJaspatchName;

  if (!slug?.current) {
    return null; // Skip rendering if the slug is not defined
  }

  // Determine out-of-stock status
  let isOutOfStock = outOfStock;

  // Check variations for stock status
  if (variations && variations.length > 0) {
    const allVariationsOutOfStock = variations.every((variation) => variation.outOfStock);
    isOutOfStock = allVariationsOutOfStock;
  }

  // Determine the expected restock date
  let restockDate = expectedRestockDate;

  if (isOutOfStock && variations && variations.length > 0) {
    const restockDates = variations
      .map((variation) => variation.expectedRestockDate)
      .filter((date) => date);
    if (restockDates.length > 0) {
      restockDate = restockDates.reduce((earliest, current) =>
        current < earliest ? current : earliest
      );
    }
  }

  const formatDate = (date) => {
    if (!date) return null;
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('sv-SE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="entireproduct">
      <Link href={`/product/${slug.current}`}>
        <div
          className="product-card"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ position: 'relative' }}
        >
          {/* Existing tags and badges */}
          {fewleft && screenWidth <= 550 && (
            <div
              className="fewleft"
              style={{ marginTop: '0px', right: '0px', zIndex: 20, position: 'absolute' }}
            >
              <p className="tag-text " style={{ color: 'white' }}>
                {t('product.tagFå kvar')}
              </p>
            </div>
          )}


          {backInStock && (
            <div
              className="newproduct"
              style={{ marginTop: '0px', left: '0px', zIndex: 21, position: 'absolute' }}
            >
              <p className="tag-text " style={{ color: 'white' }}>
                {t('product.tillbaka i lager')}
              </p>
            </div>
          )}
         
          {newproduct && (
            <div
              className="newproduct"
              style={{ marginTop: '0px', left: '0px', zIndex: 20, position: 'absolute' }}
            >
              <p className="tag-text " style={{ color: 'white' }}>
                {t('product.tagNyhet')}
              </p>
            </div>
          )}

          {/* Product Image */}
          {image && image[0] ? (
            <img
              src={
                isHovering && image[1] ? urlFor(image[1]).url() : urlFor(image[0]).url()
              }
              width={screenWidth <= 550 ? 150 : 250}
              height={screenWidth <= 550 ? 150 : 250}
              className="product-image"
              alt="Product front image"
            />
          ) : (
            <img
              src="/assets/noimageavailable.jpg"
              width={screenWidth <= 550 ? 150 : 250}
              height={screenWidth <= 550 ? 150 : 250}
              className="product-image"
              alt="No image available"
            />
          )}

          {/* Out-of-Stock Overlay */}
          {isOutOfStock && (
  <div
    className="out-of-stock-overlay"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',  // Centers the div in both axes
      width: '100%',  // Adjust the width to cover the image
      height: 'auto',  // The height will adjust based on content
      padding: '10px',  // Add some padding for a better look
      backgroundColor: 'rgba(128, 128, 128, 0.8)',  // Slightly darker background
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      //borderRadius: '10px',  // Adds rounded corners
      whiteSpace: 'nowrap',  // Ensures text doesn't wrap
      overflow: 'hidden',  // Hides overflow content
      textOverflow: 'ellipsis',  // Adds ellipsis to overflowing text
    }}
  >
    <p
      style={{
        fontSize: '1.5em',
        margin: 0,
        whiteSpace: 'nowrap',  // Prevent text from breaking into multiple lines
        overflow: 'hidden',  // Hide any overflow
        textOverflow: 'ellipsis',  // Add ellipsis if the text overflows
      }}
    >
      {t('product.tillfälligtSlut')}
    </p>
    {restockDate && (
      <p
        style={{
          marginTop: '5px',
          whiteSpace: 'nowrap',  // Prevent text from breaking into multiple lines
          overflow: 'hidden',  // Hide any overflow
          textOverflow: 'ellipsis',  // Add ellipsis if the text overflows
          fontSize: "14px"
        }}
      >
        {t('product.expectedRestockDate', {
          date: formatDate(restockDate),
        })}
      </p>
    )}
  </div>
)}

          {/* Other Elements */}
          {(hasPatchesTag && previousprice && screenWidth <= 550) || 
          (hasPatchesTag && variations && variations.length > 0   && screenWidth <= 550) && (
            <div
              className="orange-box"
              style={{ marginTop: '-30px', right: '0px', zIndex: 20, position: 'absolute' }}
            >
              <p className="tag-text " style={{ color: 'var(--buymorebutton)' }}>
                {t('product.tagtenfor')}
              </p>
            </div>
          )}

          <p className="product-name">{truncatedName}</p>

          {/* Price and Discount */}
          <div style={{ display: 'flex' }}>
            {variations && variations.length > 0 && (
              <p className="product-price ">
                <span style={{ color: '#324d67' }}>{t('product.textfrån')}&nbsp; </span>
              </p>
            )}
            <p
              className="product-price"
              style={{ marginRight: '10px', color: previousprice ? 'red' : ' #324d67' }}
            >
              {i18n.language === 'sv'
                ? price + t('universal.currency')
                : t('universal.currency') + price / 10}
            </p>
            {previousprice && (
              <p className="product-price previous-price-style-small">
                {i18n.language === 'sv'
                  ? previousprice + t('universal.currency')
                  : t('universal.currency') + previousprice / 10}
              </p>
            )}

            {hasPatchesTag &&
              (previousprice === '' ||
                previousprice === null ||
                previousprice === undefined ||
                (previousprice && screenWidth >= 551))
                 && (

                  !(hasPatchesTag && variations && variations.length > 0   && screenWidth <= 550) && (


                <div className="orange-box">
                  <p className="tag-text " style={{ color: 'var(--buymorebutton)' }}>
                    {t('product.tagtenfor')}
                  </p>
                </div>)
              )}
          </div>

          {/* Ratings and Reviews */}
          <div className="reviews">
            {totalRatings > 0 ? (
              <>
                <div style={{ height: '21px' }}>
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

                <p className="product-price" style={{ marginTop: '-4px' }}>
                  {averageRating}
                </p>
                {screenWidth >= 551 && (
                  <p style={{ marginTop: '-6px' }}>{`(${totalRatings})`}</p>
                )}
              </>
            ) : (
              <div style={{ height: '21px' }}>
                <p style={{ marginTop: '-4px', color: '#dcdcdc' }}>
                 {/* {t('universal.Inga betyg än')} */}
                </p>
              </div>
            )}
            {fewleft && screenWidth >= 551 && (
              <div className="fewleft" style={{ marginLeft: 'auto' }}>
                <p className="tag-text " style={{ color: 'white' }}>
                  {t('product.tagFå kvar')}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Purchase Button */}
      <div className="buttons" style={{ position: 'relative', textAlign: 'center', marginTop: "-13px" }}> {/*marginTop: "-10px"  */}
        {isOutOfStock ? (
          <button
            type="button"
            className="purchasebuttons"
            style={{
              backgroundColor: 'gray',
              color: 'white',
              border: "1px gray solid"
            }}
          >
            {t('product.buttonTillfälligtSlut')}
          </button>
        ) : variations && variations.length > 0 ? (
          <Link href={`/product/${slug.current}`}>
            <button type="button" className="purchasebuttons">
              {t('product.buttonVarianter')}
            </button>
          </Link>
        ) : (
          <button
            type="button"
            className="purchasebuttons"
            style={{ backgroundColor: 'var(--primarycolor)', color: 'white' }}
            onClick={handleAdd}
          >
            {t('product.buttonLägg till')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;





{/* 
  
  
      <div className="parent-container">
      <div className="privacy-policy-container">
       
       <div> <h1 style={{ textAlign: 'center', marginTop: '20px', color: "var(--secondarycolor)" }}>{t("collect.Hämta i Linköping")}</h1></div> 

      
  
    
        <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '50px',
          marginBottom: '-45px',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
       
       {cartItems.length >= 1 && (     
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <span className="heading" style={{ color: "var(--secondarycolor)", fontSize: '24px', fontWeight: 'bold' }}>
            {t("cart.Din kundvagn")}
          </span>
          <span className="cart-num-items" style={{ marginLeft: '5px' }}>
            ({totalQuantities} {t("cart.varor")})
          </span>
        </div>
        )}
    
        {cartItems.length >= 1 && (     
          <div
          onClick={() => {
            setCartItems([]);
            setTotalQuantities(0);
            setTotalPrice(0);
            setNoDiscountTotalPrice(0);
          }}
          className='trashcanicon'
          style={{
            cursor: 'pointer',
          }}
        >
          <BsTrash3
            style={{
              color: "var(--primarycolor)",
              fontSize: "24px",
            }}
          />
        </div>
      )}
      </div>
    
    
    {cartItems.length >= 1 && (
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '10px',
          marginBottom: '-6px',
          paddingLeft: '20px',
          paddingRight: '20px',
          position: "absolute"
        }}
      >
        
      </div>
    )}
  
  
  
  */}