import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();
const list = document.getElementById("list");

const q = query(collection(db, "users"), orderBy("points", "desc"));

onSnapshot(q, snap => {
  list.innerHTML = "";
  snap.forEach(doc => {
    const d = doc.data();
    if (d.status !== "verified") return;

    const li = document.createElement("li");
    li.textContent = `${d.username} — ${d.points}`;
    list.appendChild(li);
  });
});
