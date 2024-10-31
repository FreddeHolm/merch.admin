/*

cd zsanitydatabasecommands
node 3cleartemplocation.js

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

async function clearTempLocation() {
  try {
    // Fetch all sluniversities entries
    const universities = await client.fetch('*[_type == "slkarhus" && show == true]');

    let completed = 0;
    let failed = 0;

    // Iterate through each university and clear templocation field
    for (const uni of universities) {
      if (uni.templocation && uni.templocation.length > 0) {
        // Clear the templocation field by setting it to an empty array
        await client.patch(uni._id)
          .set({ templocation: [] })
          .commit();
        completed++;
        console.log(`Cleared templocation for ${uni.name}`);
      } else {
        failed++;
        console.log(`No templocation data found for ${uni.name}`);
      }
    }

    console.log(`Completed: ${completed} / ${universities.length}`);
    console.log(`Failed: ${failed} / ${universities.length}`);
    console.log('All templocation fields cleared successfully');
  } catch (error) {
    console.error('Error clearing templocation fields:', error);
  }
}

clearTempLocation();