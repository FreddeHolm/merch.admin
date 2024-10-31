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
        payment_method_types: ['card', 'klarna', 'paypal'],
        shipping_address_collection: {
          allowed_countries: [
            'AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR',  'AT', 'AU', 'AW', 'AX', 'AZ',
            'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW',
            'BY', 'BZ', 'CA',  'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR',  'CV', 'CW', 
            'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK',
            'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU',
            'GW', 'GY', 'HK',  'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ',  'IS', 'IT', 'JE',
            'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN',  'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK',
            'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 
            'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE',  'NG', 'NI', 'NL', 'NO', 'NP',
            'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT',  'PY', 'QA',
            'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC',  'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO',
            'SR', 'SS', 'ST', 'SV', 'SX',  'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR',
            'TT', 'TV', 'TW', 'TZ', 'UA', 'UG',  'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG',  'VN', 'VU', 'WF', 'WS',
            'YE', 'YT', 'ZA', 'ZM', 'ZW' ] //all countries
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
          label: {type: "custom", custom: "Meddelande"},
          type: "text",
          optional: true,
        }],


        //success_url: `${req.headers.origin}/success`,
        locale: req.body.i18n_language || 'en',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
        
      }



     /*
      console.log('totalpricecalc:', totalpricecalc);
      
      console.log('totalweight:', totalweight); 
      console.log('itemfitinpostpase:', itemfitinpostpase); 
      console.log('itemfitinstorlada:', itemfitinstorlada);
      console.log('itemfitinbrev:', itemfitinbrev);
      */

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