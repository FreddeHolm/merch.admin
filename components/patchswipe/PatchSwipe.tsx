import React, {ChangeEvent, FormEvent, useEffect, useState, useMemo, useRef} from "react";
//import "./PatchSwipe.css";
//import {database} from "../../firebase-config";

import SwipeButtons from "./SwipeButtons";
import {Switch} from "antd";
//import  {Link} from "react-scroll";
import { client, urlFor } from '../../lib/client';
import Link from 'next/link';

//Swipebuttons
//import "./SwipeButtons.css"
import IconButton from "@material-ui/core/IconButton";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";

import FilterIcon from "@material-ui/icons/Filter";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import NavigateNext from "@material-ui/icons/NavigateNext";
import { useTranslation } from 'react-i18next';


let TinderCard;
if (typeof window !== "undefined") {
  TinderCard = require("react-tinder-card");
} 
/*import TinderCard from "react-tinder-card";/**/


/*import dynamic from "next/dynamic"; // Import the dynamic function
const DynamicTinderCard = dynamic(() => import("react-tinder-card"), {
  ssr: false, // Disable server-side rendering
});
//import Datatoemail from "./Datatoemail.tsx";

//
//import axios from "axios";
/*

yarn add firebase
yarn add @material-ui/core
yarn add @material-ui/icons
yarn add react-router-dom
yarn add @react-spring/web
yarn add react-tinder-card
yarn global add firebase-tools -f   
yarn add typescript 
yarn add antd

To fix the error: 
Parsing error: DeprecationError" in your code, you need to update your TypeScript
do: 

yarn add @types/bcryptjs @types/node @types/react @types/react-dom eslint eslint-config-next typescript

*/

type FormState<T extends number> = {
  name: string;
  [key: string]: string;
} & {
  [K in `meme${number}`]: K extends `meme${infer I}` ? I extends keyof GenerateFormState<T> ? string : never : never;
};

//Dessa 3 types nedan genererar meme0, meme1, meme2 etc från
type GenerateFormState<T extends number> = {
  [K in `meme${Exclude<keyof any[], "length">}`]: K extends `meme${infer I}` ? I extends keyof GenerateFormState<T> ? string : never : never;
} & { length: T };
type MyFormState = FormState<typeof initialDatabaseLength>;
type MyGenerateFormState = GenerateFormState<typeof initialDatabaseLength>;


type ServiceMessage = { // hanterar det medelande som kommer upp efter att man klickat submit
  class: string; //bestämmer vilken färg medelandet ska ha
  text: string; //Bestämmer vad det ska stå i medelandet
};


//yarn add react-tinder-card          // website https://www.npmjs.com/package/react-tinder-card
//yarn add @react-spring/web
//Video: TIMESTAMP   0-1h30min https://www.youtube.com/watch?v=DQfeB_FKKkc&ab_channel=CleverProgrammer 

function PatchSwipe({showcasepatches}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [databaseLength, setDatabaseLength] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  
  const [initialDatabaseLength, setInitialDatabaseLength] = useState("");

  const currentDatabaseRef = useRef(databaseLength);
  const [t, i18n] = useTranslation("global");

  const showcasepatchesSorting = showcasepatches.filter((product) =>
  /*product.tags && product.tags.includes('patches') &&*/  product.showproduct && !product.minovve)    
  .sort((a, b) => {
    if (a.importance === undefined && b.importance === undefined) {return 0;}
    if (a.importance === undefined) {return 1;}
    if (b.importance === undefined) {return -1;}
    return b.importance - a.importance; 
  });
    
  const [ourwork, setOurwork] = useState(showcasepatchesSorting);

  const childRefs = useMemo(
    () =>
      Array(ourwork.length)
        .fill(0)
        .map((i) => React.createRef()),
    [ourwork.length]
  );

  const updateCurrentDatabaseLength = (val) => {
    setDatabaseLength(val);
    currentDatabaseRef.current = val;
  };

  const canGoBack = databaseLength < ourwork.length - 1;
  const canSwipe = databaseLength >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentDatabaseLength(index - 1);
  };


  const [registeringSwipe, setRegisteringSwipe] = useState<boolean>(false); //inför en sann/falsk constant som ska ha koll på om formuläret skickas eller ej

  const outOfFrame = async (dir, name, idx) => {
    currentDatabaseRef.current >= idx && childRefs[idx].current.restoreCard();

    setRegisteringSwipe(false); //
  };



  const swipe = async (dir) => {
    
    

    
    //console.log("databaseLength" + databaseLength);
    if (canSwipe && databaseLength < ourwork.length) {
      await childRefs[databaseLength].current.swipe(dir);
    }
  };



  
  const goBack = async () => {
    setRegisteringSwipe(true); // Only run if dir is 'right'

    if (!canGoBack) return;
    const newIndex = databaseLength + 1;
    setDatabaseLength(newIndex);
    await childRefs[newIndex].current.restoreCard();
    setRegisteringSwipe(false); // Only run if dir is 'right'

  };


  const [renderCards, setRenderCards] = useState(false);

  useEffect (() =>{
    setDatabaseLength(ourwork.length-1);
    setInitialDatabaseLength(ourwork.length-1);
    
    setRenderCards(true);
  }, []); 


  const handleclick = (prevIndex) => {
    setCurrentImageIndex((prevIndex) =>prevIndex === 0 ? 1 : 0)
  }
  

  return (
    <div>
      <div className="OurDesigns">
        <h1 className="title-alt2" style={{color: "var(--primarycolor)"}}>{t("Skapamärken.ourpatches")}</h1>

      </div>
      <div className="filter-container ">
        {/* Switch and filter UI */}
      </div>
      <div className="patchswipediv">
        <div className="tinderCards__cardContainer">
        {renderCards &&
    ourwork.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.heading}
              //preventSwipe={["up", "down", "right"]}
              onSwipe={(dir) => swiped(dir, character.heading, index)}
              onCardLeftScreen={(dir) => outOfFrame(dir, character.heading, index)}
            >
              <div style={{ backgroundImage: `url(${urlFor(character.image[1] ? character.image[currentImageIndex] : character.image[0])})`, backgroundColor: "white" }} className="card">
                <div style={{position: "absolute", color: "#e0962a", padding: "7px", left: "10px", backgroundColor: "#282828c7", borderRadius: "10px",}} > 
                  <h3>{character.name} </h3>
                </div>
                

                <div style={{position: "absolute", bottom: "20px", color: "#e0962a", padding: "10px", left: "10px", backgroundColor: "#282828c7", borderRadius: "10px",}} > 

                <h5 >{t("Skapamärken.Dimensions")} {character?.sizewidth} x {character?.sizeheigth} cm {/*(b x h)*/}
                <br></br>
                {t("Skapamärken.Typ")} {character?.tags.includes("Broderat") ? t("Skapamärken.Broderat") : character?.tags.includes("Vävt") ? t("Skapamärken.Vävt") : character?.tags.includes("Tryckt") ? t("Skapamärken.Tryckt") : character?.tags} {t("Skapamärken.märke")}
                <br></br>
                {t("Skapamärken.edge")} {character?.edge.toLowerCase() === "vanlig" ? t("Skapamärken.Vanlig") : character?.edge.toLowerCase() === "tunn" ? t("Skapamärken.Tunn") : character?.edge} 
                </h5>


                </div>

                <div className="oncardbuttons">
                  
                  {/*{character.link && <a style={{  position: "absolute" , right: "21px", bottom: "20px", }}  rel="noopener noreferrer"
                  ><Link href={`/product/${character.link}`}><img style={{width: "33px"}} className="swipe-img-logo-hover" src="/assets/svgs/infologo1.png" alt="Link Image"></img></Link></a>}
                  <br></br>
                  {character.image[1] && <a > 
                  /*
                  <img className="swipe-img-logo-hover" style={{width: "30px", position: "absolute" , right: "20px", bottom: "20px", display: 'block'}} src="/assets/svgs/imagelogo.png" onClick={handleclick}></img>
                  
                  <FilterIcon className="swipe-img-logo-hover" fontSize="large" style={{ position: "absolute", right: "20px", bottom: "20px", display: 'block'}}  onClick={handleclick}/>
                  </a>}*/}

                  
                </div>
                
              </div>
            </TinderCard>
          ))}
        </div>
        <div className="swipeButtons">
          <IconButton disabled={registeringSwipe} className="swipeButtons__repeat" style={{ backgroundColor: (!canGoBack || registeringSwipe) && '#c3c4d3' }} onClick={(e) => {
    e.preventDefault();
    goBack();
  }}>
            <ReplayIcon fontSize="large" />
          </IconButton>

          <IconButton className={`${currentImageIndex === 0 ? 'swipeButtons__star' : 'swipeButtons__lightning'}`}  onClick={handleclick}>
            
            <FilterIcon fontSize="large"/>
            {/*<Link to="scrolltocontact" spy={true} smooth={true} offset={300} duration={0} scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'center' })}><StarRateIcon fontSize="large" /></Link>
            */}
          </IconButton>
          


          
          {/*<IconButton className="swipeButtons__image"  onClick={handleclick}>
          <img className="swipe-img-logo-hover" style={{width: "35px",  }} src="/assets/svgs/imagelogo.png" onClick={handleclick}></img>
          </IconButton>*/}

          <IconButton disabled={!canSwipe} className="swipeButtons__right" onClick={() => swipe('left')}> {/* <ArrowForwardIos fontSize="large"/>      <NavigateNext fontSize="large"/> */}
            <ArrowForwardIos fontSize="large" />
          </IconButton>

          
        
        

          {/*<IconButton disabled={!canSwipe} className="swipeButtons__left" onClick={() => swipe('left')}>
            <CloseIcon fontSize="large" />
          </IconButton>*/}

          {/*<IconButton className="swipeButtons__star">    <StarRateIcon fontSize="large"/> </IconButton>*/}
          {/* <IconButton disabled={registeringSwipe} className="swipeButtons__right" style={{ backgroundColor: (!canSwipe || registeringSwipe) && '#c3c4d3' }}  onClick={() => swipe('right')}>    <FavoriteIcon fontSize="large"/> </IconButton> */}
          {/*<IconButton className="swipeButtons__lightning">    <FlashOnIcon fontSize="large"/> </IconButton>*/}
        </div>
      </div>
    </div>
  );
}

export default PatchSwipe;
