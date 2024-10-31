import React, { useEffect, useState } from 'react';
import { client } from '../lib/client';
import { useTranslation } from 'react-i18next';

const Announcements = ({announcements}) => {
  const [t, i18n] = useTranslation("global");

/*  
//how to fetch data in a non index file: 
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const announcementsQuery = '*[_type == "announcements"]';
      const announcementsData = await client.fetch(announcementsQuery);
      setAnnouncements(announcementsData);
      console.log("Announcements data:", announcementsData);
    };

    fetchAnnouncements();
  }, []);

console.log("aabby anouncements" + announcements)

// END how to fetch data in a non index file 
*/

  return (
    <div>
    {announcements.filter(announcement => announcement.showannouncement).map((announcement) => (
    <div
    key={announcement.id}
      className="announcement-bar-maindiv"
      style={{
        backgroundColor: announcement.bgcolor ? announcement.bgcolor : "#ce2e33",
        color: announcement.textcolor ? announcement.textcolor : "#FFFFFF",
        padding: "10px 0",
        textAlign: "center",
        fontWeight: "bold",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "62px",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    {i18n.language === "sv" ?
      <span className="announcement-text">  {announcement?.text1 && (announcement?.text1 )} {announcement?.text1 && (<br></br>)} {announcement?.text2 && (announcement?.text2)}</span>
    : <span className="announcement-text">  {announcement?.text1eng && (announcement?.text1eng )} {announcement?.text1eng && (<br></br>)} {announcement?.text2eng && (announcement?.text2eng)}</span>
    }
      {/* if not .map, then this works <span className="announcement-text"> {announcements.length > 0 && announcements[0].text} <br></br>{announcements.length > 0 && announcements[0].text}</span> */}
    </div>
      ))}
      </div>
  );
};




export default Announcements;