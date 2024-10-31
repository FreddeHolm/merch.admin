import React, {useEffect} from 'react';
import { siteName, siteNameAlt2, siteEmail } from '../components/config';
import Navbar from '../components/Navbar';
import { client } from '../lib/client';
import { useTranslation } from 'react-i18next';
import { fetchData } from  '../components/basicgetServerSideProps.js';


const AboutPage = ({announcements, release, products}) => {
    const [t, i18n] = useTranslation("global");

    // Update the document's title when the component mounts
    useEffect(() => {
      document.title = `${siteNameAlt2 && siteNameAlt2} | ${t("footer.Om oss")}`;
    }, []);

  return (
<div >
    <Navbar announcements={announcements} release={release}  productsss={products}/>
    {i18n.language === "sv" ? (
    <div className="privacy-policy-container">
      <h1 className="title" style={{marginTop: "30px"}}>Välkommen till {siteName}</h1>

      <p className="paragraph">
      Som tidigare universitetsstudenter har vi bakom {siteNameAlt2} varit delaktiga i Sveriges student och overall-kultur i många år. Denna unika kultur är något som spridit glädje till många och är något som vi anser bör bevaras.      
      </p>

      <p className="paragraph">
      Sedan Corona har vi dessvärre noterat att många universitet haft ett mindre antal deltagare i overallkulturen. 
      Anledningarna till detta är många, men vi tror att en stor del beror på att märkesskapandet minskat och att andrahandsmärken på auktioner
      blivit allt dyrare.
      </p>

      <p className="paragraph">
      Vårat mål är att hjälpa till att bevara Sveriges unika student och ovve-kultur så att andra har chansen att få samma amazing universitetsupplevelse som vi haft. 
      För att åstadkomma detta erbjuder vi högkvalitativa tygmärken till fasta och rimliga priser tillsammans med andra ovveaccesorarer som vi önskat fanns lättillgängliga under vår studietid.            </p>

      <p className="paragraph">
      På {siteNameAlt2} hittar du, förutom billiga tygmärken, accessoarer till studentoverallen, roliga prylar för att maxa festen samt diverse användbara föremål som underlättar vardagen.         </p>

      <p className="paragraph">
        Tveka inte att kontakta oss på <a className="text-link-style" href={`mailto:${siteEmail}`}>{siteEmail}</a> om du har några frågor eller behöver hjälp. 
      </p>

      <p className="paragraph" style={{ fontStyle: 'italic' }}>
        Vänliga hälsningar,
        <br />
        Teamet på {siteNameAlt2}
      </p>
      <br />
      <p className="paragraph" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
        {siteNameAlt2} - Ovveprylar till bra pris!
      </p>
      <br />
      <p className="paragraph" style={{fontSize: "12px"}}>
        {siteName} är en del av Holmes Insight AB:
        <br />
        Organistationsnummer: 559430-9469
      </p>

    </div> ) :(
  
  <div className="privacy-policy-container">
    <h1 className="title" style={{marginTop: "30px"}}>Welcome to {siteName}</h1>

    <p className="paragraph">
    As former university students, we behind {siteNameAlt2} have been involved in Sweden&rsquo;s student- and overall culture for many years. This unique culture is something that has brought joy to many and is something we believe should be preserved.
    </p>

    <p className="paragraph">
    Since corona, unfortunately, we have noticed that many universities have had fewer participants in the overall culture. The reasons for this are many, but we believe that a large part is due to the decrease in the making of new patches, and that second-hand patches at auctions have become more expensive.
    </p>

    <p className="paragraph">
    Our goal is to help preserve Sweden and Finlands&rsquo;s unique student- and overall culture so that others have the chance to have the same amazing university experience as we have had. To achieve this, we offer high-quality fabric patches at fixed and reasonable prices, along with other overall accessories that we wished were readily available during our study time.            </p>

    <p className="paragraph">
    At {siteNameAlt2} you will find, in addition to cheap fabric patches, accessories for the student overall, fun items to maximize the party, and various useful items that make everyday life easier.         </p>

    <p className="paragraph">
    Feel free to contact us at <a className="text-link-style" href={`mailto:${siteEmail}`}>{siteEmail}</a> if you have any questions or need assistance. 
    </p>

    <p className="paragraph" style={{ fontStyle: 'italic' }}>
      Best regards,
      <br />
      The team at {siteNameAlt2}
    </p>
    <br />
    <p className="paragraph" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
      {siteNameAlt2} - Student accessories at a great price!
    </p>
    <br />
    <p className="paragraph" style={{fontSize: "12px"}}>
      {siteName} is part of Holmes Insight AB:
      <br />
      Organizational number: 559430-9469
    </p>

  </div> )
}
    </div>
  );
};

export const getServerSideProps = async () => {
  const data = await fetchData();

  return {
    props: { ...data },
  };
};


export default AboutPage;