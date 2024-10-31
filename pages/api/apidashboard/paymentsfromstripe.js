// /api/paymentsfromstripe.js

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // List payment intents with expanded customer and payment_method
      const paymentIntents = await stripe.paymentIntents.list({
        limit: 1000, // Adjust the limit as needed
        expand: ['data.customer', 'data.payment_method'], // Expanded payment_method
      });

      // Process each payment intent
      const paymentsWithDetails = await Promise.all(
        paymentIntents.data.map(async (paymentIntent) => {
          // List checkout sessions associated with the payment intent
          const sessions = await stripe.checkout.sessions.list({
            payment_intent: paymentIntent.id,
          });

          let lineItems = [];
          let session = null;
          let discounts = [];
          let shippingRate = null;
          let customFields = [];
          let latestCharge = null; // To store the latest_charge object

          if (sessions.data.length > 0) {
            const sessionId = sessions.data[0].id;

            // Retrieve the session with necessary expansions
            session = await stripe.checkout.sessions.retrieve(sessionId, {
              expand: [
                'line_items.data.price.product',
                'shipping_rate',
                'discounts.discount.coupon',
                'discounts.discount.promotion_code',
                'custom_fields',
              ],
            });

            // Extract line items, shipping rate, discounts, and custom fields
            lineItems = session.line_items.data;
            shippingRate = session.shipping_rate;
            discounts = session.discounts || [];
            customFields = session.custom_fields || [];
          }

          // Extract customer email and phone
          const customer = paymentIntent.customer;
          const customerEmail = customer?.email || session?.customer_details?.email || 'N/A';
          const customerPhone = customer?.phone || session?.customer_details?.phone || 'N/A';

          // Initialize fee and netAmount
          let fee = 0;
          let netAmount = 0;

          // Get the latest_charge id from paymentIntent
          const latestChargeId = paymentIntent.latest_charge;

          if (latestChargeId) {
            try {
              // Retrieve the charge object with balance_transaction expanded
              const charge = await stripe.charges.retrieve(latestChargeId, {
                expand: ['balance_transaction'],
              });

              // Store the entire charge object
              latestCharge = charge;

              // Extract fee and net amount from the balance transaction
              const balanceTransaction = charge.balance_transaction;
              fee = balanceTransaction?.fee || 0;
              netAmount = balanceTransaction?.net || 0;
            } catch (chargeError) {
              console.error(`Error retrieving charge ${latestChargeId}:`, chargeError);
            }
          }

          return {
            ...paymentIntent,
            lineItems,
            customerEmail,
            customerPhone,
            subtotal: session?.amount_subtotal || paymentIntent.amount,
            total: session?.amount_total || paymentIntent.amount,
            totalDiscounts: session?.total_details?.amount_discount || 0,
            totalShipping: session?.total_details?.amount_shipping || 0,
            currency: session?.currency || paymentIntent.currency,
            shippingRate,
            discounts,
            customFields,
            fee,
            netAmount,
            latestCharge, // Include the latest_charge data
            payment_method: paymentIntent.payment_method, // Include payment_method
            client_secret: paymentIntent.client_secret, // Include client_secret
          };
        })
      );

      res.status(200).json({ data: paymentsWithDetails });
    } catch (error) {
      console.error('Error fetching payments:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
