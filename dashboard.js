import {
    auth,
    signOut
} from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const db = getFirestore();

window.history.pushState(null, "", window.location.href);

window.addEventListener("popstate", () => {
    window.history.pushState(null, "", window.location.href);
});

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        alert("Please login first.");

        window.location.replace("login.html");

        return;

    }

    try {

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const data = userSnap.data();

            document.getElementById("welcomeName").textContent =
                "Welcome Back, " + data.fullname + " 👋";

        } else {

            document.getElementById("welcomeName").textContent =
                "Welcome Back 👋";

        }

    } catch (error) {

        console.error(error);

    }

    document.getElementById("totalReceipts").textContent = "0";
    document.getElementById("verifiedReceipts").textContent = "0";
    document.getElementById("pendingReceipts").textContent = "0";
    document.getElementById("totalTaxPaid").textContent = "RM 0.00";

});

document.getElementById("logoutLink").addEventListener("click", async (e) => {

    e.preventDefault();

    await signOut(auth);

    window.location.replace("login.html");

});
