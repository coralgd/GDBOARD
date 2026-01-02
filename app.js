import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
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

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const status = document.getElementById("status");

let currentUser, userData;

onAuthStateChanged(auth, async user => {
  if (!user) return;

  currentUser = user;
  const snap = await getDoc(doc(db, "users", user.uid));
  userData = snap.data();
  if (!userData) return;

  status.textContent = `Вы вошли как ${user.email}, очки: ${userData.points || 0}`;
});

/* Регистрация */
window.register = async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (!email || !password) return alert("Введите email и пароль");

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), { points: 0 });
    alert("Аккаунт создан");
  } catch(e) {
    alert("Ошибка регистрации: "+e.message);
  }
};

/* Вход */
window.login = async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (!email || !password) return alert("Введите email и пароль");

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch(e) {
    alert("Ошибка входа: "+e.message);
  }
};
