const sanityClient = require('@sanity/client');
// cd zsanitydatabasecommands
// node importtomatrix.js

const client = sanityClient({
  projectId: 'awfmzref', // Replace with your project ID
  dataset: 'production',        // Replace with your dataset
  token: 'skakVIrWhAnqQ0UNQ1capcix5ekylVbwr2khaY2GTutmJSfGSGpI5iP1CsvMvwo2TpCrJDjFQNxRDlb64k87PgIHE5nPKGLcwLBftP5id37RlN1Y8mBv20YxYxCSPHCRUKoQ9gHNvS39TeCAg414aicVLjgCnpyGSNDc0sLVk4WIy1ANyHgL',    // Replace with your write token if you have one
  useCdn: false
});

async function importtomatrix() {
  const embroideryPatch = {
    _id: 'createtypes-1',
    priceMatrix: [
      { "_key": "embroidery-40mm-50", "name": "40mm x 50", "price": 10.00, "quantity": 50, "show": true, "size": 40 },
      { "_key": "embroidery-40mm-100", "name": "40mm x 100", "price": 6.00, "quantity": 100, "show": true, "size": 40 },
      { "_key": "embroidery-40mm-200", "name": "40mm x 200", "price": 3.50, "quantity": 200, "show": true, "size": 40 },
      { "_key": "embroidery-40mm-300", "name": "40mm x 300", "price": 2.67, "quantity": 300, "show": true, "size": 40 },
      { "_key": "embroidery-40mm-400", "name": "40mm x 400", "price": 2.25, "quantity": 400, "show": true, "size": 40 },
      { "_key": "embroidery-40mm-500", "name": "40mm x 500", "price": 2.00, "quantity": 500, "show": true, "size": 40 },
      { "_key": "embroidery-40mm-1000", "name": "40mm x 1000", "price": 1.50, "quantity": 1000, "show": true, "size": 40 },
      
      { "_key": "embroidery-50mm-50", "name": "50mm x 50", "price": 11.00, "quantity": 50, "show": true, "size": 50 },
      { "_key": "embroidery-50mm-100", "name": "50mm x 100", "price": 6.50, "quantity": 100, "show": true, "size": 50 },
      { "_key": "embroidery-50mm-200", "name": "50mm x 200", "price": 3.75, "quantity": 200, "show": true, "size": 50 },
      { "_key": "embroidery-50mm-300", "name": "50mm x 300", "price": 2.83, "quantity": 300, "show": true, "size": 50 },
      { "_key": "embroidery-50mm-400", "name": "50mm x 400", "price": 2.38, "quantity": 400, "show": true, "size": 50 },
      { "_key": "embroidery-50mm-500", "name": "50mm x 500", "price": 2.10, "quantity": 500, "show": true, "size": 50 },
      { "_key": "embroidery-50mm-1000", "name": "50mm x 1000", "price": 1.60, "quantity": 1000, "show": true, "size": 50 },
      
      { "_key": "embroidery-60mm-50", "name": "60mm x 50", "price": 12.00, "quantity": 50, "show": true, "size": 60 },
      { "_key": "embroidery-60mm-100", "name": "60mm x 100", "price": 7.00, "quantity": 100, "show": true, "size": 60 },
      { "_key": "embroidery-60mm-200", "name": "60mm x 200", "price": 4.00, "quantity": 200, "show": true, "size": 60 },
      { "_key": "embroidery-60mm-300", "name": "60mm x 300", "price": 3.00, "quantity": 300, "show": true, "size": 60 },
      { "_key": "embroidery-60mm-400", "name": "60mm x 400", "price": 2.50, "quantity": 400, "show": true, "size": 60 },
      { "_key": "embroidery-60mm-500", "name": "60mm x 500", "price": 2.20, "quantity": 500, "show": true, "size": 60 },
      { "_key": "embroidery-60mm-1000", "name": "60mm x 1000", "price": 1.65, "quantity": 1000, "show": true, "size": 60 },
      
      { "_key": "embroidery-70mm-50", "name": "70mm x 50", "price": 13.00, "quantity": 50, "show": true, "size": 70 },
      { "_key": "embroidery-70mm-100", "name": "70mm x 100", "price": 7.50, "quantity": 100, "show": true, "size": 70 },
      { "_key": "embroidery-70mm-200", "name": "70mm x 200", "price": 4.25, "quantity": 200, "show": true, "size": 70 },
      { "_key": "embroidery-70mm-300", "name": "70mm x 300", "price": 3.17, "quantity": 300, "show": true, "size": 70 },
      { "_key": "embroidery-70mm-400", "name": "70mm x 400", "price": 2.63, "quantity": 400, "show": true, "size": 70 },
      { "_key": "embroidery-70mm-500", "name": "70mm x 500", "price": 2.30, "quantity": 500, "show": true, "size": 70 },
      { "_key": "embroidery-70mm-1000", "name": "70mm x 1000", "price": 1.70, "quantity": 1000, "show": true, "size": 70 },
      
      { "_key": "embroidery-80mm-50", "name": "80mm x 50", "price": 14.00, "quantity": 50, "show": true, "size": 80 },
      { "_key": "embroidery-80mm-100", "name": "80mm x 100", "price": 8.00, "quantity": 100, "show": true, "size": 80 },
      { "_key": "embroidery-80mm-200", "name": "80mm x 200", "price": 4.50, "quantity": 200, "show": true, "size": 80 },
      { "_key": "embroidery-80mm-300", "name": "80mm x 300", "price": 3.33, "quantity": 300, "show": true, "size": 80 },
      { "_key": "embroidery-80mm-400", "name": "80mm x 400", "price": 2.75, "quantity": 400, "show": true, "size": 80 },
      { "_key": "embroidery-80mm-500", "name": "80mm x 500", "price": 2.40, "quantity": 500, "show": true, "size": 80 },
      { "_key": "embroidery-80mm-1000", "name": "80mm x 1000", "price": 1.75, "quantity": 1000, "show": true, "size": 80 },
      
      { "_key": "embroidery-90mm-50", "name": "90mm x 50", "price": 15.00, "quantity": 50, "show": true, "size": 90 },
      { "_key": "embroidery-90mm-100", "name": "90mm x 100", "price": 8.50, "quantity": 100, "show": true, "size": 90 },
      { "_key": "embroidery-90mm-200", "name": "90mm x 200", "price": 4.75, "quantity": 200, "show": true, "size": 90 },
      { "_key": "embroidery-90mm-300", "name": "90mm x 300", "price": 3.50, "quantity": 300, "show": true, "size": 90 },
      { "_key": "embroidery-90mm-400", "name": "90mm x 400", "price": 2.88, "quantity": 400, "show": true, "size": 90 },
      { "_key": "embroidery-90mm-500", "name": "90mm x 500", "price": 2.50, "quantity": 500, "show": true, "size": 90 },
      { "_key": "embroidery-90mm-1000", "name": "90mm x 1000", "price": 1.80, "quantity": 1000, "show": true, "size": 90 },
      
      { "_key": "embroidery-100mm-50", "name": "100mm x 50", "price": 16.00, "quantity": 50, "show": true, "size": 100 },
      { "_key": "embroidery-100mm-100", "name": "100mm x 100", "price": 9.00, "quantity": 100, "show": true, "size": 100 },
      { "_key": "embroidery-100mm-200", "name": "100mm x 200", "price": 5.00, "quantity": 200, "show": true, "size": 100 },
      { "_key": "embroidery-100mm-300", "name": "100mm x 300", "price": 3.67, "quantity": 300, "show": true, "size": 100 },
      { "_key": "embroidery-100mm-400", "name": "100mm x 400", "price": 3.00, "quantity": 400, "show": true, "size": 100 },
      { "_key": "embroidery-100mm-500", "name": "100mm x 500", "price": 2.60, "quantity": 500, "show": true, "size": 100 },
      { "_key": "embroidery-100mm-1000", "name": "100mm x 1000", "price": 1.85, "quantity": 1000, "show": true, "size": 100 }
  
    ]
  };

  const wovenPatch = {
    _id: 'createtypes-2',
    priceMatrix: [
      { "_key": "woven-40mm-50", "name": "40mm x 50", "price": 10.40, "quantity": 50, "show": true, "size": 40 },
      { "_key": "woven-40mm-100", "name": "40mm x 100", "price": 6.20, "quantity": 100, "show": true, "size": 40 },
      { "_key": "woven-40mm-200", "name": "40mm x 200", "price": 3.60, "quantity": 200, "show": true, "size": 40 },
      { "_key": "woven-40mm-300", "name": "40mm x 300", "price": 2.73, "quantity": 300, "show": true, "size": 40 },
      { "_key": "woven-40mm-400", "name": "40mm x 400", "price": 2.30, "quantity": 400, "show": true, "size": 40 },
      { "_key": "woven-40mm-500", "name": "40mm x 500", "price": 2.04, "quantity": 500, "show": true, "size": 40 },
      { "_key": "woven-40mm-1000", "name": "40mm x 1000", "price": 1.52, "quantity": 1000, "show": true, "size": 40 },
      
      { "_key": "woven-50mm-50", "name": "50mm x 50", "price": 11.40, "quantity": 50, "show": true, "size": 50 },
      { "_key": "woven-50mm-100", "name": "50mm x 100", "price": 6.70, "quantity": 100, "show": true, "size": 50 },
      { "_key": "woven-50mm-200", "name": "50mm x 200", "price": 3.85, "quantity": 200, "show": true, "size": 50 },
      { "_key": "woven-50mm-300", "name": "50mm x 300", "price": 2.90, "quantity": 300, "show": true, "size": 50 },
      { "_key": "woven-50mm-400", "name": "50mm x 400", "price": 2.43, "quantity": 400, "show": true, "size": 50 },
      { "_key": "woven-50mm-500", "name": "50mm x 500", "price": 2.14, "quantity": 500, "show": true, "size": 50 },
      { "_key": "woven-50mm-1000", "name": "50mm x 1000", "price": 1.57, "quantity": 1000, "show": true, "size": 50 },
      
      { "_key": "woven-60mm-50", "name": "60mm x 50", "price": 12.40, "quantity": 50, "show": true, "size": 60 },
      { "_key": "woven-60mm-100", "name": "60mm x 100", "price": 7.20, "quantity": 100, "show": true, "size": 60 },
      { "_key": "woven-60mm-200", "name": "60mm x 200", "price": 4.10, "quantity": 200, "show": true, "size": 60 },
      { "_key": "woven-60mm-300", "name": "60mm x 300", "price": 3.07, "quantity": 300, "show": true, "size": 60 },
      { "_key": "woven-60mm-400", "name": "60mm x 400", "price": 2.55, "quantity": 400, "show": true, "size": 60 },
      { "_key": "woven-60mm-500", "name": "60mm x 500", "price": 2.24, "quantity": 500, "show": true, "size": 60 },
      { "_key": "woven-60mm-1000", "name": "60mm x 1000", "price": 1.62, "quantity": 1000, "show": true, "size": 60 },
      
      { "_key": "woven-70mm-50", "name": "70mm x 50", "price": 13.40, "quantity": 50, "show": true, "size": 70 },
      { "_key": "woven-70mm-100", "name": "70mm x 100", "price": 7.70, "quantity": 100, "show": true, "size": 70 },
      { "_key": "woven-70mm-200", "name": "70mm x 200", "price": 4.35, "quantity": 200, "show": true, "size": 70 },
      { "_key": "woven-70mm-300", "name": "70mm x 300", "price": 3.23, "quantity": 300, "show": true, "size": 70 },
      { "_key": "woven-70mm-400", "name": "70mm x 400", "price": 2.68, "quantity": 400, "show": true, "size": 70 },
      { "_key": "woven-70mm-500", "name": "70mm x 500", "price": 2.34, "quantity": 500, "show": true, "size": 70 },
      { "_key": "woven-70mm-1000", "name": "70mm x 1000", "price": 1.72, "quantity": 1000, "show": true, "size": 70 },
      
      { "_key": "woven-80mm-50", "name": "80mm x 50", "price": 14.40, "quantity": 50, "show": true, "size": 80 },
      { "_key": "woven-80mm-100", "name": "80mm x 100", "price": 8.20, "quantity": 100, "show": true, "size": 80 },
      { "_key": "woven-80mm-200", "name": "80mm x 200", "price": 4.60, "quantity": 200, "show": true, "size": 80 },
      { "_key": "woven-80mm-300", "name": "80mm x 300", "price": 5.10, "quantity": 300, "show": true, "size": 80 },
      { "_key": "woven-80mm-400", "name": "80mm x 400", "price": 2.80, "quantity": 400, "show": true, "size": 80 },
      { "_key": "woven-80mm-500", "name": "80mm x 500", "price": 2.44, "quantity": 500, "show": true, "size": 80 },
      { "_key": "woven-80mm-1000", "name": "80mm x 1000", "price": 1.77, "quantity": 1000, "show": true, "size": 80 },
      
      { "_key": "woven-90mm-50", "name": "90mm x 50", "price": 15.40, "quantity": 50, "show": true, "size": 90 },
      { "_key": "woven-90mm-100", "name": "90mm x 100", "price": 8.70, "quantity": 100, "show": true, "size": 90 },
      { "_key": "woven-90mm-200", "name": "90mm x 200", "price": 4.85, "quantity": 200, "show": true, "size": 90 },
      { "_key": "woven-90mm-300", "name": "90mm x 300", "price": 5.07, "quantity": 300, "show": true, "size": 90 },
      { "_key": "woven-90mm-400", "name": "90mm x 400", "price": 2.93, "quantity": 400, "show": true, "size": 90 },
      { "_key": "woven-90mm-500", "name": "90mm x 500", "price": 2.54, "quantity": 500, "show": true, "size": 90 },
      { "_key": "woven-90mm-1000", "name": "90mm x 1000", "price": 1.82, "quantity": 1000, "show": true, "size": 90 },
      
      { "_key": "woven-100mm-50", "name": "100mm x 50", "price": 16.40, "quantity": 50, "show": true, "size": 100 },
      { "_key": "woven-100mm-100", "name": "100mm x 100", "price": 9.20, "quantity": 100, "show": true, "size": 100 },
      { "_key": "woven-100mm-200", "name": "100mm x 200", "price": 5.10, "quantity": 200, "show": true, "size": 100 },
      { "_key": "woven-100mm-300", "name": "100mm x 300", "price": 3.73, "quantity": 300, "show": true, "size": 100 },
      { "_key": "woven-100mm-400", "name": "100mm x 400", "price": 3.05, "quantity": 400, "show": true, "size": 100 },
      { "_key": "woven-100mm-500", "name": "100mm x 500", "price": 2.64, "quantity": 500, "show": true, "size": 100 },
      { "_key": "woven-100mm-1000", "name": "100mm x 1000", "price": 1.87, "quantity": 1000, "show": true, "size": 100 }
  ]
  };

  const convertToPricePerPiece = (priceMatrix) => {
    return priceMatrix.map(entry => ({
      ...entry,
      price: parseFloat(entry.price)//price: parseFloat((entry.price / entry.quantity).toFixed(2))  // Convert to price per piece and round to 2 decimals
    }));
  };

  // Update the priceMatrix to use price per piece
  embroideryPatch.priceMatrix = convertToPricePerPiece(embroideryPatch.priceMatrix);
  wovenPatch.priceMatrix = convertToPricePerPiece(wovenPatch.priceMatrix);

  try {
    await client.patch(embroideryPatch._id)
      .set({ priceMatrix: embroideryPatch.priceMatrix })
      .commit();

    await client.patch(wovenPatch._id)
      .set({ priceMatrix: wovenPatch.priceMatrix })
      .commit();

    console.log('Price matrix updated successfully with price per piece');
  } catch (error) {
    console.error('Error updating price matrix:', error);
  }
}

importtomatrix();