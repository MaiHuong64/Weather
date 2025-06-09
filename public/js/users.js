import { app } from "./config.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const db = getFirestore(app);

async function getUsers () {
    try {
        const querySnapshot = await getDocs(collection(db, "user"));
        const table = document.getElementById("user-table");
        
        console.log("Dữ liệu lấy được:", querySnapshot.size);
        
        querySnapshot.forEach((docSnap) => {
            const user = docSnap.data();
            console.log("User data:", user);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.email}</td>
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td><img src="${user.avatar || 'default-avatar.png'}" alt="Avatar" style="width:40px; height:40px; border-radius:50%;" /></td>
            `;
            table.appendChild(row);
        });
    }   
    catch(error) {
        console.error("Error fetching user data:", error);
    }
}
export { getUsers  };