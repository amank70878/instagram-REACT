import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmKXoteoI52aZ8F7EOhb_iuOJ_6ZMFFKw",
  authDomain: "insta--copy.firebaseapp.com",
  projectId: "insta--copy",
  storageBucket: "insta--copy.appspot.com",
  messagingSenderId: "1009145143469",
  appId: "1:1009145143469:web:8495024550f4f072cbe624",
  measurementId: "G-EEXZ1BSYYZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
