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
  getDoc,
  updateDoc,
  increment,
  collection,
  query,
  orderBy,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===== FIREBASE CONFIG ===== */
const firebaseConfig = {
  apiKey: "AIzaSyDin9IH2dxOjj-VqYDQnIZzC47R0y4N0tg",
  authDomain: "gdboardcoral.firebaseapp.com",
  projectId: "gdboardcoral",
  storageBucket: "gdboardcoral.firebasestorage.app",
  messagingSenderId: "771826157258",
  appId: "1:771826157258:web:928039314035558a9b5633"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ===== CONSTANTS ===== */
const ADMIN_FLAG = "GDBOARD_ADMIN_USED";

/* ===== AUTH ===== */
window.register = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Заполни email и пароль");
    return;
  }

  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    points: 0,
    role: "user"
  });

  alert("Аккаунт создан");
};

window.login = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  await signInWithEmailAndPassword(auth, email, password);
  location.href = "board.html";
};

/* ===== ROLE CHECK ===== */
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const role = snap.data().role;

  // показать кнопку получения прав
  if (role !== "moderator" && !localStorage.getItem(ADMIN_FLAG)) {
    const btn = document.getElementById("adminBtn");
    if (btn) btn.style.display = "inline-block";
  }

  // защита admin.html
  if (location.pathname.includes("admin.html") && role !== "moderator") {
    alert("Нет прав администратора");
    location.href = "index.html";
  }
});

/* ===== ONE-TIME ADMIN ===== */
window.becomeAdmin = async () => {
  const user = auth.currentUser;
  if (!user) return;

  if (localStorage.getItem(ADMIN_FLAG)) {
    alert("Права уже были получены");
    return;
  }

  await updateDoc(doc(db, "users", user.uid), {
    role: "moderator"
  });

  localStorage.setItem(ADMIN_FLAG, "true");

  alert("Права администратора получены");
  location.reload();
};

/* ===== LEADERBOARD ===== */
window.loadBoard = async () => {
  const list = document.getElementById("list");
  if (!list) return;

  list.innerHTML = "";

  const q = query(collection(db, "users"), orderBy("points", "desc"));
  const snap = await getDocs(q);

  snap.forEach(d => {
    const u = d.data();
    list.innerHTML += `<li>${u.email} — ${u.points}</li>`;
  });
};

/* ===== MODERATOR ACTION ===== */
window.addPoints = async () => {
  const uid = document.getElementById("uid").value.trim();
  const pts = Number(document.getElementById("points").value);

  if (!uid || isNaN(pts)) {
    alert("Неверные данные");
    return;
  }

  await updateDoc(doc(db, "users", uid), {
    points: increment(pts)
  });

  alert("Очки начислены");
};
