import { auth } from "./config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const signup = document.getElementById("registerForm");
  const login = document.getElementById("loginForm");

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
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Đăng nhập thành công");
        window.location.href = "login.html";
      } catch (error) {
        alert(`Lỗi: ${error.message}`);
      }
    });
  }

  if(login){
    login.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          if (user !== null) {
            setCookie("uid", user.uid, 14);
            setCookie("email", user.email, 14);
            setCookie("displayName", user.displayName, 14);
            window.location.href = "../index.html";
          }
        }
      );
    } catch (error) {
      alert(`Lỗi: ${error.message}`);
    }
  });   
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
});
