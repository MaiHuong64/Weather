import { app, auth } from "./config.js";
import { getFirestore, setDoc, doc, serverTimestamp} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const db = getFirestore(app);

async function writeLog(location) {
  try {
    // Kiểm tra đăng nhập người dùng
    if (!auth.currentUser) {
        console.log("Người dùng chưa đăng nhập.");
        return;
    }
    const uid = auth.currentUser.uid;
    await setDoc(doc(db, "logs", uid + "_" + Date.now()), {
      uid: uid,
      name: name,
      location: location,
      timestamp: serverTimestamp(),
    });

    console.log("Đã ghi log thành công:", location);

  } catch (error) {
    console.log("Lỗi ghi log:", error);
  }
}

export { writeLog };