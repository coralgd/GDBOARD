import "./firebase.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

login.onclick = async () => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email.value, pass.value);
    const ref = doc(db, "users", cred.user.uid);
    const snap = await ref.get();
    location.href = "gate.html";
  } catch (e) {
    alert("Ошибка входа: " + e.message);
  }
};

reg.onclick = async () => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.value, pass.value);
    await setDoc(doc(db, "users", cred.user.uid), {
      email: email.value,
      username: "",
      status: "unverified",
      points: 0
    });
    location.href = "gate.html";
  } catch (e) {
    alert("Ошибка регистрации: " + e.message);
  }
};
