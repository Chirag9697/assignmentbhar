import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCdNAxYBNIOVB54c3P7xWu0rePJ3CH0Lk",
  authDomain: "fir-project-74399.firebaseapp.com",
  projectId: "fir-project-74399",
  storageBucket: "fir-project-74399.appspot.com",
  messagingSenderId: "1056714818266",
  appId: "1:1056714818266:web:994626523122129a595be3",
  measurementId: "G-4NZTJ6E8GR"
};

// Initialize Firebase

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const database = getDatabase(app);