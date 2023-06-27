import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_KEY,
	authDomain: 'chatter-23337.firebaseapp.com',
	projectId: 'chatter-23337',
	storageBucket: 'chatter-23337.appspot.com',
	messagingSenderId: '808675597541',
	appId: '1:808675597541:web:f6c532d90fe9c48f38880c',
	measurementId: 'G-VWEHLKNQX3',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
