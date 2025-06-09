import { app } from "./config.js";
import { getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const db = getFirestore(app);

async function getLogs() {
    try {
        const querySnapshot = await getDocs(collection(db, "logs"));
        const table = document.getElementById("log-table");

        console.log("Dữ liệu lấy được:", querySnapshot.size);

        if (querySnapshot.empty) {
            const row = document.createElement("tr");
            row.innerHTML = `<td colspan="3" class="text-center text-muted">Không có dữ liệu</td>`;
            table.appendChild(row);
            return;
        }
        
        querySnapshot.forEach((docSnap) => {
            const log = docSnap.data();
            console.log("Log data:", log);

            const row = document.createElement("tr");
           row.innerHTML = `
                <td>${log.userId}</td>
                <td>${log.location}</td>
                <td>${log.timestamp.toDate().toLocaleString()}</td>
            `;

            table.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching logs data:", error);
    }
}
export { getLogs };