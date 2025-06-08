import { app } from "./config.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const db = getFirestore(app);

async function getUser() {
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
                <td>${user.location || 'Chưa cập nhật'}</td>
                <td>
                    <img src="${user.avatar || 'https://via.placeholder.com/40'}" 
                         alt="Avatar" 
                         style="width:40px; height:40px; border-radius:50%;" />
                </td>
            `;
            table.appendChild(row);
        });
    }   
    catch(error) {
        console.error("Error fetching user data:", error);
    }
}

export { getUser };