import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {

      const { items, i18n_language, source } = req.body;
      
      let totalpricecalc = 0;
      let totalItemsWithPatches = 0;
      let numberOfDiscounts = 0;
      let patchDiscount = 0;


      //let isAllitemsPatches = true;

      // Calculate the total number of items with patches and the corresponding discount
      req.body.items.forEach((item) => {
        if (item.hasPatchesTag) {
          totalItemsWithPatches += item.quantity;
        }
        /*else{
          isAllitemsPatches = false;
        }*/
      });

      let totalweight = 0;

      let itemfitinbrev = 0;
      let itemfitinpostpase = 0;
      let itemfitinstorlada = 0;
      let totalitems = 0; 

      //calculate weigth and shipping size
      req.body.items.forEach((item) => {

        totalweight += item.quantity*item.vikt;
        totalitems += item.quantity;

              if (item.shippingsize ==="brev") {
                itemfitinbrev += item.quantity;
              }
              else if (item.shippingsize ==="postpase") {
                itemfitinpostpase += item.quantity;

              }
              else{
                itemfitinstorlada += item.quantity;
              }

        });




      numberOfDiscounts = Math.floor(totalItemsWithPatches / 10);
      patchDiscount = numberOfDiscounts * 5000;
      

      const coupon = await stripe.coupons.create({
        amount_off: totalItemsWithPatches >= 10  ? patchDiscount : 1, //cant be 0 
        currency: 'sek',
        duration: 'once',
      }); /**/


      //FIX INVOICE https://dashboard.stripe.com/settings/branding
      // SET UP INVOICE FROM MY EMAIL  https://dashboard.stripe.com/settings/emails
      const params = {
        
    
        payment_intent_data: {
          metadata: {
            source: source || 'unknown', // This will attach metadata to the Payment Intent
          },
        },
        submit_type: 'pay', 
        mode: 'payment',
        payment_method_types: ['card', 'klarna', 'paypal',  ], //'swish', // https://dashboard.stripe.com/settings/payment_methods
        shipping_address_collection: {
          allowed_countries: ['SE'], // Specify the allowed countries for shipping address collection
        },
        billing_address_collection: 'required', //auto eller required
        
        discounts: totalItemsWithPatches >= 10  ? [{ coupon: coupon.id }] : [],
    

        shipping_options: [
          //{ shipping_rate: 'shr_1NX15qA4BK13eAGFoAH17Tbi' }, //TEST FREE shipping id from stripe:  https://dashboard.stripe.com/test/shipping-rates
          //{ shipping_rate: 'shr_1NX17PA4BK13eAGFq2XwuZ4c' }, //TEST 49krshipping id from stripe:  https://dashboard.stripe.com/test/shipping-rates
         /* 
          { shipping_rate: 'shr_1NWyU8A4BK13eAGFap7CyjCk' }, // Gratis Frakt - Standard    //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
          { shipping_rate: 'shr_1NWyVIA4BK13eAGFh8VNhl1D' }, // Frakt - Express 10kr    //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates

          { shipping_rate: 'shr_1NWyZfA4BK13eAGFsbLkupFD' }, // Frakt - Standard 49kr //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
          { shipping_rate: 'shr_1NWyasA4BK13eAGFpdD00xTn' }, // Frakt - Express 59kr //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates

          { shipping_rate: 'shr_1NWyOmA4BK13eAGFr4iOn3gW' }, // Frakt - Standard 15kr  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1NWyQxA4BK13eAGFY1AWExKB' }, // Frakt - Express 29kr  frakt 1//LIVE shipping id from
*/


        ],


    


        
        phone_number_collection: {
          enabled: true,
        },

        

        line_items: req.body.items.map((item) => {
          const img = (item.selectedVariation ? 
            item.imageUrl ? item.imageUrl
           : item.image[item.selectedVariationImgIndex].asset._ref : item.image[0].asset._ref);
          //const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp'); //old code: note vfxfwnaw is project id
          const newImage = img.replace('image-', `https://cdn.sanity.io/images/b6p59wq7/production/`).replace('-webp', '.webp').replace('-jpg', '.jpg').replace('-png', '.png');
          //const newImage = img.replace('image-', 'https://cdn.sanity.io/images/h27kpish/production/').replace('-webp', '.webp'); //old code: note vfxfwnaw is project id
          
          totalpricecalc += item.quantity * item.price;
          

          return {
            price_data: { 
              currency: 'sek',
              product_data: { 
                name: item.name + (item.selectedVariation ? (" - " + item.selectedVariation.name) : ""),
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            /*adjustable_quantity: {
              enabled:true,
              minimum: 0,
            }, */
            quantity: item.quantity,

          }

          
        }),
        
       
        // custom fields: https://www.youtube.com/watch?v=V9nzJXY19Hg
        custom_fields: [{
          key: "customermessage",
          label: {type: "custom", custom: "Meddelande"},
          type: "text",
          optional: true,
        }],
        
        locale:  req.body.i18n_language || 'sv',   //https://dashboard.stripe.com/settings/emails
        //success_url: `${req.headers.origin}/success`,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
       
        
      }
      console.log('source:', source);


      /*
      console.log('totalpricecalc:', totalpricecalc);
      
      console.log('totalweight:', totalweight); 
      console.log('itemfitinpostpase:', itemfitinpostpase); 
      console.log('itemfitinstorlada:', itemfitinstorlada);
      console.log('itemfitinbrev:', itemfitinbrev);
*/

      if (totalpricecalc - (numberOfDiscounts * 50) >= 750) { // FREE shipping
        params.shipping_options =  [
          { shipping_rate: 'shr_1PvkAWIkngTItNY3s2ycQM2X' }, // Gratis Frakt - Standard    //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
          { shipping_rate: 'shr_1Pvk9UIkngTItNY3VYLHDSEY' }, // Frakt - Express 20kr    //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
        ];
      } 
      //Om alla produkter får plats i brev och totalvikt är mindre än 50g
      else if(itemfitinpostpase === 0 && itemfitinstorlada === 0 && totalweight  < 51 ){
        params.shipping_options = [
          { shipping_rate: 'shr_1PvkPTIkngTItNY3DnKRBRvK' }, // Frakt - Standard 18kr  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvkJCIkngTItNY3BZd4HPmU' }, // Frakt - Express 38kr  frakt 1//LIVE shipping id from
        ];
      } 
      //Om alla produkter får plats i brev och totalvikt är mindre än 100g ELLER om de får plats i postpåse och väger mindre än 100g (100-poståse vikt 17g)
      else if((itemfitinpostpase === 0 && itemfitinstorlada === 0 && totalweight < 100) || (itemfitinstorlada === 0 && totalweight < 83)){
        params.shipping_options = [
          { shipping_rate: 'shr_1PvkOFIkngTItNY35Iewh7Xu' }, // Frakt - Standard 36kr  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvkI9IkngTItNY3udSKxNLH' }, // Frakt - Express 56kr  frakt 1//LIVE shipping id from
        ];
      }
      //Alla produkter som får plats i påse under 2kg alternativt alla produkter under 500g 
      else if(( itemfitinstorlada === 0 && totalweight < 1970) || (totalweight < 470)){
        params.shipping_options = [
          { shipping_rate: 'shr_1PvkN1IkngTItNY3v2JpI7JA' }, // Frakt - Standard 54kr  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvkH2IkngTItNY3n3Opczbo' }, // Frakt - Express 75kr  frakt 1//LIVE shipping id from
        ];
      }
      //alla produkter under 1kg 
      else if((totalweight < 980)){
        params.shipping_options = [
          { shipping_rate: 'shr_1PvkLrIkngTItNY38BVVJnVL' }, // Frakt - Standard 80kr  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvkEGIkngTItNY3YdeherWc' }, // Frakt - Express 99kr  frakt 1//LIVE shipping id from
        ];
      }
      else { //alla andra produkter ( över 1kg )
        params.shipping_options = [
          { shipping_rate: 'shr_1PvkL0IkngTItNY3KfrSgRUm' }, // Frakt - Standard 99kr //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
          { shipping_rate: 'shr_1PvkBwIkngTItNY3qXqfLThC' }, // Frakt - Express 125kr //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
        ];
      }




      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
      totalpricecalc = 0;
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}