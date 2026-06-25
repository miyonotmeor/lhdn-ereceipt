import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcW6ZSGBmNvYjlt1HhuinnOgOkLf-zOJY",
  authDomain: "lhdn-ereceipt.firebaseapp.com",
  projectId: "lhdn-ereceipt",
  storageBucket: "lhdn-ereceipt.firebasestorage.app",
  messagingSenderId: "649481280233",
  appId: "1:649481280233:web:5865b021955550f1e76e78"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
