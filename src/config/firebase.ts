// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUtzoAOD4SN7_UT8QCqsIeuxJVaWoOY6Y",
  authDomain: "credit-40ee6.firebaseapp.com",
  projectId: "credit-40ee6",
  storageBucket: "credit-40ee6.firebasestorage.app",
  messagingSenderId: "771578738719",
  appId: "1:771578738719:web:442cd187c2a20cea287d2a",
  measurementId: "G-WJHJR10TGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);