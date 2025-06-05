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
function changeBackGround(weatherText) {
  const text = weatherText.toLowerCase();
  const body = document.body;

  let color = "#E1F5FE";

  if (
    text.includes("quang") ||
    text.includes("trong") ||
    text.includes("nắng gắt")
  )
    color = "#FBC02D";
  else if (text.includes("nắng") || text.includes("ít mây")) color = "#FFD54F";
  else if (text.includes("nhiều mây") || text.includes("mây"))
    color = "#90A4AE";
  else if (text.includes("mưa rào nhẹ") || text.includes("mưa nhỏ"))
    color = "#78909C";
  else if (text.includes("mưa") || text.includes("rào")) color = "#546E7A";
  else if (text.includes("giông") || text.includes("sấm")) color = "#37474F";
  else if (text.includes("tuyết")) color = "#B2EBF2";
  else if (text.includes("sương") || text.includes("mù")) color = "#B0BEC5";

  body.style.backgroundColor = color;
}
function getWeatherColor(weatherText) {
  const colorMap = {
    Clear: "#FFF9C4",
    Clouds: "#ECEFF1",
    Rain: "#B0BEC5",
    Thunderstorm: "#616161",
    Snow: "#E1F5FE",
    Mist: "#CFD8DC",
    Haze: "#CFD8DC",
    Default: "#FFFFFF",
  };
  // colorMap.forEach((color) => {
  //   if (weatherText.toLowerCase().includes(key.toLowerCase())) return map[key];
  // });
  // return "#FFFFFF";
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

export { clear, displayWeather, changeBackGround, getWeatherColor, createLocationCard}; 