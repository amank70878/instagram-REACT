import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTPhMh2CD0sTopDelq2P1luq2EEasxamg",
  authDomain: "insta-reels-by-aman.firebaseapp.com",
  projectId: "insta-reels-by-aman",
  storageBucket: "insta-reels-by-aman.appspot.com",
  messagingSenderId: "724824444467",
  appId: "1:724824444467:web:9ea58ba555f34319dfdd46",
  measurementId: "G-KPNZEMF76Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firebaseStorage = getStorage(app);

export { db, auth, provider, firebaseStorage };
