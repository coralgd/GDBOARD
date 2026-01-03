import "./firebase.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore();
const list = document.getElementById("list");

onSnapshot(collection(db, "users"), snapshot => {
  list.innerHTML = "";
  snapshot.docs
    .map(d => d.data())
    .sort((a,b) => b.points - a.points)
    .forEach(u => {
      if(u.status === "verified") {
        const li = document.createElement("li");
        li.textContent = `${u.username} — ${u.points}`;
        list.appendChild(li);
      }
    });
});
