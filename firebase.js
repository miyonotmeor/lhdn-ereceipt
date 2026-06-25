// Firebase SDK (Modular v12)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

// AUTH
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// FIRESTORE
import {
    getFirestore,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ==========================================
// FIREBASE CONFIG (YOUR PROJECT)
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyDcW6ZSGBmNvYjlt0gOkLf-zOJY",
    authDomain: "lhdn-ereceipt.firebaseapp.com",
    projectId: "lhdn-ereceipt",
    storageBucket: "lhdn-ereceipt.firebasestorage.app",
    messagingSenderId: "649481280233",
    appId: "1:649481280233:web:5865b021955550f1e76e78"
};

// ==========================================
// INITIALIZE FIREBASE
// ==========================================
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// ==========================================
// EXPORT (FOR YOUR script.js)
// ==========================================
export {
    auth,
    db,

    // AUTH FUNCTIONS
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,

    // FIRESTORE FUNCTIONS
    doc,
    setDoc,
    getDoc
};
