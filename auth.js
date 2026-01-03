import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

registerBtn.onclick = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            username: "",
            status: "unverified",
            points: 0,
            role: "user"
        });
        alert("Регистрация успешна!");
        window.location.href = "main.html";
    } catch (e) {
        alert(e.message);
    }
};

loginBtn.onclick = async () => {
    try {
        await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
        window.location.href = "main.html";
    } catch (e) {
        alert(e.message);
    }
};
