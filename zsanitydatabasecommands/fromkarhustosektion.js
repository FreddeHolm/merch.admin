//fromkarhustosektion.js

/*

cd zsanitydatabasecommands
node fromkarhustosektion.js

*/

const sanityClient = require('@sanity/client');

const client = sanityClient({
    projectId: "801rdb6i",
    dataset: "production",
    apiVersion: '2023-06-10',
    useCdn: true,
    token: "skT3dTDO1bUoEviBEevtZslezNiWb6WEi9PQ3nhyMuAk4ow8Gt3hEfSnQlUjVWVWhQrHQgxHIxLznbBpz8tMWrtv4dkwdzCeH7tvjzTUtsR3VgCSqZiLRbyD2xMjruRhfta6HshjqNQ4OCf14UBb8NZjlaaRmoaK5k3E7w8QbdsCHo8yeGYj",
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteKarhusSections() {
    try {
        const documents = await client.fetch('*[_type == "slkarhus" && issektion == true]');
        console.log(`Found ${documents.length} documents to delete.`);
        for (const document of documents) {
            const tempdocid = document._id;

            try {
                await client.delete(tempdocid);
                console.log(`Document ${tempdocid} deleted from slkarhus`);
            } catch (deleteError) {
                console.error(`Error deleting document ${tempdocid} from slkarhus:`, deleteError);
            }

            // Introduce a delay to avoid hitting the rate limit
            await delay(500); // 0.5 second delay
        }
        console.log('All specified documents have been deleted.');
    } catch (error) {
        console.error('Error fetching slkarhus documents:', error);
    }
}

deleteKarhusSections();



