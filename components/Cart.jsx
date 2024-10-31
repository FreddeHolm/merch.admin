import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { BsTrash3 } from "react-icons/bs";
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';


const Cart = ({productsss}) => {
  const cartRef = useRef();
  const { totalPrice, noDiscountTotalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove, setCartItems, setTotalQuantities, setTotalPrice, setNoDiscountTotalPrice   } = useStateContext();

  const [selectedCountry, setSelectedCountry] = useState('sweden');
  const [t, i18n] = useTranslation("global");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);

  };


  useEffect(() => {
    console.log("Cart Items updated: ", cartItems);
    const sourceWebsiteTest =  window.location.hostname;//window.location.hostname;
    console.log("sourceWebsiteTest " + sourceWebsiteTest);

  }, [cartItems]);

  const handleCheckout = async () => {
    const cartids = cartItems.map(item => item.id);
    
    let stripeAPIEndpoint = '/api/stripe';
    let currencymultiplier = 1;


    if (selectedCountry === 'finland') {
      stripeAPIEndpoint = '/api/stripefi';
      currencymultiplier = 0.1;

    } else if (selectedCountry === 'other') {
      stripeAPIEndpoint = '/api/stripeother';
      //stripeAPIEndpoint = '/api/stripeother';
      currencymultiplier = 0.1;

    }

    const sourceWebsite =  window.location.hostname;//window.location.hostname;

    console.log("sourceWebsite " + sourceWebsite);

    const updatedCartItems = cartItems.map(item => {
      const matchingProduct = productsss.find(product => product.id === item.id);
      

      const matchingProductVariationID = productsss.find(product => item.id.includes(product.id));


    
  
      /*const matchingProduct = productsss.find(product => {
        if (product.id === item.id || (product.id + product.variations?.name) === item.id) {
          return true;
        }
        // Check variations if not empty
        if (product.variations && product.variations.length > 0) {
          // Check each variation
          const variationMatch = product.variations.some(variation => (product.id + variation.name) === item.id);
          if (variationMatch) {
            return true;
          }
        }
        return false;
      }); */


      if (matchingProduct) {
        //console.log("found a product:" +  matchingProduct.name );
        //const correctpriceforcurrency = parseFloat((matchingProduct.price*currencymultiplier).toFixed(1));
        return {
          ...item,
          price: matchingProduct.price, // Use the price from productsss
          name: (i18n.language === "sv" ? matchingProduct.name : (matchingProduct.nameeng ? matchingProduct.nameeng : matchingProduct.name)),
          vikt: matchingProduct?.vikt,
          shippingsize: matchingProduct?.shippingsize,
        };
      }
      if (matchingProductVariationID) {
        //console.log("found a product variation:" +  matchingProductVariationID.name );

         // Get the part that is different in the id
        const differentPart = item.id.replace(matchingProductVariationID.id, '').trim();
        
        const correctvariationproduct = matchingProductVariationID.variations.find(variation => variation.name === differentPart)
        //const correctpriceforcurrencyvariation = parseFloat((correctvariationproduct.price*currencymultiplier).toFixed(1));

        return {
          ...item,
          price: correctvariationproduct.price, // Use the price from productsss
          name: (i18n.language === "sv" ? matchingProductVariationID.name : (matchingProduct.nameeng ? matchingProduct.nameeng : matchingProduct.name)),
          vikt: correctvariationproduct?.vikt || correctvariationproduct?.shippingsize !== "sameforall" ? correctvariationproduct?.vikt : matchingProductVariationID?.vikt,
          shippingsize: correctvariationproduct?.shippingsize && correctvariationproduct?.shippingsize !== "sameforall" ? correctvariationproduct?.shippingsize : matchingProductVariationID?.shippingsize,
        };
      }

      return item;
    });



    //debugger;

    const stripe = await getStripe();
    
    try {
      const response = await fetch(stripeAPIEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: updatedCartItems,
          i18n_language: i18n.language, 
          source: sourceWebsite, // Now a string
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        toast.error(`Error: ${errorData.error || 'Something went wrong'}`);
        return;
      }
  
      const data = await response.json();
      toast.loading('Redirecting...');
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('An unexpected error occurred.');
    }
  };





  let totalItemsWithPatches = 0;
  let numberOfDiscounts = 0;
  let patchDiscount = 0;


  
  {cartItems.forEach((item) => {
    if (item.hasPatchesTag) {
      totalItemsWithPatches += item.quantity;
      numberOfDiscounts = Math.floor( totalItemsWithPatches/ 10);
      patchDiscount = numberOfDiscounts * 50;
    }
  })}

  
  

// CLOSE CART WHEN CLICKING OUTSIDE
const handleDocumentClick = (event) => {
  // Check if the click event target is the cart-wrapper itself and not the cart-container
  if (cartRef.current === event.target) {
    setShowCart(false);
  }
};

useEffect(() => {
  // Add event listener when the component mounts
  document.addEventListener('click', handleDocumentClick);

  // Remove event listener when the cart is closed or when the component unmounts
  return () => {
    document.removeEventListener('click', handleDocumentClick);
  };
}, []);



  return (
    <div className="cart-wrapper" ref={cartRef} style={{zIndex: 29999 }}>
      <div className="cart-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            type="button"
            className="cart-heading"
            onClick={() => setShowCart(false)}>
            <AiOutlineLeft style={{ color: "var(--secondarycolor)" }} />
            <span className="heading" style={{ color: "var(--secondarycolor)" }}>{t("cart.Din kundvagn")}</span>
            <span className="cart-num-items">({totalQuantities} {t("cart.varor")})</span>
          </button>

          {cartItems.length >= 1 && <div onClick={() => {setCartItems([]); setTotalQuantities(0); setTotalPrice(0); setNoDiscountTotalPrice(0);}} className='trashcanicon' style={{ marginRight: "25px", transform: 'scale(1.5)'}}><BsTrash3  style={{ color: "var(--primarycolor)", marginTop: "1px", }}/></div>}
        </div>
        
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} color={"var(--secondarycolor)"} /* color={"#324d67"} */ />
            <h3>{t("cart.Din kundvagn är tom")}</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                {t("cart.Fortsätt handla")}
              </button>
            </Link>
          </div>
        )}


        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item.id}>
              
              <Link href={`/product/${item.slug.current}`}>
              <img src={item.imageUrl} alt={item.name} className="cart-product-image image-hover-effect" />


              </Link>
              
              <div className="item-desc">
                <div className="flex top" style={{ display: "inline-block"}} >
                {/* <h4>{item.id}</h4> */}
                  <Link href={`/product/${item.slug.current}`}><div className='image-hover-effect-text'><h5 style={{ color:'var(--secondarycolor)' }}>
                    {i18n.language === "sv" ?  item?.name && item?.name : item?.nameeng ? item?.nameeng : item?.name} {item.hasPatchesTag && t("universal.imärke")}
            </h5> </div></Link>
            
            
            <h4>{ item?.selectedVariation && 
              (i18n.language === "sv" || !item.selectedVariation.nameeng ?  
                 `(${item.selectedVariation?.name})`
                  : `(${item.selectedVariation?.nameeng})`
                 )}</h4>

  {/* {productsss
                    .filter(entry => entry.id && entry.id === item.id )
                    .map(filteredEntry => (
                      <span key={filteredEntry.id}>{filteredEntry.price}</span>
                    ))} */}
                  {/* <h4>{item.hasPatchesTag ? `(${item.hasPatchesTag})` : `(${item.hasPatchesTag})`}</h4> */}
                  { /* i18n.language === "sv" || */  selectedCountry ==="sweden" ?  (
                  <h4 className="price" style={{ color: item.previousprice ? 'var(--oldprimary)' : 'var(--textetc)' }}>{item.price} kr {item.previousprice && <span className="previous-price previous-price-style-small" style={{ color:'var(--secondarycolor)' }}>{item.previousprice} kr</span>}</h4>
                  ) : (
                  <h4 className="price" style={{ color: item.previousprice ? 'var(--oldprimary)' : 'var(--textetc)' }}>€{item.price/10} {item.previousprice && <span className="previous-price previous-price-style-small" style={{ color:'var(--secondarycolor)' }}>€{item.previousprice/10}</span>}</h4>
                  )}
                </div>
                <div className= {item.selectedVariation ? "flex bottomvariation": "flex bottom"}>
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item.id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" >{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item.id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>



        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total" >
              <h3 style={{ color:'var(--secondarycolor)' }}>{t("cart.Summa")}:</h3>
              
              { /* i18n.language === "sv" || */ selectedCountry ==="sweden" ?  (
                <h3 style={{ color: totalPrice - patchDiscount < noDiscountTotalPrice ? 'var(--oldprimary)' : 'var(--secondarycolor)' }}>{totalPrice - patchDiscount }kr &nbsp;{ totalPrice - patchDiscount < noDiscountTotalPrice && <span className="previous-price previous-price-style-small" style={{ color:'var(--secondarycolor)' }}>{noDiscountTotalPrice}kr</span>}</h3>
              ) : (
                <h3 style={{ color: totalPrice - patchDiscount < noDiscountTotalPrice ? 'var(--oldprimary)' : 'var(--secondarycolor)' }}>€{(totalPrice - patchDiscount)/10} &nbsp;{ totalPrice - patchDiscount < noDiscountTotalPrice && <span className="previous-price previous-price-style-small" style={{ color:'var(--secondarycolor)' }}>€{noDiscountTotalPrice/10}</span>}</h3>
                )}
              

              {/*<p>Total items with patches: {totalItemsWithPatches}</p> */}
              
            </div>


      
     <div className="variation-buttons-sippingcountry live_in_div" style={{ display: "flex", alignItems: "center",  marginBottom: "0px", zIndex: 1000 }}>
  <p className='live_in' style={{ marginTop: "0px", marginBottom: "0px", fontWeight: "bold",  }} >{t("cart.Jag bor i")}</p>

  <div style={{ display: "flex", alignItems: "center" }}>
    <label className={`variation-button ${selectedCountry === "sweden" ? 'selected' : ''}`}>
      <input
        type="radio"
        value="sweden"
        checked={selectedCountry === 'sweden'}
        onChange={handleCountryChange}
      />
      {t("cart.Sverige")}
    </label>

    <label className={`variation-button ${selectedCountry === "finland" ? 'selected' : ''}`}>
      <input
        type="radio"
        value="finland"
        checked={selectedCountry === 'finland'}
        onChange={handleCountryChange}
      />
      {t("cart.Finland")}
    </label>
    
    <label className={`variation-button ${selectedCountry === "other" ? 'selected' : ''}`}>
      <input
        type="radio"
        value="other"
        checked={selectedCountry === 'other'}
        onChange={handleCountryChange}
      />
      {t("cart.other")}
    </label>
  </div>
</div>


 {/*      
     /* todo enable LINKÖPING        */}        
 <div style={{ marginTop: "2px", marginBottom: "-18px", textAlign: "right" }} >
              <Link href="/collect" >
                <a style={{ color: 'var(--primarycolor)', fontWeight: 'bold' }} className='text-link-style'
                 onClick={() => setShowCart(false)}>
                  {t("cart.Hämta i Linköping")}
                </a>
              </Link>
            </div>


            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout} style={{marginTop: "25px", marginBottom: "10px"}}>
              {t("cart.Till betalning")}

                
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart