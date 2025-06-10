import { GetLoCations } from './location.js';
import { TimKiem } from './search.js';
import { api_key } from './search.js';
import { app } from "./config.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const db = getFirestore(app);

function searchWeather(location) {
  const searchInput = document.getElementById('timkiem');
  if (searchInput) {
    searchInput.value = location;
    TimKiem();
  }
}

async function fetchFavoriteLocations(userId) {
  try {
    const locations = await GetLoCations(userId);
    return locations.map(location => ({
      name: location,
      q: location
    }));
  } catch (error) {
    console.error("Error fetching favorite locations:", error);
    return [];
  }
}

async function fetchWeather(q) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${encodeURIComponent(q)}&lang=vi`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather API error');
  return await res.json();
}

function getWeatherNotification(name, data) {
   const { condition, temp_c, wind_kph } = data.current;

  return {
    title: `Thời tiết tại ${name}`,
    msg: `Trạng thái: ${condition.text}, Nhiệt độ: ${temp_c}°C, Gió: ${wind_kph} km/h`
  };
}

export async function initNotification(userId) {
  setupNotificationEvents();

  const userRef = doc(db, "user", userId);
  const docSnap = await getDoc(userRef);
  const defaultLocation = docSnap.exists() ? docSnap.data().defaultLocation : null;

  if (!defaultLocation) {
    renderNotifications([]); // Không có địa điểm mặc định → không có thông báo
    return;
  }

  const weatherData = await fetchWeather(defaultLocation).catch(() => null);
  if (!weatherData) {
    renderNotifications([]); // lỗi khi lấy API
    return;
  }
  const note = getWeatherNotification(defaultLocation, weatherData);
  const notifications = note ? [{ location: defaultLocation, ...note }] : [];

  renderNotifications(notifications);
}

function renderNotifications(list) {
  const badge = document.getElementById('notification-count');
  const dropBox = document.getElementById('notification-dropdown');

  badge.textContent = list.length > 0 ? list.length : '';
  badge.classList.toggle('d-none', list.length === 0);

  dropBox.innerHTML = list.length === 0
    ? '<div class="px-3 py-2 text-muted">Không có thông báo mới</div>'
    : list.map(n => {
        const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        return `
        <div class="notification-item px-3 py-2" data-location="${n.location}" style="cursor:pointer;">
          <div><strong>${n.title}</strong></div>
          <div class="small">${n.msg}</div>
          <div class="small text-muted">${time}</div>
        </div>`;
      }).join('');
}

function setupNotificationEvents() {
  const btn = document.getElementById('notification-btn');
  const dropdown = document.getElementById('notification-dropdown');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', () => dropdown.classList.toggle('d-none'));

  dropdown.addEventListener('click', e => {
    const target = e.target.closest('.notification-item');
    if (!target) return;

    const loc = target.getAttribute('data-location');
    dropdown.classList.add('d-none');
    searchWeather(loc);
  });
}
