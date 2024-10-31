/*

cd zsanitydatabasecommands
node 1locationtotemp.js

*/
// yarn add chalk uuid

const sanityClient = require('@sanity/client');
//const chalk = require('chalk'); // Library to color console output
const { v4: uuidv4 } = require('uuid'); // Library to generate unique keys

const client = sanityClient({
    projectId: "801rdb6i",
    dataset: "production",
    apiVersion: '2023-06-10',
    useCdn: false,
    token: "skT3dTDO1bUoEviBEevtZslezNiWb6WEi9PQ3nhyMuAk4ow8Gt3hEfSnQlUjVWVWhQrHQgxHIxLznbBpz8tMWrtv4dkwdzCeH7tvjzTUtsR3VgCSqZiLRbyD2xMjruRhfta6HshjqNQ4OCf14UBb8NZjlaaRmoaK5k3E7w8QbdsCHo8yeGYj",
  });
  
  async function updateLocations() {
    try {
      // Fetch all sluniversities entries
      const universities = await client.fetch('*[_type == "slkarhus"  && show == true]');
  
      // Fetch all slcity entries
      const cities = await client.fetch('*[_type == "slcity" && show == true]');
  
      // Create a map of city names to city references
      const cityMap = new Map();
      cities.forEach(city => {
        cityMap.set(city.name.toLowerCase(), {
          _type: 'reference',
          _ref: city._id,
          _key: uuidv4(), // Add a unique key
        });
      });
  
      let completed = 0;
      let failed = 0;
  
      // Iterate through each university and update templocation field
      for (const uni of universities) {
        const cityName = uni.location.toLowerCase();
        const cityRef = cityMap.get(cityName);
  
        if (cityRef) {
          // Update the university entry with the reference to the city
          await client.patch(uni._id)
            .set({ templocation: [cityRef] })
            .commit();
          completed++;
          console.log(`Updated ${uni.name} with location ${cityName}`);
        } else {
          failed++;
          console.log(`##############################################################`);
          console.log(`No matching city found for ${uni.name} with location ${cityName}`);
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
  
  updateLocations();