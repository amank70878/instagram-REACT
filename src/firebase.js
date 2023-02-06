import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbw2Dd_LQbPBhWmWLMLupTkXbY6_nwL3A",
  authDomain: "insta-by-aman.firebaseapp.com",
  projectId: "insta-by-aman",
  storageBucket: "insta-by-aman.appspot.com",
  messagingSenderId: "206463113282",
  appId: "1:206463113282:web:984783c655b3ee2483f5db",
  measurementId: "G-40Q0BYT88N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firebaseStorage = getStorage(app);

export { db, auth, provider, firebaseStorage };
