// pages/api/custom-stripe.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount, source } = req.body;

      if (!amount || isNaN(amount)) {
        return res.status(400).json({ error: 'Invalid amount' });
      }

      const amountInCents = parseFloat(amount) * 100;

      const session = await stripe.checkout.sessions.create({
        payment_intent_data: {
          metadata: {
            source: source || 'unknown', // This will attach metadata to the Payment Intent
          },
        },        
        
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card', 'klarna', 'paypal',  ],

        line_items: [
          {
            price_data: {
              currency: 'sek',
              product_data: {
                name: 'Betalning på plats',
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],

        custom_fields: [{
          key: "customermessage",
          label: {type: "custom", custom: "Meddelande"},
          type: "text",
          optional: true,
        }],

        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
        metadata: {
          source: source || 'unknown', // Add source to metadata
        },
      });

      

      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}