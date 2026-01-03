import "./firebase.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const usernameInput = document.getElementById("username");
const sendBtn = document.getElementById("send");
const state = document.getElementById("state");

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const ref = doc(db, "users", user.uid);

  onSnapshot(ref, snap => {
    if (!snap.exists()) return;
    const data = snap.data();

    if (data.status === "verified") {
      location.href = "board.html";
    } else if (data.status === "requested") {
      usernameInput.value = data.username;
      usernameInput.disabled = true;
      sendBtn.disabled = true;
      state.textContent = "⏳ Отправлено";
    } else if (data.status === "unverified") {
      usernameInput.disabled = false;
      sendBtn.disabled = false;
      state.textContent = "Введите ник";
    }
  });

  sendBtn.addEventListener("click", async () => {
    const nick = usernameInput.value.trim();
    if (!nick) {
      state.textContent = "Введите ник";
      return;
    }
    try {
      await updateDoc(ref, {
        username: nick,
        status: "requested"
      });
      usernameInput.disabled = true;
      sendBtn.disabled = true;
      state.textContent = "Отправлено";
    } catch (e) {
      state.textContent = "Ошибка отправки";
      console.error(e);
    }
  });
});
