import {
    auth,
    db,
    createUserWithEmailAndPassword,
    updateProfile,
    doc,
    setDoc
} from "./firebase.js";

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const agree = document.getElementById("agreeTerms").checked;

        if (!fullname) {
            alert("Please enter your full name.");
            return;
        }

        if (!email) {
            alert("Please enter your email.");
            return;
        }

        if (!phone) {
            alert("Please enter your phone number.");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!agree) {
            alert("Please agree to the Terms & Conditions.");
            return;
        }

        const button = document.getElementById("registerButton");

        button.disabled = true;
        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            await updateProfile(userCredential.user, {
                displayName: fullname
            });

            await setDoc(doc(db, "users", userCredential.user.uid), {
                fullname,
                email,
                phone,
                createdAt: new Date().toISOString()
            });

            alert("Account created successfully!");

            window.location.href = "login.html";

        } catch (error) {

            alert(error.message);

            button.disabled = false;
            button.innerHTML = "Create Account";

        }

    });

}
