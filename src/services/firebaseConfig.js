// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn5K1WCyk7A3716GQ81ZM2h-COedMu2iA",
  authDomain: "g-o-a-t-7e34e.firebaseapp.com",
  databaseURL: "https://g-o-a-t-7e34e-default-rtdb.firebaseio.com",
  projectId: "g-o-a-t-7e34e",
  storageBucket: "g-o-a-t-7e34e.appspot.com",
  messagingSenderId: "104927386167",
  appId: "1:104927386167:web:93fd0c8007e271b3103db2",
  measurementId: "G-ENNGQ74R8X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
