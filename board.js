import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
  const snap = await getDocs(collection(db, "users"));
  const users = [];
  snap.forEach(d => users.push({ email: d.data().email || "Пользователь", points: d.data().points || 0 }));
  users.sort((a,b)=> b.points - a.points);

  leaderboard.innerHTML = users.map(u=> `<p>${u.email} — ${u.points} очков</p>`).join("");
}

loadLeaderboard();
