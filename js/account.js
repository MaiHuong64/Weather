import { auth, app } from "./config.js";
import {onAuthStateChanged, updateProfile,} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";;
import {handleImageSelect} from "./imageUpload.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const db = getFirestore(app);

async function GetAvatar(e) {
  const file = e.target.files[0];

  if (file) {
    const render = new FileReader();
    render.onload = function (e) {
      document.getElementById("previewAvatar").src = e.target.result;
    };
    render.readAsDataURL(file);
  }
}

async function getInformation() {
      onAuthStateChanged(auth, (user) =>{
        if(user){
            console.log(user);

            document.getElementById("name").value = user.displayName;
            document.getElementById("email").value = user.email;
            if(user.photoURL)
                document.getElementById("previewAvatar").src = user.photoURL;
        }
        else{
           alert("Vui lòng đăng nhập để xem thông tin tài khoản."); 
        }
    });
}
async function handleProfileUpdate() {
    const newName = document.getElementById("name").value.trim();
    const newAvatar = document.getElementById("avatarInput");
    const newAvatarFile = newAvatar.files[0];
    const user = auth.currentUser;

    try{
      let avatarURL = user.photoURL;
      if(newAvatarFile) {
        avatarURL = await handleImageSelect(newAvatar);
        console.log("Ảnh mới:", avatarURL);
      }

      await updateProfile(user, {
        displayName: newName,
        photoURL: avatarURL
      });
      await updateProfileFirebase(user.uid, newName, avatarURL);
       alert("Cập nhật thành công");
      location.reload();
    }
    catch(error) {
        console.error("Error updating profile:", error);
        alert("Cập nhật thông tin thất bại. Vui lòng thử lại.");
        return;
    }
}

async function updateProfileFirebase(uid, displayName, photoURL) {
  try{
      const userRef = doc(db, "user", uid);
      await updateDoc(userRef, {
        email: auth.currentUser.email,  
        name: displayName,
          avatar: photoURL
          
      });
  }
  catch(error) {
    console.error("Error updating profile:", error);
    alert("Cập nhật thông tin thất bại. Vui lòng thử lại.");
    return;
  }
}

document.addEventListener("DOMContentLoaded", async () =>{
    getInformation();
    document.getElementById("avatarInput").addEventListener("change",GetAvatar)
    document.getElementById("accountForm").addEventListener("submit", (e) =>{
        e.preventDefault();
        handleProfileUpdate();
    });
});

