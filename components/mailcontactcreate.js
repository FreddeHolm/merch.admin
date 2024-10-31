import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import ReCAPTCHA from 'react-google-recaptcha';
import { TiDeleteOutline } from 'react-icons/ti';
import { siteName, siteNameAlt2, siteEmail } from './config';
import { format, getISOWeek } from 'date-fns';
import Collapsible from "./patchswipe/Collapsible";
import { useTranslation } from 'react-i18next';
import { sv, enUS } from 'date-fns/locale';
import { Widget } from "@uploadcare/react-widget";
import { useRouter } from 'next/router';




//const axios = require('axios'); 


//import "./FormRadioCheckbox.css"
//import Uploadcare from "../uploadcare/Uploadcare";
//import {handleTextArea} from "oneline-textarea"
/*
yarn add @uploadcare/react-widget
yarn add axios
yarn add react-google-recaptcha
*/
//import 'bootstrap/dist/css/bootstrap.min.css';

//import studentsvg from './svg/studentwhite.svg';
//import othersvg from './svg/other.svg';
//import companysvg from './svg/briefcase.svg';

//DESIGN for contact form: https://bootsnipp.com/snippets/A36DP


//VIDEO// om koden https://www.youtube.com/watch?v=T3NHNuD60h4&ab_channel=JuniorDeveloperCentral 24 min in 
// minst 1 paket måste installeras:  yarn add react-google-recaptcha 

// The ContactForm component
function ContactForm({ selectedDates, cartItems, totalPrice }) {
  const [subscribe, setSubscribe] = useState("Nej tack"); // Radio button clear code
  const onloadCallback = () => { // Resets reCAPTCHA when the form is submitted
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };
  const [t, i18n] = useTranslation("global");
  const router = useRouter();
  const [updateList, setUpdateList] = useState(false);
  //  const [showSizeAlert, setShowSizeAlert] = useState(false);

  // Textresizearea____________________________________________________ //flytta till eget dokument om möjligt
  const textareaRef = useRef(null);
  // The value of the textarea
  const [value, setValue] = useState("");
  // This function is triggered when textarea changes
  const textAreaChange = (event) => { setValue(event.target.value); };
  useEffect(() => {

    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [value]);
  // Textresizearea____________________________________________________

  const formId = "9HpCVM7p"; //"iOV4vDBK"; // Unique form ID from Formspark
  const formSparkUrl = `https://submit-form.com/${formId}`; // Formspark submission URL

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    //märkesstorlek: "",
    //antalmärken: "",
    //antalmärkesfärger: "",
    message: "",
    //file: "",
  };

  // ReCAPTCHA
  const recaptchaKey = '6Lec8rseAAAAALV9dXXceNUq48ok3nGWMbAtgwJa'; // Your site key for reCAPTCHA
  const recaptchaRef = useRef(null);
  const [recaptchaToken, setReCaptchaToken] = useState();
  const updateRecaptchaToken = (token) => {
    setReCaptchaToken(token);
  };

  const [checked, setChecked] = useState(""); // Radio button state
  const [c2hecked, setC2hecked] = useState("");
  const [c3hecked, setC3hecked] = useState("");

  const [formState, setFormState] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false); // Tracks if the form is submitting
  const [message, setMessage] = useState(); // Handles the message displayed after form submission

  const [files, setFiles] = useState(null);
  const fileInputRef = useRef(null);

  const [showAdvancedForm, setShowAdvancedForm] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();

    // Check if at least 2 selectedDates
    if (selectedDates.length < 2) {
      setMessage({
        class: "var(--messagesentfail)",
        text: i18n.language === "sv" ? "Du måste välja minst 2 tider." : "You must select at least 2 times.",
      });
      return;
    }

    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      setMessage({
        class: "var(--messagesentfail)",
        text: i18n.language === "sv" ? "Vänligen verifiera att du inte är en robot." : "Please verify that you are not a robot.",
      });
      return;
    }

    // Check if name, email, and phone are entered
    if (!formState.name || !formState.email || !formState.phone) {
      setMessage({
        class: "var(--messagesentfail)",
        text: i18n.language === "sv" ? "Vänligen fyll i namn, e-post och telefonnummer." : "Please enter your name, email, and phone number.",
      });
      return;
    }

    setSubmitting(true);
    await postSubmission();
    setSubmitting(false);
  };

  const postSubmission = async () => {
    // Format selectedDates
    const formattedSelectedDates = selectedDates
      .map(({ date, time }) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const timeStr = time === 'whenever' ? (i18n.language === 'sv' ? 'när som' : 'whenever') : format(time, 'HH:mm');
        const dayOfWeek = format(date, 'EEEE', { locale: i18n.language === 'sv' ? sv : enUS });
        const weekNumber = `v${getISOWeek(date)}`;
        return `• ${dateStr} ${timeStr} (${dayOfWeek}, ${weekNumber})`;
      })
      .join('\n');

    // Format cartItems
    const formattedCartItems = cartItems
      .map((item) => {
        const itemName = i18n.language === 'sv' ? item.name : item.nameeng || item.name;
        const variationName = item.selectedVariation
          ? ` (${i18n.language === 'sv' || !item.selectedVariation.nameeng ? item.selectedVariation.name : item.selectedVariation.nameeng})`
          : '';
        const quantity = item.quantity;
        const quantityStr = `${quantity}st`;
        const pricePerUnit = item.price;
        const totalItemPrice = pricePerUnit * quantity;
        return `• ${quantityStr} - ${itemName}${variationName} - ${pricePerUnit}kr/st - Summa: ${totalItemPrice}kr\n`;
      })
      .join('\n');

    const payload = {
      ...formState,
      "g-recaptcha-response": recaptchaToken,
      selectedDates: formattedSelectedDates,
      cartItems: formattedCartItems,
      totalPrice: `${totalPrice}kr`,
    };

    try {
      const result = await axios.post(formSparkUrl, payload);
      //console.log(result);
      setMessage({
        class: "var(--messagesentsuccessful)", // Background color for the success message
        text: i18n.language === "sv" ? "Ditt meddelande har skickats. Vi kontaktar dig snarast." : "Your message has been sent. We will contact you soon.",
      });
      removeFiles();
      setFormState(initialFormState); // Clears the form fields
      recaptchaRef.current.reset(); // Resets reCAPTCHA
      resetRadioState(); // Resets radio buttons
      router.push('/successcollect');

    } catch (error) {
      //console.log(error);
      setMessage({
        class: "var(--messagesentfail)", // Background color for the error message
        text: i18n.language === "sv" ? `Meddelandet kunde inte skickas. Försök igen eller kontakta oss via e-post (${siteEmail}). ` : `The message could not be sent. Please try again or contact us via email (${siteEmail}). `,
      });

    }
  };

  const [key, setKey] = useState(Math.random().toString(36).substring(7)); // Initial key for the upload widget
  const [uploadFileName, setUploadFileName] = useState(""); // Stores the uploaded file name

  const uploadFileChange = (info) => {
    const id = "file";
    const value = info.cdnUrl ?? ""; // If null, set to empty string
    const updatedFormState = { ...formState };
    updatedFormState[id] = value;

    setUploadFileName(info.name);
    setFormState(updatedFormState);
    setKey(key); // Update key to trigger re-render
  };

  const uploadFileSelect = (file) => {
    setUpdateList(false);
    if (file) {
      file.progress((info) =>
        console.log("File progress: ")
      );
      file.done((info) => setUpdateList(true));
    }
  };

  const removeFiles = () => {
    setUploadFileName("");
    const id = "file";
    const value = "";
    const updatedFormState = { ...formState };
    updatedFormState[id] = value;
    setFormState(updatedFormState);
  };

  const updateFormControl = (
    event
  ) => {
    const { id, value } = event.target;
    const updatedFormState = { ...formState };
    updatedFormState[id] = value;
    setFormState(updatedFormState);
  };

  const updateFormControlRadio = (
    event
  ) => {
    setChecked(event.target.value); // Radio button clear
    setC3hecked("");

    const { name, value } = event.target;

    const updatedFormState = { ...formState };
    updatedFormState[name] = value;
    setFormState(updatedFormState);

    setSubscribe("Nej tack");
    onloadCallback(); // Updates reCAPTCHA

  };

  const u2pdateFormControlRadio = (
    event
  ) => {
    setC2hecked(event.target.value); // Radio button clear

    const { name, value } = event.target;

    const updatedFormState = { ...formState };
    updatedFormState[name] = value;
    setFormState(updatedFormState);

    setSubscribe("Nej tack");
    onloadCallback(); // Updates reCAPTCHA

  };

  const u3pdateFormControlRadio = (
    event
  ) => {
    setC3hecked(event.target.value); // Radio button clear

    const { name, value } = event.target;

    const updatedFormState = { ...formState };
    updatedFormState[name] = value;
    setFormState(updatedFormState);

    setSubscribe("Nej tack");
    onloadCallback(); // Updates reCAPTCHA

  };

  const resetRadioState = () => { // Radio button clear code
    setChecked("");
    setC2hecked("");
    setC3hecked("");
    setSubscribe("Nej tack");

  };
  const nothingishappening = () => { // Placeholder function
    //console.log("this function does nothing");

  };

  const resetSubscribe = () => { // Resets the subscribe state
    setSubscribe("Nej tack");
    const updatedFormState = { ...formState };
    setFormState(updatedFormState);
  };

  const updateSubscribe = (
    event
  ) => {

    if (subscribe === "Nej tack") {
      event.target.value = "Ja tack";
    } else if (subscribe === "Ja tack") {
      event.target.value = "Nej tack"
    } else {
      //console.log("Big error else if statements");
    }

    setSubscribe(event.target.value);

    const { id, value } = event.target;
    const updatedFormState = { ...formState };
    updatedFormState[id] = value;
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

  useEffect(() => {
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
    <div className="get-in-touch" id="contact">
      <div>
        <form className="contact-form" style={{ textAlign: 'center', margin: '0 auto' }} onSubmit={submitForm}>

          <>
            <h1 className="title-alt2" style={{ color: "var(--secondarycolor)", marginBottom: "-40px",   }}>{t('collect.Kontakta Oss')}</h1>

            {message && ( // Displays message after form submission
              <div style={{ marginTop: "40px", color: `${message.class}` }}>
                {message.text}</div>)}
          </>
          
          <div>

            {/* Form Fields */}
            <div className="row">

              <div className="custom-column-contact">
                <div className="form-field col-lg-4 ">
                  <input type="text" placeholder=" " className="input-text" onChange={updateFormControl} id="name" required
                    value={formState?.name} />
                  <label className="label" htmlFor="name" >*{t("Skapamärken.Namn")}</label>
                </div>
              </div>

              <div className="custom-column-contact">
                <div className="form-field col-lg-4 ">
                  <input type="email" placeholder=" " className="input-text noresize-textarea" onChange={updateFormControl} id="email" required
                    value={formState?.email} />
                  <label className="label" htmlFor="email" >*{t("Skapamärken.Email")}</label>
                </div>
              </div>

              <div className="custom-column-contact">
                <div className="form-field col-lg-4 ">
                  <input type="text" placeholder=" " className="input-text noresize-textarea" onChange={updateFormControl} id="phone" required
                    value={formState?.phone} />
                  <label className="label" htmlFor="phone" >*{t("Skapamärken.Telefon")}</label>
                </div>
              </div>
            </div>

          </div>

          {/* Info about the patch, number of patches, etc. */}
          {/* 
          <div>
            <div className="row">

              <div className="custom-column-contact">
                <div className="form-field col-lg-4 ">
                  <input type="text" placeholder=" " className="input-text" onChange={updateFormControl} id="antalmärken"
                    value={formState?.antalmärken} />
                  <label className="label" htmlFor="antalmärken" >&nbsp;{t("Skapamärken.Antal Märken")}</label>
                </div>
              </div>

              <div className="custom-column-contact">

                <div className="form-field col-lg-4 ">
                  <input type="text" placeholder=" " className="input-text" onChange={updateFormControl} id="märkesstorlek"
                    value={formState?.märkesstorlek} />
                  <label className="label" htmlFor="märkesstorlek" >&nbsp;{t("Skapamärken.Mått")}</label>
                </div>
              </div>

              <div className="custom-column-contact">
                <div className="form-field col-lg-4 ">
                  <input type="text" placeholder=" " className="input-text" onChange={updateFormControl} id="antalmärkesfärger"
                    value={formState?.antalmärkesfärger} />
                  <label className="label" htmlFor="antalmärkesfärger" >&nbsp;{t("Skapamärken.Märkestyp")}</label>
                </div>
              </div>

            </div>
          </div>
          */}

          <div>
            <div className="row">
              <div className="custom-column-contact">
                <div className="form-field col-lg-12 ">
                  <textarea className="input-text noresize-textarea" onChange={updateFormControl}
                    id="message"  value={formState?.message /*required*/ }
                    ref={textareaRef} onInput={textAreaChange}>
                    {value}</textarea>
                  <label className="label" htmlFor="message" >&nbsp;{t("collect.Meddelande")}</label>
                </div>
              </div>
            </div>

{/*  
            <div className="row">
              <div className="form-file-buttons" style={{ textAlign: "left" }}>
                {renderOnClient &&
                  <Widget // Configure the Uploadcare widget
                    publicKey={"7c1188549576c89ee04e"}
                    multiple
                    clearable
                    tabs="file camera url"
                    effects="crop, flip, rotate, blur, mirror, sharp, invert, grayscale, enhance"
                    localeTranslations={uploadbuttontext()}

                    key={formState.file} // Use key prop to trigger re-render
                    onChange={uploadFileChange}
                    onFileSelect={uploadFileSelect}
                  />
                }
                <label style={{ marginBottom: "-10px", marginLeft: "4px", fontSize: "18px" }}> {uploadFileName} </label>
                {uploadFileName !== "" && (
                  <button type="button" onClick={removeFiles} className="remove-item" style={{ position: "absolute", marginLeft: "2px", marginTop: "6px", }}>
                    <TiDeleteOutline />
                  </button>
                )}
              </div>
            </div>
           */}

          </div>

          <div className="mobile-contact-align-center" style={{ textAlign: "left" }}>
            <ReCAPTCHA /* theme="dark" */ className="recaptcha" style={{ display: 'inline-block' }} ref={recaptchaRef} sitekey={recaptchaKey} onChange={updateRecaptchaToken} />
          </div>

          <div>

            {message && ( // Displays message after form submission
              <div style={{ marginTop: "20px", color: `${message.class}` }}>
                {message.text}</div>)}

            <div className="form-field-submit col-lg-12 mobile-contact-align-center">
              <button className="submit-btn" disabled={submitting} >
                {i18n.language === "sv" ? (submitting ? "Skickar..." : "Beställ") : (submitting ? "Sending..." : "Place Order")}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ContactForm;