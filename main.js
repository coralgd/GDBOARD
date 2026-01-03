import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const pointsEl = document.getElementById('points');
const placeEl = document.getElementById('place');

onAuthStateChanged(auth, user => {
    if (!user) window.location.href = 'index.html';
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('points', 'desc'));
    onSnapshot(q, snapshot => {
        let rank = 1;
        snapshot.forEach(doc => {
            if(doc.id === user.uid) {
                pointsEl.textContent = doc.data().points;
                placeEl.textContent = rank;
            }
            rank++;
        });
    });
});
