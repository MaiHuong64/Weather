import { app, auth } from "./config.js";
import { getFirestore, setDoc, getDoc, doc, arrayUnion} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const db = getFirestore(app);

async function SaveLocation() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Vui lòng đăng nhập để lưu địa điểm");
        reject("User not logged in");
        return;
      }

      const cityNameElement = document.getElementById("city");
      if (!cityNameElement) {
        alert("Không tìm thấy thành phố");
        reject("City element not found");
        return;
      }

      const cityName = cityNameElement.textContent.split("-")[0].trim();
      if (!cityName) {
        alert("Tên thành phố không được bỏ trống");
        reject("City name is empty");
        return;
      }

      const userRef = doc(db, "user", user.uid);
      try {
        await setDoc(userRef, { location: arrayUnion(cityName) }, { merge: true });
        alert("Lưu địa điểm thành công");
        resolve();
      } catch (error) {
        alert(error);
        reject(error);
      }
    });
  });
}

async function GetLoCations(userOrId) {
  let userId;
  
  // Handle both user object and user ID string
  if (typeof userOrId === 'string') {
    userId = userOrId;
  } else if (userOrId && userOrId.uid) {
    userId = userOrId.uid;
  } else {
    console.error("Người dùng không hợp lệ:", userOrId);
    return [];
  }

  const userRef = doc(db, "user", userId);
  try {
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.location || [];
    }
    return [];
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    alert("Lỗi khi lấy dữ liệu: " + error.message);
    return [];
  }
}

export { SaveLocation, GetLoCations };
