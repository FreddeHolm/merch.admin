import React, {useEffect} from 'react';
import { siteName, siteNameAlt2, siteEmail } from '../components/config';
import Navbar from '../components/Navbar';
import { client } from '../lib/client';
import { useTranslation } from 'react-i18next';
import { fetchData } from  '../components/basicgetServerSideProps.js';


const TermsOfPurchasePage = ({announcements, release, products})=> {
    // Update the document's title when the component mounts
    useEffect(() => {
      document.title = `${siteNameAlt2 && siteNameAlt2} | Köpvilkor`; /*  ${t("termsofpurchase.Köpvilkor*/
    }, []);

    const [t, i18n] = useTranslation("global");

  return (
    <div >
    <Navbar announcements={announcements} release={release} productsss={products}/>

    {i18n.language === "sv" ?   (<div className="privacy-policy-container">
      <h1 className="title" style={{ marginTop: "30px" }}>Köpvillkor för {siteName}</h1>

      <h3 className="sub-subtitle">
        1. Allmänt
      </h3>
      <p className="paragraph">
        <strong>1.1</strong> Dessa köpvillkor reglerar användningen av {siteName} (nedan kallad &quot;webbshoppen&quot;) och eventuella köp av produkter från oss.
      </p>
      <p className="paragraph">
        <strong>1.2</strong> Genom att besöka och använda webbshoppen, accepterar du att vara bunden av dessa köpvillkor. Vi rekommenderar att du noggrant läser igenom villkoren innan du genomför ett köp.
      </p>
      <p className="paragraph">
        <strong>1.3</strong> {siteName} förbehåller sig rätten att när som helst ändra dessa köpvillkor. Eventuella ändringar kommer att publiceras på webbshoppen och träder i kraft omedelbart efter publicering.
      </p>

      <h3 className="sub-subtitle">
        <strong>2. Produkter och priser</strong>
      </h3>
      <p className="paragraph">
        <strong>2.1</strong> Produkterna som erbjuds i webbshoppen är beskrivna så noggrant som möjligt. Vi strävar efter att ge korrekt information om produkternas egenskaper, priser, lagerstatus och leveranstider. Trots detta kan det förekomma felaktigheter, vilket vi inte kan hållas ansvariga för.
      </p>
      <p className="paragraph">
        <strong>2.2</strong> Priserna i webbshoppen anges i svenska kronor (SEK) och inkluderar moms, om inte annat anges.
      </p>
      <p className="paragraph">
        <strong>2.3</strong> Vi förbehåller oss rätten att ändra priser och erbjudanden utan föregående meddelande. Sådana ändringar påverkar inte köp som redan har genomförts.
      </p>

      <h3 className="sub-subtitle">
        <strong>3. Beställningar och betalning</strong>
      </h3>
      <p className="paragraph">
        <strong>3.1</strong> Genom att placera en beställning i webbshoppen bekräftar du att du är behörig att ingå avtal och att all information du lämnar är korrekt och komplett.
      </p>
      <p className="paragraph">
        <strong>3.2</strong> När du har lagt en beställning kommer du att få en bekräftelse via e-post med information om din beställning och betalningsinstruktioner. Observera att detta endast är en bekräftelse på att vi har mottagit din beställning och utgör inte ett bindande avtal.
      </p>
      <p className="paragraph">
        <strong>3.3</strong> Vi förbehåller oss rätten att avbryta en order efter bekräftelsen av beställningen av följande skäl:
      </p>

      <p className="paragraph" style={{ marginLeft: "20px" }}><strong>a)</strong> Produkten är inte längre tillgänglig eller slut i lager.</p>
      <p className="paragraph" style={{ marginLeft: "20px" }}><strong>b)</strong> Felaktig prissättning eller information om produkten.</p>
      <p className="paragraph" style={{ marginLeft: "20px" }}><strong>c)</strong> Misstänkt bedrägeri eller olämplig användning av webbshoppen.</p>

      <p className="paragraph">
        <strong>3.4</strong> Om vi avbryter din order kommer vi att meddela dig så snart som möjligt och återbetala eventuell betalning som du har gjort för den aktuella ordern.
      </p>
      <p className="paragraph">
        <strong>3.5</strong> Betalning kan göras via de betalningsalternativ som erbjuds i webbshoppen. Din beställning kommer att behandlas och skickas efter att betalningen har mottagits och verifierats.
      </p>

      <h3 className="sub-subtitle">
        <strong>4. Leverans och frakt</strong>
      </h3>
      <p className="paragraph">
        <strong>4.1</strong> Vi strävar efter att leverera beställda produkter inom den angivna leveranstiden. Observera att leveranstiden kan variera beroende på var produkten ska levereras och eventuella förseningar som kan uppstå hos fraktbolaget.
      </p>
      <p className="paragraph">
        <strong>4.2</strong> Alla leveranser sker via fraktbolag och fraktavgifter tillkommer, om inte annat anges.
      </p>
      <p className="paragraph">
        <strong>4.3</strong> Vid leverans ska du kontrollera att produkterna är i gott skick och överensstämmer med din beställning. Om du upptäcker fel eller skador, vänligen kontakta oss inom skälig tid efter mottagandet.
      </p>

      <h3 className="sub-subtitle">
        <strong>5. Returer och återbetalningar</strong>
      </h3>
      <p className="paragraph">
        <strong>5.1</strong> Om du ångrar ditt köp har du rätt att returnera produkterna inom 14 dagar från mottagandet, förutsatt att produkterna är oanvända och i originalförpackning. Du ansvarar för returfrakten, om inget annat har överenskommits.
      </p>
      <p className="paragraph">
        <strong>5.2</strong> För att begära en återbetalning måste du returnera produkterna till oss och meddela oss via e-post om din avsikt att returnera. Efter att vi har mottagit och kontrollerat returen kommer vi att behandla återbetalningen inom skälig tid.
      </p>
      <p className="paragraph">
        <strong>5.3</strong> Observera att vissa produkter, såsom personliga eller hygieniska produkter, kan vara undantagna från återbetalning på grund av hälsoskydd eller hygienskäl.
      </p>

      <h3 className="sub-subtitle">
        <strong>6. Reklamationer</strong>
      </h3>
      <p className="paragraph">
        <strong>6.1</strong> Om du upptäcker fel eller brister i en produkt, vänligen kontakta oss så snart som möjligt. Vi kommer att göra vårt bästa för att lösa eventuella problem på ett tillfredsställande sätt, inklusive reparation, ersättning eller återbetalning.
      </p>
      <p className="paragraph">
        <strong>6.2</strong> Eventuella garantier eller reklamationsrättigheter för produkterna regleras av tillämplig lagstiftning.
      </p>

      <h3 className="sub-subtitle">
        <strong>7 Personuppgifter</strong>
      </h3>
      <p className="paragraph">
        <strong>7.1</strong> Vi behandlar dina personuppgifter i enlighet med vår integritetspolicy. Genom att använda webbshoppen och göra en beställning godkänner du vår behandling av dina personuppgifter.
      </p>

      <h3 className="sub-subtitle">
        <strong>8. Tvister och tillämplig lagstiftning</strong>
      </h3>
      <p className="paragraph">
        <strong>8.1</strong> Eventuella tvister som uppstår i samband med dessa köpvillkor ska i första hand lösas i samförstånd mellan parterna.
      </p>
      <p className="paragraph">
        <strong>8.2</strong> Om en tvist inte kan lösas i samförstånd har du som kund rätt att vända dig till Allmänna reklamationsnämnden eller annan behörig tillsynsmyndighet.
      </p>
      <p className="paragraph">
        <strong>8.3</strong> Dessa köpvillkor och alla köp som genomförs via webbshoppen regleras av svensk lag.
      </p>

    </div> ):(

<div className="privacy-policy-container">
  <h1 className="title" style={{ marginTop: "30px" }}>Terms of Purchase for {siteName}</h1>

  <h3 className="sub-subtitle">
    1. General
  </h3>
  <p className="paragraph">
    <strong>1.1</strong> These terms of purchase regulate the use of {siteName} (hereinafter referred to as the &quot;webshop&quot;) and any purchases of products from us.
  </p>
  <p className="paragraph">
    <strong>1.2</strong> By visiting and using the webshop, you agree to be bound by these terms of purchase. We recommend that you carefully read the terms before making a purchase.
  </p>
  <p className="paragraph">
    <strong>1.3</strong> {siteName} reserves the right to change these terms of purchase at any time. Any changes will be published on the webshop and will take effect immediately after publication.
  </p>

  <h3 className="sub-subtitle">
    <strong>2. Products and Prices</strong>
  </h3>
  <p className="paragraph">
    <strong>2.1</strong> The products offered in the webshop are described as accurately as possible. We strive to provide correct information about product features, prices, stock status, and delivery times. Despite this, errors may occur, for which we cannot be held responsible.
  </p>
  <p className="paragraph">
    <strong>2.2</strong> Prices in the webshop are stated in Swedish Kronor (SEK) and include VAT, unless otherwise stated.
  </p>
  <p className="paragraph">
    <strong>2.3</strong> We reserve the right to change prices and offers without prior notice. Such changes do not affect purchases already made.
  </p>

  <h3 className="sub-subtitle">
    <strong>3. Orders and Payment</strong>
  </h3>
  <p className="paragraph">
    <strong>3.1</strong> By placing an order in the webshop, you confirm that you are authorized to enter into an agreement and that all information you provide is correct and complete.
  </p>
  <p className="paragraph">
    <strong>3.2</strong> Once you have placed an order, you will receive a confirmation via email with information about your order and payment instructions. Please note that this is only a confirmation that we have received your order and does not constitute a binding agreement.
  </p>
  <p className="paragraph">
    <strong>3.3</strong> We reserve the right to cancel an order after the order confirmation for the following reasons:
  </p>

  <p className="paragraph" style={{ marginLeft: "20px" }}><strong>a)</strong> The product is no longer available or out of stock.</p>
  <p className="paragraph" style={{ marginLeft: "20px" }}><strong>b)</strong> Incorrect pricing or product information.</p>
  <p className="paragraph" style={{ marginLeft: "20px" }}><strong>c)</strong> Suspected fraud or inappropriate use of the webshop.</p>

  <p className="paragraph">
    <strong>3.4</strong> If we cancel your order, we will notify you as soon as possible and refund any payment you have made for the specific order.
  </p>
  <p className="paragraph">
    <strong>3.5</strong> Payment can be made through the payment options offered in the webshop. Your order will be processed and shipped after the payment has been received and verified.
  </p>

  <h3 className="sub-subtitle">
    <strong>4. Delivery and Shipping</strong>
  </h3>
  <p className="paragraph">
    <strong>4.1</strong> We strive to deliver ordered products within the specified delivery time. Please note that delivery times may vary depending on where the product is to be delivered and any delays that may occur with the shipping company.
  </p>
  <p className="paragraph">
    <strong>4.2</strong> All deliveries are made through a shipping company, and shipping fees apply, unless otherwise stated.
  </p>
  <p className="paragraph">
    <strong>4.3</strong> Upon delivery, you should check that the products are in good condition and correspond to your order. If you discover errors or damage, please contact us within a reasonable time after receipt.
  </p>

  <h3 className="sub-subtitle">
    <strong>5. Returns and Refunds</strong>
  </h3>
  <p className="paragraph">
    <strong>5.1</strong> If you regret your purchase, you have the right to return the products within 14 days of receipt, provided that the products are unused and in original packaging. You are responsible for the return shipping unless otherwise agreed.
  </p>
  <p className="paragraph">
    <strong>5.2</strong> To request a refund, you must return the products to us and notify us by email of your intention to return. After we have received and checked the return, we will process the refund within a reasonable time.
  </p>
  <p className="paragraph">
    <strong>5.3</strong> Note that some products, such as personalized or hygienic products, may be exempt from refund due to health protection or hygiene reasons.
  </p>

  <h3 className="sub-subtitle">
    <strong>6. Complaints</strong>
  </h3>
  <p className="paragraph">
    <strong>6.1</strong> If you discover defects or deficiencies in a product, please contact us as soon as possible. We will do our best to resolve any issues satisfactorily, including repair, replacement, or refund.
  </p>
  <p className="paragraph">
    <strong>6.2</strong> Any warranties or rights of complaint for the products are governed by applicable legislation.
  </p>

  <h3 className="sub-subtitle">
    <strong>7. Personal Data</strong>
  </h3>
  <p className="paragraph">
    <strong>7.1</strong> We process your personal data in accordance with our privacy policy. By using the webshop and placing an order, you agree to our processing of your personal data.
  </p>

  <h3 className="sub-subtitle">
    <strong>8. Disputes and Applicable Legislation</strong>
  </h3>
  <p className="paragraph">
    <strong>8.1</strong> Any disputes arising in connection with these terms of purchase should be resolved amicably between the parties.
  </p>
  <p className="paragraph">
    <strong>8.2</strong> If a dispute cannot be resolved amicably, you, as a customer, have the right to turn to the National Board for Consumer Disputes (Allmänna reklamationsnämnden) or other competent supervisory authority.
  </p>
  <p className="paragraph">
    <strong>8.3</strong> These terms of purchase and all purchases made through the webshop are governed by Swedish law.
  </p>
</div>
    )}
    
  </div>
  );
}


export const getServerSideProps = async () => {
  const data = await fetchData();

  return {
    props: { ...data },
  };
};


export default TermsOfPurchasePage;