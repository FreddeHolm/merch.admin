// components/DashPaymentDetails.js

import React, { useEffect, useState } from 'react';
import styles from '../../styles/dash.module.css';
import { formatTimestamp } from './formatDate';
import AddPaymentComment from './AddPaymentComment';

const PaymentDetails = ({ payment }) => {
  const {
    customer,
    shipping,
    lineItems,
    customerEmail,
    receipt_email,
    customerPhone,
    subtotal,
    total,
    totalDiscounts,
    totalShipping,
    currency,
    shippingRate,
    discounts,
    payment_method_types,
    customFields,
    created,
    fee,
    netAmount,
    latestCharge,
    payment_method,
    client_secret,
  } = payment;

  const formattedDate = formatTimestamp(created);
  const paymentMethod = payment_method_types ? payment_method_types[0] : 'N/A';
  const shippingMethodName = shippingRate?.display_name || 'Shipping';
  const [showBilling, setShowBilling] = useState(false);

  useEffect(() => {
    console.log('--- Payment Details Start ---');
    console.log('Payment Intent ID:', payment.id);
    console.log('Client Secret:', client_secret);
    console.log('Customer Email:', customerEmail);
    console.log('Customer Phone:', customerPhone);
    console.log('Amount:', (payment.amount / 100).toFixed(2), payment.currency.toUpperCase());
    console.log('Status:', payment.status);
    console.log('Created At:', formattedDate);
    console.log('Payment Method:', payment_method);
    console.log('Latest Charge:', latestCharge);
    console.log('--- Payment Details End ---');
  }, [payment, client_secret, payment_method, latestCharge, customerEmail, customerPhone, formattedDate]);

  const billingDetails = latestCharge?.billing_details || {};
  const sekrEquivalent =
    currency.toLowerCase() !== 'sek' && latestCharge?.balance_transaction?.amount
      ? (latestCharge.balance_transaction.amount / 100).toFixed(2)
      : null;
  const exchangeRate =
    sekrEquivalent && (total / latestCharge.balance_transaction.amount).toFixed(4);

  // Function to handle comment addition
  const handleCommentAdded = (updatedPayment) => {
    console.log('Comment added:', updatedPayment.metadata.comments);
    // Optionally, refresh the payment details or update state
  };

  // Function to parse and render all metadata entries
  const renderMetadata = () => {
    const metadataEntries = payment.metadata || {};

    return Object.entries(metadataEntries).map(([key, value], index) => {
      // Attempt to parse the value as JSON
      let parsedValue;
      let isArray = false;

      try {
        parsedValue = JSON.parse(value);
        if (Array.isArray(parsedValue)) {
          isArray = true;
        }
      } catch (error) {
        // If parsing fails, treat it as a simple string
        parsedValue = value;
      }

      // If the value is an array, assume it's a list of comments
      if (isArray) {
        return (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
            {parsedValue.map((c, idx) => (
              <p
                key={idx}
                style={{
                  borderTop: '1px solid #ccc',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                }}
              >
                <strong>
                  {new Date(c.added_at).toLocaleString()} by {c.added_by}:
                </strong>{' '}
                {c.comment}
              </p>
            ))}
          </div>
        );
      } else {
        // For simple string entries, display as 'key --- value'
        return (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
            <p>
              <strong>{key} --- </strong>
              {value}
            </p>
          </div>
        );
      }
    });
  };

  return (
    <div className={styles.details}>
      {/* Payment Information */}
      <h3>Payment Information</h3>
      <p>
        <strong>Created At:</strong> {formattedDate}
      </p>

      {/* Customer Information */}
      <h3>Customer Information</h3>
      <p>
        <strong>Email:</strong> {customerEmail ? customerEmail : receipt_email}
      </p>
      <p>
        <strong>Phone:</strong> {customerPhone}
      </p>

      {/* Toggle Switch for Delivery/Billing Info */}
      <div className={styles.toggleContainer}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={showBilling}
            onChange={() => setShowBilling(!showBilling)}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
        <span className={styles.toggleLabel}>
          {showBilling ? 'Show Delivery Information' : 'Show Billing Information'}
        </span>
      </div>

      {/* Conditional Rendering of Delivery or Billing Address */}
      <h3>{showBilling ? 'Billing Address' : 'Delivery Address'}</h3>
      {showBilling ? (
        billingDetails.address ? (
          <address>
            {billingDetails.name}
            <br />
            {billingDetails.address.line1}
            <br />
            {billingDetails.address.postal_code} {billingDetails.address.city},{' '}
            {billingDetails.address.country}
          </address>
        ) : (
          <p>No billing address available.</p>
        )
      ) : shipping ? (
        <address>
          {shipping.name}
          <br />
          {shipping.address.line1}
          <br />
          {shipping.address.postal_code} {shipping.address.city}, {shipping.address.country}
        </address>
      ) : (
        <p>No delivery address available.</p>
      )}

      {/* Ordered Items */}
      <h3>Ordered Items</h3>
      {lineItems && lineItems.length > 0 ? (
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Article</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item) => {
              const product = item.price.product;
              const imageUrl =
                product.images && product.images.length > 0 ? product.images[0] : null;

              return (
                <tr key={item.id}>
                  <td>
                    {imageUrl ? (
                      <img src={imageUrl} alt={product.name} className={styles.productImage} />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {(item.price.unit_amount / 100).toFixed(2)} {item.currency.toUpperCase()}
                  </td>
                  <td>
                    {((item.quantity * item.price.unit_amount) / 100).toFixed(2)}{' '}
                    {item.currency.toUpperCase()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No items found.</p>
      )}

      {/* Payment Summary */}
      <h3>Payment Summary</h3>
      <table className={styles.summaryTable}>
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>
              {(subtotal / 100).toFixed(2)} {currency.toUpperCase()}
            </td>
          </tr>
          <tr>
            <td>{shippingMethodName}</td>
            <td>
              {(totalShipping / 100).toFixed(2)} {currency.toUpperCase()}
            </td>
          </tr>
          <tr>
            <td>Discounts</td>
            <td>
              -{(totalDiscounts / 100).toFixed(2)} {currency.toUpperCase()}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td>
              <strong>
                {(total / 100).toFixed(2)} {currency.toUpperCase()}
                {sekrEquivalent && ` = ${sekrEquivalent} SEK`}
              </strong>
            </td>
          </tr>
          {sekrEquivalent && exchangeRate && (
            <tr>
              <td>Exchange Rate</td>
              <td>
                1 {currency.toUpperCase()} = {exchangeRate} SEK
              </td>
            </tr>
          )}
          <tr>
            <td>Stripe Fee</td>
            <td>
              -{(fee / 100).toFixed(2)} SEK
            </td>
          </tr>
          <tr>
            <td>
              <strong>Net Amount</strong>
            </td>
            <td>
              <strong>
                {(netAmount / 100).toFixed(2)} SEK
              </strong>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Payment Method */}
      <h3>Payment Method</h3>
      <p>
        <strong>Type:</strong> {paymentMethod}
      </p>
      <p>
        <strong>Payment Method ID:</strong> {payment_method?.id || 'N/A'}
      </p>
      {/* Conditionally render Client Secret only in development */}
      {process.env.NODE_ENV === 'development' && (
        <p>
          <strong>Client Secret:</strong> {client_secret || 'N/A'}
        </p>
      )}

      {/* Message Field */}
      <h3>Message</h3>
      {customFields && customFields.length > 0 ? (
        customFields.map((field) => (
          <p key={field.key}>
            <strong>{field.label?.custom || field.key}:</strong> {field.text?.value || 'N/A'}
          </p>
        ))
      ) : (
        <p>No message provided.</p>
      )}

      {/* Add Comment Section */}
      <h3>Add Comment</h3>
      <AddPaymentComment paymentIntentId={payment.id} onCommentAdded={handleCommentAdded} />

      {/* Display All Metadata Entries */}
      <h3>Metadata Entries</h3>
      {payment.metadata && Object.keys(payment.metadata).length > 0 ? (
        renderMetadata()
      ) : (
        <p>No metadata entries available.</p>
      )}

      {/* Optional: Display Entire Payment Object for Debugging 
      {process.env.NODE_ENV === 'development' && (
        <>
          <h3>Debugging Information</h3>
          <pre>{JSON.stringify(payment, null, 2)}</pre>
        </>
      )}
      */}
    </div>
  );
};

export default PaymentDetails;
