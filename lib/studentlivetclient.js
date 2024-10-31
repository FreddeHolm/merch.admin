import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const studentlivetclient = sanityClient({
  projectId: "801rdb6i",
  dataset: "production",
  apiVersion: '2023-06-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN2
});

const studentlivetbuilder = imageUrlBuilder(studentlivetclient);

export const urlForSL = (source) => studentlivetbuilder.image(source);