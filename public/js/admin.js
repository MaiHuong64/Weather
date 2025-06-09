import { getUsers } from "./users.js";
import { getLogs } from "./logs.js";
import { app } from "./config.js";
import {getFirestore, collection, getCountFromServer, getDocs, query, where,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const db = getFirestore(app);

async function UserCount() {
  const countUser = await getCountFromServer(collection(db, "user"));
  document.getElementById("user-count").textContent = countUser.data().count;
  console.log("So user: ", countUser);
}

async function countView() {
  const log = collection(db, "logs");
  const now = new Date();
  const lastweek = new Date(now);
  lastweek.setDate(now.getDate() - 7);

  const timespand = lastweek;

  // Loc ca doc theo dieu kien
  const q = query(log, where("timestamp", ">=", timespand));
  const docSnap = await getDocs(q);
  console.log("So luot: ", docSnap);
  document.getElementById("weekly-search-count").textContent = docSnap.size;
}

async function topcities() {
  const log = collection(db, "logs");

  try {
    const snapDoc = await getDocs(log);

    const top = {};

    snapDoc.forEach((doc) => {
      const rawLocation = doc.data().location.toLowerCase();
      const location = decodeURIComponent(rawLocation);
      console.log("location: ", location)
      if (location) {
        top[location] = (top[location] || 0) + 1;
      }
    });
    const sorted = Object.entries(top)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // lấy top 10

    const topCitiesList = document.getElementById("top-cities");
    topCitiesList.innerHTML = ""; // clear nếu có

    sorted.forEach(([city, count]) => {
      const li = document.createElement("li");
      li.textContent = `${city} (${count} lượt)`;
      topCitiesList.appendChild(li);
    });
  } catch (error) {
    console.error("Lỗi khi lấy top địa điểm:", error);
  }
}

countView();
UserCount();
topcities();
window.addEventListener("DOMContentLoaded", async () => {
  // getUsers();
  getLogs();
  await getUsers();
});
