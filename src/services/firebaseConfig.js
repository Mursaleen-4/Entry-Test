import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";  // Import Realtime Database
import { getAnalytics } from "firebase/analytics";  // Optional if you plan to use Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChAU2T3Dt74DsUAGZ9htkbdn_y3-q9k7k",
  authDomain: "entry-test-784b8.firebaseapp.com",
  databaseURL: "https://entry-test-784b8-default-rtdb.firebaseio.com",
  projectId: "entry-test-784b8",
  storageBucket: "entry-test-784b8.firebasestorage.app",
  messagingSenderId: "385049370772",
  appId: "1:385049370772:web:f048ffe0e931bec8505481",
  measurementId: "G-95B20D5J0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Authentication service
const db = getFirestore(app);  // Firestore database
const database = getDatabase(app);  // Realtime Database
const analytics = getAnalytics(app);  // Optional analytics

export { auth, db, database, analytics };