import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import { client, urlFor } from '../lib/client';

import image1 from './images/aaa.png'
import { useTranslation } from 'react-i18next';



/* react responsive carousel 
Install: https://www.npmjs.com/package/react-responsive-carousel OR  http://react-responsive-carousel.js.org/#install
react responsive carousel settings http://react-responsive-carousel.js.org/storybook/?path=/story/01-basic--base


*/

/*window.addEventListener("scroll", function() { //https://codepen.io/johnmeade-webdev/pen/GRoqgmG 
    let pageY = window.pageYOffset;
    let main = document.querySelector('.success-image-1');
    main.style.backgroundPosition = ` 0px -${pageY * .20}px`
  })

  window.addEventListener("scroll", function() { //https://codepen.io/johnmeade-webdev/pen/GRoqgmG
    let pageY = window.pageYOffset;
    let main = document.querySelector('.success-image-2');
    main.style.backgroundPosition = ` 0px -${pageY * .20}px`
  })
*/

//import { Parallax } from 'react-parallax';

//const image1 = "https://i.picsum.photos/id/96/800/400.jpg?hmac=pHFAkzdkdZ4jbJpHTGwcIHmrGj68dpmNQjlsS1smMz0"

const image2 = "https://i.picsum.photos/id/755/1920/1080.jpg?hmac=JwXHE-ZZbaN-3I3h2SHp5EK1s_NrObkMU6qOg9Lf2Gk"; // "https://i.picsum.photos/id/518/800/400.jpg?hmac=jXO_ia85YHhBPksdJk11Od9QsMJbSt2kWKSnDoN1Z-M"
const image3 = "https://picsum.photos/1920/1080"; //"https://picsum.photos/800/400";

const image4 = "/assets/landingimages/Landingpage1studentshoppen.jpg"; //"https://picsum.photos/800/400";



const inlineStyle = {
container: {
  background: '#fff',
  left: '50%',
  top: '50%',
  position: 'absolute',
  padding: '200px',
  transform: 'translate(-50%, -50%)',
},
};



const Imgcarusel  = ({ landingimages } ) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleImageChange = (index) => {
    setActiveImageIndex(index);
    /*console.log("index before" + index);
    console.log("index after" + index);
    console.log("landingimages" + landingimages[index].buttontext);
    */
     
  };
  const [t, i18n] = useTranslation("global");


  return ( 
    <div className='entirecaruselimgdiv'>
            <Carousel //http://react-responsive-carousel.js.org/storybook/?path=/story/01-basic--fade 
            infiniteLoop
            swipeable={false}
            animationHandler="fade" // gör att bilderna fadear mellan
            transitionTime={1000} //intervall på transition, 500 = 0.5sekunder, 10000 = 10sekunder
            showArrows={true}
            autoPlay={true} //bildspelet börjar spela automatiskt
            stopOnHover={true} // pausar bildspelet on hover
            interval={8000}// intervall mellan byte av bilder, 5000 = 5sekunder, 10000 = 10sekunder
            emulateTouch={true} //swipegrej, verkar ej funka
            //showIndicators={false} //prickarna 
            showThumbs={false} //visar thumbnail bilder
            //thumbWidth={100} //storlek på thumbnail
            showStatus={false} //tar bort text i höger hörn (1 of 5)
            // bgStyle={ backgroundPosition: "bottom" }
            // background-position= "top"
            className="image-carusel"
            bgClassName="bg-image-carusel"
            onChange={handleImageChange}
            > 
{landingimages.filter(landingimage => landingimage.showcaruselimage && !landingimage.minovve).map((landingimage) => (
          <> <div key={landingimage.id} style={{ backgroundImage: 
            i18n.language === "sv" ?  
            landingimage?.imagelink && landingimage?.imagelink !== "" ? `url(${"/assets/landingimages/"+landingimage.imagelink})` : landingimage.image ? `url(${urlFor(landingimage.image)})` : "" 
            : landingimage?.imagelink && landingimage?.imagelink !== "" ? `url(${"/assets/landingimages/english"+landingimage.imagelink})` : landingimage.imageeng ? `url(${urlFor(landingimage.imageeng)})` : `url(${"/assets/landingimages/"+landingimage.imagelink})` 

          }} className='success-imgdiv-settings special-case'>
            <div className="success-img-settings">
              {/* Add any other image-related content here */}
            </div>
          </div>
          
          {/* <Link key={landingimage.id} href={`${landingimage?.buttonurl}` }>
          <button className='caruselbuttons' type="button" style={{ bottom: "10%", right: "10%", position: "absolute", backgroundColor: "#1a1313", border: "2px solid #e0962a", color: "#e0962a" }}>
            {landingimage?.buttontext}
          </button>
          </Link> */}
        </>
        ))}
      </Carousel>

      {landingimages.filter(landingimage => landingimage.showcaruselimage && !landingimage.minovve).filter((landingimage, index) => index === activeImageIndex).map(landingimage => (       
      <Link key={landingimage.id} href={`${landingimage?.buttonurl}`}>
          <button className='caruselbuttons' type="button" style={{ bottom: "10%", right: "10%", position: "absolute", backgroundColor: "#1a1313", border: "2px solid #e0962a", color: "#e0962a" }}>
            {i18n.language === "sv" ?  landingimage?.buttontext && landingimage?.buttontext : landingimage?.buttontexteng ? landingimage?.buttontexteng : landingimage?.buttontexteng }

          </button>
        </Link>
      ))}
     
    </div>
  );
}
//http://react-responsive-carousel.js.org/storybook/?path=/story/01-basic--fade&knob-showArrows_Toggles=true&knob-showStatus_Toggles=&knob-showIndicators_Toggles=true&knob-infiniteLoop_Toggles=true&knob-showThumbs_Toggles=true&knob-useKeyboardArrows_Toggles=true&knob-autoPlay_Toggles=true&knob-stopOnHover_Toggles=true&knob-swipeable_Toggles=true&knob-dynamicHeight_Toggles=true&knob-emulateTouch_Toggles=true&knob-autoFocus_Toggles=&knob-thumbWidth_Values=100&knob-selectedItem_Values=1&knob-interval_Values=10000&knob-transitionTime_Values=500&knob-swipeScrollTolerance_Values=5
//ReactDOM.render(<Successstories />, document.querySelector('.demo-carousel'));


export default Imgcarusel;
