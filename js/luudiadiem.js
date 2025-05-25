import { app } from "./config.js";
import { auth } from "./config.js";
import {
  getFirestore,
  setDoc,
  doc,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";


const db = getFirestore(app);

async function LuuDiaDiem() {
  const user = auth.currentUser;
  const cityNameElement = document.getElementById("city");
  if (!cityNameElement) {
    alert("Nhập tên thành phố dô");
    return;
  }
  const cityName = cityNameElement.textContent.split("-")[0].trim();
  const userRef = doc(db, "user", user.uid);
  try {
    setDoc(userRef, { location: arrayUnion(cityName) }, { merge: true });
       alert("Lưu địa điểm thành công");
  } catch (error) {
    alert(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("saveLocationBtn").addEventListener("click", () => {
    LuuDiaDiem();
  });
});
