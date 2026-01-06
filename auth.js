import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

export async function login(email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    redirectUser(res.user.uid);
  } catch {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", res.user.uid), {
      email,
      nick: "",
      situation: "none",
      role: "player",
      points: 0
    });
    location.href = "nickname.html";
  }
}

async function redirectUser(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  const u = snap.data();
  if (u.situation !== "verified") location.href = "nickname.html";
  else location.href = "home.html";
}
