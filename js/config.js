import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB18-M_gADKwQT0M03yZYX6xHwz3Ji81NA",
  authDomain: "weatherapi-505a0.firebaseapp.com",
  projectId: "weatherapi-505a0",
  storageBucket: "weatherapi-505a0.appspot.com",
  messagingSenderId: "1011805365522",
  appId: "1:1011805365522:web:ac3ff3e6dfac487ddf7fcb",
  measurementId: "G-R0V2KQ0MRJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
export { app, auth };