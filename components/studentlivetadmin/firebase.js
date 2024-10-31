import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//import { getFirestore } from 'firebase/firestore';
//import { getStorage } from 'firebase/storage';

const firebaseConfig  = {
	
	apiKey: process.env.NEXT_PUBLIC_API_KEY, //process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: "b6p59wq7",
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
	/* */

}; 



/*let app;
const apps = getApps();
if (!apps.length) {
	app = initializeApp(config);
} else {
	app = apps[0];
} */

	/*
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { firebaseConfig };
*/

let app;
const apps = getApps();
if (!apps.length) {
  app = initializeApp(firebaseConfig);
} else {
  app = apps[0];
}

const auth = getAuth(app);

export { app, auth };
export { firebaseConfig };


