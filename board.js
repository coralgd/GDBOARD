import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDin9IH2dxOjj-VqYDQnIZzC47R0y4N0tg",
  authDomain: "gdboardcoral.firebaseapp.com",
  projectId: "gdboardcoral"
};

initializeApp(firebaseConfig);
const db = getFirestore();

async function loadBoard() {
  const snap = await getDocs(collection(db, "users"));
  const users = [];

  snap.forEach(d => users.push(d.data()));
  users.sort((a, b) => b.points - a.points);

  leaderboard.innerHTML = "";

  users.forEach((u, i) => {
    const div = document.createElement("div");
    div.className = "row " + (i < 3 ? "top" + (i + 1) : "");
    div.innerHTML = `
      <span>#${i + 1}</span>
      <span>${u.username}</span>
      <span>${u.points}</span>
    `;
    leaderboard.appendChild(div);
  });
}

loadBoard();
