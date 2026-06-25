/* ==========================================
   ALWAYS START AT TOP OF PAGE
========================================== */

history.scrollRestoration = "manual";

window.addEventListener("load", () => {

    window.scrollTo(0,0);

});

/* ==========================================
   HAMBURGER MENU
========================================== */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if(menuToggle && navbar){

    menuToggle.addEventListener("click",()=>{

        navbar.classList.toggle("active");
        menuToggle.classList.toggle("active");

    });

    document.querySelectorAll("#navbar a").forEach(link=>{

        link.addEventListener("click",()=>{

            navbar.classList.remove("active");
            menuToggle.classList.remove("active");

        });

    });

}


/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */

const password=document.getElementById("password");
const togglePassword=document.getElementById("togglePassword");

if(password && togglePassword){

    togglePassword.addEventListener("click",()=>{

        if(password.type==="password"){

            password.type="text";

            togglePassword.classList.replace("fa-eye","fa-eye-slash");

        }

        else{

            password.type="password";

            togglePassword.classList.replace("fa-eye-slash","fa-eye");

        }

    });

}


/* ==========================================
   SCROLL ANIMATION
========================================== */

const sections=document.querySelectorAll("section");

if(sections.length>0){

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.15

    });

    sections.forEach((section,index)=>{

    if(index!==0){

        section.classList.add("hidden");

    }

    observer.observe(section);

});

}


/* ==========================================
   LOGIN VALIDATION
========================================== */

const loginForm=document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",function(e){

    e.preventDefault();

    const email=document.getElementById("email").value.trim();

    const password=document.getElementById("password").value.trim();

    if(email===""){

        alert("Please enter your email address.");

        return;

    }

    if(password===""){

        alert("Please enter your password.");

        return;

    }

    const button=document.getElementById("loginButton");

    button.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';

    button.disabled=true;

    setTimeout(()=>{

        button.innerHTML='<i class="fa-solid fa-circle-check"></i> Login Successful';

    },1200);

});

}
