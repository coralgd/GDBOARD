import { db } from './firebase.js';
import { collection, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const boardBody = document.getElementById('boardBody');
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('status','==','verified'), orderBy('points','desc'));

    onSnapshot(q, snapshot => {
        boardBody.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${data.username}</td><td>${data.points}</td>`;
            boardBody.appendChild(tr);
        });
    });
});
