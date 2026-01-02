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
  collection,
  getDocs
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
const usernameInput = document.getElementById("username");
const status = document.getElementById("status");
const elderPanel = document.getElementById("elderPanel");
const userList = document.getElementById("userList");

let currentUser, userData;

onAuthStateChanged(auth, async user => {
  if (!user) return;

  currentUser = user;
  const snap = await getDoc(doc(db, "users", user.uid));
  userData = snap.data();

  status.textContent = `Вы вошли как ${userData.username} (${userData.role})`;

  if (userData.role === "elder_moderator") {
    elderPanel.classList.remove("hidden");
    loadUsers();
  }
});

window.register = async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const username = usernameInput.value.trim();

  if (!email || !password || !username) {
    alert("Заполните все поля");
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      username: username,
      role: "user",
      points: 0
    });
    alert("Аккаунт создан");
  } catch (e) {
    alert("Ошибка регистрации: " + e.message);
  }
};

window.login = async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Введите email и пароль");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert("Ошибка входа: " + e.message);
  }
};

async function loadUsers() {
  const snap = await getDocs(collection(db, "users"));
  userList.innerHTML = "";

  snap.forEach(d => {
    const u = d.data();
    const div = document.createElement("div");
    div.className = "userRow";
    div.innerHTML = `
      <span>${u.username} — ${u.points || 0} очков</span>
      ${userData.role === "elder_moderator" || userData.role === "moderator" ? `
      <button onclick="addPoints('${d.id}',10)">+10</button>
      <button onclick="addPoints('${d.id}',-10)">-10</button>
      <button onclick="makeModerator('${d.id}')">Сделать модератором</button>` : ""}
    `;
    userList.appendChild(div);
  });
}

window.makeModerator = async uid => {
  await updateDoc(doc(db, "users", uid), { role: "moderator" });
  loadUsers();
};

window.addPoints = async (uid, amount) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  const currentPoints = snap.data().points || 0;
  await updateDoc(userRef, { points: currentPoints + amount });
  loadUsers();
};
