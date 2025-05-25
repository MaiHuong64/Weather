import { app } from "./config.js";
import { auth } from "./config.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const db = getFirestore(app);

async function LayDanhSach(user) {
    if (!user || !user.uid) {
    console.error("Người dùng không hợp lệ:", user);
    return [];
  }
  const userRef = doc(db, "user", user.uid);
  try {
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(data);
      return data.location || [];
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      alert("Vui lòng đăng nhập để xem các địa điểm đã lưu.");
         window.location.href = "login.html";
    }
      const locations = await LayDanhSach(user);
      const list = document.getElementById("savedLocationsList");
      const nolocation = document.getElementById("noLocations");

      if (locations.length === 0) {
        nolocation.classList.remove("d-none");
      } else {
        locations.forEach((location) => {
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.textContent = location;
          list.appendChild(li);
        });
      }
  });
});
