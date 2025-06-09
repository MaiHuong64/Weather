import { auth } from "./config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  getDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { setCookie, getCookie, deleteCookie } from "./cookie.js";
import { checkLogin } from "./auth.js";
import { initNotification } from "./notification.js";

document.addEventListener("DOMContentLoaded", async () => {
  const signupForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logout");
  const notificationWrapper = document.getElementById("notificationWrapper");

  // Đăng ký
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      if (!name || !email || !password || password !== confirmPassword) {
        alert("Thông tin đăng ký không hợp lệ");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });

        const db = getFirestore();
        await setDoc(doc(db, "user", user.uid), {
          avatar: "avatar",
          name: name,
          email: user.email,
          role: "user"
        });

        await signOut(auth);
        alert("Đăng ký thành công!");
        window.location.href = "login.html";
      } catch (error) {
        alert(`Lỗi: ${error.message}`);
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("email").value.trim();
      const passwordInput = document.getElementById("password").value;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, emailInput, passwordInput);
        const user = userCredential.user;

        const db = getFirestore();
        const docSnap = await getDoc(doc(db, "user", user.uid));
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setCookie("uid", user.uid, 14);
          setCookie("email", user.email, 14);
          setCookie("name", userData.name, 14);
          setCookie("role", userData.role, 14);

          checkLogin(user.uid, user.email, userData.role);
          alert("Đăng nhập thành công!");

          if (userData.role === "user" && notificationWrapper) {
            notificationWrapper.classList.remove("d-none");
            await initNotification(user.uid);
          }

          window.location.href = "index.html";
        } else {
          alert("Không tìm thấy thông tin người dùng.");
        }
      } catch (error) {
        alert(`Lỗi: ${error.message}`);
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        deleteCookie("uid");
        deleteCookie("email");
        deleteCookie("name");
        deleteCookie("role");
        alert("Đã đăng xuất");
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

  if (uid && role === "user" && notificationWrapper) {
    notificationWrapper.classList.remove("d-none");
    await initNotification(uid);
  }
});
