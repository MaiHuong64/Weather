import { auth } from "./config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const signup = document.getElementById("registerForm");
  const login = document.getElementById("loginForm");
  const logout = document.getElementById("logout");

  // Kiểm tra đăng ký
  if (signup) {
    signup.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      if (email == "" || password == "" || password != confirmPassword) {
        alert("Thông tin đăng ký không hợp lệ");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Lưu thông tin đăng ký
        const db = getFirestore();

        await setDoc(doc(db, "user", user.uid), {
          avatar: "avatar",
          email: user.email,
          role: "user",
        });
        await signOut(auth);
        alert("Đăng ký thành công!");
        window.location.href = "login.html";
      } catch (error) {
        alert(`Lỗi: ${error.message}`);
      }
    });
  }

  // Kiểm tra đăng nhập

  if (login) {
    login.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        await signInWithEmailAndPassword(auth, email, password).then(
          async (userCredential) => {
            const user = userCredential.user;

            const db = getFirestore();
            // Kiểm tra role
            const docRef = doc(db, "user", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const userData = docSnap.data();
              const role = userData.role;
              setCookie("uid", user.uid, 14);
              setCookie("email", user.email, 14);
              setCookie("displayName", user.displayName, 14);
              setCookie("role", role, 14);
              window.location.href = "../index.html";
            }
          }
        );
      } catch (error) {
        alert(`Lỗi: ${error.message}`);
      }
    });
  }

  const uid = getCookie("uid");
  const email = getCookie("email");
  const role = getCookie("role");

  const guestLinks = document.getElementById("guestLinks");
  const userDropdown = document.getElementById("userDropdown");
  const userName = document.getElementById("userName");

  if (uid && email) {
    // Ẩn phần dành cho khách
    guestLinks.classList.add("d-none");
    userDropdown.classList.remove("d-none");
    savedLocations.classList.remove("d-none");   
    saveLocationBtn.classList.remove("d-none");
    guestReminder.classList.add("d-none"); 

    userName.textContent = email;

    if (role === "admin") {
      if (!window.location.href.includes("index.html")) {
        window.location.href = "../index.html";
      }
    } else {
      console.log("Chao nguoi dung");
    }
  } else {
    guestLinks.classList.remove("d-none");
    userDropdown.classList.add("d-none");
    savedLocations.classList.add("d-none");
    guestReminder.classList.remove("d-none");
   saveLocationBtn.classList.add("d-none");
  }

  //Đăng xuất
  if (logout) {
    logout.addEventListener("click", async () => {
      try {
        await signOut(auth);
        deleteCookie("uid");
        deleteCookie("email");
        deleteCookie("displayName");
        deleteCookie("role");
        window.location.href = "login.html";
      } catch (error) {
        alert(`Lỗi khi đăng xuất: ${error.message}`);
      }
    });
  }
});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
