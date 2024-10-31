import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ResetPassword = () => {
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const auth = getAuth();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setMessage('Password reset link sent! Check your email and your spam folder.');
    } catch (error) {
      setError('Failed to send password reset link');
      console.error('Password reset error:', error.message);
    } finally{
        setSubmitting(false);

    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
      <div style={{ width: '100%', maxWidth: '600px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
 
      <form onSubmit={handlePasswordReset} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ color: "var(--secondarycolor)"  }}>
          <label htmlFor="resetEmail">Enter your email to reset password:</label>
          <input
            type="email"
            id="resetEmail"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
          />
        </div>
        {message && <p style={{ color: 'green' }}><b>{message}</b></p>}
        {error && <p style={{ color: 'red' }}><b>{error}</b></p>}
        <button type="submit" disabled={submitting} style={{ width: '100%',  padding: '0.75rem', fontSize: '1rem', backgroundColor: 'var(--secondarycolor)', color: 'white', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background-color 0.3s', border: "1px solid var(--primarycolor)" }}>
          {submitting ? 'Submitting...' : 'Reset Password'}

        </button>
      </form>
      </div>
    </div>
  );
};

export default ResetPassword;