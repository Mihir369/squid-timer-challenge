
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh1-PRzCp5NWJTBYeRk0JKcSFP-QCvOnQ",
  authDomain: "squid-game-registration.firebaseapp.com",
  projectId: "squid-game-registration",
  storageBucket: "squid-game-registration.appspot.com",
  messagingSenderId: "427312234156", 
  appId: "1:427312234156:web:de9c13a7c9d9d58c5982f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
