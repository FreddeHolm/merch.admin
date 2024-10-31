const sanityClient = require('@sanity/client');

const client = sanityClient({
    projectId: "801rdb6i",
    dataset: "production",
    apiVersion: '2023-06-10',
    useCdn: true,
    token: "skT3dTDO1bUoEviBEevtZslezNiWb6WEi9PQ3nhyMuAk4ow8Gt3hEfSnQlUjVWVWhQrHQgxHIxLznbBpz8tMWrtv4dkwdzCeH7tvjzTUtsR3VgCSqZiLRbyD2xMjruRhfta6HshjqNQ4OCf14UBb8NZjlaaRmoaK5k3E7w8QbdsCHo8yeGYj"
});

const emailsToRemove = ["info@studentshoppen.com", "studentlivet@studentshoppen.com"];
const documentTypes = ["slforening", "sluniversities", "slkarhus"];

async function removeContentManagerEmails() {
    try {
        for (const docType of documentTypes) {
            const documents = await client.fetch(`*[_type == "${docType}" && defined(contentmanager)]`);
            //console.log(`Documents to be updated in ${docType}: ${documents.length}`);

            for (const document of documents) {
                if (document.contentmanager.some(email => emailsToRemove.includes(email))) {
                    const updatedContentManager = document.contentmanager.filter(email => !emailsToRemove.includes(email));
                    
                    await client
                        .patch(document._id)
                        .set({ contentmanager: updatedContentManager })
                        .commit();
                    
                    //console.log(`Document ${document._id} updated in ${docType}: contentmanager updated`);
                }
            }
        }
    } catch (error) {
        //console.error('Error updating documents:', error);
    }
}

// Call the function to start the process
removeContentManagerEmails();