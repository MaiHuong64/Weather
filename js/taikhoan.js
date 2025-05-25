import { auth } from "../js/config.js";
import {
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-storage.js";

const storage = getStorage();

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
    const newAvatar = document.getElementById("avatarInput").files[0];
    
    const user = auth.currentUser;

    try {
        let photoURL = user.photoURL;
         if (newAvatar) {
            const avatarRef = ref( storage,`avatars/${user.uid}/${newAvatar.name}`);
            const snapshot = await uploadBytes(avatarRef, newAvatar);
            photoURL = await getDownloadURL(snapshot.ref);
        }
        await updateProfile(user, {
            displayName: newName,
            photoURL: photoURL,
        })
        alert("Cap nhat thanh cong")
        location.reload();

    } catch (error) {
         console.log(error);
            alert(error);
    }
};
document.addEventListener("DOMContentLoaded", async () =>{
    getInformation();
    document.getElementById("avatarInput").addEventListener("change",GetAvatar)
    document.getElementById("accountForm").addEventListener("submit", (e) =>{
        e.preventDefault();
        handleProfileUpdate();
    });
});

