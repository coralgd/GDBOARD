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

/* HTML элементы */
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const status = document.getElementById("status");

const usernamePanel = document.getElementById("usernamePanel");
const usernameInput = document.getElementById("usernameInput");

const elderPanel = document.getElementById("elderPanel");
const userList = document.getElementById("userList");

let currentUser, userData;

/* Следим за авторизацией */
onAuthStateChanged(auth, async user => {
  if (!user) return;

  currentUser = user;

  const snap = await getDoc(doc(db, "users", user.uid));
  userData = snap.data();

  // Если Username ещё нет — показываем панель выбора
  if (!userData || !userData.username) {
    usernamePanel.classList.remove("hidden");
    status.textContent = "Выберите Username";
  } else {
    usernamePanel.classList.add("hidden");
    status.textContent = `Вы вошли как ${userData.username} (${userData.role})`;
  }

  // Elder moderator видит панель
  if (userData && userData.role === "elder_moderator") {
    elderPanel.classList.remove("hidden");
    loadUsers();
  }
});

/* Регистрация только Email + пароль */
window.register = async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Введите Email и пароль");
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // Сразу создаём запись в Firestore без username
    await setDoc(doc(db, "users", cred.user.uid), {
      role: "user",
      points: 0
    });

    alert("Аккаунт создан. Войдите, чтобы выбрать Username.");
  } catch (e) {
    alert("Ошибка регистрации: " + e.message);
  }
};

/* Вход только Email + пароль */
window.login = async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Введите Email и пароль");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert("Ошибка входа: " + e.message);
  }
};

/* Подтверждение Username при первом входе */
window.setUsername = async () => {
  const uname = usernameInput.value.trim();
  if (!uname) {
    alert("Введите Username");
    return;
  }

  await updateDoc(doc(db, "users", currentUser.uid), {
    username: uname
  });

  usernamePanel.classList.add("hidden");
  status.textContent = `Вы вошли как ${uname} (${userData.role || "user"})`;
};

/* Elder Moderator функции */
async function loadUsers() {
  const snap = await getDocs(collection(db, "users"));
  userList.innerHTML = "";

  snap.forEach(d => {
    const u = d.data();
    const div = document.createElement("div");
    div.className = "userRow";
    div.innerHTML = `
      <span>${u.username || "Без имени"} — ${u.points || 0} очков</span>
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
