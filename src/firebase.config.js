// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbMtJGiiT8UUpT8yU1oQZ41lSx4vfn9lo",
  authDomain: "house-marketplace-app-6169c.firebaseapp.com",
  projectId: "house-marketplace-app-6169c",
  storageBucket: "house-marketplace-app-6169c.appspot.com",
  messagingSenderId: "865338211925",
  appId: "1:865338211925:web:135b35b845014a869e5edc"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();