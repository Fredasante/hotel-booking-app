// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bookings-web-app.firebaseapp.com",
  projectId: "bookings-web-app",
  storageBucket: "bookings-web-app.appspot.com",
  messagingSenderId: "333402822307",
  appId: "1:333402822307:web:2308bbb38fea98aa5dd116",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
