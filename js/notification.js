import { GetLoCations } from './location.js';

async function fetchFavoriteLocations(user) {
  // Lấy từ Firestore
  return await GetLoCations(user);
}

async function fetchWeather(location) {
  // Gọi API thời tiết
  const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=API_KEY&q=${encodeURIComponent(location)}`);
  return await res.json();
}

function getWeatherNotification(location, weatherData) {
  const condition = weatherData.current.condition.text;
  if (["Sunny", "Clear"].includes(condition)) {
    return `${location} hôm nay trời nắng đẹp!`;
  }
  if (["Rain", "Thunderstorm", "Storm"].some(x => condition.includes(x))) {
    return `${location} có mưa/bão, chú ý an toàn!`;
  }
  return null;
}

async function loadNotifications(user) {
  const locations = await fetchFavoriteLocations(user);
  const notifications = [];
  for (const loc of locations) {
    const data = await fetchWeather(loc);
    const msg = getWeatherNotification(loc, data);
    if (msg) notifications.push({ location: loc, message: msg });
    if (notifications.length >= 10) break;
  }
  renderNotifications(notifications);
}

function renderNotifications(notifications) {
  const count = notifications.length;
  document.getElementById('notification-count').textContent = count > 0 ? count : '';
  const dropdown = document.getElementById('notification-dropdown');
  dropdown.innerHTML = notifications.length === 0
    ? '<div class="px-3 py-2 text-muted">Không có thông báo mới</div>'
    : notifications.map((n, i) =>
        `<div class="px-3 py-2 notification-item" data-location="${n.location}" style="cursor:pointer;">
          ${n.message}
        </div>`).join('');
}

function setupNotificationEvents() {
  const btn = document.getElementById('notification-btn');
  const dropdown = document.getElementById('notification-dropdown');
  if (!btn || !dropdown) return;
  btn.onclick = function() {
    dropdown.classList.toggle('d-none');
  };
  dropdown.onclick = function(e) {
    if (e.target.classList.contains('notification-item')) {
      const location = e.target.getAttribute('data-location');
      searchWeather(location);
      this.classList.add('d-none');
    }
  };
}

export async function initNotification(user) {
  setupNotificationEvents();
  await loadNotifications(user);
}
