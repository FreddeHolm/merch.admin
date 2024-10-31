
//TODO
// AUTHENTICATION --admin + sidoägare
//Graphs---Statistik
//STYLES
//ny databasstruktur för ny hemsida
//Koppla upp till ny hemsida
            //spåra vilken url köpen kommer från
            //funktioner funkar
            //Förrenkla alla mapstrukturer

// pages/dashboard.js

import { useEffect, useState } from 'react';
import PaymentDetails from '../components/Dashboard/DashPaymentDetails'; // Adjust the path
import styles from '../styles/dash.module.css';
import { formatTimestamp } from '../components/Dashboard/formatDate'; // Import the helper function

const Dashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/apidashboard/paymentsfromstripe');
      const data = await response.json();
      console.log('Data received from API:', data);
      if (Array.isArray(data.data)) {
        setPayments(data.data);
      } else {
        console.error('Expected data.data to be an array:', data.data);
        setPayments([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading payments...</p>;

  return (
    <div className={styles.container}>
      <h1>Payments Dashboard</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Status</th>
            <th>Customer Email</th>
            <th>Date</th> {/* New Column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <PaymentRow key={payment.id} payment={payment} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PaymentRow = ({ payment }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  // Format the created timestamp
  const formattedDate = formatTimestamp(payment.created);

  return (
    <>
      <tr>
        <td>{payment.id}</td>
        <td>{(payment.amount / 100).toFixed(2)}</td>
        <td>{payment.currency.toUpperCase()}</td>
        <td>{payment.status}</td>
        <td>{payment.receipt_email || 'N/A'}</td>
        <td>{formattedDate}</td> {/* Display Formatted Date */}
        <td>
          <button onClick={toggleDetails}>
            {showDetails ? 'Hide Details' : 'Show More'}
          </button>
        </td>
      </tr>
      {showDetails && (
        <tr>
          <td colSpan="7"> {/* Adjust colspan to include the new Date column */}
            <PaymentDetails payment={payment} />
          </td>
        </tr>
      )}
    </>
  );
};

export default Dashboard;
