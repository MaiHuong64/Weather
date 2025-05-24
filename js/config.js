// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB18-M_gADKwQT0M03yZYX6xHwz3Ji81NA",
  authDomain: "weatherapi-505a0.firebaseapp.com",
  projectId: "weatherapi-505a0",
  storageBucket: "weatherapi-505a0.firebasestorage.app",
  messagingSenderId: "1011805365522",
  appId: "1:1011805365522:web:ac3ff3e6dfac487ddf7fcb",
  measurementId: "G-R0V2KQ0MRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);