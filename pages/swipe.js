import React, { useEffect, useState, useRef, useMemo  } from 'react';
import dynamic from 'next/dynamic';
import { siteNameAlt2,siteInsta, insta  } from '../components/config';
import Navbar from '../components/Navbar';
import { useTranslation } from 'react-i18next';
import { client, urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';
import IconButton from "@material-ui/core/IconButton";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FlashOnIcon from "@material-ui/icons/FlashOn";
import FilterIcon from "@material-ui/icons/Filter";

import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import NavigateNext from "@material-ui/icons/NavigateNext";
import CircularProgress from '@material-ui/core/CircularProgress';  // Import a spinner component
//import TinderCard from 'react-tinder-card'
import { toast } from 'react-hot-toast';
import throttle from 'lodash.throttle';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineShopping,  } from 'react-icons/ai';
import { BsStarFill, BsStarHalf, BsStar, BsInfoCircle } from 'react-icons/bs';

//https://www.youtube.com/watch?v=Q70IMS-Qnjk


import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";



//all bellow works after :) 
//




let TinderCard;
if (typeof window !== "undefined") {
  TinderCard = require("react-tinder-card");
}
 
/*
const TinderCard = dynamic(() => import('react-tinder-card'), {
    ssr: false, // This disables server-side rendering for this component
});
 */


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const getRandomPatchCount = () => {
    const random = Math.random();
    if (random < 0.05) return 3;  // 5% chance for 3 patches
    if (random < 0.25) return 1;  // 20% chance for 1 patch
    return 2;  // 75% chance for 2 patches
};

const structureProducts = (products) => {
    let patches = products.filter(product => product.tags.includes('patches'));
    let nonPatches = products.filter(product => !product.tags.includes('patches'));

    patches = shuffleArray(patches);
    nonPatches = shuffleArray(nonPatches);

    let structuredProducts = [];

    while (patches.length > 0 || nonPatches.length > 0) {
        // Add up to 2 patches
        for (let i = 0; i < 2 && patches.length > 0; i++) {
            structuredProducts.push(patches.shift());
        }

        // Add 1 non-patch
        if (nonPatches.length > 0) {
            structuredProducts.push(nonPatches.shift());
        }
    }

    return structuredProducts;
};

const Tinderclone = ({ announcements, release, products, ratingsData }) => {
    const { cartItems, setCartItems, setTotalQuantities, setTotalPrice, setNoDiscountTotalPrice, onAdd, onAddVariation } = useStateContext();
    const [t, i18n] = useTranslation("global");
    const [loading, setLoading] = useState(true);
    const [lastDirection, setLastDirection] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const [staticShuffledProducts, setStaticShuffledProducts] = useState([]);  // Static shuffled products
    //const [structuredProducts, setStructuredProducts] = useState([]);
    
    const [selectedVariant, setSelectedVariant] = useState({});
    const [renderCards, setRenderCards] = useState(false);
    const [addedProducts, setAddedProducts] = useState(new Set());
    const processedCards = useRef(new Set());
    const swipeDirections = useRef({});
    const [itemsToLoad, setItemsToLoad] = useState(10);

    const [screenWidth, setScreenWidth] = useState(0);

    const [shuffledProductsConst, setShuffledProductsConst] = useState([]);

    const {  setShowCart } = useStateContext();


    //const [structuredProducts, setStructuredProducts] = useState(products.slice(-20)); // Load last 20 products first
    const [currentStartIndex, setCurrentStartIndex] = useState(products.length - 20); 
    const [unswipedCount, setUnswipedCount] = useState();
    const [timesExpanded, setTimesExpanded] = useState(0);

    const structuredProductsRef = useRef(products.slice(-20)); // Load last 20 products first
const [structuredProducts, setStructuredProducts] = useState(); // Sync with state


const [itemQuantity, setItemQuantity] = useState(1);

const decreaseQuantity = () => {
    setItemQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };
  
  const increaseQuantity = () => {
    setItemQuantity(prevQuantity => prevQuantity + 1);
  };
  
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue < 1) {
        setItemQuantity(1);
    } else {
        setItemQuantity(parsedValue);
    }
  };

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

    const childRefs = useMemo(
        () =>
            Array(products.length)
                .fill(0)
                .map(() => React.createRef()),
        [products.length]
    );

    useEffect(() => {
        document.title = `${siteNameAlt2} | ${t("footer.Om oss")}`;
        const structured = structureProducts(products);
        structuredProductsRef.current = structured.reverse();
        const initialProducts = structured.slice(-20); // Adjust the number as needed
        
        setStructuredProducts(initialProducts);
        setCurrentIndex(initialProducts.length - 1);
        setLoading(false);
        setRenderCards(true);
    }, []);


    useEffect(() => {
        // Prepend the new products at the top
        setStructuredProducts((prevProducts) => [
            ...shuffledProductsConst.slice(0, itemsToLoad),  // Get the new set of products
            ...prevProducts  // Keep the previous products below
        ]);
    }, [shuffledProductsConst, itemsToLoad]);


    const swiped = (direction, swipedProductId, index) => {
        setLastDirection(direction);
        setCurrentIndex(index - 1);
    

        // Store the direction and product ID for this card's index
        swipeDirections.current[index] = { direction, swipedProductId };
    };


    useEffect(() => {
      // Initialize selected variants for products with variations
      const initialSelectedVariants = {};
      products.forEach((product) => {
        if (product.variations && product.variations.length > 0) {
          // Filter out hidden variants
          const visibleVariations = product.variations.filter(
            (variation) => variation.showVariant !== false  && variation.outOfStock !== true
          );
          if (visibleVariations.length > 0) {
            initialSelectedVariants[product.id] = visibleVariations[0];
          }
        }
      });
      setSelectedVariant(initialSelectedVariants);
    
      // ... rest of your useEffect code
    }, [products]);




      const addToCart = (product, quantity, selectedVariation = null, hasPatchesTag = false, selectedVariationImgIndex = 0) => {
        console.log('Adding to cart:', {
          product,
          quantity,
          selectedVariation,
          selectedVariationImgIndex,
          hasPatchesTag
        });
        
      
        setCartItems((prevCartItems) => {
          let updatedCartItems = [...prevCartItems];
          let productIdentifier = product.id;
      
          // Add variation name to the identifier if a variant is selected
          if (selectedVariation) {
            productIdentifier += selectedVariation.name;
          }
      
          const existingProductIndex = updatedCartItems.findIndex(item => item.id === productIdentifier);
      
          // Determine the image to be used
          const imageUrl = selectedVariation?.image?.asset
            ? urlFor(selectedVariation.image).url()
            : product.image && product.image[selectedVariationImgIndex]
              ? urlFor(product.image[selectedVariationImgIndex]).url()
              : null;
      console.log("imageUrl " + imageUrl);

              selectedVariationImgIndex = selectedVariation ? selectedVariationImgIndex : 0 ;


          if (existingProductIndex >= 0) {
            // Update the quantity of the existing product
            updatedCartItems[existingProductIndex].quantity = quantity;
          } else {
            // Add the new product to the cart
            const newProduct = {
              ...product,
              id: productIdentifier,
              quantity,
              hasPatchesTag,
              price: selectedVariation ? selectedVariation.price : product.price,
              previousprice: selectedVariation ? selectedVariation.previousprice : product.previousprice,
              selectedVariation,
              selectedVariationImgIndex,
              imageUrl,
            };
            updatedCartItems.push(newProduct);
          }
      
          // Update totals
          const newTotalQuantity = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
          const newTotalPrice = updatedCartItems.reduce((total, item) => total + item.quantity * item.price, 0);
          const noDiscountPrice = updatedCartItems.reduce((total, item) => total + item.quantity * (item.previousprice ?? item.price), 0);
      
          // Update the state
          setTotalQuantities(newTotalQuantity);
          setTotalPrice(newTotalPrice);
          setNoDiscountTotalPrice(noDiscountPrice);
      
          // Store the cart content in local storage
          localStorage.setItem("cartcontent", JSON.stringify(updatedCartItems));
      
          return updatedCartItems;
        });
      
        toast.success(`${quantity} ${product.name} added to the cart.`);
      };




      

      const loadProducts = () => {
        const newProducts = structuredProductsRef.current.slice(0, currentStartIndex); // Get the next 20 products a

        //const newProducts = structuredProductsRef.current.slice(0, currentStartIndex);

        
        console.log("is running loadProducts"); //structuredProducts
      
        setStructuredProducts(prevProducts => {
          const combinedProducts = [
              ...newProducts,  // Add new products to the top
              ...prevProducts  // Keep previously unswiped products
          ];
  
          // Get the length of the combined array
          const combinedLength = combinedProducts.length;
          console.log("Length of combined array:", combinedLength);
  
          // Return the combined array to update state
          return combinedProducts;
      });


        setCurrentIndex(currentIndex + currentStartIndex + 5)
        setCurrentStartIndex(0);  // Update the starting index for the next load
      };





    // Throttle the loadAllRemainingProducts function after defining it
    const throttledLoadAllRemainingProducts = useMemo(
        () => throttle(loadProducts, 200000000), 
        []
    );

    const selectedVariantRef = useRef(selectedVariant);

    useEffect(() => {
      selectedVariantRef.current = selectedVariant;
    }, [selectedVariant]);

    const itemQuantityRef = useRef(itemQuantity);

    useEffect(() => {
        itemQuantityRef.current = itemQuantity;
      }, [itemQuantity]);

      const outOfFrame = async (name, idx) => {
        const { direction, swipedProductId } = swipeDirections.current[idx];
        const swipedProduct = products.find(product => product.id === swipedProductId);
      
        // Get the selected variant directly from the ref
        let selectedVar = selectedVariantRef.current[swipedProductId];
      
        // Ensure that a variant is selected before proceeding
        if (!selectedVar && swipedProduct.variations) {
          console.error('No variant selected for product:', swipedProduct.name);
          return;
        }
      
        // Create a unique identifier for the product and selected variant
        let cardIdentifier = swipedProductId;
        if (selectedVar) {
          cardIdentifier += selectedVar.name;
        }
        // Remove idx from cardIdentifier to prevent duplicate additions
        // cardIdentifier += idx; // Comment out or remove this line
      
        // If swiped right and the product hasn't been processed, add to cart
        if (direction === 'right' && !processedCards.current.has(cardIdentifier)) {
          processedCards.current.add(cardIdentifier);
      
          // Use the ref to get the latest quantity
          addToCart(
            swipedProduct,
            itemQuantityRef.current,
            selectedVar,
            swipedProduct.tags.includes('patches')
          );
        }
      
        setCurrentIndex(idx - 1);
        setUnswipedCount(structuredProducts.length - (idx - 1));
        setItemQuantity(1);

        if (((structuredProducts.length - (idx - 1)) > 15 && currentStartIndex > 0 && timesExpanded === 0)) {
            console.log("Loading more products");

            setTimesExpanded(1);

            throttledLoadAllRemainingProducts();
        }
    };









    const handleImageClick = (product, direction) => {
        const productId = product.id;
        setCurrentImageIndex(prevState => {
          const currentIndex = prevState[productId] || 0;
          const variantHasImage = selectedVariant[productId]?.image ? true : false;
          const productImagesCount = product.image ? product.image.length : 0;
          const totalImages = variantHasImage ? 1 + productImagesCount : productImagesCount;
      
          if (totalImages === 0) return prevState;
      
          const nextIndex =
            direction === 'next'
              ? (currentIndex + 1) % totalImages
              : (currentIndex - 1 + totalImages) % totalImages;
      
          return { ...prevState, [productId]: nextIndex };
        });
      };

    const goBack = async () => {
        if (currentIndex < structuredProducts.length - 1) {
            const newIndex = currentIndex + 1;
            const cardRef = childRefs[newIndex]?.current;

            if (cardRef && typeof cardRef.restoreCard === 'function') {
                try {
                    await cardRef.restoreCard();
                    setCurrentIndex(newIndex);
                } catch (error) {
                    console.error('Failed to restore card:', error);
                }
            } else {
                console.warn('Restore card function is not available.');
            }
        }
    };

    const handleVariantChange = (productId, variant) => {
        const newSelectedVariant = { ...selectedVariant };
        newSelectedVariant[productId] = { ...variant }; // Create a copy of the variant object
        setSelectedVariant(newSelectedVariant);
      
        // Reset image index to 0 when variant is changed
        setCurrentImageIndex(prevState => ({ ...prevState, [productId]: 0 }));
      };

    const renderVariantSelector = (product) => {
        const { variations } = product;
        const productId = product.id;
        
        if (!variations || variations.length === 0) {
          return null; // No variations to display
        }
      
        // Filter out hidden variants
        const visibleVariations = variations.filter(
          (variation) => variation.showVariant !== false && variation.outOfStock !== true
        );
      
        const selectedVar =
          selectedVariant[productId] ||
          (visibleVariations && visibleVariations.length > 0
            ? visibleVariations[0]
            : null);
        return (
          visibleVariations && visibleVariations.length > 0 && (
            <div style={{ position: "relative", top: "213px",
                zIndex: 9999, // Ensure it's on top of other elements
                textAlign: 'center',
                pointerEvents: 'auto', // Allow touch/click interaction

             }}>
              <h2 style={{
                overflow: "hidden",
                fontSize: "14px",
                textAlign: 'center',
                color: "white",
                padding: "4px 14px",
                backgroundColor: "var(--secondarycolor)",
                display: "inline-block",
                margin: "0 auto",
                pointerEvents: 'auto', // Allow touch/click interaction
              }}>
                <span style={{ color: "var(--primarycolor)" }}>{t("productslug.Varianter")}</span> {i18n.language === "sv" || !selectedVar?.nameeng ? selectedVar?.name : selectedVar?.nameeng}
              </h2>
              <div className="variation-buttons" style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '5px',
                maxWidth: '250px',
                margin: '0 auto',
                pointerEvents: 'auto', // Allow touch/click interaction
              }}>
                {visibleVariations.map((variation) => (
                 <div key={variation.name} className={`${selectedVar?.name === variation.name ? 'selected' : ''}`} style={{
                    flex: '0 1 calc(25% - 5px)',
                   
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {/* Custom radio button */}
                    
                    <input
                    type="radio"
                    id={variation.name}
                    name={`variation-${productId}`}
                    value={variation.name}
                    checked={selectedVar?.name === variation.name}
                    onChange={() => handleVariantChange(productId, variation)} // Standard onChange for desktop & mobile
                    style={{
                        display: 'none', // Hide the default radio button
                      }}
                    />
                     <label
                        htmlFor={variation.name}
                        onClick={(e) => {
                        e.stopPropagation(); // Prevent event from bubbling up
                        handleVariantChange(productId, variation);
                        }}
                        onTouchStart={(e) => {
                        e.stopPropagation(); // Prevent event from bubbling up
                        handleVariantChange(productId, variation);
                        }}
                        style={{
                        display: 'block',
                        textAlign: 'center',
                        padding: '5px 10px',
                        backgroundColor: selectedVar?.name !== variation.name ? 'var(--secondarycolor)' : 'var(--primarycolor)',
                        color: selectedVar?.name !== variation.name ? 'var(--primarycolor)' : 'var(--secondarycolor)',
                        border: selectedVar?.name !== variation.name ? '1px solid var(--primarycolor)' : '1px solid var(--secondarycolor)',
                        borderRadius: '5px',
                        userSelect: 'none',
                        cursor: 'pointer',
                        fontSize: "11px",
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap', // Ensure ellipsis is added
                        width: '100%', // Ensures full label is clickable
                        pointerEvents: 'auto', // Ensure the label is clickable
                        }}
                    >
                      {i18n.language === "sv" || !variation?.nameeng ? variation?.name : variation?.nameeng}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )
        );
      };

    return (
        <div style={{ height: "750px", overflow:"hidden" }}> {/*swipe card to the right  https://github.com/3DJakob/react-tinder-card-demo/issues/10 */}
            <Navbar announcements={announcements} release={release} productsss={products} />

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                    <p>Loading, please wait...</p>
                </div>
            ) : (
                <div style={{ marginTop: "220px", zIndex: 400, // marginTop: "180px" //240px",
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    position: 'relative',
                    }}>

                {renderCards && structuredProducts.length > 0 && structuredProducts.map((product, index) => { // structuredProducts
                        const productId = product.id;
                        const selectedVar = selectedVariant[productId];
                        const imageIndex = currentImageIndex[productId] || 0;
                        const variantHasImage = selectedVar?.image ? true : false;
                        const productImagesCount = product.image ? product.image.length : 0;
                        const totalImages = variantHasImage ? 1 + productImagesCount : productImagesCount;
                      
                        const hasMultipleImages = totalImages > 1;
                      
                        let imageUrl;
                        if (variantHasImage && imageIndex === 0) {
                          imageUrl = urlFor(selectedVar.image).url();
                        } else {
                          const adjustedIndex = variantHasImage ? imageIndex - 1 : imageIndex;
                          imageUrl =
                            product.image && product.image[adjustedIndex]
                              ? urlFor(product.image[adjustedIndex]).url()
                              : null;
                        }

                        const { fewleft, newproduct, name, nameeng, price, previousprice, variations, slug, tags } = product;

                        const filteredRatings = ratingsData.filter(rating => rating.productId === product.id);
                        const totalRatings = filteredRatings.length;
                        const sumRatings = filteredRatings.reduce((sum, rating) => sum + rating.rating, 0);
                        const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(2) : 0;

                        const translatedName = i18n.language === "sv" ? (name ? name : "") : (nameeng ? nameeng : name ? name : "");
                        const truncatedName = translatedName.length > 29 ? translatedName.substring(0, 29) + '...' : translatedName;

                        const hasPatchesTag = tags && tags.includes('patches') && !tags.includes('premium');

                        
                        const isTop5Card = index >= currentIndex - 4 && index <= currentIndex;
                        const boxShadow = isTop5Card ? '0px 18px 53px 0px rgba(0, 0, 0, 0.116)' : 'none';

                        return (
                            <TinderCard
                                className="swipe"
                                preventSwipe={["up", "down"]}
                                key={product.id}
                                onSwipe={(dir) => swiped(dir, product.id, index)}
                                onCardLeftScreen={() => outOfFrame(product.name, index)}
                                ref={childRefs[index]}
                                style={{}}
                            >
                                <div style={{ border: '3px solid var(--primarycolor)', borderRadius: '20px', }}>
                                <div
                                    style={{
                                        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                                        display: 'flex',
                                        backgroundColor: "white",
                                        position: 'relative',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: '100%',
                                        height: '100%',
                                        boxShadow: boxShadow,
                                        borderRadius: '20px 20px 0 0',
                                    }}
                                    className="newcard"
                                >
                                    <div style={{ width: "100%", borderRadius: "20px", padding: "20px" }}>
                                     
                                        <div style={{ top: "0px"}}>{renderVariantSelector(product)}</div>
                                    </div>
                                    {fewleft &&
                                                <div className="fewleft" style={{ marginTop: "7px", right: "20px", zIndex: 20, position: "absolute" }}>
                                                    <p className="tag-text " style={{ color: "white" }}>{t("product.tagFå kvar")}</p>
                                                </div>
                                            }
                                            {newproduct &&
                                                <div className="newproduct" style={{ marginTop: "7px", left: "20px", zIndex: 20, position: "absolute" }}>
                                                    <p className="tag-text " style={{ color: "white" }}>{t("product.tagNyhet")}</p>
                                                </div>
                                            }
                                    

                                    {hasMultipleImages && (
                                        <>
                                            <div
                                                onClick={() => handleImageClick(product, 'prev')}
                                                onTouchEnd={() => handleImageClick(product, 'prev')}
                                                style={{
                                                    width: "7%",
                                                    cursor: "pointer",
                                                    background: "linear-gradient(to right, rgba(0,0,0,0.2), rgba(122,122,122,0.2))",
                                                    borderTopLeftRadius: "20px",
                                                    //borderBottomLeftRadius: "20px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    bottom: 0
                                                }}
                                            >
                                                <img
                                                    src="/assets/images/caruselarrow.png"
                                                    alt="Arrow"
                                                    style={{
                                                        width: "10px",
                                                        height: "auto",
                                                        transform: "scaleX(-1)",
                                                        filter: "brightness(150%)",
                                                    }}
                                                />
                                            </div>
                                            <div
                                                onClick={() => handleImageClick(product, 'next')}
                                                onTouchEnd={() => handleImageClick(product, 'next')}
                                                style={{
                                                    width: "7%",
                                                    cursor: "pointer",
                                                    background: "linear-gradient(to right, rgba(0,0,0,0.2), rgba(122,122,122,0.2))",
                                                    borderTopRightRadius: "20px",
                                                    //borderBottomRightRadius: "20px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    position: 'absolute',
                                                    right: 0,
                                                    top: 0,
                                                    bottom: 0
                                                }}
                                            >
                                                <img
                                                    src="/assets/images/caruselarrow.png"
                                                    alt="Arrow"
                                                    style={{
                                                        width: "10px",
                                                        height: "auto",
                                                        filter: "brightness(150%)",
                                                    }}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>




                                

                                <div
                                    style={{
                                    backgroundColor: "var(--secondarycolor)",  // Purple background
                                    color: 'var(--primarycolor)',  // Text color
                                    width: '300px',  // Match the width of the card
                                    minHeight: '150px',  // Fixed height for consistency
                                    padding: '20px',  // Padding inside the box
                                    borderRadius: '0 0 20px 20px',  // Rounded corners at the bottom
                                    boxSizing: 'border-box',  // Ensure padding doesn't affect width
                                    marginTop: '-20px',  // Adjust margin to make it attached to the card
                                    paddingTop: product.variations && product.variations.length > 4 ? '53px' : '30px'
                                    }}
                                >
                                    
                                    <p className="product-name">{truncatedName}</p>

                                    
                                    <Link href={`/product/${slug.current}`}>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <BsInfoCircle  style={{  cursor: "pointer", marginTop: "-32px", right: "18px", zIndex: 2000, position: "absolute" , width: "28px", fontSize: "50px", color: 'var(--primarycolor)' }} />
                                        </a>
                                    </Link>
                                    

                                    <div style={{ display: "flex" }}>
                                        {selectedVar && (
                                            <p className="product-price"><span style={{ color: 'var(--primarycolor)' }}>{t("product.textfrån")}&nbsp; </span></p>
                                        )}
                                        <p className="product-price" style={{ marginRight: "10px", color: previousprice ? "red" : "white" }}>
                                            {i18n.language === "sv" ? (selectedVar?.price || price) + t("universal.currency") : t("universal.currency") + ((selectedVar?.price || price) / 10)}
                                        </p>
                                        {previousprice && (
                                            <p className="product-price previous-price-style-small" style={{ color: "white" }}>
                                                {i18n.language === "sv" ? previousprice + t("universal.currency") : t("universal.currency") + (previousprice / 10)}
                                            </p>
                                        )}
                                    </div>

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
                                                <p className="product-price" style={{ marginTop: "-4px", color: 'white' }}>{averageRating}</p>
                                                <p style={{ marginTop: '-6px', color: 'white' }}>{`(${totalRatings})`}</p>
                                            </>
                                        ) : (
                                            <div style={{ height: '21px' }}>
                                                <p style={{ marginTop: "-4px", color: "gray" }}>{t("universal.Inga betyg än")}</p>
                                            </div>
                                        )}
                                    </div>

                                    {hasPatchesTag &&
                                        <div className="orange-box" style={{ marginTop: "-30px", right: "0px", zIndex: 20, position: "absolute" }}>
                                            <p className="tag-text" style={{ color: "var(--buymorebutton)" }}>{t("product.tagtenfor")}</p>
                                        </div>
                                    }

 {/*
{renderVariantSelector(product)} */}
            
                                    {/* Add any other relevant product information here */}
                                </div>
                                </div>
                            </TinderCard>
                        );
                    })}
                </div>
            )}


{/* 
            <div style={{ marginTop: "-40px" }}>
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
            </div>
            */}

            <div className="swipeButtons2" style={{ zIndex: 800, top: "230px", left: "50%",  // Align horizontally in the middle of the screen
    transform: "translateX(-50%)",  // Offset the position to truly center horizontally
    position: "relative",  // Ensure absolute positioning
    display: 'flex',  // Align buttons in a row
    justifyContent: 'center',  // Center buttons horizontally
     }}>
                <IconButton disabled={renderCards && currentIndex >= structuredProducts.length - 1} className="swipeButtons_leftest"
                    style={{margin: '0 3px', color: renderCards && currentIndex >= structuredProducts.length - 1 ? "grey" : "#f5b748" , backgroundColor: (renderCards && currentIndex >= structuredProducts.length - 1) && '#c3c4d3' }} onClick={(e) => {
                        e.preventDefault();
                        goBack();
                    }}>
                    <ReplayIcon fontSize="small" />
                </IconButton>

                <IconButton style={{ margin: '0 3px' }} className="swipeButtons__left" onClick={() => childRefs[currentIndex]?.current?.swipe('left')}>
                    <CloseIcon fontSize="large" />
                </IconButton>





                <div style={{ display: 'flex', alignItems: 'center' }}>
               
                    <RemoveIcon  onClick={decreaseQuantity} style={{ marginLeft: '3px', cursor: "pointer" }}/>
         
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-20px' }}>
                        <span style={{ fontSize: '12px', marginBottom: '2px' }}>Qty</span>
                        <input
                        type="number"
                        value={itemQuantity}
                        onChange={handleQuantityChange}
                        style={{ width: '30px', textAlign: 'center' }}
                        min="1"
                        step="1"
                        />
                    </div>
                    <AddIcon onClick={increaseQuantity} style={{ marginRight: "3px",  cursor: "pointer" }}/>
                </div>

                <IconButton style={{ margin: '0 3px' }} className="swipeButtons_right" onClick={() => childRefs[currentIndex]?.current?.swipe('right')}>
                    <FavoriteIcon fontSize="large" />
                </IconButton>

                <IconButton style={{ margin: '0 3px' }} onClick={() => setShowCart(true)}  className="swipeButtons_rightest">
                    <ShoppingCartIcon  fontSize="small" /> 
                    {/* <AiOutlineShopping /> */}
                </IconButton>


           



            </div>



            <div
        style={{ 
            position: 'absolute',
            top: screenWidth <= 700 ? '370px':'430px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '18px',
            color: "var(--secondarycolor)",
            textAlign: 'center',
            width: "298px",
            padding: "20px",
            borderRadius: "20px",
            backgroundColor: "var(--primarycolor)", //"var(--secondarycolor)",
            zIndex: 0,  // Ensure it appears above other elements  {t("universal.All cards swiped!")}
        }}> 
        <p style={{marginBottom: "10px", fontSize: '20px',
            fontWeight: "bold"}}>Alla produkter swipeade!</p> <p style={{marginBottom: "20px"}}>Följ oss på <a target="_blank" rel="noopener noreferrer" href={siteInsta} style={{marginTop: "20px", color: "white", }}>Instagram</a> för uppdateringar om nya märken och annat kul!</p>
        
          <a style={{marginTop: "20px", }}>
            <img style={{ width: '200px' }} src="/assets/paymentlogos/instaqrkod.png" alt="Visa Logo" />
          </a> 
    </div>



{/* List logging code.

    <div style={{ display: "flex", flexDirection: "column", height: "400px", top: "300px", left: "100px", position: "absolute" }}>
  <div style={{ flex: "1 1 auto", minHeight: "0", overflow: "auto" }}>
    {products.map((product, index) => (
      <p key={product.id} style={{ fontSize: "10px", margin: "0" }}>
        {index + 1}. {product.name}
      </p>
    ))}


  </div>
</div>


<div style={{ display: "flex", flexDirection: "column", height: "400px", top: "300px",  right: "300px",  position: "absolute" }}>
  <div style={{ flex: "1 1 auto", minHeight: "0", overflow: "auto" }}>

  <p style={{ fontSize: "20px", margin: "0" }}>
       structured ref
      </p>
    {renderCards && structuredProductsRef.current.map((product, index) => (
      <p key={product.id} style={{ fontSize: "10px", margin: "0" }}>
        {index + 1}. {product.name}
      </p>
    ))}
  </div>
</div>


<div style={{ display: "flex", flexDirection: "column", height: "400px", top: "300px", right: "100px", position: "absolute" }}>
  <div style={{ flex: "1 1 auto", minHeight: "0", overflow: "auto" }}>

  <p style={{ fontSize: "20px", margin: "0" }}>
       structured {currentIndex}
      </p>
    {renderCards && structuredProducts.map((product, index) => (
      <p key={product.id} style={{ fontSize: "10px", margin: "0" }}>
        {index + 1}. {product.name}
      </p>
    ))}
  </div>
</div>

 */}


        </div>
    );
};


export const getServerSideProps = async () => {
    const query = '*[_type == "product" && minovve != true && showproduct == true && outOfStock != true]';
    const products = await client.fetch(query);

    const productss = products.map(product => ({
        ...product,
        hiddenLink: "https://www.studentshoppen.com/studentlivet"
    }));

    const ratingsQuery = '*[_type == "productratings"]';
    const ratingsData = await client.fetch(ratingsQuery);

    const announcementsQuery = '*[_type == "announcements"]';
    const announcements = await client.fetch(announcementsQuery);

    return {
        props: { products: productss, ratingsData, announcements },
    };
};

export default Tinderclone;