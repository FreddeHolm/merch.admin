import React, { useState, useEffect } from 'react';
import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import StudentlivetNavigation from '../studentlivet/SLNavigation';
import { useRouter } from 'next/router';

const ReVerifyAccount = ({ slcity, sluniversities, registerView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const auth = getAuth();


  useEffect(() => {
    if (router.query.error) {
      setError(router.query.error);
      router.replace('/studentlivet/admin', undefined, { shallow: true });
    }
  }, [router.query.error]);

  const handleResendVerificationEmail = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // Sign in the user to get the user object
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        setMessage('Your email is already verified.');
      } else {
        // Send verification email
        await sendEmailVerification(user);
        setMessage('Verification email sent. Please check your inbox.');
       
        await auth.signOut(); // Sign out the user since their email is not verified
        router.push({
          pathname: '/studentlivet/admin',
          query: { error: 'Please verify your email before logging in.' }
        });

      }
    } catch (error) {
      setError('Error sending verification email: ' + error.message);
      console.error('Error sending verification email:', error.message);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
      <div style={{ width: '100%', maxWidth: '600px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <form onSubmit={handleResendVerificationEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ color: registerView !== "Login" ? "var(--primarycolor)" : "Black" }}>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} />
            </div>
            <div style={{ color: registerView !== "Login" ? "var(--primarycolor)" : "Black" }}>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <button type="submit" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: ' var(--primarycolor)', color: 'white', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background-color 0.3s', border: "1px solid var(--primarycolor)" }}>
              Resend Verification Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReVerifyAccount;