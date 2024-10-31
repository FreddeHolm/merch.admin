/*
cd zsanitydatabasecommands
node usefacebookprofilepicture.js
*/
const sanityClient = require('@sanity/client');

const client = sanityClient({
    projectId: "801rdb6i",
    dataset: "production",
    apiVersion: '2023-06-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN2
});

client.fetch('*[_type == "sluniversities"]').then((documents) => {
    documents.forEach((document) => {
        // Set usefacebookprofilepicture to true
        client
            .patch(document._id)
            .set({ usefacebookprofilepicture: true })
            .commit()
            .then(() => {
                //console.log(`Document ${document._id} updated: usefacebookprofilepicture set to true`);
            })
            .catch((updateError) => {
                console.error(`Error updating document ${document._id}:`, updateError);
            });
    });
}).catch((error) => {
    console.error('Error fetching and updating documents:', error);
});