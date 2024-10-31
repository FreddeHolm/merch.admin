// components/AddPaymentComment.js

import React, { useState } from 'react';

const AddPaymentComment = ({ paymentIntentId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  // Replace this with actual user information from your authentication system
  const currentUser = 'admin'; // Example static user; replace as needed

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment) {
      alert('Please enter a comment.');
      return;
    }

    try {
      setStatus('Adding comment...');
      const response = await fetch('/api/apidashboard/APIaddPaymentComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentIntentId, comment, addedBy: currentUser }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Comment added successfully!');
        setComment('');
        if (onCommentAdded) onCommentAdded(data.data);
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <label>
        Add Comment:
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter comment"
          style={{ marginLeft: '0.5rem', padding: '0.5rem', width: '60%' }}
        />
      </label>
      <button type="submit" style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}>
        Add Comment
      </button>
      <p>{status}</p>
    </form>
  );
};

export default AddPaymentComment;
