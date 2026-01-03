import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const usernameEl = document.getElementById("username");
const btn = document.getElementById("requestBtn");
const info = document.getElementById("info");

onAuthStateChanged(auth, async user => {
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  const data = snap.data();

  if (data.status === "requested") {
    usernameEl.value = data.username;
    usernameEl.disabled = true;
    btn.disabled = true;
    info.textContent = "Отправлено";
  }

  if (data.status === "verified") {
    usernameEl.value = data.username;
    usernameEl.disabled = true;
    usernameEl.style.background = "#0f0";
    btn.remove();
    info.textContent = "Подтверждено";
  }

  btn.onclick = async () => {
    if (!usernameEl.value) return;

    await updateDoc(ref, {
      username: usernameEl.value,
      status: "requested"
    });

    location.reload();
  };
});
