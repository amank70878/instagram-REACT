import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBv0rZVoMXCnBxQSL-PXjLrbfkgypUSQsM",
  authDomain: "instagram-by-aman.firebaseapp.com",
  projectId: "instagram-by-aman",
  storageBucket: "instagram-by-aman.appspot.com",
  messagingSenderId: "197543141863",
  appId: "1:197543141863:web:5428a58424977405f79d42",
  measurementId: "G-HFKVJPFFNB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firebaseStorage = getStorage(app);

export { db, auth, provider, firebaseStorage };
