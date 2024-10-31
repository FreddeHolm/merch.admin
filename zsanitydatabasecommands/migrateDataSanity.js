/*

cd zsanitydatabasecommands
node migrateDataSanity.js

*/

const sanityClient = require('@sanity/client');

const client = sanityClient({
    projectId: "801rdb6i",
    dataset: "production",
    apiVersion: '2023-06-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN2
});

client.fetch('*[_type == "slforeningfromusers" && reviewed == true && exportedtoproduction == false]').then((documents) => {
    documents.forEach((document) => {
        const tempdocid = document._id;
        document._id = undefined;
        document._type = 'slforening';

        client.create(document).then((createdDocument) => {
            //console.log(`Document ${createdDocument._id} created in slforening`);

            // Update the exportedtoproduction field to true in slforeningfromusers
            client
                .patch(tempdocid)
                .set({ exportedtoproduction: true })
                .commit()
                .then(() => {
                    //console.log(`slforeningfromusers Document ${tempdocid} updated: exportedtoproduction set to true`);
                })
                .catch((updateError) => {
                    console.error(`Error updating slforeningfromusers document ${tempdocid}:`, updateError);
                });

            // Update the exportedtoproduction field to true in the newly created slforening document
            client
                .patch(createdDocument._id)
                .set({ exportedtoproduction: true })
                .commit()
                .then(() => {
                    //console.log(`Document ${createdDocument._id} updated: exportedtoproduction set to true`);
                })
                .catch((updateError) => {
                    console.error(`Error updating document ${createdDocument._id}:`, updateError);
                });
        });
    });
}).catch((error) => {
    console.error('Error fetching and creating documents:', error);
});



/*
async function deleteAllSlsektioner() {
    try {
        const documents = await client.fetch('*[_type == "slsektioner"]');
        for (const document of documents) {
            try {
                await client.delete(document._id);
                console.log(`Document ${document._id} deleted from slsektioner`);
            } catch (deleteError) {
                console.error(`Error deleting document ${document._id}:`, deleteError);
            }
        }
        console.log(`All documents from slsektioner have been deleted`);
    } catch (error) {
        console.error('Error fetching slsektioner documents:', error);
    }
}

deleteAllSlsektioner();

/*

*/