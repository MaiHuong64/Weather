import { TimKiem } from "./search.js";
import { SaveLocation, GetLoCations } from "./location.js"; 
import { auth } from "./config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";    
import { initAutocomplete } from "./autocomplete.js";

const btnSearch = document.getElementById("btn-Search")
const btnSave = document.getElementById("btn-SaveLocation");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const list = document.getElementById("savedLocationsList");
    const noLocation = document.getElementById("noLocations");

    const locations = await GetLoCations(user);
    console.log("Location: ", locations);

    if (list && noLocation) {
      if (locations.length === 0) {
        noLocation.classList.remove("d-none");
        list.classList.add("d-none");
        list.innerHTML = ""; // Clear the list
      } else {
        noLocation.classList.add("d-none");
        list.classList.remove("d-none");
        list.innerHTML = "";
        // Populate the list with saved locations

        locations.forEach((location) => {
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.textContent = location;
          list.appendChild(li);
        });
      }
    }
  } else {
    // Handle case when user is logged out or not logged in
    const list = document.getElementById("savedLocationsList");
    const noLocation = document.getElementById("noLocations");
    if (list) list.classList.add("d-none");
    if (noLocation) noLocation.classList.add("d-none");
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    btnSave.classList.remove("d-none");
  } else {
    btnSave.classList.add("d-none");
  }
});
initAutocomplete(() => TimKiem());

btnSearch.addEventListener("click", TimKiem);
btnSave.addEventListener("click", SaveLocation);

