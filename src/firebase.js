// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwAGkd5qIEtVReCSL7s7yJOo0jjr3tZMo",
  authDomain: "visionaryos-589cf.firebaseapp.com",
  projectId: "visionaryos-589cf",
  storageBucket: "visionaryos-589cf.firebasestorage.app",
  messagingSenderId: "753579553280",
  appId: "1:753579553280:web:47a2a949a473bcf23a5ee5"
};

// Inizializzazione Firebase
const app = initializeApp(firebaseConfig);

// Export Auth e Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
