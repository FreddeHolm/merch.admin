/*

cd zsanitydatabasecommands
node migrateshowovve.js

*/

const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: "801rdb6i",
  dataset: "production",
  apiVersion: '2023-06-10',
  useCdn: false,
  token: "skT3dTDO1bUoEviBEevtZslezNiWb6WEi9PQ3nhyMuAk4ow8Gt3hEfSnQlUjVWVWhQrHQgxHIxLznbBpz8tMWrtv4dkwdzCeH7tvjzTUtsR3VgCSqZiLRbyD2xMjruRhfta6HshjqNQ4OCf14UBb8NZjlaaRmoaK5k3E7w8QbdsCHo8yeGYj",
});

async function migrateShowField() {
  try {
    // Fetch all slovve entries
    const ovves = await client.fetch('*[_type == "slovve"]');

    let completed = 0;
    let failed = 0;

    // Iterate through each ovve and update the show field
    for (const ovve of ovves) {
      if (typeof ovve.showovve !== 'undefined') {
        try {
          await client.patch(ovve._id)
            .set({ show: ovve.showovve })
            .commit();
          completed++;
          console.log(`Updated ${ovve.name} with showovve value ${ovve.showovve}`);
        } catch (error) {
          failed++;
          console.log(`Failed to update ${ovve.name}:`, error);
        }
      } else {
        failed++;
        console.log(`No showovve field found for ${ovve.name}`);
      }
    }

    console.log(`Completed: ${completed} / ${ovves.length}`);
    console.log(`Failed: ${failed} / ${ovves.length}`);
    console.log('All ovve entries updated successfully');
  } catch (error) {
    console.error('Error updating ovve entries:', error);
  }
}

migrateShowField();