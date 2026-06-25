import {
    auth,
    db,
    signInWithEmailAndPassword,
    doc,
    getDoc
} from "./firebase.js";

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        if (!password) {
            alert("Please enter your password.");
            return;
        }

        const button = document.getElementById("loginButton");

        button.disabled = true;
        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';

        try {

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            const snapshot =
                await getDoc(doc(db, "users", user.uid));

            if (!snapshot.exists()) {

                alert("User profile not found.");

                return;

            }

            const userData = snapshot.data();

            sessionStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    uid: user.uid,
                    fullname: userData.fullname,
                    email: userData.email,
                    phone: userData.phone
                })
            );

            window.location.href = "dashboard.html";

        } catch (error) {

            alert(error.message);

            button.disabled = false;
            button.innerHTML = "Login";

        }

    });

}
