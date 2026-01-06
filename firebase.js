import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmz9fNAqjfH1zUkEtY13bMFgxUuxDWWmU",
  authDomain: "gdboard-spin.firebaseapp.com",
  projectId: "gdboard-spin",
  storageBucket: "gdboard-spin.firebasestorage.app",
  messagingSenderId: "337440690682",
  appId: "1:337440690682:web:700dc78e346653f2d61443"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
