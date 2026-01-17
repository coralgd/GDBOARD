// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7QbVxGHR7Qm8o8Wzl_wxsCpzMUdS5rws",
  authDomain: "gdboard-add4a.firebaseapp.com",
  projectId: "gdboard-add4a",
  storageBucket: "gdboard-add4a.firebasestorage.app",
  messagingSenderId: "883125028740",
  appId: "1:883125028740:web:c504de4139943b8606bfd1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
