import React, { ChangeEvent, FormEvent, useRef, useState, useEffect } from "react";
import axios from "axios";
import ReCAPTCHA from 'react-google-recaptcha';
import { TiDeleteOutline } from 'react-icons/ti';
import { siteName, siteNameAlt2, siteEmail } from '../config';

//import 'bootstrap/dist/css/bootstrap.min.css';

//import studentsvg from './svg/studentwhite.svg';
//import othersvg from './svg/other.svg';
//import companysvg from './svg/briefcase.svg';

import Collapsible from "./Collapsible";
import { useTranslation } from 'react-i18next';

//import "./FormRadioCheckbox.css"
//import Uploadcare from "../uploadcare/Uploadcare";

import { Widget, FileInfo, WidgetProps  } from "@uploadcare/react-widget";
//const axios = require('axios'); 


//import {handleTextArea} from "oneline-textarea"
/*
yarn add @uploadcare/react-widget
yarn add axios
yarn add react-google-recaptcha
*/

//DESIGN for contact form: https://bootsnipp.com/snippets/A36DP


//VIDEO// om koden https://www.youtube.com/watch?v=T3NHNuD60h4&ab_channel=JuniorDeveloperCentral 24 min in 
// minst 1 paket måste installeras:  yarn add react-google-recaptcha 
interface UploadcareProps {
  onUpload: (url: string) => void;
}

interface CustomWidgetProps extends WidgetProps {
  id: string;
}

type FormState = { //detta typescript måste ha samma namn på kategorier som const initialFormState
  email: string;
  name: string;
  phone: string;
  message: string;
  //service: string;
  //specifikinfo: string;
  //customertype: string;
  märkesstorlek: string;
  antalmärken: string;
  antalmärkesfärger: string;
  //mottagare: string;
  //adress: string;
  //postnummer: string;
  //studentprogram: string;
  //location: string;
  //companyname: string;
  //newssubscribe: string;
  file: string;

};

type ServiceMessage = { // hanterar det medelande som kommer upp efter att man klickat submit
  class: string; //bestämmer vilken färg medelandet ska ha
  text: string; //Bestämmer vad det ska stå i medelandet
};


function ContactForm() {
  const [subscribe, setSubscribe] = useState<any>("Nej tack");// Radio button clear code https://surajsharma.net/blog/react-handle-radio-buttons
  const onloadCallback = () => { // Radio button clear code https://surajsharma.net/blog/react-handle-radio-buttons
    recaptchaRef.current.reset(); //När formuläret skickas recaptcha, gör inte detta om mailet inte skickades
  }
  const [t, i18n] = useTranslation("global");


  const [updateList, setUpdateList] = useState(false);
  //  const [showSizeAlert, setShowSizeAlert] = useState(false);
  

  


// Textresizearea____________________________________________________ //flytta till eget dokument om möjligt
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // The value of the textarea
  const [value, setValue] = useState<String>();
  // This function is triggered when textarea changes
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {setValue(event.target.value);};
  useEffect(() => {
    
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);
// Textresizearea____________________________________________________




const formId = "9HpCVM7p";//"iOV4vDBK"; // Test formspark mail id: t17jl8Qu     //unika idt för mitt formulär på formspark:  https://dashboard.formspark.io/workspaces/Bz0sscnB/forms/t17jl8Qu/submissions
const formSparkUrl = `https://submit-form.com/${formId}`; // Write `` using "Shift" + "knapp till vänster om backspace, alltså knappen med ´´ " 
  
const initialFormState = { //denna konstant måste ha samma namn på kategorier som type FormState, här kan man skriva in text som ska vara när formuläret laddas in 
  name: "",
  email: "",
  phone: "",
  //service: "",
  //specifikinfo: "",
  //customertype: "",

  märkesstorlek: "",
  antalmärken: "",
  antalmärkesfärger: "",
  //studentprogram: "",
  //location: "",
  //companyname: "",
  //newssubscribe: "Nej tack",
  message: "",
  file: "",

};

//Recaptcha
const recaptchaKey = '6Lec8rseAAAAALV9dXXceNUq48ok3nGWMbAtgwJa'; // för att skaffa recaptcha token https://www.google.com/recaptcha/admin/site/515633820/setup, sitekey skriv in på denna rad och secret key skrivs på formspark https://dashboard.formspark.io/workspaces/Bz0sscnB/forms/t17jl8Qu/settings
const recaptchaRef = useRef<any>();
const [recaptchaToken, setReCaptchaToken] = useState<string>();
const updateRecaptchaToken = (token: string | null) => {
  setReCaptchaToken(token as string);
};


const [checked, setChecked] = useState<any>("");// Radio button clear code https://surajsharma.net/blog/react-handle-radio-buttons
const [c2hecked, setC2hecked] = useState<any>("");// Radio button clear code https://surajsharma.net/blog/react-handle-radio-buttons
const [c3hecked, setC3hecked] = useState<any>("");// Radio button clear code https://surajsharma.net/blog/react-handle-radio-buttons


const [formState, setFormState] = useState<FormState>(initialFormState); //laddar in constanterna från initialFormState till FormState så att texten från initialFormState visas i formuläret
const [submitting, setSubmitting] = useState<boolean>(false); //inför en sann/falsk constant som ska ha koll på om formuläret skickas eller ej
const [message, setMessage] = useState<ServiceMessage>(); //hanterar text för om medelandet har skickats eller om error uppstått

const [files, setFiles] = useState<FileList | null>(null);
const fileInputRef = useRef<HTMLInputElement | null>(null);

const [showAdvancedForm, setShowAdvancedForm] = useState(false);



const submitForm = async (event: FormEvent) => { //När man klickar på skicka formulär
  event.preventDefault();
    setSubmitting(true); 
    await postSubmission();
    setSubmitting(false);
  };
  

  const postSubmission = async () => {
    const payload = { //payload är den info som ska skickas till formspark 
      ...formState, //tar all data från kategorierna i formstate och gör som payload så att allt laddas upptill formspark
      "g-recaptcha-response": recaptchaToken, //skickar med recaptcha nyckeln till formspark för att vertifiera om nyckeln är rätt
      //kommentera bort raden ovan om man vill testa hur det blir när inte formuläret skickas
      
      //message: "Test formspark submission", //även statiska medelanden kan skickas
    };

    try { //man försöker skicka, om det lyckas händer koden nedan
      const result = await axios.post(formSparkUrl, payload);
      //console.log(result);
      setMessage({ 
        class: "var(--messagesentsuccessful)", //bakgrundsfärg på medelandet
        text: i18n.language === "sv" ? "Ditt meddelande har skickats. Vi kontaktar dig snarast." : "our message has been sent. We will contact you soon.", // om man lyckas skicka medelandet
      });
      removeFiles();
      setFormState(initialFormState); //När formuläret skickas tömms alla värden, gör inte detta om mailet inte skickades
      recaptchaRef.current.reset(); //När formuläret skickas recaptcha, gör inte detta om mailet inte skickades
      resetRadioState(); // Radio button clear code




    } catch (error) { //om det blir något fel
      //console.log(error);
      setMessage({
        class:  "var(--messagesentfail)", //bakgrundsfärg på medelandet
        text: i18n.language === "sv" ? `Meddelandet kunde inte skickas. Försök igen eller kontakta oss via e-post (${siteEmail}). ` : `The message could not be sent. Please try again or contact us via email (${siteEmail}). `, // om man inte lyckas skicka medelandet
      });
      
    }
  };

  const [key, setKey] = useState(Math.random().toString(36).substring(7)); // initial key
  const [uploadFileName, setUploadFileName] = useState<any>(""); // initial key

  const uploadFileChange = (info: FileInfo): void => {
    //console.log("uploadFileChange is running, WOWOWOWO");
    //setKey(Math.random().toString(36).substring(7));
    //console.log(info);
    //console.log(info.cdnUrl);
    const id = "file";
    const value = info.cdnUrl ?? ""; // use the string, if null then give "" bbbbb
    const key =  id as keyof FormState;
    const updatedFormState = { ...formState };
    updatedFormState[key] = value;

    setUploadFileName(info.name);
    setFormState(updatedFormState);
    setKey(key); // update key to trigger re-render
  };


  const uploadFileSelect = (file: any): void => {
    //console.log("uploadFileSelect is running");
    //console.log(`file changed ${file}`);
    setUpdateList(false);
    if (file) {
      file.progress((info: any) =>
        console.log("File progress: ")
      );
      file.done((info: any) => setUpdateList(true));
    }
  };

  const removeFiles = () => {
    setUploadFileName("");
    const id = "file";
    const value = ""; // use the string, if null then give "" bbbbb
    const key =  id as keyof FormState;
    const updatedFormState = { ...formState };
    updatedFormState[key] = value;
    setFormState(updatedFormState);
  };

  
  const updateFormControl = ( //denna kodbit gör så att man kan uppdatera formuläret (skriva i det), annars är det endast readonly
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    const key = id as keyof FormState;
    const updatedFormState = { ...formState };
    updatedFormState[key] = value;
    setFormState(updatedFormState);
  };
  
  const updateFormControlRadio = ( //denna kodbit gör så att man kan uppdatera formuläret (skriva i det), annars är det endast readonly
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> // kan vara onChange i input elementet
  ) => {
    setChecked(event.target.value); //Radio button clear
    setC3hecked("");

    const { name, value } = event.target;
    const key = name as keyof FormState;

    const updatedFormState = { ...formState };
    updatedFormState[key] = value;
    //console.log(key);
    //console.log(updatedFormState[key]);
    setFormState(updatedFormState);

    // const key2 = "newssubscribe" as keyof FormState;
    //console.log(key2);
    //console.log(updatedFormState[key2]);
    //updatedFormState[key2] = "Nej tack";
    setFormState(updatedFormState);
    
    setSubscribe("Nej tack");
    onloadCallback(); //Uppdaterar recaptcha

  };

  const u2pdateFormControlRadio = ( //denna kodbit gör så att man kan uppdatera formuläret (skriva i det), annars är det endast readonly
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> // kan vara onChange i input elementet
) => {
  setC2hecked(event.target.value); //Radio button clear

  const { name, value } = event.target;
  const key = name as keyof FormState;

  const updatedFormState = { ...formState };
  updatedFormState[key] = value;
  //console.log(key);
  //console.log(updatedFormState[key]);
  setFormState(updatedFormState);

  // const key2 = "newssubscribe" as keyof FormState;
  //console.log(key2);
  //console.log(updatedFormState[key2]);
  //updatedFormState[key2] = "Nej tack";
  setFormState(updatedFormState);
  
  setSubscribe("Nej tack");
  onloadCallback(); //Uppdaterar recaptcha

};


const u3pdateFormControlRadio = ( //denna kodbit gör så att man kan uppdatera formuläret (skriva i det), annars är det endast readonly
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> // kan vara onChange i input elementet
) => {
  setC3hecked(event.target.value); //Radio button clear

  const { name, value } = event.target;
  const key = name as keyof FormState;

  const updatedFormState = { ...formState };
  updatedFormState[key] = value;
  //console.log(key);
  //console.log(updatedFormState[key]);
  setFormState(updatedFormState);

  // const key2 = "newssubscribe" as keyof FormState;
  //console.log(key2);
  //console.log(updatedFormState[key2]);
  //updatedFormState[key2] = "Nej tack";
  setFormState(updatedFormState);
  
  setSubscribe("Nej tack");
  onloadCallback(); //Uppdaterar recaptcha

};


  const resetRadioState = () => { // Radio button clear code https://surajsharma.net/blog/react-handle-radio-buttons
    setChecked("");
    setC2hecked("");
    setC3hecked("");
    setSubscribe("Nej tack");

  }
  const nothingishappening = () => { // Radio button clear code https://surajsharma.net/blog/react-handle-radio-buttons
    //console.log("this function does nothing");

  }

  const resetSubscribe = () => { // Radio button clear code https://surajsharma.net/blog/react-handle-radio-buttons
    setSubscribe("Nej tack");
    //console.log("should reset subsrcribe");
    //const key = "newssubscribe" as keyof FormState;
    const updatedFormState = { ...formState };
    //updatedFormState[key] = "Nej tack";
    setFormState(updatedFormState); 
  }

  const updateSubscribe = ( //denna kodbit gör så att subscribe fuktionen funkar som planerat
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  
  if(subscribe === "Nej tack"){
    event.target.value="Ja tack";
    //console.log(event.target.value + "should be Ja tack");

  }else if(subscribe === "Ja tack"){
    event.target.value="Nej tack"
    //console.log(event.target.value + "should be Nej tack");

  }else{
    //console.log("Big error else if statements");
  }

  //console.log("Visat efter if else" + event.target.value);

  setSubscribe(event.target.value); //Radio button clear
  //console.log("vad säger subscribe? " + subscribe);

  const { id, value } = event.target;
  const key = id as keyof FormState;
  const updatedFormState = { ...formState };
  updatedFormState[key] = value;
  setFormState(updatedFormState); 
};

const toggleAdvancedForm = () => {
  setShowAdvancedForm(!showAdvancedForm);
};

const customTranslations = {
  upload: {
    button: "Välj filer", // Change the button text here
    dropLabel: "Dra och släpp filer här", // Optional: customize drop label
  },
  // Other translations as needed
};


const [renderOnClient, setRenderOnClient] = useState(false);

useEffect (() =>{
  setRenderOnClient(true);
  
}, []); 


const [isTextVisible, setIsTextVisible] = useState(false);

const toggleTextVisibility = () => {
  setIsTextVisible(!isTextVisible); // Toggle the state value
};




const uploadbuttontext = () => ({
  buttons: {
    choose: {
      files: {
        one: "Pick a file"
      }
    }
  }
});

  return (
    <div  className="get-in-touch" id="contact"  >
      <div > 
      <form className="contact-form" style={{ textAlign: 'center', // Center the content horizontally
    margin: '0 auto', }} onSubmit={submitForm} >

       { /* <h1 className="title">Kontakta oss </h1>*/}
       {i18n.language === "sv" ? ( <>

       <h1 className="title-alt2" style={{color: "var(--primarycolor)"}}>Kontakta oss</h1>
        <p style={{marginTop: "-40px"}}>för offerter, med frågor kring att skapa märken eller med generella frågor. </p>
        <p style={{}}>Vi kan även hjälpa dig att designa märken.  </p>

        {isTextVisible && (
          <>
            <h3  style={{marginTop: "10px", color: "var(--primarycolor)"}}>Mer Info</h3>
            <p style={{marginTop: "0px"}}>Standard leveranstid är ca 6 veckor. Önskas snabbare leverans skriv det i meddelandet.</p>
            <p style={{}}>Skicka gärna designer i PDF, JPG eller PNG format.</p>
            <p style={{}}>Max antal färger för vävt märke är 8st färger.</p>
            <p style={{}}>För broderade märken kan man välja kantstorlek.</p>
          </>
        )}
        
        <a onClick={toggleTextVisibility} style={{marginTop: "8px", cursor: 'pointer', color: isTextVisible ? 'primarycolor' : 'var(--primarycolor)' }}>{isTextVisible ? 'Mindre' : 'Mer info'}</a>
       

          {/*<span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </span>*/}  
          
      {message && ( // Visar medelande om man lyckats/misslyckats att skicka formuläret
          <div style={{marginTop: "40px", color:`${message.class}`}}>
            {message.text}</div>)}
            </> ) : (
 <>

    <h1 className="title-alt2" style={{ color: "var(--primarycolor)" }}>Contact us</h1>
    <p style={{ marginTop: "-40px" }}>for quotes, questions about creating patches, or general inquiries.</p>
    <p style={{}}>We can also help you design patches.</p>

  {isTextVisible && (
    <>
      <h3 style={{ marginTop: "10px", color: "var(--primarycolor)" }}>More Information</h3>
    <p style={{ marginTop: "0px" }}>Standard delivery time is approximately 6 weeks. If faster delivery is desired, please mention it in the message.</p>
    <p style={{}}>Feel free to send designs in PDF, JPG, or PNG format.</p>
    <p style={{}}>The maximum number of colors for woven patches is 8.</p>
    <p style={{}}>For embroidered patches, you can choose the edge size.</p>
    </>
  )}
  
  <a onClick={toggleTextVisibility} style={{marginTop: "8px", cursor: 'pointer', color: isTextVisible ? 'primarycolor' : 'var(--primarycolor)' }}>{isTextVisible ? 'Show less' : 'More Information'}</a>
 

    {/*<span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    </span>*/}  
    
{message && ( // Visar medelande om man lyckats/misslyckats att skicka formuläret
    <div style={{marginTop: "40px", color:`${message.class}`}}>
      {message.text}</div>)}
      </> 
       )}
  <div >

{/*<div className=" row ">

      <Collapsible title="Broderade"> 
          <h2>wew</h2>
        <p>Here's soqeweqeqweqweqweme content that will be hidden by default</p>
      </Collapsible>

      <Collapsible title="Vävda"> 
          <h2>wew</h2>
        <p>Here's soqeweqeqweqweqweme content that will be hidden by default</p>
      </Collapsible>

      <Collapsible title="Tryckta"> 
          <h2>wew</h2>
        <p>Here's soqeweqeqweqweqweme content that will be hidden by default</p>
      </Collapsible>

</div> */}


<div className=" row ">

<div className="custom-column-contact"> 
          <div className="form-field col-lg-4 "> {/* röd "require" stjärnahttp://blog.adeel.io/2015/10/18/adding-an-asterisk-to-required-fields-in-bootstrap/ */}
            <input type="text" placeholder=" " className="input-text" onChange={updateFormControl} id="name" required
              value={formState?.name} /*from "type FormState", de värde som är inskrivet i initialformstate */ />
            <label className="label" htmlFor="name" >*{t("Skapamärken.Namn")}</label> {/*Label taggen måste vara under input annars funkar inte klickfunktionen på namnet */}
          </div>
          </div>

      <div className="custom-column-contact"> 
          <div className="form-field col-lg-4 ">
            <input type="email" placeholder=" " className="input-text noresize-textarea" onChange={updateFormControl} id="email" required 
              value={formState?.email} /*from "type FormState", de värde som är inskrivet i initialformstate*/ />
            <label className="label"  htmlFor="email" >*{t("Skapamärken.Email")}</label>
          </div>
          </div>

      <div className="custom-column-contact"> 
          <div className="form-field col-lg-4 ">
            <input type="text" placeholder=" " className="input-text noresize-textarea" onChange={updateFormControl} id="phone"  
              value={formState?.phone} /*from "type FormState", de värde som är inskrivet i initialformstate*/ />
            <label className="label"  htmlFor="phone" >&nbsp;{t("Skapamärken.Telefon")}</label> {/* mellanslag innan telefon https://www.computerhope.com/issues/ch001662.htm */}
          </div>
          </div>
      </div>

      </div>



 




{/* Info om märket, antal märken etc */}

    <div >
    <div className=" row ">

    <div className="custom-column-contact"> 
      <div className="form-field col-lg-4 "> {/* röd "require" stjärnahttp://blog.adeel.io/2015/10/18/adding-an-asterisk-to-required-fields-in-bootstrap/ */}
            <input type="text" placeholder=" " className="input-text" onChange={updateFormControl} id="antalmärken" 
              value={formState?.antalmärken} /*from "type FormState", de värde som är inskrivet i initialformstate */ />
            <label className="label" htmlFor="antalmärken" >&nbsp;{t("Skapamärken.Antal Märken")}</label> {/*Label taggen måste vara under input annars funkar inte klickfunktionen på namnet */}
          </div>
      </div>

      <div className="custom-column-contact"> 

          <div className="form-field col-lg-4 "> {/* röd "require" stjärnahttp://blog.adeel.io/2015/10/18/adding-an-asterisk-to-required-fields-in-bootstrap/ */}
            <input type="text" placeholder=" " className="input-text" onChange={updateFormControl} id="märkesstorlek" 
              value={formState?.märkesstorlek} /*from "type FormState", de värde som är inskrivet i initialformstate */ />
            <label className="label" htmlFor="märkesstorlek" >&nbsp;{t("Skapamärken.Mått")}</label> {/*Label taggen måste vara under input annars funkar inte klickfunktionen på namnet */}
          </div>      
          </div>

          <div className="custom-column-contact"> 
          <div className="form-field col-lg-4 "> {/* röd "require" stjärnahttp://blog.adeel.io/2015/10/18/adding-an-asterisk-to-required-fields-in-bootstrap/ */}
            <input type="text" placeholder=" " className="input-text" onChange={updateFormControl} id="antalmärkesfärger" 
              value={formState?.antalmärkesfärger} /*from "type FormState", de värde som är inskrivet i initialformstate */ />
            <label className="label" htmlFor="antalmärkesfärger" >&nbsp;{t("Skapamärken.Märkestyp")}</label> {/*Label taggen måste vara under input annars funkar inte klickfunktionen på namnet */}
          </div>
          </div>

      </div>
      </div>
    







{    /*<div >
    <div className=" row ">
    <div className="custom-column-contact"> 
          <div className="form-field col-lg-12 ">
            <textarea className="input-text noresize-textarea" onChange={updateFormControl} id="adress"  
              value={formState?.adress} 
              ref={textareaRef} onInput={textAreaChange}>
                    {value}</textarea>
            <label className="label"  htmlFor="adress" >&nbsp;Leverans adress</label>
          </div>
          </div>   

        </div>
</div>*/}

    <div >
    <div className=" row ">
      <div className="custom-column-contact"> 
        <div className="form-field col-lg-12 " >
                <textarea className="input-text noresize-textarea" onChange={updateFormControl} 
                id="message" required value={formState?.message} 
                  ref={textareaRef} onInput={textAreaChange}>
                    {value}</textarea>
                <label className="label" htmlFor="message" >*{t("Skapamärken.howtohelp")}</label>
          </div>
        </div>   
        </div>   

  <div className=" row ">
  <div className="form-file-buttons" style={{textAlign: "left"}}>
  { renderOnClient && 
  <Widget //CCCCCCCC     Configurera widget   https://uploadcare.com/widget/configure/
          publicKey={"7c1188549576c89ee04e"}
          multiple
          clearable
          tabs = "file camera url"
          effects = "crop, flip, rotate, blur, mirror, sharp, invert, grayscale, enhance"
          localeTranslations={uploadbuttontext()}
          
          key={formState.file} // use key prop to trigger re-render
          //onChange={(info: FileInfo) => uploadFileChange(info)}
          onChange={uploadFileChange}
          onFileSelect={(file: any) => uploadFileSelect(file)}
        />
  }
        <label style={{marginBottom: "-10px", marginLeft:"4px",  fontSize: "18px"}}> {uploadFileName} </label>
        {uploadFileName !== "" &&(
        <button type="button" onClick={removeFiles} className="remove-item" style={{position: "absolute", marginLeft:"2px" ,marginTop: "6px",}}>
          <TiDeleteOutline />
        </button>
      )}
</div>
  </div>

  </div>

      





<div className="mobile-contact-align-center" style={{textAlign: "left"}} > {/* både class "text-center och style display inline-block behövs för att centrera */}
            <ReCAPTCHA /* theme="dark" */ className="recaptcha" style={{display : 'inline-block'}} ref={recaptchaRef} sitekey={recaptchaKey} onChange={updateRecaptchaToken} />
          </div>




      <div>
          
          {/*{message && message.class === "text-danger" && ( // Visar medelande endast om de misslyckades // för endast om de lyckades text-success
          <div className={`${message.class}`}>
            {message.text}</div>)}*/}

            {message && ( // Visar medelande om man lyckats/misslyckats att skicka formuläret
          <div style={{marginTop: "20px", color:`${message.class}`}}>
            {message.text}</div>)}

          <div className="form-field-submit col-lg-12 mobile-contact-align-center">
            <button className="submit-btn" disabled={submitting} > {/*detta görs så att knappen inte fungerar när man har klickat på skicka */} 
              {i18n.language === "sv" ? (submitting ? "Skickar..." : "Skicka") : (submitting ? "Sending..." : "Send")} {/*Om variabeln submit är sann står det submitting på knappen annars står det bara submit */}
            </button>
          </div>
    </div>



        </form>
      </div>
    </div>
  );
}

export default ContactForm;

