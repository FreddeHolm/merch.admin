/* 

cd zsanitydatabasecommands
node replaceDataSanity.js


Om man får error efter man precis gjort sanity uppdateringar behöver man köra koden några gånger tills den lyckas, 
*/

const sanityClient = require('@sanity/client');

const client = sanityClient({
    projectId: "801rdb6i",
    dataset: "production",
    apiVersion: '2023-06-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN2
});

async function updateDocuments() {
    try {
        const documents = await client.fetch('*[_type == "slforeningfromusers" && reviewed == true && exportedtoproduction == false]');
        //console.log(`Documents to be exported: ${documents.length}`);

        for (const document of documents) {
            const tempdocid = document._id;
            document._id = undefined;
            document._type = 'slforening';

            // Check if an entry with the same slug exists in slforening
            const existingEntries = await client.fetch(`*[_type == "slforening" && slug.current == "${document.slug.current}"]`);
            //console.log(`How many with the same slug: ${existingEntries.length}`);

            for (const existingEntry of existingEntries) {
                // Update each existing entry
                await client
                    .patch(existingEntry._id)
                    .set({
                        name: "(old)" + existingEntry.name,
                        show: false,
                        slug: {
                            _type: 'slug',
                            current: `${existingEntry.slug.current}-old-${Date.now()}`,
                        },
                    })
                    .commit();
                //console.log(`Existing slforening entry updated: ${existingEntry._id} set to ${existingEntry.slug.current}-old-${Date.now()}`);
            }

            // Create a new entry in slforening
            const createdDocument = await client.create(document);
            //console.log(`Document ${createdDocument._id} created in slforening`);

            // Update the exportedtoproduction field to true in slforeningfromusers
            await client
                .patch(tempdocid)
                .set({ exportedtoproduction: true })
                .commit();
            //console.log(`slforeningfromusers Document ${tempdocid} updated: exportedtoproduction set to true`);

            // Update the exportedtoproduction field to true in the newly created slforening document
            await client
                .patch(createdDocument._id)
                .set({ exportedtoproduction: true })
                .commit();
            //console.log(`Document ${createdDocument._id} updated: exportedtoproduction set to true`);
        }
    } catch (error) {
        //console.error('Error fetching and creating documents:', error);
    }
}

// Call the function to start the process
updateDocuments();