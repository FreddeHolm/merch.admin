import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';
import { useTranslation } from 'react-i18next';

const HeroBanner = ({ heroBanner }) => {
  const [t, i18n] = useTranslation("global");

  return (
    <div style={{ backgroundColor: heroBanner.backgroundcolor ?  heroBanner.backgroundcolor : "var(--secondarycolor)", zIndex: "-0" }} className="hero-banner-container" > {/*måste vara zindex -0 */}
      <div>
        <h3 style={{zIndex: "1", padding: "0px 40px", marginBottom: "15px" }}className="beats-solo">{i18n.language === "sv" ?  heroBanner?.topText && heroBanner?.topText : heroBanner?.topTexteng ? heroBanner?.topTexteng : heroBanner?.topText}</h3>
        <h3 style={{zIndex: "1", padding: "0px 40px" }} className='beats-midtext'>
        {i18n.language === "sv" ?  heroBanner?.midLargeText && heroBanner?.midLargeText : heroBanner?.midLargeTexteng ? heroBanner?.midLargeTexteng : heroBanner?.midLargeText}</h3>
        <h3 style={{zIndex: "1", padding: "0px 40px", marginTop: "15px" }}className="beats-solo">
                {i18n.language === "sv" ?  heroBanner?.bottomText && heroBanner?.bottomText : heroBanner?.bottomTexteng ? heroBanner?.bottomTexteng : heroBanner?.bottomText}
        </h3>
        {/* <h1 style={{zIndex: "1" }}>{heroBanner.largeText1}</h1> */}
        <img  style={{zIndex: "-1" }} src={urlFor(heroBanner.image)} alt="banner image" className="hero-banner-image" />

        <div className='hero-buttons' style={{ width: "100%", padding: "0px 40px", position: "absolute", display: "flex", justifyContent: "space-between" }}>
          
          {heroBanner.product1 && heroBanner.buttonText1 ?
                    <Link href={`/product/${heroBanner.product1}`}>
                    <button style={{zIndex: "10000", backgroundColor: heroBanner.buttonColor1 ?  heroBanner.buttonColor1 : "var(--primarycolor)" }} type="button">{i18n.language === "sv" ?  heroBanner?.buttonText1 && heroBanner?.buttonText1 : heroBanner?.buttonText1eng ? heroBanner?.buttonText1eng : heroBanner?.buttonText1}</button>

                  </Link> 
              : <div/>
          }


          
        {heroBanner.product2 && heroBanner.buttonText2 ?
          <Link href={`/product/${heroBanner.product2}`} >
            <button style={{float: "right", zIndex: "20", backgroundColor: heroBanner.buttonColor2 ?  heroBanner.buttonColor2 : "var(--primarycolor)"  }} type="button">{i18n.language === "sv" ?  heroBanner?.buttonText2 && heroBanner?.buttonText2 : heroBanner?.buttonText2eng ? heroBanner?.buttonText2eng : heroBanner?.buttonText2}</button>
          </Link>
          : <div/>
          }
          </div>
          
          <div className="desc">
            <h5 style={{zIndex: "1" }}>{i18n.language === "sv" ?  heroBanner?.desc && heroBanner?.desc : heroBanner?.desceng ? heroBanner?.desceng : heroBanner?.desc}</h5>
          </div>

      </div>
    </div>
  )
}

export default HeroBanner