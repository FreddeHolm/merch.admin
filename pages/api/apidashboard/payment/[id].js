import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(id, {
        expand: ['customer', 'charges'],
      });

      // Extract necessary details
      const customer = paymentIntent.customer;
      const shipping = paymentIntent.shipping;
      const charges = paymentIntent.charges.data;

      // Fetch the session associated with the payment intent
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      let session = null;
      let lineItems = [];
      let discounts = [];
      let shippingRate = null;
      let customFields = [];

      if (sessions.data.length > 0) {
        const sessionId = sessions.data[0].id;

        session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: [
            'line_items.data.price.product',
            'shipping_rate',
            'discounts.discount.coupon',
            'discounts.discount.promotion_code',
            'custom_fields',
          ],
        });

        lineItems = session.line_items.data;
        shippingRate = session.shipping_rate;
        discounts = session.discounts || [];
        customFields = session.custom_fields || [];
      }

      // Fetch events related to the payment intent
      const events = await stripe.events.list({
        limit: 100,
        created: {
          gte: paymentIntent.created - 86400, // 1 day before
          lte: paymentIntent.created + 86400, // 1 day after
        },
      });

      // Filter events to only include those related to this payment intent
      const relatedEvents = events.data.filter(
        (event) => event.data.object && event.data.object.id === paymentIntent.id
      );

      res.status(200).json({
        customer,
        shipping,
        lineItems,
        charges,
        events: relatedEvents,
        shippingRate,
        discounts,
        customFields,
        subtotal: session?.amount_subtotal || paymentIntent.amount,
        total: session?.amount_total || paymentIntent.amount,
        totalDiscounts: session?.total_details?.amount_discount || 0,
        totalShipping: session?.total_details?.amount_shipping || 0,
        currency: session?.currency || paymentIntent.currency,
      });
    } catch (error) {
      console.error('Error fetching payment details:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}