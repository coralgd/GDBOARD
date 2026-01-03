import "./firebase.js";
import { getAuth, onAuthStateChanged } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, updateDoc, onSnapshot } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const usernameInput = document.getElementById("username");
const sendBtn = document.getElementById("send");
const state = document.getElementById("state");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.log("❌ Пользователь не авторизован");
    return;
  }

  const ref = doc(db, "users", user.uid);

  // Слушаем изменения документа в реальном времени
  onSnapshot(ref, (snap) => {
    if (!snap.exists()) return;

    const data = snap.data();
    console.log("📄 Данные пользователя:", data);

    if (data.status === "verified") {
      // аккаунт подтверждён — переходим на лидерборд
      location.href = "board.html";
    }

    if (data.status === "requested") {
      usernameInput.value = data.username;
      usernameInput.disabled = true;
      sendBtn.disabled = true;
      state.textContent = "⏳ Отправлено";
    }

    if (data.status === "unverified") {
      usernameInput.disabled = false;
      sendBtn.disabled = false;
      state.textContent = "Введите ник";
    }
  });

  // Обработчик кнопки "Запросить"
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
      console.log("✅ Ник отправлен:", nick);
    } catch (e) {
      console.error("❌ Ошибка при отправке:", e);
      state.textContent = "Ошибка отправки";
    }
  });
});
