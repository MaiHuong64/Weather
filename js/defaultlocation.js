import { GetLoCations, SetDefaultLocation } from './location.js';
import { auth, app} from './config.js';
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const db = getFirestore(app);

async function LoadSavedLocations() {
  const savedList = document.getElementById("savedLocationsList");
  const noLocations = document.getElementById("noLocations");

  auth.onAuthStateChanged(async (user) => {
    if (!user) return;

    const locations = await GetLoCations(user);
    const userRef = doc(db, "user", user.uid);
    const docSnap = await getDoc(userRef);
    const defaultLoc = docSnap.data()?.defaultLocation;

    savedList.innerHTML = "";
    noLocations.classList.toggle("d-none", locations.length > 0);

    locations.forEach((loc) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";

      const label = document.createElement("span");
      label.textContent = loc + (loc === defaultLoc ? " 🌟 (mặc định)" : "");

      const button = document.createElement("button");
      button.className = "btn btn-sm btn-outline-primary";
      button.textContent = "Đặt làm mặc định";
      button.disabled = loc === defaultLoc;

      button.addEventListener("click", async () => {
        await SetDefaultLocation(user, loc);
        LoadSavedLocations(); // Refresh UI
      });

      li.append(label, button);
      savedList.appendChild(li);
    });
  });
}

document.addEventListener("DOMContentLoaded", LoadSavedLocations);
