// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "social-media-2dd53.firebaseapp.com",
  projectId: "social-media-2dd53",
  storageBucket: "social-media-2dd53.appspot.com",
  messagingSenderId: "173807683724",
  appId: "1:173807683724:web:f9cd770934a0705a65d3a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
