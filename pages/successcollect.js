import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext.js';
import { runFireworks } from '../lib/utils.js';
import { siteName, siteNameAlt2, siteEmail, siteInsta, insta } from '../components/config.js';
import Navbar from '../components/Navbar.jsx';
import { client } from '../lib/client.js';
import { useTranslation } from 'react-i18next';
import { fetchData } from  '../components/basicgetServerSideProps.js';


const Successcollect = ({announcements, release, products}) => {
  const { setCartItems, setTotalPrice, setTotalQuantities, setNoDiscountTotalPrice, totalQuantities } = useStateContext();
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (totalQuantities && parseInt(totalQuantities) !== 0) {
        // Clear local storage and perform additional clear or set operations if needed
        localStorage.clear();
        localStorage.removeItem("cartcontent");

        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        setNoDiscountTotalPrice(0);
        runFireworks();

        // Reload the page
        window.location.reload();
      }
    }
    runFireworks();

  }, []);

 /* const clearLocalStorage = () => {
    // Check if localStorage is available before using it
    if (typeof window !== 'undefined') {
      localStorage.removeItem("cartcontent");
      // Optionally, you can clear the entire localStorage with the following line:
      // localStorage.clear();
  }}*/

  return ( //i18n.language === "sv"     {t("cart.Fortsätt handla")}
    <div >
    <Navbar announcements={announcements} release={release} productsss={products}/>
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>{t("success.tackorder")}</h2>
        <p className="email-msg" style={{marginTop: "10px"}}>{t("success.ViKontaktarDig")}</p>
        <p className="email-msg" style={{marginTop: "10px"}}>{t("success.IngetKvitto")}</p>
        <p className="email-msg" style={{marginTop: "15px"}}>{t("success.Följ vår Instagram")}<a  className="text-link-style" href={siteInsta} target="_blank" rel="noopener noreferrer" style={{marginLeft: "0px"}}>
          {insta}
          </a>{t("success.erbjudanden")}</p>
          <a target="_blank" rel="noopener noreferrer" href={siteInsta} style={{marginTop: "20px"}}>
            <img style={{ width: '240px' }} src="/assets/paymentlogos/instaqrkod.png" alt="Visa Logo" />
          </a>



        <p className="description">
        {t("success.omfrågor")} 
          <a  className="text-link-style" href={`mailto:${siteEmail}`} style={{marginLeft: "5px"}}>
          {siteEmail}
          </a>
        </p>
        <Link href="/">
          <button type="button" width="250px" className="btn">
          {t("success.Fortsätt handla")}
          </button>
        </Link>
      </div>
    </div></div>
  )
}



export const getServerSideProps = async () => {
  const data = await fetchData();

  return {
    props: { ...data },
  };
};

export default Successcollect