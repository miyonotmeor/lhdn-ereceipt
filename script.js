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
   SCROLL ANIMATION (FIXED)
========================================== */

const sections = document.querySelectorAll("section");

if (
    sections.length > 0 &&
    !window.location.pathname.includes("login") &&
    !window.location.pathname.includes("register")
) {

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
        if (index !== 0) section.classList.add("hidden");
        observer.observe(section);
    });

}

window.addEventListener("load", () => {

    const dashboard = document.querySelector(".dashboard");
    const welcome = document.querySelector(".welcome");

    // Dashboard animation
    if (dashboard) {
        setTimeout(() => {
            dashboard.classList.add("show");
        }, 150);
    }

    // Welcome card animation
    if (welcome) {
        setTimeout(() => {
            welcome.classList.add("show");
        }, 250);
    }

});

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

        // STEP 1: CHECK EMAIL EXISTS
        const user = users.find(u => u.email === email);

        if (!user) {
            if (confirm("No account found with this email.\n\nWould you like to register now?")) {
                window.location.href = "register.html";
            }
            return;
        }

        // STEP 2: CHECK PASSWORD
        if (user.password !== loginPassword) {
            alert("Invalid password. Please try again.");
            return;
        }

        // STEP 3: LOGIN SUCCESS
        if (document.getElementById("rememberMe")?.checked) {
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
const currentUser =
    JSON.parse(localStorage.getItem("loggedUser")) ||
    JSON.parse(sessionStorage.getItem("loggedUser")) ||
    null;

if (window.location.pathname.includes("dashboard.html") && !currentUser) {
    alert("Session expired. Please login again.");
    window.location.href = "login.html";
}

const lastReceiptData = JSON.parse(localStorage.getItem("lastReceiptData") || "null");

if (window.location.pathname.includes("dashboard.html") && lastReceiptData) {

    document.getElementById("totalReceipts").textContent =
        parseInt(document.getElementById("totalReceipts").textContent) + 1;

    document.getElementById("totalTaxPaid").textContent =
        lastReceiptData.amount;

}

/* ==========================================
   LOGOUT SYSTEM
========================================== */
const logoutLink = document.getElementById("logoutLink");

if (logoutLink) {

    logoutLink.addEventListener("click", function(e) {
        e.preventDefault();

        localStorage.removeItem("loggedUser");
sessionStorage.removeItem("loggedUser");

alert("You have been logged out from the system.");

window.location.href = "login.html";
    });

}

/* ==========================================
   ADD
========================================== */
if (window.location.pathname.includes("dashboard.html")) {

    history.pushState(null, null, location.href);

    window.addEventListener("popstate", function () {
        history.pushState(null, null, location.href);
        alert("Session expired. Please login again.");
        window.location.href = "login.html";
    });

    window.addEventListener("pageshow", function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    });

}

/* ==========================================
   DASHBOARD FORCE SHOW FIX
========================================== */

window.addEventListener("load", () => {

    if (window.location.pathname.includes("dashboard.html")) {

        // Force ALL dashboard elements visible
        document.querySelectorAll(
            ".dashboard, .welcome, .stats, .stats .card, .actions, .action, .table-card"
        ).forEach(el => {
            el.classList.add("show");
            el.classList.remove("hidden");
        });

    }

});
