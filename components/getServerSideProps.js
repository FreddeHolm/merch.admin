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

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const ratingsQuery = '*[_type == "productratings"]';
  const ratingsData = await client.fetch(ratingsQuery);

  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const landingimagesquery = '*[_type == "landingimages"] | order(imageimportance asc)';
  const landingimages = await client.fetch(landingimagesquery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  return { products: productss, bannerData, ratingsData, announcements, landingimages, release };
};