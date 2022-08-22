// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1eliYVfjpaPM0bDVuSNjSEvsqavS2SOA",
  authDomain: "memont-51c30.firebaseapp.com",
  projectId: "memont-51c30",
  storageBucket: "memont-51c30.appspot.com",
  messagingSenderId: "936975326331",
  appId: "1:936975326331:web:b1ce9f40286e20a7ded6de",
  measurementId: "G-QZ31X847KM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const fireStoreDB = getFirestore(app);
export const firebaseAuth = getAuth(app);
