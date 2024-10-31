// dataFetching.js
import { client } from '../lib/client';

export const fetchData = async () => {
  const query = '*[_type == "product" && minovve != true && showproduct == true]';
  const products = await client.fetch(query);
  
  const productss = products.map(product => {
    return {
      ...product,
      hiddenLink: "https://www.studentshoppen.com/studentlivet"
    };
  });

  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);


  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  return { products: productss,  announcements, release };
};

/*
import { fetchData } from  '../components/basicgetServerSideProps.js';


({announcements, release, products})

    <Navbar announcements={announcements} release={release} productsss={products}/>



export const getServerSideProps = async () => {
  const data = await fetchData();

  return {
    props: { ...data },
  };
};


*/