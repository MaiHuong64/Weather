import { GetLoCations } from './location.js';
import { TimKiem } from './search.js';
import { api_key } from './search.js';

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
  const code = condition.code;

  if (code === 1000 && temp_c >= 23 && temp_c <= 32) {
    return { title: 'Trời nắng đẹp ☀', msg: `${name} hôm nay trời quang, ${temp_c}°C.` };
  }
  if ((code >= 1180 && code < 1200) || code >= 1273) {
    return { title: 'Cảnh báo mưa/bão ⚠', msg: `${name} có mưa, gió ${wind_kph} km/h. Mang áo mưa nhé!` };
  }
  return null;
}

export async function initNotification(userId) {
  setupNotificationEvents();
  const locations = await fetchFavoriteLocations(userId);
  const weatherArr = await Promise.all(
    locations.map(l => fetchWeather(l.q).catch(() => null))
  );

  const notifications = [];
  weatherArr.forEach((data, idx) => {
    if (!data) return;
    const note = getWeatherNotification(locations[idx].name, data);
    if (note) notifications.push({ location: locations[idx].name, ...note });
  });

  renderNotifications(notifications.slice(0, 10));
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
