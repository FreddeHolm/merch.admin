import React, { useEffect } from 'react';
import { client } from '../../../lib/client';
import { useRouter } from 'next/router';
import { studentlivetclient, urlForSL } from '../../../lib/studentlivetclient';


import StudentlivetNavigation from '../../../components/studentlivet/SLNavigation';

import { Navbar } from '../../../components';

const SLCity = ({ products, announcements, release, slcity, sluniversities  }) => {
  const router = useRouter();
  const { cityname, view } = router.query;

 

  useEffect(() => {
    if (!cityname) {
      // Handle case where cityname is not provided
      router.push('/studentlivet');
      return;
    }

    if (!view) {
      // If no view specified, redirect to the default view ('skolor')
      router.push(`/studentlivet/${cityname}/skolor`);
    }
  }, [cityname, view]);
   /**/

  return (
    <div>
      <Navbar announcements={announcements} release={release} productsss={products} />
      <StudentlivetNavigation slcity={slcity} sluniversities={sluniversities} />

      <div className={announcements.filter((announcement) => announcement.showannouncement).length > 0 ? "entirefilterpage2" : "entirefilterpage"}>
        {/* Content for SLCity page */}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { cityname } = params;
  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  const slcityQuery = '*[_type == "slcity"]';
  const slcity = await studentlivetclient.fetch(slcityQuery);

  const sluniversitiesQuery = '*[_type == "sluniversities"]';
  const sluniversities = await studentlivetclient.fetch(sluniversitiesQuery);

  const query = '*[_type == "product" && minovve != true && showproduct == true]';
  const products = await client.fetch(query);
  const productss = products.map(product => {
    return {
      ...product,
      hiddenLink: "https://www.studentshoppen.com/studentlivet"
    };
  });

  return {
    props: { products: productss, announcements, release, slcity, sluniversities },
  };
};

export default SLCity;