// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

// Конфигурация твоего Firebase проекта
const firebaseConfig = {
  apiKey: "AIzaSyDRzA5oDVrgGt2RefHiW7k9L39PPZse6og",
  authDomain: "spingdboard.firebaseapp.com",
  projectId: "spingdboard",
  storageBucket: "spingdboard.firebasestorage.app",
  messagingSenderId: "364173174184",
  appId: "1:364173174184:web:cf00e3dcade4c46838699d"
};

// Инициализация Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
