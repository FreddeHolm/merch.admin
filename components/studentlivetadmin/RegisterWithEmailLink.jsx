import React, { useState, useEffect, useRef } from 'react';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { studentlivetclient } from '../../lib/studentlivetclient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const RegisterWithEmailLink = ({ registerView }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [allowedEmails, setAllowedEmails] = useState([]);
  const [emailEntries, setEmailEntries] = useState([]); // to store fetched email entries
  const timeoutRef = useRef(null);

  const [activePopup, setActivePopup] = useState({ visible: false, header: "", content: '', position: { top: 0, left: 0 } });

  const auth = getAuth();

  const actionCodeSettings = {
    url: 'http://localhost:3000/studentlivet/admin/completeRegistration',
    handleCodeInApp: true,
  };

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

  const handleRegister = async (e) => {
    e.preventDefault();
    clearTimeout(timeoutRef.current);
    setMessage('');
    setError('');
    setSubmitting(true);

    const userExists = await checkUserExists(email);
    if (userExists) {
      setError('Email already registered. Please login or use a different email.');
      setSubmitting(false);
      return;
    }

    const emailDomain = getEmailDomain(email);

    if (!allowedEmails.includes(email) && commonPublicDomains.includes(emailDomain)) {
      setError('Registration using public email domains is not allowed unless the exact email is approved. Please use your institutional email.');
      setSubmitting(false);
      return;
    }

    const emailsInDomain = allowedEmails.filter(allowedEmail => getEmailDomain(allowedEmail) === emailDomain);
    const isDomainAllowed = emailsInDomain.length > 0 && emailsInDomain.every(allowedEmail => getEmailDomain(allowedEmail) === emailDomain);

    if (emailsInDomain.length > 1) {
      const uniqueEntries = new Set(emailsInDomain.map(email => getEmailDomain(email)));
      if (uniqueEntries.size !== 1) {
        setError('Email domain conflict: Multiple entries found for the same domain. Only exact email matches are allowed.');
        setSubmitting(false);
        return;
      }
    }

    if (!isDomainAllowed && !allowedEmails.includes(email)) {
      setError('Email doesn\'t exist in the database, please contact info@studentshoppen.com');
      setSubmitting(false);
      return;
    }

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage('Registration link sent! Check your email or spam folder to complete the registration.');

      // Add the newly registered email as contentmanager in Sanity
      await addEmailToSanity(email, emailsInDomain);

    } catch (error) {
      setError('Failed to send registration link. Error: ' + error.message);
      console.error('Registration error:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const addEmailToSanity = async (newEmail, domainEmails) => {
    const emailDomain = getEmailDomain(newEmail);
    const entriesToUpdate = emailEntries.filter(entry => {
      const contentManagerEmails = entry.contentmanager || [];
      const contactInfoEmails = entry.contactinfo
        ? entry.contactinfo.filter(info => info.service === 'Mail').map(info => info.link)
        : [];
      
      const allEmails = [...contentManagerEmails, ...contactInfoEmails];
  
      // Update entries where the exact email is already a content manager or in contact info
      if (allEmails.includes(newEmail)) {
        return true;
      }
  
      // Update entries where the domain email is a content manager or in contact info and no conflicts exist
      if (domainEmails.length === 1 && allEmails.some(email => getEmailDomain(email) === emailDomain)) {
        return true;
      }
  
      return false;
    });
  
    // Update entries in Sanity
    const updates = entriesToUpdate.map(entry => {
      if (!entry.contentmanager.includes(newEmail)) {
        return studentlivetclient.patch(entry._id)
          .setIfMissing({ contentmanager: [] })
          .insert('after', 'contentmanager[-1]', [newEmail])
          .commit();
      }
      return null;
    });
  
    await Promise.all(updates.filter(update => update !== null));
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
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ color: registerView !== "Login" ? "var(--primarycolor)" : "Black" }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={handleEmailClick}
              required
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
            />
          </div>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" disabled={submitting} style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: ' var(--primarycolor)', color: 'white', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background-color 0.3s', border: "1px solid var(--primarycolor)" }}>
            {submitting ? 'Submitting...' : 'Register'}
          </button>
          <button 
            onClick={(e) => toggleInfoPopup(e, "Register Account Info" ,'Enter the email to register an account with. Once registration is complete, you will get an email to finish your registration. OBS: Currently only the email adresses shown on each page and domain specific emails are approved for automatic registration. IF you wish to register an account using a email not on the automatic list or if you have any questions please contact info@studentshoppen.com')} 
            style={{ width: "30px", backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: "30px", color: 'var(--primarycolor)' }} />
          </button>
        </form>


        {allowedEmails.map((email, index) => (
          <p key={index} style={{ color: "white" }}>{email}</p>
        ))}
{/* todo: gör klart email funktionen*/}

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
  );
};

export default RegisterWithEmailLink;