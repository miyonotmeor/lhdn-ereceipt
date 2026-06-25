// ================================
// SCROLL RESET
// ================================
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});


// ================================
// HAMBURGER MENU
// ================================
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


// ================================
// PASSWORD TOGGLE (LOGIN + REGISTER)
// ================================
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


// ================================
// CONFIRM PASSWORD TOGGLE
// ================================
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


// ================================
// REGISTER (LOCAL STORAGE ONLY)
// ================================
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const agree = document.getElementById("agreeTerms").checked;

        if (!fullname || !email || !phone || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!agree) {
            alert("Please agree to Terms & Conditions.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

        const exists = users.find(u => u.email === email);

        if (exists) {
            alert("Email already registered. Please login.");
            window.location.href = "login.html";
            return;
        }

        users.push({
            fullname,
            email,
            phone,
            password
        });

        localStorage.setItem("registeredUsers", JSON.stringify(users));

        alert("Account created successfully!");
        window.location.href = "login.html";
    });
}


// ================================
// LOGIN (LOCAL STORAGE ONLY)
// ================================
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const remember = document.getElementById("rememberMe");

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert("Invalid email or password.");
            return;
        }

        const sessionData = {
            fullname: user.fullname,
            email: user.email
        };

        if (remember && remember.checked) {
            localStorage.setItem("loggedInUser", JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem("loggedInUser", JSON.stringify(sessionData));
        }

        alert("Login successful!");
        window.location.href = "dashboard.html";
    });
}


// ================================
// DASHBOARD LOAD USER
// ================================
const welcomeName = document.getElementById("welcomeName");

if (welcomeName) {

    let currentUser =
        JSON.parse(sessionStorage.getItem("loggedInUser")) ||
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!currentUser) {
        alert("Please login first.");
        window.location.href = "login.html";
    } else {
        welcomeName.textContent = "Welcome Back, " + currentUser.fullname + " 👋";
    }
}


// ================================
// LOGOUT
// ================================
const logoutLink = document.getElementById("logoutLink");

if (logoutLink) {

    logoutLink.addEventListener("click", function (e) {
        e.preventDefault();

        sessionStorage.removeItem("loggedInUser");
        localStorage.removeItem("loggedInUser");

        alert("Logged out successfully!");
        window.location.href = "login.html";
    });
}
