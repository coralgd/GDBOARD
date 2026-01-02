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

/* Firebase config */
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

let currentUser, userData;

onAuthStateChanged(auth, async user => {
  if (!user) return;

  currentUser = user;
  const snap = await getDoc(doc(db, "users", user.uid));
  userData = snap.data();

  status.textContent = `Вы вошли как ${userData.username} (${userData.role})`;

  // elder moderator видит панель
  if (userData.role === "elder_moderator") {
    elderPanel.classList.remove("hidden");
    loadUsers();
  }

  // кнопка "Проверить" скрыта, если уже использована
  if (localStorage.getItem("GDBOARD_CHECK_USED")) {
    checkBtn.remove();
  }
});

/* Регистрация */
window.register = async () => {
  if (!email.value || !password.value || !username.value) return alert("Заполните все поля");

  const cred = await createUserWithEmailAndPassword(auth, email.value, password.value);
  await setDoc(doc(db, "users", cred.user.uid), {
    username: username.value,
    role: "user",
    points: 0
  });

  alert("Аккаунт создан");
};

/* Вход */
window.login = async () => {
  if (!email.value || !password.value) return alert("Введите email и пароль");
  await signInWithEmailAndPassword(auth, email.value, password.value);
};

/* КНОПКА "ПРОВЕРИТЬ" */
window.checkAdmin = () => {
  if (!userData) return;

  modal.classList.remove("hidden");

  if (userData.role === "user") {
    modalText.textContent = "Не найдено";
    confirmBtn.classList.add("hidden");
  } else {
    modalText.textContent = "Найдено";
    confirmBtn.classList.remove("hidden");
  }
};

/* КНОПКА "ПОДТВЕРДИТЬ" */
window.confirmAdmin = async () => {
  await updateDoc(doc(db, "users", currentUser.uid), { role: "moderator" });
  localStorage.setItem("GDBOARD_CHECK_USED", "1");
  checkBtn.remove();
  closeModal();
  location.reload();
};

/* Закрыть модалку */
window.closeModal = () => modal.classList.add("hidden");

/* ELDER MODERATOR PANEL */
async function loadUsers() {
  const snap = await getDocs(collection(db, "users"));
  userList.innerHTML = "";

  snap.forEach(d => {
    const u = d.data();
    if (u.role === "user") {
      const div = document.createElement("div");
      div.className = "userRow";
      div.innerHTML = `
        <span>${u.username}</span>
        <button onclick="makeModerator('${d.id}')">Сделать модератором</button>
      `;
      userList.appendChild(div);
    }
  });
}

/* Назначить модератора */
window.makeModerator = async uid => {
  await updateDoc(doc(db, "users", uid), { role: "moderator" });
  loadUsers();
};
