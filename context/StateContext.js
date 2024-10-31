// Video för state context, börjar 1.42.00 https://youtu.be/4mOkFXyxfsU?t=6536

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { client, urlFor } from '../lib/client';

const Context = createContext();


export const StateContext = ({ children }) => {

  const cartFromLocalStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("cartcontent")) || [] : [];

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);      //const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [noDiscountTotalPrice, setNoDiscountTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(cartItems?.length);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;


  useEffect(() =>{
    //localStorage.setItem("cartcontent", JSON.stringify(cartItems));
    saveinlocalstorage();

  },[cartItems])

  const saveinlocalstorage = () =>{
    localStorage.setItem("cartcontent", JSON.stringify(cartItems));

  }
  
  useEffect(() =>{
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalQuantities(totalQuantity);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotalPrice(totalPrice);

    const nodiscountPrice = cartItems.reduce((acc, item) => acc + item.quantity * (item?.previousprice ?? item.price), 0);
    setNoDiscountTotalPrice(nodiscountPrice);

  },[])

  
  const onAdd = (product, quantity, hasPatchesTag) => {
    const checkProductInCart = cartItems.some((item) => item.id === product.id);
    
    // Get the correct image URL for the product
    const imageUrl = product?.image ? urlFor(product.image[0]).url() : null;
  
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });
  
      setCartItems(updatedCartItems);
    } else {
      // Add the imageUrl to the product data being added to cart
      product.quantity = quantity;
      product.imageUrl = imageUrl;  // Add the image URL for the product
  
      setCartItems([...cartItems, { ...product, hasPatchesTag }]);
    }
  
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setNoDiscountTotalPrice((prevTotalPrice) => prevTotalPrice + (product.previousprice ? product.previousprice : product.price) * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
  
    setQty(1);
    toast.success(`${qty} ${product.name} added to the cart.`);
  };




  useEffect(() => {
    console.log("Cart updated:", cartItems);
    cartItems.forEach(item => {
        console.log("Product ID:", item.id);
        console.log("Product Details:", item);
    });
}, [cartItems]);




const onAddVariation = (product, quantity, selectedVariation, selectedVariationImgIndex, hasPatchesTag) => {
  const checkProductInCart = cartItems.some((item) => item.id === (product.id + selectedVariation.name));

  // Use variation image if available, else fallback to the main product image
  const variationImageUrl = selectedVariation.image
    ? urlFor(selectedVariation.image).url()
    : product.image && product.image[selectedVariationImgIndex]
      ? urlFor(product.image[selectedVariationImgIndex]).url()
      : null;

  if (checkProductInCart) {
    const updatedCartItems = cartItems.map((cartProduct) => {
      if (cartProduct.id === (product.id + selectedVariation.name)) {
        return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity,
          hiddenLink: 'Easter egg for future fonctions for the webb developper: https://studentshoppen.com//studentlivet', // Set the hiddenLink value here
        };
      }
      return cartProduct;
    });

    setCartItems(updatedCartItems);
  } else {
    let tempproductid = product.id;
    product.price = selectedVariation.price;
    product.previousprice = selectedVariation.previousprice;

    product.quantity = quantity;
    product.imageUrl = variationImageUrl;  // Add variation or main product image URL
    product.id = (product.id+selectedVariation.name);
    product.vikt = selectedVariation.vikt && selectedVariation.vikt;
    product.shippingsize = selectedVariation.shippingsize;
    product.hiddenLink = 'Easter egg for future fonctions for the webb developper: https://studentshoppen.com//studentlivet'; // Set the hiddenLink value here

    setCartItems([...cartItems, { ...product, selectedVariation, selectedVariationImgIndex, hasPatchesTag }]);
    product.id = tempproductid;
  }

  setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
  setNoDiscountTotalPrice((prevTotalPrice) => prevTotalPrice + (product.previousprice ? product.previousprice : product.price) * quantity);
  setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

  setQty(1);
  toast.success(`${qty} ${product.name} added to the cart.`);
};











  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item.id === product.id);
    const newCartItems = cartItems.filter((item) => item.id !== product.id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setNoDiscountTotalPrice((prevTotalPrice) => prevTotalPrice -(foundProduct.previousprice ? foundProduct.previousprice : foundProduct.price) * foundProduct.quantity);
    
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) =>  item.id === id);
    index = cartItems.findIndex((product) => product.id === id);
    const newCartItems = [...cartItems];

    if(value === 'inc') {
      foundProduct.quantity += 1;
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setNoDiscountTotalPrice((prevTotalPrice) => prevTotalPrice + (foundProduct.previousprice ? foundProduct.previousprice : foundProduct.price));

      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        foundProduct.quantity -= 1;
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setNoDiscountTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct.previousprice ? foundProduct.previousprice : foundProduct.price));
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }

    saveinlocalstorage();
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);

  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });


  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onAddVariation,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        noDiscountTotalPrice,
        setNoDiscountTotalPrice,
        setTotalQuantities, 
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);