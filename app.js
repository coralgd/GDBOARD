import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
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

const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");
const statusEl = document.getElementById("status");

/* Регистрация */
window.register = async () => {
  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      emailEl.value,
      passEl.value
    );

    await setDoc(doc(db, "users", cred.user.uid), {
      status: "unverified",
      username: "",
      points: 0
    });

    window.location.href = "request.html";
  } catch (e) {
    alert(e.message);
  }
};

/* Вход */
window.login = async () => {
  try {
    const cred = await signInWithEmailAndPassword(
      auth,
      emailEl.value,
      passEl.value
    );

    const snap = await getDoc(doc(db, "users", cred.user.uid));
    const data = snap.data();

    if (data.status !== "verified") {
      alert("Аккаунт не подтверждён");
      return;
    }

    statusEl.textContent = "Вход выполнен";
  } catch (e) {
    alert(e.message);
  }
};
