//newbelongsto.js

/*

cd zsanitydatabasecommands
node newbelongsto.js

*/



const sanityClient = require('@sanity/client');
const { v4: uuidv4 } = require('uuid'); // Use UUID to generate unique keys

const client = sanityClient({
    projectId: "801rdb6i",
    dataset: "production",
    apiVersion: '2023-06-10',
    useCdn: true,
    token: "skT3dTDO1bUoEviBEevtZslezNiWb6WEi9PQ3nhyMuAk4ow8Gt3hEfSnQlUjVWVWhQrHQgxHIxLznbBpz8tMWrtv4dkwdzCeH7tvjzTUtsR3VgCSqZiLRbyD2xMjruRhfta6HshjqNQ4OCf14UBb8NZjlaaRmoaK5k3E7w8QbdsCHo8yeGYj",
});

async function fetchDocuments(type) {
    return client.fetch(`*[_type == "${type}" && show == true]{_id, name, _type}`);
}

async function updateNewBelongsto() {
    try {
        const foreningDocuments = await client.fetch('*[_type == "slkarhus"]');
        const universityDocuments = await fetchDocuments('sluniversities');
        //const karhusDocuments = await fetchDocuments('slkarhus');
        //const sektionerDocuments = await fetchDocuments('slsektioner');

  // Initialize counters
  let totalProcessed = 0;
  let successfulUpdates = 0;
  let failedUpdates = 0;       

        for (const document of foreningDocuments) {
            const belongsto = document.belongsto;
            totalProcessed++;
            console.log(`________________________________________________`);
            console.log(`Processing document: ${document._id} with belongsto: ${belongsto}`);

            const matchingDocument = 
                                      universityDocuments.find(doc => doc.name === belongsto); 
                                      //  || karhusDocuments.find(doc => doc.name === belongsto); 
                                      // || sektionerDocuments.find(doc => doc.name === belongsto);

            if (matchingDocument) {
                console.log(`Found match: ${matchingDocument.name} in ${matchingDocument._type}`);

                await client
                    .patch(document._id)
                    .setIfMissing({ newbelongsto: [] })
                    .append('newbelongsto', [
                        {
                            _type: 'reference',
                            _ref: matchingDocument._id,
                            _key: uuidv4(), // Add unique key
                        }
                    ])
                    .commit();
                
                    successfulUpdates++; 
                console.log(`Updated document ${document._id} with newbelongsto reference to ${matchingDocument.name}`);
            } else {
                failedUpdates++; // Increment failed updates counter
                console.log(`No match found for belongsto: ${belongsto}`);
            }
        }

        console.log(`################################################`);
        console.log(`________________________________________________`);
        console.log(`Summary:`);
        console.log(`Total Entries Processed: ${totalProcessed}`);
        console.log(`Successful Updates: ${successfulUpdates}`);
        console.log(`Failed Updates: ${failedUpdates}`);

    } catch (error) {
        console.error('Error updating newbelongsto field:', error);
    }
}

updateNewBelongsto();