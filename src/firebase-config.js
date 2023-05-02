// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBuJW4GHRd12K3R04cRL9LpIsoFpwiSGJw",
  authDomain: "pizza-stop-a6112.firebaseapp.com",
  projectId: "pizza-stop-a6112",
  storageBucket: "pizza-stop-a6112.appspot.com",
  messagingSenderId: "654940114991",
  appId: "1:654940114991:web:02ba8c017699943bdab6da",
  measurementId: "G-RKJDQ3XSW0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const storageRef = ref(storage);
