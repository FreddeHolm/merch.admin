import React, { useEffect } from 'react';
import { siteName, siteNameAlt2, siteEmail } from '../components/config';
import Navbar from '../components/Navbar';
import { client } from '../lib/client';
import { useTranslation } from 'react-i18next';
import { fetchData } from  '../components/basicgetServerSideProps.js';


const PrivacyPolicyPage = ({announcements, release, products})=> {
  const [t, i18n] = useTranslation("global");


  // Update the document's title when the component mounts
  useEffect(() => {
    document.title = `${siteNameAlt2 && siteNameAlt2} | ${t("footer.Integritetspolicy")}`;
  }, []);


  return (
    <div >
    <Navbar announcements={announcements} release={release} productsss={products}/>
    {i18n.language === "sv" ? (
    <div className="privacy-policy-container">
      <h1 className="title" style={{ marginTop: "30px" }}>
  Cookie- och lokal lagringspolicy för {siteName}
</h1>

<p className="paragraph">
  Denna webbplats använder cookies och lokal lagring för att förbättra användarupplevelsen och samla in viss information om besökare. Genom att använda {siteName} samtycker du till att cookies och lokal lagring används enligt denna policy. Vi rekommenderar att du läser igenom policyn noggrant för att förstå hur vi använder dessa teknologier och hur du kan hantera dem.
</p>

<h2 className="subtitle">Vad är cookies och lokal lagring?</h2>
<p className="paragraph">
  Cookies är små textfiler som lagras på din dator eller mobila enhet när du besöker en webbplats. De används vanligtvis för att samla in viss information om besökare, deras preferenser eller deras enheter. Cookies möjliggör förbättrad funktionalitet och anpassning av webbplatsen.
</p>
<p className="paragraph">
  Lokal lagring, såsom `localStorage`, är en annan teknik som används för att lagra data lokalt i webbläsaren. Till skillnad från cookies behåller lokal lagring data även när användaren stänger webbläsaren.
</p>

<h2 className="subtitle">Hur använder vi cookies och lokal lagring?</h2>
<p className="paragraph">
  Vi använder cookies för att förbättra funktionaliteten på {siteName} och för att analysera hur webbplatsen används. Vi kan använda både sessionscookies (som raderas när du stänger webbläsaren) och permanenta cookies (som lagras på din enhet under en längre tid). Lokal lagring används för att spara data mellan besök och för att förbättra din övergripande användarupplevelse.
</p>

      <h3 className="sub-subtitle">Vi kan använda följande typer av cookies:</h3>

      <ul className="list">
        <li className="list-item">
          <strong>Nödvändiga cookies:</strong> Dessa cookies är avgörande för att webbplatsen ska fungera korrekt och kan inte inaktiveras i våra system. De används till exempel för att spara dina inställningar på webbplatsen eller för att möjliggöra inloggning på ditt användarkonto.
        </li>
        <li className="list-item">
          <strong>Prestandacookies:</strong> Dessa cookies samlar in information om hur besökare använder webbplatsen, till exempel vilka sidor som besöks oftast och eventuella felmeddelanden som visas. Denna information används för att förbättra webbplatsens prestanda och användarupplevelse.
        </li>
        <li className="list-item">
          <strong>Funktionalitetscookies:</strong> Dessa cookies används för att komma ihåg dina preferenser och val på webbplatsen, vilket gör det möjligt att erbjuda en mer personlig upplevelse. Till exempel kan de användas för att spara dina val av språk eller region.
        </li>
        <li className="list-item">
          <strong>Marknadsföringscookies:</strong> Vi kan använda dessa cookies för att samla in information om dina besök på {siteName} och andra webbplatser för att visa relevant annonsering baserat på dina intressen. Dessa cookies hjälper oss också att mäta effektiviteten av våra marknadsföringskampanjer.
        </li>
      </ul>

      <h2 className="subtitle">
        Hantering av cookies
      </h2>
      <p className="paragraph">
        Du kan välja att acceptera eller avvisa cookies genom att ändra inställningarna i din webbläsare. De flesta webbläsare accepterar cookies automatiskt, men du kan vanligtvis ändra dina inställningar för att avvisa cookies om du föredrar det. Observera att om du avvisar cookies kan vissa funktioner på {siteName} vara otillgängliga eller fungera felaktigt.
      </p>

      <p className="paragraph">
        Besökarnas webbläsarinställningar kan också påverka vilka cookies som samlas in. Om du vill ta bort eller blockera cookies kan du göra det genom att ändra inställningarna i din webbläsare. Varje webbläsare har olika sätt att hantera cookies, så vi rekommenderar att du konsulterar webbläsarens hjälpmeny eller dokumentation för att få mer information om hur du hanterar cookies.
      </p>

      <p className="paragraph">

      Observera att om du raderar eller blockerar cookies kan vissa funktioner på {siteName} kanske inte fungera som avsett, och din användarupplevelse kan påverkas.
      </p>
      <h2 className="subtitle">Tredjepartscookies</h2>
<p className="paragraph">
På {siteName} kan vi använda tredjepartscookies från våra samarbetspartners, till exempel för att samla in statistik om webbplatsens besökare eller för att visa riktad annonsering baserat på dina intressen. Dessa cookies omfattas av tredjepartens egna sekretesspolicyer och vi rekommenderar att du läser igenom dem för att få mer information om hur de behandlar informationen.
</p>
<h2 className="subtitle">Ändringar i cookie-policyn </h2>
<p className="paragraph">
Vi förbehåller oss rätten att ändra denna cookie-policy när som helst. Eventuella ändringar kommer att publiceras på vår webbplats och träder i kraft omedelbart efter publicering. Vi rekommenderar att du regelbundet granskar policyn för att hålla dig informerad om eventuella ändringar.
</p>


{/* Divider */}
      <hr className="divider" /> 

{/* Privacy Policy */}
<h1 className="title">Integritetspolicy för {siteName}</h1>

<p className="paragraph">
  Denna integritetspolicy förklarar hur {siteName} samlar in, använder och skyddar den personliga information som du lämnar när du besöker och använder vår webbplats. Vi strävar efter att skydda din personliga integritet och säkerhet och att behandla din information enligt tillämpliga lagar och regler för dataskydd, inklusive EU:s allmänna dataskyddsförordning (GDPR).
</p>

<h2 className="subtitle">Insamling av personlig information</h2>

<p className="paragraph">
  När du besöker {siteName} kan vi samla in viss personlig information som du frivilligt lämnar till oss. Det kan inkludera, men är inte begränsat till, ditt namn, din e-postadress och annan kontaktinformation. Vi kan också samla in information om ditt användarbeteende och dina preferenser på vår webbplats genom cookies och liknande tekniker (se vår cookie-policy för mer information).
</p>

<h2 className="subtitle">Användning av personlig information</h2>

<p className="paragraph">
  Vi använder den personliga informationen som samlas in på {siteName} för att:
</p>

<ul className="list">
  <li className="list-item">Tillhandahålla och anpassa våra tjänster och funktioner enligt dina behov och preferenser.</li>
  <li className="list-item">Kontakta dig med relevant information, erbjudanden eller marknadsföringsmaterial som kan vara av intresse för dig.</li>
  <li className="list-item">Förbättra vår webbplats och analysera användarbeteendet för att optimera användarupplevelsen.</li>
  <li className="list-item">Hantera eventuella förfrågningar, frågor eller klagomål som du kan ha.</li>
  <li className="list-item">Uppfylla våra rättsliga skyldigheter och följa tillämpliga lagar och regler.</li>
</ul>

<h2 className="subtitle">Delning av personlig information</h2>

<p className="paragraph">
  Vi kan dela den personliga informationen med tredje parter endast i enlighet med tillämpliga lagar och regler. Det kan inkludera:
</p>

<ul className="list">
  <li className="list-item">Affärspartners och tjänsteleverantörer som hjälper oss att tillhandahålla våra tjänster och funktioner, till exempel betalningsleverantörer och webbanalysverktyg.</li>
  <li className="list-item">Rättsliga myndigheter, reglerande organ eller andra tredje parter om vi är skyldiga att göra det enligt lag eller om det är nödvändigt för att skydda våra rättigheter, egendom eller säkerhet.</li>
</ul>

<h2 className="subtitle">Skydd av personlig information</h2>

<p className="paragraph">
  Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda den personliga informationen mot obehörig åtkomst, förlust, missbruk eller ändring. Vi strävar efter att använda säkerhetsåtgärder som är branschstandard för att skydda din information, men vi kan inte garantera absolut säkerhet på internet.
</p>

<h2 className="subtitle">Dina rättigheter</h2>

<p className="paragraph">
Du har rätt att begära åtkomst till den personliga information som vi har om dig och att begära rättelse, radering eller begränsning av denna information om den är felaktig eller inte längre relevant. Du har 
rätt att invända mot behandlingen av din personliga information och att begära att vi begränsar användningen av den. Om du vill utöva någon av dessa rättigheter, vänligen kontakta oss med hjälp av kontaktinformationen nedan.
</p>

<h2 className="subtitle">Ändringar i integritetspolicyn</h2>
<p className="paragraph">
Vi förbehåller oss rätten att ändra denna integritetspolicy när som helst. Eventuella ändringar kommer att publiceras på vår webbplats och träder i kraft omedelbart efter publicering. Vi rekommenderar att du regelbundet granskar integritetspolicyn för att hålla dig informerad om eventuella ändringar.
</p>



{/* Divider */}
<hr className="divider" /> 

 {/* GDPR Policy */}
 <h1 className="title">GDPR-policy för {siteName}</h1>

<p className="paragraph">
  Denna GDPR-policy beskriver hur {siteName} behandlar och skyddar personlig information enligt EU:s allmänna dataskyddsförordning (GDPR). Vi strävar efter att säkerställa att all behandling av personuppgifter sker i enlighet med tillämpliga dataskyddslagar.
</p>

<h2 className="subtitle">Personuppgiftsansvarig</h2>

<p className="paragraph">
{siteName} är personuppgiftsansvarig för den personliga information som samlas in via denna webbplats. Om du har frågor eller bekymmer angående vår behandling av personuppgifter, kan du kontakta oss på [kontaktuppgifter].
</p>

<h2 className="subtitle">Insamling av personlig information</h2>

<p className="paragraph">
  Vi samlar in personlig information på {siteName} endast när det är nödvändigt och med ditt samtycke. Den personliga informationen kan inkludera, men är inte begränsad till, namn, adress, e-postadress, telefonnummer och andra identifierande uppgifter. Vi samlar endast in sådan information som är relevant för de ändamål som anges nedan.
</p>

<h2 className="subtitle">Användning av personlig information</h2>

<p className="paragraph">
  Vi behandlar den personliga information som samlas in via {siteName} för följande ändamål:
</p>

<ul className="list">
  <li className="list-item">För att tillhandahålla de tjänster och funktioner som du begär eller registrerar dig för.</li>
  <li className="list-item">För att hantera och svara på dina förfrågningar, frågor eller klagomål.</li>
  <li className="list-item">För att skicka relevant information, erbjudanden eller marknadsföringsmaterial som kan vara av intresse för dig (om du har gett ditt samtycke till detta).</li>
  <li className="list-item">För att analysera och förbättra våra tjänster, funktioner och användarupplevelse.</li>
  <li className="list-item">För att uppfylla våra rättsliga skyldigheter och följa tillämpliga lagar och regler.</li>
</ul>

<h2 className="subtitle">Laglig grund för behandling</h2>

<p className="paragraph">
  Vi behandlar din personliga information endast när det finns en laglig grund för behandlingen enligt GDPR. Den lagliga grunden kan vara ditt samtycke, behovet av att utföra en avtalsenlig tjänst, uppfyllandet av våra rättsliga skyldigheter eller vårt legitima intresse att förbättra våra tjänster och skydda våra rättigheter.
</p>

<h2 className="subtitle">Delning av personlig information</h2>

<p className="paragraph">
  Vi kan komma att dela den personliga informationen med tredje parter endast när det är nödvändigt för att tillhandahålla våra tjänster eller om vi är skyldiga att göra det enligt lag. Vi vidtar åtgärder för att säkerställa att sådana tredje parter skyddar den personliga informationen i enlighet med GDPR.
</p>

<h2 className="subtitle">Dina rättigheter enligt GDPR</h2>

<p className="paragraph">
Enligt GDPR har du vissa rättigheter avseende din personliga information. Du har rätt att begära åtkomst till den personliga information som vi har om dig, rättelse av felaktiga uppgifter, radering av information (under vissa om ständigheter), begränsning av behandlingen av din information, invändning mot behandlingen och dataportabilitet. Om du vill utöva någon av dessa rättigheter kan du kontakta oss på <a className="text-link-style" href={`mailto:${siteEmail}`}><div className="text-link-style">{siteEmail}</div></a>. Vi kommer att hantera dina förfrågningar i enlighet med tillämpliga lagar och föreskrifter.
</p>
<h2 className="subtitle">Säkerhet</h2>
<p className="paragraph">
Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda din personliga information mot obehörig åtkomst, förlust, missbruk eller ändring. Vi regelbundet utvärderar och uppdaterar våra säkerhetsåtgärder för att möta de senaste tekniska och lagstadgade kraven.
</p>
<h2 className="subtitle">Ändringar i GDPR-policyn</h2>
<p className="paragraph">
Vi förbehåller oss rätten att ändra denna GDPR-policy när som helst. Eventuella ändringar kommer att publiceras på vår webbplats och träder i kraft omedelbart efter publicering. Vi rekommenderar att du regelbundet granskar policyn för att hålla dig informerad om eventuella ändringar.
</p>

    </div>) 
    
:(
      <div className="privacy-policy-container">
      <h1 className="title" style={{ marginTop: "30px" }}>
      Cookie and Local Storage Policy for {siteName}
    </h1>

    <p className="paragraph">
      This website uses cookies and local storage to enhance the user experience and collect certain information about visitors. By using {siteName}, you consent to the use of cookies and local storage as outlined in this policy. We recommend that you carefully review the policy to understand how we utilize these technologies and how you can manage them.
    </p>

    <h2 className="subtitle">What are cookies and local storage?</h2>
    <p className="paragraph">
      Cookies are small text files stored on your computer or mobile device when you visit a website. They are typically used to collect specific information about visitors, their preferences, or their devices. Cookies enable improved functionality and customization of the website.
    </p>
    <p className="paragraph">
      Local storage, such as `localStorage`, is another technology used to store data locally in the browser. Unlike cookies, local storage retains data even when the user closes the browser.
    </p>

    <h2 className="subtitle">How do we use cookies and local storage?</h2>
    <p className="paragraph">
      We use cookies to enhance the functionality of {siteName} and to analyze how the website is used. We may use both session cookies (deleted when you close the browser) and persistent cookies (stored on your device for an extended period). Local storage is utilized to save data between visits and to improve your overall user experience.
    </p>

  <h3 className="sub-subtitle">We may use the following types of cookies:</h3>

  <ul className="list">
    <li className="list-item">
      <strong>Necessary cookies:</strong> These cookies are essential for the proper functioning of the website and cannot be disabled in our systems. They are used, for example, to save your settings on the website or to enable login to your user account.
    </li>
    <li className="list-item">
      <strong>Performance cookies:</strong> These cookies collect information about how visitors use the website, such as which pages are visited most frequently and any error messages displayed. This information is used to improve the website&rsquo;s performance and user experience.
    </li>
    <li className="list-item">
      <strong>Functionality cookies:</strong> These cookies are used to remember your preferences and choices on the website, enabling a more personalized experience. For example, they can be used to save your language or region choices.
    </li>
    <li className="list-item">
      <strong>Marketing cookies:</strong> We may use these cookies to gather information about your visits to {siteName} and other websites to display relevant advertising based on your interests. These cookies also help us measure the effectiveness of our marketing campaigns.
    </li>
  </ul>

  <h2 className="subtitle">
    Managing Cookies
  </h2>
  <p className="paragraph">
    You can choose to accept or reject cookies by changing the settings in your browser. Most browsers automatically accept cookies, but you can usually modify your settings to reject cookies if you prefer. Note that if you reject cookies, some features on {siteName} may be unavailable or may not function properly.
  </p>

  <p className="paragraph">
    Visitor browser settings can also affect which cookies are collected. If you want to delete or block cookies, you can do so by changing the settings in your browser. Each browser has different ways of managing cookies, so we recommend consulting the browser&rsquo;s help menu or documentation for more information on how to manage cookies.
  </p>

  <p className="paragraph">
    Please note that if you delete or block cookies, some features on {siteName} may not function as intended, and your user experience may be affected.
  </p>
  <h2 className="subtitle">Third-Party Cookies</h2>
  <p className="paragraph">
    On {siteName}, we may use third-party cookies from our partners, for example, to collect statistics about website visitors or to display targeted advertising based on your interests. These cookies are subject to the third party&rsquo;s own privacy policies, and we recommend reviewing them for more information on how they process information.
  </p>
  <h2 className="subtitle">Changes to Cookie Policy</h2>
  <p className="paragraph">
    We reserve the right to change this cookie policy at any time. Any changes will be published on our website and take effect immediately upon publication. We recommend regularly reviewing the policy to stay informed of any changes.
  </p>

  {/* Divider */}
  <hr className="divider" />

  {/* Privacy Policy */}
  <h1 className="title">Privacy Policy for {siteName}</h1>

  <p className="paragraph">
    This privacy policy explains how {siteName} collects, uses, and protects the personal information you provide when visiting and using our website. We strive to protect your personal privacy and security and to process your information in accordance with applicable data protection laws and regulations, including the European Union&rsquo;s General Data Protection Regulation (GDPR).
  </p>

  <h2 className="subtitle">Collection of Personal Information</h2>

  <p className="paragraph">
    When you visit {siteName}, we may collect certain personal information that you voluntarily provide to us. This may include, but is not limited to, your name, email address, and other contact information. We may also collect information about your user behavior and preferences on our website through cookies and similar technologies (see our cookie policy for more information).
  </p>

  <h2 className="subtitle">Use of Personal Information</h2>

  <p className="paragraph">
    We use the personal information collected on {siteName} for the following purposes:
  </p>

  <ul className="list">
    <li className="list-item">Provide and customize our services and features according to your needs and preferences.</li>
    <li className="list-item">Contact you with relevant information, offers, or marketing materials that may be of interest to you.</li>
    <li className="list-item">Improve our website and analyze user behavior to optimize the user experience.</li>
    <li className="list-item">Handle any requests, questions, or complaints you may have.</li>
    <li className="list-item">Fulfill our legal obligations and comply with applicable laws and regulations.</li>
  </ul>

  <h2 className="subtitle">Sharing of Personal Information</h2>

  <p className="paragraph">
    We may share personal information with third parties only in accordance with applicable laws and regulations. This may include:
  </p>

  <ul className="list">
    <li className="list-item">Business partners and service providers who assist us in providing our services and features, such as payment providers and web analytics tools.</li>
    <li className="list-item">Legal authorities, regulatory bodies, or other third parties if required by law or if necessary to protect our rights, property, or safety.</li>
  </ul>

  <h2 className="subtitle">Protection of Personal Information</h2>

  <p className="paragraph">
    We take appropriate technical and organizational measures to protect personal information from unauthorized access, loss, misuse, or alteration. We strive to use security measures that are industry standard to protect your information, but we cannot guarantee absolute security on the internet.
  </p>

  <h2 className="subtitle">Your Rights</h2>

  <p className="paragraph">
    You have the right to request access to the personal information we have about you and to request correction, deletion, or restriction of this information if it is inaccurate or no longer relevant. You also have the right to object to the processing of your personal information and to request that we limit its use. If you wish to exercise any of these rights, please contact us using the contact information below.
  </p>

  <h2 className="subtitle">Changes to Privacy Policy</h2>
  <p className="paragraph">
    We reserve the right to change this privacy policy at any time. Any changes will be published on our website and take effect immediately upon publication. We recommend regularly reviewing the policy to stay informed of any changes.
  </p>

  {/* Divider */}
  <hr className="divider" />

  {/* GDPR Policy */}
  <h1 className="title">GDPR Policy for {siteName}</h1>

  <p className="paragraph">
    This GDPR policy describes how {siteName} processes and protects personal information according to the European Union&rsquo;s General Data Protection Regulation (GDPR). We aim to ensure that all processing of personal data is in accordance with applicable data protection laws.
  </p>

  <h2 className="subtitle">Data Controller</h2>

  <p className="paragraph">
    {siteName} is the data controller for the personal information collected through this website. If you have questions or concerns regarding our processing of personal data, you can contact us at [contact information].
  </p>

  <h2 className="subtitle">Collection of Personal Information</h2>

  <p className="paragraph">
    We collect personal information on {siteName} only when necessary and with your consent. Personal information may include, but is not limited to, name, address, email address, phone number, and other identifying information. We only collect information that is relevant for the purposes specified below.
  </p>

  <h2 className="subtitle">Use of Personal Information</h2>

  <p className="paragraph">
    We process the personal information collected through {siteName} for the following purposes:
  </p>

  <ul className="list">
    <li className="list-item">To provide the services and features you request or register for.</li>
    <li className="list-item">To manage and respond to your requests, questions, or complaints.</li>
    <li className="list-item">To send relevant information, offers, or marketing materials that may be of interest to you (if you have consented to this).</li>
    <li className="list-item">To analyze and improve our services, features, and user experience.</li>
    <li className="list-item">To fulfill our legal obligations and comply with applicable laws and regulations.</li>
  </ul>

  <h2 className="subtitle">Legal Basis for Processing</h2>

  <p className="paragraph">
    We process your personal information only when there is a legal basis for processing under the GDPR. The legal basis may be your consent, the need to perform a contractual service, compliance with our legal obligations, or our legitimate interest in improving our services and protecting our rights.
  </p>

  <h2 className="subtitle">Sharing of Personal Information</h2>

  <p className="paragraph">
    We may share personal information with third parties only when necessary to provide our services or if required by law. We take measures to ensure that such third parties protect personal information in accordance with the GDPR.
  </p>

  <h2 className="subtitle">Your Rights under GDPR</h2>

  <p className="paragraph">
    Under the GDPR, you have certain rights regarding your personal information. You have the right to request access to the personal information we have about you, correction of inaccurate data, deletion of information (under certain circumstances), restriction of processing of your information, objection to processing, and data portability. If you want to exercise any of these rights, you can contact us at <a className="text-link-style" href={`mailto:${siteEmail}`}>
      <div className="text-link-style">{siteEmail}</div>
    </a>. We will handle your requests in accordance with applicable laws and regulations.
  </p>

  <h2 className="subtitle">Security</h2>
  <p className="paragraph">
    We take appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, misuse, or alteration. We regularly evaluate and update our security measures to meet the latest technical and legal requirements.
  </p>

  <h2 className="subtitle">Changes to GDPR Policy</h2>
  <p className="paragraph">
    We reserve the right to change this GDPR policy at any time. Any changes will be published on our website and take effect immediately upon publication. We recommend regularly reviewing the policy to stay informed of any changes.
  </p>
    
        </div>)}
    
    
    </div>
  );
};

export const getServerSideProps = async () => {
  const data = await fetchData();

  return {
    props: { ...data },
  };
};


export default PrivacyPolicyPage;