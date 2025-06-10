// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOZTvPDt6lfwkzaR9pZbXGB1fUc3nJSww",
  authDomain: "pigeon-6a4e9.firebaseapp.com",
  projectId: "pigeon-6a4e9",
  storageBucket: "pigeon-6a4e9.firebasestorage.app",
  messagingSenderId: "228917550170",
  appId: "1:228917550170:web:20b9a1597342e44a4e8c63",
  measurementId: "G-RFGXPYPVE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };