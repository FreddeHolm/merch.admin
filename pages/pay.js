import React, { useState, useEffect } from 'react';
import { siteNameAlt2 } from '../components/config';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import getStripe from '../lib/getStripe';
import { client } from '../lib/client';


const Pay = ({ announcements, release }) => {
    const [customAmount, setCustomAmount] = useState('');
    const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
    useEffect(() => {
      document.title = `${siteNameAlt2 && siteNameAlt2} | Om Oss`;
    }, []);
  
    const handleCustomPay = async () => {
        
        if (password !== '1234' && password !== '...') {
            setErrorMessage(''); // Clear any previous error message
            setErrorMessage('Fel lösenord');
            return;
          }


      if (!customAmount || isNaN(customAmount)) {
        toast.error('Please enter a valid amount.');
        return;
      }

      setErrorMessage(''); // Clear any previous error message

      const sourceWebsite =  window.location.hostname;//window.location.hostname;

      console.log("sourceWebsite " + sourceWebsite);
  
      const response = await fetch('/api/stripe-direct-pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount: customAmount,
          source: sourceWebsite, 
         }),
      });
  
      if (response.status === 500) {
        toast.error('Error creating payment session.');
        return;
      }
  
      const data = await response.json();
  
      toast.loading('Redirecting...');
  
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId: data.id });
    };


        const numberInputOnWheelPreventChange = (e) => {
          // Prevent the input value change
          e.target.blur()
      
          // Prevent the page/container scrolling
          e.stopPropagation()
      
          // Refocus immediately, on the next tick (after the currentfunction is done)
            setTimeout(() => {
              e.target.focus()
          }, 0)
      }
  
    return (
      <div>
        <Navbar announcements={announcements} release={release} />
  
        <div className="privacy-policy-container">
            <div className="products-heading">
                <h2>Betala på plats</h2>
                <p>(Endast för försäljning på plats)</p>
            </div>
          
          
          <div className="btn-container" style={{width: "280px"}}>
            <p style={{marginBottom: "5px"}}>Att betala</p> 
            
            <div className="searchBox" style={{marginTop: "-20px"}}>
            <input
             className="searchInput"

              type="number"
              id="customAmount"
              placeholder='i kronor'
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value) &  setErrorMessage('')}
              onWheel={numberInputOnWheelPreventChange}
              style={{
                
                left: '10px', // Adjust the left position to control the icon's horizontal placement
               
            }}

            />
            <p  style={{
                    fontSize: '22px', // Adjust the size as needed
                    color: 'var(--primarycolor)', // Set the icon color
                    position: 'absolute', // Position the icon relative to the search box
                    right: '10px', // Adjust the left position to control the icon's horizontal placement
                    top: '47%', // Vertically center the icon
                    transform: 'translateY(-50%)', // Vertically center the icon
                }}>kr</p>
            </div>
          </div>




          <div className="btn-container" style={{ width: '280px', marginTop: '35px' }}>
          <p style={{ marginBottom: '5px' }}>Lösenord</p>
          <div className="searchBox" style={{ marginTop: '-20px' }}>
            <input
              className="searchInput"
              type="text"
              id="password"
              placeholder="Skriv in lösenord"
              autoComplete="off" // Use a non-standard value to prevent auto-filling
              value={password}
              onChange={(e) => setPassword(e.target.value) &  setErrorMessage('')}
              style={{
                left: '10px', // Adjust the left position to control the icon's horizontal placement
              }}
            />
          </div>
        </div>


          
          <div className="btn-container" style={{width: "280px", marginTop: "20px"}}>
          <p style={{ color: 'red', marginBottom: '5px' }}>{errorMessage}</p>

            <button type="button" className="btn" onClick={handleCustomPay}>
              Till betalning
            </button>
          </div>
          <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
         flexWrap: 'wrap',
         marginTop: "50px"
        }}
      >
        <a>
          <img style={{ height: '24px' }} src="/assets/paymentlogos/visa.png" alt="Visa Logo" />
        </a>
        <a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/mastercard.png" alt="Mastercard Logo" />
        </a>
        {/*<a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/swish.png" alt="Swish Logo" />
        </a>*/}
        <a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/klarna.png" alt="Klarna Logo" />
        </a>
        <a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/paypal.png" alt="Paypal Logo" />
        </a>
        <a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/applepay.png" alt="Apple pay Logo" />
        </a>
        <a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/googlepay.png" alt="Google pay Logo" />
        </a>
        <a>
          <img style={{ height: '24px' }}src="/assets/paymentlogos/stripe.png" alt="Stripe Logo" />
        </a>
      </div>
        </div>

      </div>
    );
  };

export const getServerSideProps = async () => { //also import import { client } from '../lib/client';

  const announcementsQuery = '*[_type == "announcements"]';
  const announcements = await client.fetch(announcementsQuery);

  const releaseQuery = '*[_type == "release"]';
  const release = await client.fetch(releaseQuery);

  
  return {
    props: { announcements, release },
  };
};


export default Pay;