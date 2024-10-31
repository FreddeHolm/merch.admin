import React, { useState, useEffect, useRef } from 'react';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, updatePassword, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import StudentlivetNavigation from '../studentlivet/SLNavigation';
import { app, auth } from './firebase';
import Link from 'next/link';


const CompleteRegistration = ({ slcity, sluniversities }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [linkExpired, setLinkExpired] = useState(false);
  const router = useRouter();
  const isRedirecting = useRef(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMessage('');
    setError('');


    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      setEmail(email);
    }
  }, []);

  const passwordMeetsLengthRequirement = password.length >= 6;
  const passwordMeetsNumberRequirement = /\d/.test(password);
  const passwordsMatch = password === confirmPassword;

  const handleCompleteRegistration = async (e) => {
    setMessage('');
    setError('');

    e.preventDefault();
    setSubmitting(true);

    if (!passwordMeetsLengthRequirement || !passwordMeetsNumberRequirement) {
      setError('Password does not meet the requirements');
      setSubmitting(false);
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      setSubmitting(false);
      return;
    }

    try {
      await signInWithEmailLink(auth, email, window.location.href);
      const user = auth.currentUser;
      await updatePassword(user, password);

      setMessage('Registration complete! Redirecting to login page...');
      isRedirecting.current = true;
      setTimeout(() => {
        router.push('/studentlivet/admin');
      }, 1000);
    } catch (error) {
      if (error.code === 'auth/invalid-action-code') {
        setLinkExpired(true);
        setError('This link has expired. Please try to log in, reset your password or request a new registration link.');
      } else {
        setError('Failed to set password: ' + error.message);
      }
      setSubmitting(false);
      console.error('Set password error: ' + error.message);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
      <div style={{ width: '100%', maxWidth: '600px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h2 style={{ marginTop: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
            Complete Registration
          </h2>
        </div>
        {linkExpired ? (
          <p>This link has expired. Please try to <a style={{color: "var(--primarycolor)"}} ><Link href="/studentlivet/admin">log in</Link></a>, <a style={{color: "var(--primarycolor)"}} ><Link href="/studentlivet/admin">reset your password</Link></a>, or <a style={{color: "var(--primarycolor)"}} ><Link href="/studentlivet/admin">request a new registration link</Link></a>.</p>

        ) : (
          <>
            {email && <p>You are setting the password for: <b>{email}</b></p>}
            <div>
              <form onSubmit={handleCompleteRegistration} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <div>
                  <label>Password:</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} />
                </div>
                <div>
                  <label>Confirm Password:</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} />
                </div>
                <div>
                  <b>Password must:</b>
                  <p style={{ color: passwordMeetsLengthRequirement ? 'green' : 'red' }}>Have at least 6 characters</p>
                  <p style={{ color: passwordMeetsNumberRequirement ? 'green' : 'red' }}>Contains a number</p>
                  <p style={{ color: passwordsMatch ? 'green' : 'red' }}>Passwords match</p>
                </div>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: ' var(--primarycolor)', color: 'white', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background-color 0.3s', border: "1px solid var(--primarycolor)" }}>
                  {submitting ? "Submitting..." : "Complete Registration"}
                </button>
              </form>
            </div>
          </>
        )}
        <StudentlivetNavigation slcity={slcity} sluniversities={sluniversities} />
      </div>
    </div>
  );
};

export default CompleteRegistration;


/* (old change password, imidietly when entering the page)

if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then(result => {
          setEmail(email);
          setUserSignedIn(true);
          window.localStorage.removeItem('emailForSignIn');
        })
        .catch(error => {
          setError('Failed to complete registration');
          console.error('Registration completion error:', error.message);
        });
    }
        
    */