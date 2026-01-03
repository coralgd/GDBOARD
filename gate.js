import { getAuth, onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const username = document.getElementById("username");
const send = document.getElementById("send");
const state = document.getElementById("state");

onAuthStateChanged(auth, user => {
  if (!user) return;

  const ref = doc(db, "users", user.uid);

  onSnapshot(ref, snap => {
    const d = snap.data();

    if (d.status === "verified") {
      location.href = "board.html";
    }

    if (d.status === "requested") {
      username.value = d.username;
      username.disabled = true;
      send.disabled = true;
      state.textContent = "⏳ Отправлено";
    }

    if (d.status === "unverified") {
      username.disabled = false;
      send.disabled = false;
      state.textContent = "Введите ник";
    }
  });

  send.onclick = async () => {
    if (!username.value) return;
    await updateDoc(ref, {
      username: username.value,
      status: "requested"
    });
  };
});
