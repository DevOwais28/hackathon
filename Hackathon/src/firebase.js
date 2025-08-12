// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXB_4s5ElCpnpuDSRz4MM2UUnStwRygfA",
  authDomain: "hackathon-8ff5b.firebaseapp.com",
  projectId: "hackathon-8ff5b",
  storageBucket: "hackathon-8ff5b.firebasestorage.app",
  messagingSenderId: "380765925118",
  appId: "1:380765925118:web:1ae6378414d5b0901a3faf",
  measurementId: "G-Q0TB3T8XBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth , db}