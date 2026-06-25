// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Your Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyDcW6ZSGBmNvYjlt1Hhuinn0gOkLf-z0JY",

    authDomain: "lhdn-ereceipt.firebaseapp.com",

    projectId: "lhdn-ereceipt",

    storageBucket: "lhdn-ereceipt.firebasestorage.app",

    messagingSenderId: "649481280233",

    appId: "1:649481280233:web:5865b021955550f1e76e78"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    doc,
    setDoc,
    getDoc
};
