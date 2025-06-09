import { getUsers } from "./users.js"; 
import { getLogs } from "./logs.js";

window.addEventListener("DOMContentLoaded", async () => {
    getUsers();
});
window.addEventListener("DOMContentLoaded", async () => {
    getLogs();
});