import { auth } from "./config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

import { setCookie, getCookie, deleteCookie } from "./cookie.js";

import { checkLogin } from "./auth.js";


document.addEventListener("DOMContentLoaded", () => {

  const signup = document.getElementById("registerForm");
  const login = document.getElementById("loginForm");
  const logout = document.getElementById("logout");

  // đăng ký
  if (signup) {
    signup.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      if (name == "" || email == "" || password == "" || password !== confirmPassword) {
        alert("Thông tin đăng ký không hợp lệ");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name, });

        // Lưu thông tin đăng ký
        const db = getFirestore();
        await setDoc(doc(db, "user", user.uid), {
          avatar: "avatar",
          name: name,
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
  // đăng nhập
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
            const docRef = doc(db, "user", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const userData = docSnap.data();

              setCookie("uid", user.uid, 14);
              setCookie("email", user.email, 14);
              setCookie("name", userData.displayName, 14);
              setCookie("role", userData.role, 14);

              console.log("Cookie check:", user.uid, user.email, userData.role);

              const uid = getCookie("uid");
              const email = getCookie("email");
              const role = getCookie("role");

              checkLogin(uid, email, role);
              alert("Đăng nhập thành công!");
            }
          }
        );
      } catch (error) {
        console.log(`Lỗi: ${error.message}`);
      }
    });
  }

  //Đăng xuất
  if (logout) {
    logout.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        deleteCookie("uid");
        deleteCookie("email");
        deleteCookie("name");
        deleteCookie("role");
        alert("Đã đăng xuất");
        location.reload();
        window.location.href = "login.html";
      } catch (error) {
        alert(`Lỗi khi đăng xuất: ${error.message}`);
      }
    });
  }

  const uid = getCookie("uid");
  const email = getCookie("email");
  const role = getCookie("role");

  checkLogin(uid, email, role);
});
