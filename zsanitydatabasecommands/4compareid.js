/*

cd zsanitydatabasecommands
node 4compareid.js

*/

const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: "801rdb6i",
  dataset: "production",
  apiVersion: '2023-06-10',
  useCdn: false,
  token: "skT3dTDO1bUoEviBEevtZslezNiWb6WEi9PQ3nhyMuAk4ow8Gt3hEfSnQlUjVWVWhQrHQgxHIxLznbBpz8tMWrtv4dkwdzCeH7tvjzTUtsR3VgCSqZiLRbyD2xMjruRhfta6HshjqNQ4OCf14UBb8NZjlaaRmoaK5k3E7w8QbdsCHo8yeGYj",
});

async function checkForDuplicateIDs() {
  try {
    // Fetch all sluniversities entries
    const universities = await client.fetch('*[_type == "slkarhus"] { _id, id, name }');

    const idMap = new Map();
    const duplicates = [];

    // Iterate through each university entry and check for duplicate IDs
    for (const uni of universities) {
      if (idMap.has(uni.id)) {
        duplicates.push({
          id: uni.id,
          names: [idMap.get(uni.id).name, uni.name]
        });
      } else {
        idMap.set(uni.id, uni);
      }
    }

    if (duplicates.length > 0) {
      console.log('Duplicate IDs found:');
      duplicates.forEach(dup => {
        console.log(`*****************ID: ${dup.id} *********************`);
        console.log(`Names: ${dup.names.join(', ')}`);
      });
    } else {
      console.log('No duplicate IDs found.');
    }
  } catch (error) {
    console.error('Error checking for duplicate IDs:', error);
  }
}

checkForDuplicateIDs();