import { auth } from "./config.js";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile,} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

import { getFirestore, setDoc,  getDoc,  doc} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

import { getCookie } from "./cookie.js";

document.addEventListener("DOMContentLoaded", () => {

    const guestLinks = document.getElementById("guestLinks");  
    const userDropdown = document.getElementById("userDropdown");

    const uid = getCookie("uid");
    const email = getCookie("email");
    const role = getCookie("role");
    console.log(uid, email, role);

    if (uid === null || email === null || role === null) {
        guestLinks.classList.remove("d-none");
        userDropdown.classList.add("d-none");
        }
    else if(uid){
        if(role === "admin"){
            if(window.location.pathname !== "/admin.html"){
                window.location.href = "/admin.html";
            }
        }
        else{
            document.getElementById("userName").textContent = email;
            guestLinks.classList.add("d-none");
            userDropdown.classList.remove("d-none");
        }
    }
    });