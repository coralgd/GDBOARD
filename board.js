import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDin9IH2dxOjj-VqYDQnIZzC47R0y4N0tg",
  authDomain: "gdboardcoral.firebaseapp.com",
  projectId: "gdboardcoral",
  storageBucket: "gdboardcoral.firebasestorage.app",
  messagingSenderId: "771826157258",
  appId: "1:771826157258:web:928039314035558a9b5633"
};

initializeApp(firebaseConfig);
const db = getFirestore();

const leaderboard = document.getElementById("leaderboard");

async function loadLeaderboard() {
  const q = query(collection(db, "users"));
  const snap = await getDocs(q);

  let users = [];
  snap.forEach(d => users.push(d.data()));

  users.sort((a,b) => (b.points||0) - (a.points||0));

  leaderboard.innerHTML = users.map(u => `<p>${u.username} — ${u.points || 0} очков</p>`).join("");
}

loadLeaderboard();

window.goBack = () => {
  window.location.href = "index.html";
};
