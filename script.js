import {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    doc,
    setDoc,
    getDoc
} from "./firebase.js";

// Prevent browser from restoring previous scroll position
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

/* ==========================================
   ALWAYS START AT TOP OF PAGE
========================================== */

history.scrollRestoration = "manual";

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

/* ==========================================
   HAMBURGER MENU
========================================== */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");
        menuToggle.classList.toggle("active");

    });

    document.querySelectorAll("#navbar a").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");
            menuToggle.classList.remove("active");

        });

    });

}

/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (password && togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";
            togglePassword.classList.replace("fa-eye", "fa-eye-slash");

        } else {

            password.type = "password";
            togglePassword.classList.replace("fa-eye-slash", "fa-eye");

        }

    });

}

/* ==========================================
   SHOW / HIDE CONFIRM PASSWORD
========================================== */

const confirmPassword = document.getElementById("confirmPassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

if (confirmPassword && toggleConfirmPassword) {

    toggleConfirmPassword.addEventListener("click", () => {

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";
            toggleConfirmPassword.classList.replace("fa-eye", "fa-eye-slash");

        } else {

            confirmPassword.type = "password";
            toggleConfirmPassword.classList.replace("fa-eye-slash", "fa-eye");

        }

    });

}

/* ==========================================
   SCROLL ANIMATION
========================================== */

const sections = document.querySelectorAll("section");

if (sections.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    sections.forEach((section, index) => {

        if (index !== 0) {
            section.classList.add("hidden");
        }

        observer.observe(section);

    });

}

/* ==========================================
   LOGIN (FIREBASE)
========================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        if (email === "") {
            alert("Please enter your email address.");
            return;
        }

        if (password === "") {
            alert("Please enter your password.");
            return;
        }

        const button = document.getElementById("loginButton");

        button.disabled = true;
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';

        try {

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (!userDoc.exists()) {

                alert("User information not found.");

                return;

            }

            const userData = userDoc.data();

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

/* ==========================================
   REGISTER ACCOUNT (FIREBASE)
========================================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const agree = document.getElementById("agreeTerms").checked;

        if (fullname === "") {
            alert("Please enter your full name.");
            return;
        }

        if (email === "") {
            alert("Please enter your email.");
            return;
        }

        if (phone === "") {
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
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

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

                fullname: fullname,
                email: email,
                phone: phone,
                createdAt: new Date().toISOString()

            });

            alert("Registration Successful!");

            window.location.href = "login.html";

        } catch (error) {

            alert(error.message);

            button.disabled = false;
            button.innerHTML = "Create Account";

        }

    });

}
