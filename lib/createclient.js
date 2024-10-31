import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const createclient = sanityClient({
  projectId: "awfmzref",
  dataset: "production",
  apiVersion: '2023-06-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN3
});

const createbuilder = imageUrlBuilder(createclient);

export const urlForCreate = (source) => createbuilder.image(source);