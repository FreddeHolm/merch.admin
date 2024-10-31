import React, { useState, useEffect } from 'react';
import { client } from '../lib/client';
import { studentlivetclient } from '../lib/studentlivetclient';
import { useRouter } from 'next/router';

import { Product, Navbar } from '../components';




const AdminRedirect = ({ products, announcements, release,}) => {

  const router = useRouter();

  useEffect(() => {
    
      // If no view specified, redirect to the default view ('skolor')
      router.push(`/studentlivet/admin`); //      router.push(`/studentlivet/${cityname}/skolor`);
    
  }, []);

 

  return (
    <div  >
    <Navbar announcements={announcements} release={release} productsss={products}/>

      <div className={announcements.filter((announcement) => announcement.showannouncement).length > 0 ? "entirefilterpage2" : "entirefilterpage"}>
        
 
 



      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  
  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  const query = '*[_type == "product" && minovve != true && showproduct == true]';
  const products = await client.fetch(query);
  const productss = products.map(product => {
    return {
      ...product,
      hiddenLink: "https://www.studentshoppen.com/studentlivet"
    };
  });

  return {
    props: { products: productss, announcements, release,},
  };
};

export default AdminRedirect;