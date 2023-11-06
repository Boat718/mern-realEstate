// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b910d.firebaseapp.com",
  projectId: "mern-estate-b910d",
  storageBucket: "mern-estate-b910d.appspot.com",
  messagingSenderId: "612821980511",
  appId: "1:612821980511:web:44546eaeffe1d23e7452ea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);