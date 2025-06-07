const city = document.getElementById("city");
const error = document.getElementById("error");
const today = document.getElementById("today");
const detail = document.getElementById("details");
const hourlyForecast = document.getElementById("hourly-forecast");
const dailyForecast = document.getElementById("daily-forecast");

function clear() {
  city.innerHTML = "";
  today.innerHTML = "";
  error.innerHTML = "";
  detail.innerHTML = "";
  hourlyForecast.innerHTML = "";
  dailyForecast.innerHTML = "";
}

function displayWeather(location, current, forecast) {
  city.innerHTML = `${location.name} - ${current.temp_c}°C - ${current.condition.text} ☀️`;
  today.innerHTML = `Hôm nay: ${forecast[0].day.mintemp_c}°C / ${forecast[0].day.maxtemp_c}°C`;
  detail.innerHTML = `Độ ẩm: ${current.humidity}% | Gió: ${current.wind_kph} km/h`;
}
function getBackgroundColor(weatherText) {
  const colorMap = [
    { keywords: ["quang", "trong", "nắng gắt"], color: "#FBC02D" },
    { keywords: ["nắng", "ít mây"], color: "#FFD54F" },
    { keywords: ["nhiều mây", "mây"], color: "#90A4AE" },
    { keywords: ["mưa rào nhẹ", "mưa nhỏ"], color: "#78909C" },
    { keywords: ["mưa", "rào"], color: "#546E7A" },
    { keywords: ["giông", "sấm"], color: "#37474F" },
    { keywords: ["tuyết"], color: "#B2EBF2" },
    { keywords: ["sương", "mù"], color: "#B0BEC5" },
  ];

  const text = weatherText.toLowerCase();

  for (const entry of colorMap) {
    if (entry.keywords.some((kw) => text.includes(kw))) {
      return entry.color;
    }
  }

  return "#E1F5FE"; // màu mặc định
}

function changeBackGround(weatherText) {
  document.body.style.backgroundColor = getBackgroundColor(weatherText);
}

function createLocationCard(city, weatherType, temp) {
  const card = document.createElement("div");
  card.className = "p-3 rounded shadow";
  card.style.backgroundColor = bgColor;
  card.style.minWidth = "180px";

  card.innerHTML = `
    <h6 class="mb-1">${city}</h6>
    <p class="mb-0">${weatherType} - ${temp}°C</p>
  `;

  document.getElementById("savedLocations").appendChild(card);
}

export { clear, displayWeather, changeBackGround, getBackgroundColor, createLocationCard}; 