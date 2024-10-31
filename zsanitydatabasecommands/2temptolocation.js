/*

cd zsanitydatabasecommands
node 2temptolocation.js

*/

const sanityClient = require('@sanity/client');
const { v4: uuidv4 } = require('uuid'); // Library to generate unique keys

const client = sanityClient({
  projectId: "801rdb6i",
  dataset: "production",
  apiVersion: '2023-06-10',
  useCdn: false,
  token: "skT3dTDO1bUoEviBEevtZslezNiWb6WEi9PQ3nhyMuAk4ow8Gt3hEfSnQlUjVWVWhQrHQgxHIxLznbBpz8tMWrtv4dkwdzCeH7tvjzTUtsR3VgCSqZiLRbyD2xMjruRhfta6HshjqNQ4OCf14UBb8NZjlaaRmoaK5k3E7w8QbdsCHo8yeGYj",
});

async function transferTempLocationToLocation() {
  try {
    // Fetch all sluniversities entries
    const universities = await client.fetch('*[_type == "slkarhus" && show == true]');

    let completed = 0;
    let failed = 0;

    // Iterate through each university and update location field with templocation
    for (const uni of universities) {
      if (uni.templocation && uni.templocation.length > 0) {
        const updatedLocation = uni.templocation.map(ref => ({
          _type: 'reference',
          _ref: ref._ref,
          _key: uuidv4(), // Add a unique key
        }));

        // Update the university entry with the content from templocation
        await client.patch(uni._id)
          .set({ location: updatedLocation })
          .commit();
        completed++;
        console.log(`Updated ${uni.name} with templocation data`);
      } else {
        failed++;
        console.log(`##############################################################`);
        console.log(`No templocation data found for ${uni.name}`);
        console.log(`_____________________________________________________________`);
      }
    }

    console.log(`Completed: ${completed} / ${universities.length}`);
    console.log(`Failed: ${failed} / ${universities.length}`);
    console.log('All universities updated successfully');
  } catch (error) {
    console.error('Error updating universities:', error);
  }
}

transferTempLocationToLocation();