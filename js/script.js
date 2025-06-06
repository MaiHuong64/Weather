import { TimKiem } from "./SearchService.js";
import { SaveLocation, GetLoCations } from "./locationService.js"; 
import { auth } from "./config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";    

onAuthStateChanged(auth, async (user) => {

    const list = document.getElementById("savedLocationsList");
    const noLocation = document.getElementById("noLocations");

    const locations = await GetLoCations(user);
    console.log("Location: ", locations); 
    
    if(locations.length === 0){
        noLocation.classList.remove("d-none");
        list.classList.add("d-none");
        list.innerHTML = ""; // Clear the list
    }else{
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
});


document.getElementById("btn-Search").addEventListener("click", TimKiem);
document.getElementById('btn-SaveLocation').addEventListener("click", SaveLocation);

