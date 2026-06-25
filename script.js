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

if (!window.location.pathname.includes("login") && !window.location.pathname.includes("register"))

if (sections.length > 0 && !window.location.pathname.includes("login") && !window.location.pathname.includes("register")) {

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
   LOGIN SYSTEM
========================================== */
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const loginPassword = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u => u.email === email);

        // CASE 1: EMAIL NOT FOUND
        if (!user) {
            if (confirm("No account found with this email.\n\nGo to Register page?")) {
                window.location.href = "register.html";
            }
            return;
        }

        // CASE 2: PASSWORD WRONG
        if (user.password !== loginPassword) {
            alert("Invalid password. Please try again.");
            return;
        }

        // CASE 3: SUCCESS LOGIN
        if (document.getElementById("rememberMe").checked) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
} else {
    sessionStorage.setItem("loggedUser", JSON.stringify(user));
}
        window.location.href = "dashboard.html";
    });

}

/* ==========================================
   REGISTER SYSTEM
========================================== */
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value;
        const email = document.getElementById("email").value.trim().toLowerCase();
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // ✅ FIX: validation must be HERE
        if (!fullname || !email || !phone || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.some(u => u.email === email);

        if (exists) {
            alert("Email already registered");
            return;
        }

        users.push({
            fullname,
            email,
            phone,
            password
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully!");

        window.location.href = "login.html";
    });
}

/* ==========================================
   DASHBOARD SYSTEM
========================================== */
const currentUser = JSON.parse(localStorage.getItem("loggedUser") || "null");

if (window.location.pathname.includes("dashboard.html") && !currentUser) {
    window.location.href = "login.html";
}

const welcomeName = document.getElementById("welcomeName");

if (welcomeName && currentUser) {
    welcomeName.textContent = "Welcome Back, " + currentUser.fullname;
}

/* ==========================================
   LOGOUT SYSTEM
========================================== */
const logoutLink = document.getElementById("logoutLink");

if (logoutLink) {

    logoutLink.addEventListener("click", function(e) {
        e.preventDefault();

        localStorage.removeItem("loggedUser");

        window.location.href = "login.html";
    });

}
