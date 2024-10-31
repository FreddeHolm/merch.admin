import admin from 'firebase-admin';

const serviceAccount = require('../../lib/serviceAccountKeyFirebase.json'); //for check of existing accounts

/* get the code: 
Go to the Firebase Console.
Select your project.
Click on the gear icon next to "Project Overview" and select "Project settings".
Go to the "Service accounts" tab.
Click on "Generate new private key".
This will download a JSON file containing your service account credentials.
*/

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      const user = await admin.auth().getUserByEmail(email);
      return res.status(200).json({ exists: true });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return res.status(200).json({ exists: false });
      }
      return res.status(500).json({ error: 'Error checking user' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}