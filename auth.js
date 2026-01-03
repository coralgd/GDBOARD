import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDin9IH2dxOjj-VqYDQnIZzC47R0y4N0tg",
  authDomain: "gdboardcoral.firebaseapp.com",
  projectId: "gdboardcoral",
  storageBucket: "gdboardcoral.firebasestorage.app",
  messagingSenderId: "771826157258",
  appId: "1:771826157258:web:928039314035558a9b5633"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const info = document.getElementById("info");

window.login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    location.href = "gate.html";
  } catch (e) {
    info.textContent = e.message;
  }
};

window.register = async () => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value);

    await setDoc(doc(db, "users", cred.user.uid), {
      username: "",
      status: "unverified",
      points: 0
    });

    location.href = "gate.html";
  } catch (e) {
    info.textContent = e.message;
  }
};
