// /api/addPaymentComment.js

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { paymentIntentId, comment, addedBy } = req.body;

    if (!paymentIntentId || !comment || !addedBy) {
      res.status(400).json({ error: 'paymentIntentId, comment, and addedBy are required' });
      return;
    }

    try {
      // Retrieve the existing Payment Intent
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      // Retrieve existing comments from metadata.comments
      let existingComments = [];
      if (paymentIntent.metadata.comments) {
        try {
          existingComments = JSON.parse(paymentIntent.metadata.comments);
          if (!Array.isArray(existingComments)) {
            existingComments = [];
          }
        } catch (parseError) {
          console.warn('Failed to parse existing comments. Resetting to empty array.');
          existingComments = [];
        }
      }

      // Append the new comment
      existingComments.push({
        comment: comment,
        added_at: new Date().toISOString(),
        added_by: addedBy, // Dynamically determine the user if possible
      });

      // Update the metadata with the new comments array
      const updatedMetadata = {
        ...paymentIntent.metadata,
        comments: JSON.stringify(existingComments),
      };

      // Update the Payment Intent with new metadata
      const updatedPaymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
        metadata: updatedMetadata,
      });

      res.status(200).json({ data: updatedPaymentIntent });
    } catch (error) {
      console.error('Error adding comment to Payment Intent:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
