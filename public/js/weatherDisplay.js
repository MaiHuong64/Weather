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

  document.getElementById('weather-row').classList.add('d-none');
  document.getElementById('weather-empty').classList.remove('d-none');
}

function displayWeather(location, current, forecast) {
  city.innerHTML = `${location.name} - ${current.temp_c}°C - ${current.condition.text} ☀️`;
  today.innerHTML = `Hôm nay: ${forecast[0].day.mintemp_c}°C / ${forecast[0].day.maxtemp_c}°C`;
  detail.innerHTML = `Độ ẩm: ${current.humidity}% | Gió: ${current.wind_kph} km/h`;
}
function getBackgroundTheme(weatherText) {
  const themeMap = [
    {
      keywords: ["quang", "trong", "nắng gắt"],
      gradient:
        "linear-gradient(135deg, #FBC02D 0%, #FFD54F 50%, #FFF176 100%)",
      textColor: "#2E2E2E",
      cardBg: "rgba(255, 255, 255, 0.85)",
      shadowColor: "rgba(251, 192, 45, 0.3)",
    },
    {
      keywords: ["nắng", "ít mây"],
      gradient:
        "linear-gradient(135deg, #FFD54F 0%, #FFF176 50%, #FFEE58 100%)",
      textColor: "#2E2E2E",
      cardBg: "rgba(255, 255, 255, 0.8)",
      shadowColor: "rgba(255, 213, 79, 0.3)",
    },
    {
      keywords: ["nhiều mây", "mây"],
      gradient:
        "linear-gradient(135deg, #90A4AE 0%, #B0BEC5 50%, #CFD8DC 100%)",
      textColor: "#2E2E2E",
      cardBg: "rgba(255, 255, 255, 0.75)",
      shadowColor: "rgba(144, 164, 174, 0.3)",
    },
    {
      keywords: ["mưa rào nhẹ", "mưa nhỏ"],
      gradient:
        "linear-gradient(135deg, #78909C 0%, #90A4AE 50%, #B0BEC5 100%)",
      textColor: "#FFFFFF",
      cardBg: "rgba(255, 255, 255, 0.15)",
      shadowColor: "rgba(120, 144, 156, 0.4)",
    },
    {
      keywords: ["mưa", "rão"],
      gradient:
        "linear-gradient(135deg, #546E7A 0%, #78909C 50%, #90A4AE 100%)",
      textColor: "#FFFFFF",
      cardBg: "rgba(255, 255, 255, 0.1)",
      shadowColor: "rgba(84, 110, 122, 0.5)",
    },
    {
      keywords: ["giông", "sấm"],
      gradient:
        "linear-gradient(135deg, #37474F 0%, #546E7A 50%, #78909C 100%)",
      textColor: "#FFFFFF",
      cardBg: "rgba(255, 255, 255, 0.08)",
      shadowColor: "rgba(55, 71, 79, 0.6)",
    },
    {
      keywords: ["tuyết"],
      gradient:
        "linear-gradient(135deg, #B2EBF2 0%, #E0F2F1 50%, #F1F8E9 100%)",
      textColor: "#2E2E2E",
      cardBg: "rgba(255, 255, 255, 0.7)",
      shadowColor: "rgba(178, 235, 242, 0.4)",
    },
    {
      keywords: ["sương", "mù"],
      gradient:
        "linear-gradient(135deg, #B0BEC5 0%, #CFD8DC 50%, #ECEFF1 100%)",
      textColor: "#2E2E2E",
      cardBg: "rgba(255, 255, 255, 0.6)",
      shadowColor: "rgba(176, 190, 197, 0.3)",
    },
  ];

  const text = weatherText.toLowerCase();

  for (const entry of themeMap) {
    if (entry.keywords.some((kw) => text.includes(kw))) {
      return entry;
    }
  }

  return {
    gradient: "linear-gradient(to right, #83a4d4, #b6fbff)",
    textColor: "#000",
    cardBg: "#ffffffaa",
    shadowColor: "rgba(0, 0, 0, 0.2)",
  };
}

function changeBackGround(weatherText) {
  const theme = getBackgroundTheme(weatherText);
  document.body.style.backgroundImage = theme.gradient;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.color = theme.textColor;

  // Cập nhật .weather-card
  const weatherCards = document.querySelectorAll(".weather-card");
  weatherCards.forEach((card) => {
    card.style.backgroundColor = theme.cardBg;
    card.style.backdropFilter = "blur(10px)";
    card.style.border = `1px solid rgba(255, 255, 255, 0.2)`;
    card.style.boxShadow = `0 4px 16px ${theme.shadowColor}`;
    card.style.borderRadius = "16px";
    card.style.color = theme.textColor;
    card.style.transition = "all 0.3s ease";
  });

  // Cập nhật navbar
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.style.backgroundColor = "transparent";
    navbar.style.color = theme.textColor;
  }

  // Cập nhật footer
  const footer = document.querySelector("footer");
  if (footer) {
    footer.style.backgroundColor = "transparent";
    footer.style.color = theme.textColor;
  }

  const buttons = document.querySelectorAll("button, .btn");
  buttons.forEach((btn) => {
    btn.style.color = theme.textColor;
    btn.style.borderColor = "rgba(255,255,255,0.4)";
  });
}

function createLocationCard(city, weatherType, temp) {
  const theme = getBackgroundTheme(weatherType);

  const card = document.createElement("div");
  card.className = "p-3 rounded shadow location-card";
  card.style.backgroundColor = theme.cardBg;
  card.style.backdropFilter = "blur(10px)";
  card.style.border = `1px solid rgba(255, 255, 255, 0.2)`;
  card.style.boxShadow = `0 4px 16px ${theme.shadowColor}`;
  card.style.borderRadius = "12px";
  card.style.minWidth = "180px";
  card.style.color = theme.textColor;
  card.style.transition = "all 0.3s ease";

  card.innerHTML = `
    <div style="font-weight: bold; margin-bottom: 8px;">${city}</div>
    <div style="font-size: 0.9em; opacity: 0.8;">${weatherType} - ${temp}°C</div>
  `;

  // Add hover effect
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-4px)";
    card.style.boxShadow = `0 8px 32px ${theme.shadowColor}`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = `0 4px 16px ${theme.shadowColor}`;
  });

  document.getElementById("savedLocations").appendChild(card);
}
const style = document.createElement("style");
document.head.appendChild(style);
export {
  clear,
  displayWeather,
  changeBackGround,
  getBackgroundTheme,
  createLocationCard,
};
