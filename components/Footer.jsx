import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';
import { IoIosMail} from 'react-icons/io';
import { FaTiktok, FaFacebook, FaFacebookSquare} from 'react-icons/fa';
import { siteName, siteNameAlt2, siteEmail, siteInsta, siteFb } from '../components/config';

import Link from 'next/link';

import { useTranslation } from 'react-i18next';



const Footer = () => {
  
  const [t, i18n] = useTranslation("global");


  return (
    <div className="footer-container">
      
{      /*<div style={{ display: "flex", justifyContent: "center",  gap: "30px", flexWrap: 'wrap' }}>
        <a className="text-link-style-black" ><Link href="/filter/all-products"  >Alla Produkter</Link></a>
        <a className="text-link-style-black" ><Link className="text-link-style-black2" href="/filter/best-sellers"  >Bästsäljande</Link></a>
        <a className="text-link-style-black" ><Link href="/filter/patches"  >Märken</Link></a>
        <a className="text-link-style-black" ><Link className="text-link-style-black2" href="/filter/bra-att-ha"  >Bra Att Ha</Link></a> 
        <a className="text-link-style-black" ><Link className="text-link-style-black2" href="/filter/till-ovven"  >Till Ovven</Link></a> 
        <a className="text-link-style-black" ><Link className="text-link-style-black"  href="/filter/till-festen"  >Till Festen</Link></a>
      </div>*/}
      <div style={{ display: "flex", justifyContent: "center",  gap: "30px", flexWrap: 'wrap', marginBottom: "10px", marginTop: "-10px" }}>
        <a className="text-link-style-black" ><Link className="text-link-style-black2"href="/terms-of-purchase"  >{t("footer.Köpvilkor")}</Link></a>
        <a className="text-link-style-black" ><Link href="/privacy-policy"  >{t("footer.Integritetspolicy")}</Link></a>

        <a className="text-link-style-black" ><Link className="text-link-style-black2"href="/"  >{t("footer.Hem")}</Link></a> 
        <a className="text-link-style-black" ><Link className="text-link-style-black2"href="/studentlivet"  >{t("footer.Studentlivet")}</Link></a> 
        <a className="text-link-style-black" ><Link href="/about"  >{t("footer.Om oss")}</Link></a>
        {/*<a className="text-link-style text-link-style-black" ><Link className="text-link-style-black text-link-style-black2" href="/test"  ><div className="text-link-style-black2">{t("footer.Produkttest")}</div></Link></a>*/}
        <div className="text-link-style-black2"><a className="text-link-style-black2" target="_blank" rel="noopener noreferrer" href={`mailto:${siteEmail}`}>{siteEmail}</a></div>

        {/* <a className="text-link-style-black" ><Link href="/studentlivet"  >{t("footer.Studentlivet")}</Link></a> */}


      </div> 


      <p style={{fontSize: "30px", display: "flex",alignItems: "center", gap: "10px"}}>
        <a className="text-link-style-black" target="_blank" rel="noopener noreferrer" href={siteInsta}><AiFillInstagram /></a>
        <a className="text-link-style-black" target="_blank" rel="noopener noreferrer" href={`mailto:${siteEmail}`}><IoIosMail style={{fontSize: "32px", marginTop: "3px"}} /></a>
        <a className="text-link-style-black" target="_blank" rel="noopener noreferrer" href={siteFb}><FaFacebookSquare style={{fontSize: "26px", marginBottom: "2px"}} /></a>
        {/*<a className="text-link-style-black" target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@aldrigjag.se"><FaTiktok style={{fontSize: "24px", marginBottom: "3px"}} /></a>*/}
      </p>


      {/*
      <div style={{ display: "flex", justifyContent: "center",  gap: "30px", flexWrap: 'wrap', marginBottom: "10px", marginTop: "-10px" }}>
        <a className="text-link-style-black" ><Link className="text-link-style-black2"href="/terms-of-purchase"  >Köpvilkor</Link></a>
        <a className="text-link-style-black2" href={`mailto:${siteEmail}`}><div className="text-link-style-black2">{siteEmail}</div></a>
        <a className="text-link-style-black" ><Link className="text-link-style-black2"href="/"  >Hem</Link></a> 
        <a className="text-link-style-black" ><Link href="/about"  >Om oss</Link></a>
        <a className="text-link-style text-link-style-black" ><Link className="text-link-style-black text-link-style-black2" href="/test"  >Produkttest</Link></a>
        <a className="text-link-style-black" ><Link href="/privacy-policy"  >Integritetspolicy</Link></a>

      </div> 
      */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
         flexWrap: 'wrap'
        }}
      >
        <a>
          <img style={{ height: '24px' }} src="/assets/paymentlogos/visa.png" alt="Visa Logo" />
        </a>
        <a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/mastercard.png" alt="Mastercard Logo" />
        </a>
        {i18n.language ==="sv" && <a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/swish.png" alt="Swish Logo" />
        </a>}{/**/}
        <a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/klarna.png" alt="Klarna Logo" />
        </a>
        <a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/paypal.png" alt="Paypal Logo" />
        </a>

        <a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/applepay.png" alt="Apple pay Logo" />
        </a>
        <a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/googlepay.png" alt="Google pay Logo" />
        </a>
        {/*<a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/stripe.png" alt="Stripe Logo" />
        </a>*/}
      </div>

      <div style={{fontSize: "12px", display: "flex", justifyContent: "center",  gap: "30px", flexWrap: 'wrap' }}>
        {/* <p>{siteName} är en del av Holmes Insight AB</p> */}
        <p>{t("footer.Rättigheter")}</p>
      </div>

    </div>
  )
}

export default Footer  