import { app } from "./config.js";
import { auth } from "./config.js";
import { getFirestore, setDoc, getDoc, doc, arrayUnion} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const db = getFirestore(app);

async function SaveLocation() {
  const user = auth.currentUser;
  const cityNameElement = document.getElementById("city");
  if (!cityNameElement) {
    alert("Nhập tên thành phố dô");
    return;
  }
  const cityName = cityNameElement.textContent.split("-")[0].trim();
  const userRef = doc(db, "user", user.uid);
  try {
    await setDoc(userRef, { location: arrayUnion(cityName) }, { merge: true });
       alert("Lưu địa điểm thành công");
  } catch (error) {
    alert(error);
  }
}

async function GetLoCations(user) {
    if (!user || !user.uid) {
    console.error("Người dùng không hợp lệ:", user);
    return [];
  }
  const userRef = doc(db, "user", user.uid);
  try {
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // console.log(data);
      return data.location || [];
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    return [];
  }
}

export { SaveLocation, GetLoCations };
