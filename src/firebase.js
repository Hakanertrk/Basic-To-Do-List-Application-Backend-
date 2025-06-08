// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBYYyRMkQmwYcAPxBUS3WOaS7dWykT-d8A",
  authDomain: "smart-to-do-app-ab860.firebaseapp.com",
  projectId: "smart-to-do-app-ab860",
  storageBucket: "smart-to-do-app-ab860.firebasestorage.app",
  messagingSenderId: "687535278528",
  appId: "1:687535278528:web:26795de07f95ccd83de025",
  measurementId: "G-CY3G5CX7R6"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
