/*

cd zsanitydatabasecommands
node automaticslugovve.js

*/

//TODO FIX NEW ovvecity

const sanityClient = require('@sanity/client');
const slugify = require('slugify');

const client = sanityClient({
  projectId: "801rdb6i",
  dataset: "production",
  apiVersion: '2023-06-10',
  useCdn: false,
  token: "skT3dTDO1bUoEviBEevtZslezNiWb6WEi9PQ3nhyMuAk4ow8Gt3hEfSnQlUjVWVWhQrHQgxHIxLznbBpz8tMWrtv4dkwdzCeH7tvjzTUtsR3VgCSqZiLRbyD2xMjruRhfta6HshjqNQ4OCf14UBb8NZjlaaRmoaK5k3E7w8QbdsCHo8yeGYj",
});

const generateSlug = async (city, name, utbildning) => {
  const baseSlug = slugify(`${city.substring(0, 3)}${name ? name.substring(0, 3) : utbildning.substring(0, 3)}`, { lower: true });
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (await slugExists(uniqueSlug)) {
    uniqueSlug = `${baseSlug}${counter}`;
    counter++;
  }

  return uniqueSlug;
};

const slugExists = async (slug) => {
  const result = await client.fetch(`*[_type == "slovve" && slug.current == $slug][0]._id`, { slug });
  return !!result;
};

client.fetch('*[_type == "slovve"]').then(async (documents) => {
  for (const document of documents) {
    const city = document.ovvecity || '';
    const name = document.name || '';
    const utbildning = document.utbildning || '';

    if (city && (name || utbildning)) {
      const newSlug = await generateSlug(city, name, utbildning);

      client
        .patch(document._id)
        .set({ slug: { _type: 'slug', current: newSlug } })
        .commit()
        .then((updatedDocument) => {
          //console.log(`Document ${updatedDocument._id} updated with slug ${newSlug}`);
        })
        .catch((error) => {
          console.error(`Error updating document ${document._id} with slug:`, error);
        });
    }
  }
}).catch((error) => {
  console.error('Error fetching documents:', error);
});