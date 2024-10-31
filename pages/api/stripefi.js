import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  
  if (req.method === 'POST') {
    try {

      const { items, i18n_language, source } = req.body;

    //console.log("req.body", req.body);

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
      patchDiscount = numberOfDiscounts * 500;
      

      const coupon = await stripe.coupons.create({
        amount_off: totalItemsWithPatches >= 10  ? patchDiscount : 1, //cant be 0 
        currency: 'eur',
        duration: 'once',
      });

      

      const params = {
        payment_intent_data: {
          metadata: {
            source: source || 'unknown', // This will attach metadata to the Payment Intent
          },
        },
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card', 'klarna', 'paypal'], // https://dashboard.stripe.com/settings/payment_methods
        shipping_address_collection: {
          allowed_countries: ['FI'],
          //allowed_countries: ['FI'], //  allowed_countries: ['*'],  Specify the allowed countries for shipping address collection
        },
        billing_address_collection: 'required', //auto eller required
        
        discounts: totalItemsWithPatches >= 10  ? [{ coupon: coupon.id }] : [],
    


        shipping_options: [
          { shipping_rate: 'shr_1PvjwnIkngTItNY39qdbJPYX' }, // Gratis Frakt - Standard    //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
          { shipping_rate: 'shr_1PvjxYIkngTItNY3764nyfBG' }, // Frakt - Express 20kr    //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
          { shipping_rate: 'shr_1PvjviIkngTItNY3do5Hlrqg' }, // Frakt - Standard 3.6euro  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvjtVIkngTItNY3X6PSIxQQ' }, // Frakt - Express 5.6euro   frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PviQ8IkngTItNY3KsDPBMxL' }, // Frakt - Standard 5.4euro   frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PviJtIkngTItNY3FvJSJF13' }, // Frakt - Express 7.4euro   frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvjqTIkngTItNY3Wxe7aNVc' }, // Frakt - Standard 10euro   frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvjKHIkngTItNY3ACc75Zyw' }, // Frakt - Express 12euro   frakt 1//LIVE shipping id from
          
          { shipping_rate: 'shr_1PvjGuIkngTItNY3vgZmidSO' }, // Frakt - Standard 13euro  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvjFqIkngTItNY3Exf2YCZv' }, // Frakt - Express 15euro  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvjCiIkngTItNY3wm3KE6H7' }, // Frakt - Standard 19euro  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvjAYIkngTItNY3V06bkO9S' }, // Frakt - Express 21euro  frakt 1//LIVE shipping id from

          { shipping_rate: 'shr_1Pvj9RIkngTItNY34H8WkQrn' }, // Frakt - Standard 23euro //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
          { shipping_rate: 'shr_1Pvj6tIkngTItNY3nAwCqYfq' }, //Frakt - Ensured 25euro
        ],

        

        /* old banned shipping
        shipping_options: [
          { shipping_rate: 'shr_1Osjh7A4BK13eAGF6Zm4TO2q' }, // Gratis Frakt - Standard    //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
          { shipping_rate: 'shr_1OsjjAA4BK13eAGF9N6lG2tQ' }, // Frakt - Express 20kr    //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
          { shipping_rate: 'shr_1OsjmCA4BK13eAGFS54OypSm' }, // Frakt - Standard 3.6euro  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1OsjpzA4BK13eAGFq46phLPb' }, // Frakt - Express 5.6euro   frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1OsjsVA4BK13eAGFzx60QY8N' }, // Frakt - Standard 5.4euro   frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1OsjuIA4BK13eAGF4CPx4vcW' }, // Frakt - Express 7.4euro   frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1OsjwUA4BK13eAGFO4hh1bgB' }, // Frakt - Standard 10euro   frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1OsjxEA4BK13eAGFNelXMa8b' }, // Frakt - Express 12euro   frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1Osk4nA4BK13eAGFSOGOpRnA' }, // Frakt - Standard 13euro  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1Osk5ZA4BK13eAGFDVjhdavk' }, // Frakt - Express 15euro  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1Osk7EA4BK13eAGF9b70aLKD' }, // Frakt - Standard 19euro  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1Osk86A4BK13eAGFAuSXBfeh' }, // Frakt - Express 21euro  frakt 1//LIVE shipping id from

          { shipping_rate: 'shr_1Osk8nA4BK13eAGFVG8D1EFr' }, // Frakt - Standard 99kr //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
          { shipping_rate: 'shr_1Osk9LA4BK13eAGFfLQYDwva' },
        ],
*/

    


        
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
          
          totalpricecalc += item.quantity * (item.price/10);
          

          return {
            price_data: { 
              currency: 'eur',
              product_data: { 
                name: item.name + (item.selectedVariation ? (" - " + item.selectedVariation.name) : ""),
                images: [newImage],
              },
              unit_amount: item.price * 10,
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
          label: {type: "custom", custom: "Message"},
          type: "text",
          optional: true,
        }],

        locale: req.body.i18n_language || 'en',
        //success_url: `${req.headers.origin}/success`,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
        
      }


/*
      console.log('totalpricecalc:', totalpricecalc);
      
      console.log('totalweight:', totalweight); 
      console.log('itemfitinpostpase:', itemfitinpostpase); 
      console.log('itemfitinstorlada:', itemfitinstorlada);
      console.log('itemfitinbrev:', itemfitinbrev);
/**/

      if (totalpricecalc - (numberOfDiscounts * 5) >= 75) { // FREE shipping
        params.shipping_options =  [
          { shipping_rate: 'shr_1PvjwnIkngTItNY39qdbJPYX' }, // Gratis Frakt - Standard    //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
          { shipping_rate: 'shr_1PvjxYIkngTItNY3764nyfBG' }, // Frakt - Express 20kr    //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
        ];
      } 
      //Om alla produkter får plats i brev och totalvikt är mindre än 50g
      else if(itemfitinpostpase === 0 && itemfitinstorlada === 0 && totalweight  < 51 ){
        params.shipping_options = [
          { shipping_rate: 'shr_1PvjviIkngTItNY3do5Hlrqg' }, // Frakt - Standard 3.6euro  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvjtVIkngTItNY3X6PSIxQQ' }, // Frakt - Express 5.6euro   frakt 1//LIVE shipping id from 
          
        ];
      } 
      //Om alla produkter får plats i brev och totalvikt är mindre än 100g ELLER om de får plats i postpåse och väger mindre än 100g (100-poståse vikt 17g)
      else if((itemfitinpostpase === 0 && itemfitinstorlada === 0 && totalweight < 100) || (itemfitinstorlada === 0 && totalweight < 83)){
        params.shipping_options = [
          { shipping_rate: 'shr_1PviQ8IkngTItNY3KsDPBMxL' }, // Frakt - Standard 5.4euro   frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PviJtIkngTItNY3FvJSJF13' }, // Frakt - Express 7.4euro   frakt 1//LIVE shipping id from
        ];
      }
      //Alla produkter som får plats i påse under 2kg alternativt alla produkter under 250g 
      else if((totalweight < 250)){
        params.shipping_options = [
          { shipping_rate: 'shr_1PvjqTIkngTItNY3Wxe7aNVc' }, // Frakt - Standard 10euro   frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvjKHIkngTItNY3ACc75Zyw' }, // Frakt - Express 12euro   frakt 1//LIVE shipping id from
        ];
      }
      //alla produkter under 500g 
      else if((totalweight < 480)){
        params.shipping_options = [
          { shipping_rate: 'shr_1PvjGuIkngTItNY3vgZmidSO' }, // Frakt - Standard 13euro  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvjFqIkngTItNY3Exf2YCZv' }, // Frakt - Express 15euro  frakt 1//LIVE shipping id from
        ];
      }
      
      //alla produkter under 1kg 
      else if((totalweight < 980)){
        params.shipping_options = [
          { shipping_rate: 'shr_1PvjCiIkngTItNY3wm3KE6H7' }, // Frakt - Standard 19euro  frakt 1//LIVE shipping id from
          { shipping_rate: 'shr_1PvjAYIkngTItNY3V06bkO9S' }, // Frakt - Express 21euro  frakt 1//LIVE shipping id from
        ];
      }

      else { //alla andra produkter ( över 1kg )
        params.shipping_options = [
          { shipping_rate: 'shr_1Pvj9RIkngTItNY34H8WkQrn' }, // Frakt - Standard 23euro //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
          { shipping_rate: 'shr_1Pvj6tIkngTItNY3nAwCqYfq' }, // Frakt - Express 25euro //LIVE shipping id from stripe:  https://dashboard.stripe.com/shipping-rates
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