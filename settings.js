import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('usernameInput');
    const requestBtn = document.getElementById('requestBtn');
    const statusText = document.getElementById('statusText');

    onAuthStateChanged(auth, async user => {
        if(!user) {
            window.location.href = 'index.html';
            return;
        }

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if(userSnap.exists()) {
            const data = userSnap.data();
            statusText.textContent = data.status;
            if(data.username) usernameInput.value = data.username;
        }
    });

    requestBtn.onclick = async () => {
        const user = auth.currentUser;
        if(!user) return;
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
            username: usernameInput.value,
            status: "requested"
        });
        statusText.textContent = "requested";
        alert("Никнейм отправлен на проверку!");
    };
});
