import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const checkText = document.getElementById("checkText");
const confirmBtn = document.getElementById("confirmBtn");

let currentUser, userData;

onAuthStateChanged(auth, async user => {
  if (!user) {
    checkText.textContent = "Вы не вошли в систему";
    return;
  }

  currentUser = user;
  const snap = await getDoc(doc(db, "users", user.uid));
  userData = snap.data();

  if (userData.role === "user") {
    checkText.textContent = "Не найдено";
    confirmBtn.classList.add("hidden");
  } else {
    checkText.textContent = "Найдено";
    confirmBtn.classList.remove("hidden");
  }
});

/* Подтвердить и стать модератором */
confirmBtn.onclick = async () => {
  await updateDoc(doc(db, "users", currentUser.uid), { role: "moderator" });
  confirmBtn.classList.add("hidden");
  checkText.textContent = "Вы теперь модератор!";
};

/* Назад */
window.goBack = () => {
  window.location.href = "index.html";
};
