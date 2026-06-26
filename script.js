
/* ==========================================================
   LHDN E-Receipt
   User Registration
========================================================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (
            fullName === "" ||
            username === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            alert("Please complete all fields.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const usernameExists = users.find(user => user.username === username);

        if (usernameExists) {

            alert("Username already exists.");

            return;

        }

        const emailExists = users.find(user => user.email === email);

        if (emailExists) {

            alert("Email already registered.");

            return;

        }

        const newUser = {

            fullName,
            username,
            email,
            password

        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully!");

        window.location.href = "login.html";

    });

}

/* ==========================================================
   LHDN E-Receipt
   User Login
========================================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = document
            .getElementById("username")
            .value
            .trim();

        const password = document
            .getElementById("password")
            .value;

        if (username === "" || password === "") {

            alert("Please enter your username and password.");

            return;

        }

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(function (u) {

            return (
                u.username === username &&
                u.password === password
            );

        });

        if (!user) {

            alert("Invalid username or password.");

            return;

        }

        localStorage.setItem(

            "currentUser",

            JSON.stringify(user)

        );

        alert("Welcome back, " + user.fullName + "!");

        window.location.href = "dashboard.html";

    });

}

/* ==================================================
   DASHBOARD AUTHENTICATION
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const page = window.location.pathname;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    /* -----------------------------
       Protect Dashboard
    ------------------------------ */

    if (page.includes("dashboard.html")) {

        if (!currentUser) {
            window.location.href = "login.html";
            return;
        }

        const userName =
            document.getElementById("dashboardUsername");

        const welcomeName =
            document.getElementById("dashboardWelcome");

        if (userName) {
            userName.textContent = currentUser.fullname;
        }

        if (welcomeName) {
            welcomeName.textContent =
                `Welcome Back, ${currentUser.fullname} 👋`;
        }

    }

    /* -----------------------------
       Logout
    ------------------------------ */

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            if (confirm("Are you sure you want to logout?")) {

                localStorage.removeItem("currentUser");

                window.location.href = "login.html";

            }

        });

    }

});
