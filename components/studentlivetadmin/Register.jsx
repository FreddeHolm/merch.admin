import React, { useState, useEffect, useRef } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { studentlivetclient } from '../../lib/studentlivetclient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './AuthContext';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import StudentlivetNavigation from '../studentlivet/SLNavigation';

const Register = ({ slcity, sluniversities, registerView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState('');

  const [activePopup, setActivePopup] = useState({ visible: false, header: "", content: '', position: { top: 0, left: 0 } });
  const [allowedEmails, setAllowedEmails] = useState([]);
  const [emailEntries, setEmailEntries] = useState([]); // to store fetched email entries
  const timeoutRef = useRef(null);



  const auth = getAuth();
  const { currentUser } = useAuth();






  const commonPublicDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'aol.com',
    'icloud.com', 'mail.com', 'zoho.com', 'gmx.com', 'yandex.com', 'protonmail.com',
    'me.com', 'inbox.com', 'fastmail.com', 'hushmail.com', 'bigpond.com', 'qq.com',
    'naver.com', 'rocketmail.com', 'msn.com', '163.com', 'rediffmail.com', 'mail.ru',
    'uol.com.br', 'bol.com.br', 'terra.com.br', 'libero.it', 'web.de', 'cox.net',
    'btinternet.com', 'sbcglobal.net', 'verizon.net', 'shaw.ca', 'rogers.com',
    'bellsouth.net', 'att.net', 'charter.net', 'comcast.net', 'earthlink.net',
    'sky.com', 'bt.com', 'talktalk.net', 'virginmedia.com', 'blueyonder.co.uk',
    'ntlworld.com', 'tiscali.co.uk', 'onet.pl', 'seznam.cz', 'wp.pl', 'abv.bg'
  ];

  useEffect(() => {
    const fetchEmails = async () => {
      const queries = [
        '*[_type == "slforening" && show == true]{_id, contentmanager, contactinfo}',
        '*[_type == "sluniversities" && show == true]{_id, contentmanager, contactinfo}',
        '*[_type == "slkarhus" && show == true]{_id, contentmanager, contactinfo}',
      ];

      const results = await Promise.all(queries.map(query => studentlivetclient.fetch(query)));

      const emails = results.flat().reduce((acc, item) => {
        const contentManagerEmails = item.contentmanager || [];
        const contactInfoEmails = item.contactinfo
          ? item.contactinfo
              .filter(info => info.service === 'Mail')
              .map(info => info.link)
          : [];
        return [...acc, ...contentManagerEmails, ...contactInfoEmails];
      }, []);

      const uniqueEmails = [...new Set(emails)];
      uniqueEmails.sort((a, b) => a.localeCompare(b)); // Sort emails alphabetically
      setAllowedEmails(uniqueEmails);
      setEmailEntries(results.flat());
    };

    fetchEmails();
  }, []);

  const checkUserExists = async (email) => {
    try {
      const response = await fetch(`/api/checkUserExists?email=${email}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
  };

const getEmailDomain = (email) => {
    return email.substring(email.lastIndexOf("@") + 1).toLowerCase();
  };




  const passwordMeetsLengthRequirement = password.length >= 6;
  const passwordMeetsNumberRequirement = /\d/.test(password);
  const passwordsMatch = password === confirmPassword;




  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior.
    clearTimeout(timeoutRef.current); // Clears any existing timeout.
    setError(''); // Resets the error state.
    setMessage(''); // Resets the message state.
    setSubmitting(true); // Sets the submitting state to true, indicating the form is being submitted.
  
    // Check if the password meets the length and number requirements.
    if (!passwordMeetsLengthRequirement || !passwordMeetsNumberRequirement) {
      setError('Password does not meet the requirements');
      setSubmitting(false); // Stops the submitting state.
      return; // Exits the function early if the password is invalid.
    }
  
    // Check if the passwords match.
    if (!passwordsMatch) {
      setError('Passwords do not match');
      setSubmitting(false); // Stops the submitting state.
      return; // Exits the function early if the passwords do not match.
    }
  


    // Check if the email is already registered.
    const userExists = await checkUserExists(email);
    if (userExists) {
      setError('Email already registered. Please login or use a different email.');
      setSubmitting(false); // Stops the submitting state.
      return; // Exits the function early if the email is already registered.
    }
  
    // Get the domain of the email.
    const emailDomain = getEmailDomain(email);
  
    // Check if the email domain is a common public domain and not allowed.
    if (!allowedEmails.includes(email) && commonPublicDomains.includes(emailDomain)) {
      setError('Registration using public email domains is not allowed unless the exact email is approved. Please use your institutional email.');
      setSubmitting(false); // Stops the submitting state.
      return; // Exits the function early if the email domain is not allowed.
    }
  
    // Filter allowed emails by the same domain.
    const emailsInDomain = allowedEmails.filter(allowedEmail => getEmailDomain(allowedEmail) === emailDomain);
  
    // Check if the domain is allowed.
    const isDomainAllowed = emailsInDomain.length > 0 && emailsInDomain.every(allowedEmail => getEmailDomain(allowedEmail) === emailDomain);
  
    // Check for domain conflicts.
    if (emailsInDomain.length > 1 ) { //todo, kanske lägg till email allowed check && !allowedEmails.includes(email)
      const uniqueEntries = new Set(emailsInDomain.map(email => getEmailDomain(email)));
      if (uniqueEntries.size !== 1) {
        setError('Email domain conflict: Multiple entries found for the same domain. Only exact email matches are allowed.');
        setSubmitting(false); // Stops the submitting state.
        return; // Exits the function early if there are domain conflicts.
      }
    }
  
    // Check if the email is allowed.
    if (!isDomainAllowed && !allowedEmails.includes(email)) {
      setError('Email doesn\'t exist in the database, please contact info@studentshoppen.com:////');
      setSubmitting(false); // Stops the submitting state.
      return; // Exits the function early if the email is not allowed.
    }


// todo: kanske ta bort denna, den som gör check om email konflikt, egentligen ganska onödig 

  // Additional check to prevent registration if domain emails are spread across multiple entries
if (!allowedEmails.includes(email) ) {
  const domainEmailEntries = emailEntries.filter(entry => {
    const contentManagerEmails = entry.contentmanager || [];
    const contactInfoEmails = entry.contactinfo
      ? entry.contactinfo.filter(info => info.service === 'Mail').map(info => info.link)
      : [];

    const allEmails = [...contentManagerEmails, ...contactInfoEmails];
    return allEmails.some(email => getEmailDomain(email) === emailDomain);
  });

  const commonEmails = domainEmailEntries.reduce((common, entry) => {
    const contentManagerEmails = entry.contentmanager || [];
    const contactInfoEmails = entry.contactinfo
      ? entry.contactinfo.filter(info => info.service === 'Mail').map(info => info.link)
      : [];

    const allEmails = [...contentManagerEmails, ...contactInfoEmails];
    const domainSpecificEmails = allEmails.filter(email => getEmailDomain(email) === emailDomain);

    return common.length === 0
      ? domainSpecificEmails
      : common.filter(email => domainSpecificEmails.includes(email)); // Find common emails across all entries.
  }, []);

  if (domainEmailEntries.length > 1 && commonEmails.length === 0) {
    setError('Email doesn\'t exist in the database, please contact info@studentshoppen.com');
    setSubmitting(false); // Stops the submitting state.
    return; // Exits the function early if there are domain conflicts across multiple entries.
  }
}










  

  
    try {
      //console.log('Attempting to register...');
      // Create a new user with the provided email and password.
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Send a verification email.
      await sendEmailVerification(user);
      //console.log('Verification email sent!');
      setMessage('Registration successful! A verification email has been sent to your email. Please verify your email before logging in.');
  
      // Add the email to Sanity.
      await addEmailToSanity(email, emailsInDomain);
  
      // Sign out the user since they need to verify their email before logging in.
      auth.signOut();
      
      setPassword(""); // Resets the password state.
      setConfirmPassword(""); // Resets the confirm password state.
  
    } catch (error) {
      // Handle any errors that occur during registration.
      setError('Failed to create an account' + error.message);
      console.error('Registration error:', error.message);
    } finally {
      // Finally, stop the submitting state.
      setSubmitting(false);
    }
  };




  
  // Updated addEmailToSanity function
  const addEmailToSanity = async (newEmail, domainEmails) => {
    const emailDomain = getEmailDomain(newEmail); // Get the domain of the new email.
    const domainEmailEntries = emailEntries.filter(entry => {
      const contentManagerEmails = entry.contentmanager || [];
      const contactInfoEmails = entry.contactinfo
        ? entry.contactinfo.filter(info => info.service === 'Mail').map(info => info.link)
        : [];
  
      const allEmails = [...contentManagerEmails, ...contactInfoEmails];
      return allEmails.some(email => getEmailDomain(email) === emailDomain); // Check if the entry has any email from the same domain.
    });
  
    // Check if there's a common email across all domain email entries.
    const commonEmails = domainEmailEntries.reduce((common, entry) => {
      const contentManagerEmails = entry.contentmanager || [];
      const contactInfoEmails = entry.contactinfo
        ? entry.contactinfo.filter(info => info.service === 'Mail').map(info => info.link)
        : [];
  
      const allEmails = [...contentManagerEmails, ...contactInfoEmails];
      const domainSpecificEmails = allEmails.filter(email => getEmailDomain(email) === emailDomain);
  
      return common.length === 0
        ? domainSpecificEmails
        : common.filter(email => domainSpecificEmails.includes(email)); // Find common emails across all entries.
    }, []);
  
    // If no common email is found, return early without updating any entries
    if (commonEmails.length === 0) {
      return;
    }
  
    // Filter entries to update.
    const entriesToUpdate = domainEmailEntries.filter(entry => {
      const contentManagerEmails = entry.contentmanager || [];
      const contactInfoEmails = entry.contactinfo
        ? entry.contactinfo.filter(info => info.service === 'Mail').map(info => info.link)
        : [];
  
      const allEmails = [...contentManagerEmails, ...contactInfoEmails];
  
      // Update entries where the exact email is already a content manager or in contact info.
      if (allEmails.includes(newEmail)) {
        return true;
      }
  
      // Update entries if there is a common email across all entries.
      if (commonEmails.length > 0) {
        return true;
      }
  
      return false;
    });
  
    // Update entries in Sanity only if the new email is not already in allowedEmails.
    if (!allowedEmails.includes(newEmail)) {
      const updates = entriesToUpdate.map(entry => {
        if (!entry.contentmanager.includes(newEmail)) {
          return studentlivetclient.patch(entry._id)
            .setIfMissing({ contentmanager: [] })
            .insert('after', 'contentmanager[-1]', [newEmail])
            .commit(); // Commit the patch to add the new email as a content manager.
        }
        return null;
      });
  
      await Promise.all(updates.filter(update => update !== null)); // Execute all the updates.
    }
  };


  const handleEmailClick = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setMessage('');
      setError('');
    }, 5000);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current); // Cleanup timeout on unmount
  }, []);



  const toggleInfoPopup = (e, header, content) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    let top = rect.top ;
    let left = rect.left;
  
    const popupWidth = 300; // Approximate width of the popup
    if (left + popupWidth > window.innerWidth) {
      left = window.innerWidth - popupWidth - 10; // Adjust 10px from the right edge
    }
  
    const popupHeight = 200; // Approximate height of the popup
    if (top + popupHeight > window.innerHeight) {
      top = rect.top - popupHeight - 10; // Adjust 10px above the button
    }
  
    //console.log(`Top: ${top}, Left: ${left}`); // Debugging log
  
    setActivePopup({
      visible: !activePopup.visible,
      header: activePopup.visible ? '' : header,
      content: activePopup.visible ? '' : content,
      position: { top, left }
    });
  };

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActivePopup({ ...activePopup, visible: false });
      }
    };

    if (activePopup.visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activePopup]);




  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
      <div style={{ width: '100%', maxWidth: '600px', margin: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ color: registerView !=="Login" ? "var(--primarycolor)" : "Black" }}>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} />
            </div>
            <div style={{ color: registerView !=="Login" ? "var(--primarycolor)" : "Black" }}>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} />
            </div>
            <div style={{ color: registerView !=="Login" ? "var(--primarycolor)" : "Black" }}>
              <label>Confirm Password:</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} />
            </div>
            <div>
                  <label style={{color: "var(--primarycolor)"}}>Password must:</label>
                  <p style={{ color: passwordMeetsLengthRequirement ? 'green' : 'red' }}>Have at least 6 characters</p>
                  <p style={{ color: passwordMeetsNumberRequirement ? 'green' : 'red' }}>Contains a number</p>
                  <p style={{ color: passwordsMatch ? 'green' : 'red' }}>Passwords match</p>
                </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <button type="submit" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: ' var(--primarycolor)', color: 'white', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background-color 0.3s', border: "1px solid var(--primarycolor)" }}>
              
              {submitting ? 'Signing in...' : 'Register'}
            </button>

            <button 
            onClick={(e) => toggleInfoPopup(e, "Register Account Info" ,'Register an account here. Once registration is complete, you will get a verification email to complete your registration, NOTE: YOU CANT LOGIN IF YOU HAVE NOT VERIFIED YOUR ACCOUNT. OBS: Currently only the email adresses shown on each page and domain specific emails are approved for automatic registration. IF you wish to register an account using a email not on the automatic list or if you have any questions please contact info@studentshoppen.com')} 
            style={{ width: "30px", backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: "30px", color: 'var(--primarycolor)' }} />
            </button>
          
          </form>

{/*
          {allowedEmails.map((email, index) => (
          <p key={index} style={{ color: "white" }}>{email}</p>
        ))}
        */}

{activePopup.visible && (
          <div ref={popupRef} style={{
            position: 'absolute',
            top: `${activePopup.position.top}px`,
            left: `${activePopup.position.left}px`,
            backgroundColor: 'white',
            padding: '1rem',
            border: '3px solid var(--primarycolor)',
            borderRadius: '0.375rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            maxWidth: '300px',
            width: 'auto',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <div style={{
                content: '',
                position: 'absolute',
                bottom: '-10px',
                left: 'calc(50% - 10px)',
                borderWidth: '10px',
                borderStyle: 'solid',
                borderColor: 'white transparent transparent transparent',
              }}></div>
            </div>
            <h3 style={{ margin: '0 0 1rem 0' }}>{activePopup.header}</h3>
            <p>{activePopup.content}</p>
            <button onClick={() => setActivePopup({ ...activePopup, visible: false })} style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              backgroundColor: 'var(--secondarycolor)',
              color: 'white',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              marginTop: '15px',
              transition: 'background-color 0.3s',
              border: '1px solid var(--secondarycolor)'
            }}>
              Close
            </button>
          </div>
        )}


        </div>
      </div>
    </div>
  );
};

export default Register;