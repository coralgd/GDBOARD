import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, increment, collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDin9IH2dxOjj-VqYDQnIZzC47R0y4N0tg",
  authDomain: "gdboardcoral.firebaseapp.com",
  projectId: "gdboardcoral",
  storageBucket: "gdboardcoral.firebasestorage.app",
  messagingSenderId: "771826157258",
  appId: "1:771826157258:web:928039314035558a9b5633"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.register = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    points: 0,
    role: "user"
  });

  alert("Аккаунт создан");
};

window.login = async () => {
  await signInWithEmailAndPassword(
    auth,
    document.getElementById("email").value,
    document.getElementById("password").value
  );
  location.href = "board.html";
};

window.loadBoard = async () => {
  const list = document.getElementById("list");
  list.innerHTML = "";

  const q = query(collection(db, "users"), orderBy("points", "desc"));
  const snap = await getDocs(q);

  snap.forEach(d => {
    const u = d.data();
    list.innerHTML += `<li>${u.email} — ${u.points}</li>`;
  });
};

window.addPoints = async () => {
  await updateDoc(doc(db, "users", uid.value), {
    points: increment(Number(points.value))
  });
  alert("Очки начислены");
};
