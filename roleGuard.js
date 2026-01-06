import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc } from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

export function guard({ needVerified = false, needRole = null }) {
  onAuthStateChanged(auth, async user => {
    if (!user) {
      location.href = "index.html";
      return;
    }

    const snap = await getDoc(doc(db, "users", user.uid));
    const u = snap.data();

    if (needVerified && u.situation !== "verified") {
      location.href = "nickname.html";
      return;
    }

    if (needRole) {
      if (needRole === "moderator" &&
         !(u.role === "moderator" || u.role === "elder")) {
        location.href = "home.html";
        return;
      }

      if (needRole === "elder" && u.role !== "elder") {
        location.href = "home.html";
      }
    }
  });
}
