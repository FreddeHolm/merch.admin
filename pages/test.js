import React, {useEffect} from 'react';
import { client } from '../lib/client';
import { siteName, siteNameAlt2, siteEmail } from '../components/config';
import Navbar from '../components/Navbar';

import { Product, HeroBanner } from '../components';
import { useTranslation } from 'react-i18next';


const ProductTestPage = ({ products, bannerData, ratingsData, announcements, release }) => {
  
  const [t, i18n] = useTranslation("global");

      // Update the document's title when the component mounts
      useEffect(() => {
        document.title = `${siteNameAlt2 && siteNameAlt2} | Test utav laglig försvarsspray`;
      }, []);
  
  
  return (
    <div >
    <Navbar announcements={announcements} release={release} productsss={products}/>
    <div className="privacy-policy-container">
<div style={{ width: '100%', height: 0, paddingBottom: '56.25%', position: 'relative', overflow: 'hidden' }}>
  <iframe
    style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
    src="https://www.youtube.com/embed/bV3gPIcI0Rs"    
    title="Produkttestvideo"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
    allowFullScreen
  ></iframe>
</div>

{/*<div style={{ width: '100%', height: 0, paddingBottom: '56.25%', position: 'relative', overflow: 'hidden' }}>
      <video style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} controls>
        <source src="/assets/V2AldrigJagReklam2Helatestet.mp4" type="video/mp4" />
      </video>
</div>*/}
 {i18n.language !== "sv" && <div style={{ zIndex: -1, position: "relative",  }}><h4 style={{marginTop: "15px", display: "inline-block",  pointer: "clicker", backgroundColor: "var(--primarycolor)", color: "var(--secondarycolor)", padding: "5px 8px" }} >This page is currently only in Swedish  </h4></div>}

      <h1 className="title" style={{marginTop: "30px"}} >Test av vår självförsvarsspray</h1>
      <p className="paragraph">
        Denna självförsvarsspray säljs i sammarbete med AldrigJag.se. För mer information, besök <a className="text-link-style" href="https://aldrigjag.se/">AldrigJag.se</a>.         
      </p>


      <h2 className="subtitle">Om test videon:</h2>
      <p className="paragraph">
      I videon ovan ser du det test gänget på AldrigJag.se utförde på vår Tornado Självförsvarsspray - färglös. Denna inspelning simulerar först ett möjligt överfallsscenario där en främmande person angriper en oskyldig förbipasserande. Efter att sprayen använts filmas hela förloppet fram tills att angriparen får tillbaka synen för att visa på sprayens effektivitet.         
      </p>
      <p className="paragraph">
      Denna recension är gjord på ett så ärligt och opartiskt sätt som möjligt och inga reaktioner är överspelade eller förvrängda för att få sprayen att verka mer effektiv än vad den egentligen är. Tvärtom, angriparen försökte istället hålla tillbaka sina reaktioner. 
      </p>

      <h2 className="subtitle">Effektivitet och verkan:</h2>
      <p className="paragraph">
      När det gäller effektivitet levererar Tornado självförsvarsspray över förväntan. Vid sprutning producerar den en kraftig och koncentrerad stråle med ett mentol-formula som snabbt förblindar och avskräcker angriparen och ger offret möjlighet att fly eller söka hjälp. 
      </p>
      <p className="paragraph">
      Sprayen orsakar först en starkt brännande känsla i ögonen som genast skapar stora smärtor hos angriparen och gör det omöjligt för denna att öppna ögonen. Denna smärta varar länge men kan reduceras om ögonen sköljs ur med massor av vatten (som det gjordes i videon).
      </p>
      <p className="paragraph">
      När man fått ur majoriteten av sprayen är ögonen fortfarande väldigt ömma och svåra att öppna. Känslan var då som att man ätit stark min och sedan druckit iskallt vatten. Ungefär samma känsla var det för ögonen där luften runt omkring stack ordentligt och gjorde det mycket svårt och smärtsamt att hålla ögonen öppna. 
            </p>
      <p className="paragraph">
      I videon tog det lite över 10 minuter för angriparen att få upp ögonen ordentligt och tillbaka synen, även fast rikligt med vatten fanns tillgängligt, utan vatten hade processen varit minst dubbelt så lång. 
      </p>
      <p className="paragraph">
      Notera att endast ca en tredjedel av flaskans innehåll användes i testvideon.      
      </p>

{/*
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
          <strong>Marknadsföringscookies:</strong> Vi kan använda dessa cookies för att samla in information om dina besök på AldrigJag.se och andra webbplatser för att visa relevant annonsering baserat på dina intressen. Dessa cookies hjälper oss också att mäta effektiviteten av våra marknadsföringskampanjer.
        </li>
      </ul>
      */}



{/* Divider */}
<hr className="divider" style={{border: "1px solid lightgrey"}} /> 

      <div className="products-container">
        {products
         // .reverse()
          .filter(
            (product) =>
              product.id === '1689885477254' || product.id === '1684686741829'
          )
          .map((product) => {
            //console.log(product.id);
            return (
              <Product key={product.id} product={product} ratingsData={ratingsData} />
            );
          })}
      </div>

{/* Divider */}
<hr className="divider" style={{border: "1px solid lightgrey"}} /> 


{/* Privacy Policy */}


<h2 className="subtitle">Räckvidd och spridning: </h2>

<p className="paragraph">
Tornado självförsvarsspray har en imponerande räckvidd på runt 4 meter vilket gör att man kan använda den på säkert avstånd vid hotfulla situationer. Flaskan har ett kraftfullt tryck som ger ifrån sig en tjock och kompakt stråle som gör det enkelt att träffa sitt mål. 
</p>
<p className="paragraph">
När strålen når sitt mål sprider vätskan ut sig ordentligt och täcker en tillräckligt stor yta för att nå angriparens ansikte och ögon.
</p>
<p className="paragraph">
Tack vare strålens kraft tar det däremot cirka 0.5 sekunder från att man trycker på avfyrningsknappen tills att strålen börjar spruta.
</p>

<h2 className="subtitle">Säkerhetsfunktioner: </h2>

<p className="paragraph">
Försvarssprayen har en skyddskåpa som täcker avfyrningsknappen för att förhindra oavsiktlig aktivering. Detta lock lyfts enkelt med tummen och aktiverar samtidigt den starka inbyggda lampan som sprayflaskan är utrustad med. Denna lampa är stark nog att både desorientera angriparen och lysa upp mörka områden samtidigt som den fungerar som något av ett sikte för strålen. 
</p>

{/*
<ul className="list">
  <li className="list-item">Tillhandahålla och anpassa våra tjänster och funktioner enligt dina behov och preferenser.</li>
  <li className="list-item">Kontakta dig med relevant information, erbjudanden eller marknadsföringsmaterial som kan vara av intresse för dig.</li>
  <li className="list-item">Förbättra vår webbplats och analysera användarbeteendet för att optimera användarupplevelsen.</li>
  <li className="list-item">Hantera eventuella förfrågningar, frågor eller klagomål som du kan ha.</li>
  <li className="list-item">Uppfylla våra rättsliga skyldigheter och följa tillämpliga lagar och regler.</li>
</ul>
*/}

<h2 className="subtitle">Design och användarvänlighet: </h2>

<p className="paragraph">
Tornado försvarssprayen har en modern och ergonomisk design som gör den enkel att hantera och använda. Den har ett bekvämt grepp och är lätt att bära med sig överallt vilket gör den praktisk att ha med i fickan eller handväskan för att öka den personliga säkerheten. Storlek på sprayen är cirka 10x6x4 cm. 
</p>
<p className="paragraph">
Självförsvarssprayen finns i två modeller, med eller utan röd färg. Enda skillnaden är att modellen med färg ökar möjligheten att identifiera gärningsmannen eftersom färgen sticker ut och är svår att få bort på både hud och kläder. Båda sprayerna är dock lika effektiva i nödsituation.
</p>


<h2 className="subtitle">Slutsats: </h2>

<p className="paragraph">
Sammanfattningsvis är vi mycket nöjda med Tornado självförsvarsspray. Dess effektiva verkan, imponerande räckvidd och smidiga design gör den till ett pålitligt självförsvarsverktyg som enkelt och diskret kan tas med överallt för att öka bärarens personlig säkerhet. 
</p>
<p className="paragraph">
Observera att sprayen endast får användas i nödvärnslägen och i självförsvar.
</p>


<div style={{marginTop: "60px"}}>
<h2  className="subtitle" >De bästa bitarna från testvideon: </h2>

<div style={{ width: '100%', height: 0, paddingBottom: '56.25%', position: 'relative', overflow: 'hidden' }}>
  <iframe
    style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
    src="https://www.youtube.com/embed/5utYY-I8zoU"    
    title="Produkttestvideobloopers"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
    allowFullScreen
  ></iframe>
</div>


</div>


      {/* Add the content of your privacy policy here */}
    </div>
    </div>
  );
};

//hämtar datan från klienten? 
export const getServerSideProps = async () => {
  const query = '*[_type == "product" && minovve != true && showproduct == true]';
  const products = await client.fetch(query);
  const productss = products.map(product => {
    return {
      ...product,
      hiddenLink: "https://www.studentshoppen.com/studentlivet"
    };
  });


  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const ratingsQuery = '*[_type == "productratings"]';
  const ratingsData = await client.fetch(ratingsQuery);

  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  return {
    props: { products: productss, bannerData, ratingsData, announcements, release }
  }
}





export default ProductTestPage;