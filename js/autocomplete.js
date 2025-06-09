import { api_key } from './search.js';

export function initAutocomplete(onSelect) {
  const searchInput = document.getElementById("timkiem");
  const autocompleteContainer = document.getElementById("autocomplete-container");
  let searchTimeout;

  async function searchLocations(query) {
    try {
      const url = `https://api.weatherapi.com/v1/search.json?key=${api_key}&q=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error searching locations:", error);
      return [];
    }
  }

  function displayAutocompleteResults(results) {
    autocompleteContainer.innerHTML = "";
    if (results.length === 0) {
      autocompleteContainer.style.display = "none";
      return;
    }

    results.forEach(result => {
      const div = document.createElement("div");
      div.className = "autocomplete-item";
      div.style.cssText = `
        padding: 8px 12px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
      `;
      div.textContent = `${result.name}, ${result.country}`;
      div.onclick = () => {
        searchInput.value = result.name;
        autocompleteContainer.style.display = "none";
        if (onSelect) onSelect(result);
      };
      autocompleteContainer.appendChild(div);
    });
    autocompleteContainer.classList.add('autocomplete-dropdown');
    autocompleteContainer.style.display = "block";
  }

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    if (query.length < 2) {
      autocompleteContainer.style.display = "none";
      return;
    }

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      const results = await searchLocations(query);
      displayAutocompleteResults(results);
    }, 300);
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !autocompleteContainer.contains(e.target)) {
      autocompleteContainer.style.display = "none";
    }
  });
}