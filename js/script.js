const api_key = "dc135abe71b948b7a13162258252305";

const city = document.getElementById("city");
const error = document.getElementById("error");
const today = document.getElementById("today");
const detail = document.getElementById("details");
const hourlyForecast = document.getElementById("hourly-forecast");
const dailyForecast = document.getElementById("daily-forecast");
const savelocation = document.getElementById("savedLocations");

async function TimKiem() {
  try {
    const input = encodeURIComponent(document.getElementById("timkiem").value);
    if (!input) {
      error.innerHTML = "Vui lòng nhập tên thành phố";
      return;
    }

    city.innerHTML = "";
    today.innerHTML = "";
    detail.innerHTML = "";
    hourlyForecast.innerHTML = "";
    dailyForecast.innerHTML = "";
    savelocation.innerHTML = "";

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${input}&lang=vi`;
    const ketqua = await fetch(url);

    const data = await ketqua.json();

    if (data.error) {
      error.innerHTML = "Không tìm thấy thành phố! Vui lòng nhập lại";
      return;
    }

    const current = data.current;
    const location = data.location;
    const forecast = data.forecast.forecastday;

    city.innerHTML = `${location.name} - ${current.temp_c}°C - ${current.condition.text} ☀️`;
    today.innerHTML = `Hôm nay: ${forecast[0].day.mintemp_c}°C / ${forecast[0].day.maxtemp_c}°C`;
    detail.innerHTML = `Độ ẩm: ${current.humidity}% | Gió: ${current.wind_kph} km/h`;

    const body = document.body;
    const weatherText = current.condition.text.toLowerCase();

    if (
      weatherText.includes("quang") ||
      weatherText.includes("trong") ||
      weatherText.includes("nắng gắt")
    ) {
      body.style.backgroundColor = "#FBC02D"; // Nắng gắt vàng đậm
    } else if (
      weatherText.includes("nắng nhẹ") ||
      weatherText.includes("ít mây")
    ) {
      body.style.backgroundColor = "#FFD54F"; // Nắng dịu
    } else if (weatherText.includes("nhiều mây")) {
      body.style.backgroundColor = "#90A4AE"; // Xám dịu
    } else if (weatherText.includes("mưa rào nhẹ")) {
      body.style.backgroundColor = "#78909C"; // Mưa nhẹ
    } else if (weatherText.includes("mưa") || weatherText.includes("mưa to")) {
      body.style.backgroundColor = "#546E7A"; // Mưa đậm
    } else if (weatherText.includes("giông") || weatherText.includes("sấm")) {
      body.style.backgroundColor = "#37474F"; // Giông bão
    } else if (weatherText.includes("tuyết")) {
      body.style.backgroundColor = "#B2EBF2"; // Tuyết lạnh
    } else if (weatherText.includes("sương") || weatherText.includes("mù")) {
      body.style.backgroundColor = "#B0BEC5"; // Sương mù
    } else {
      body.style.backgroundColor = "#E1F5FE"; // Mặc định trời quang
    }

    createLocationCard(location.name, weatherKey, current.temp_c);

    // Dự báo theo giờ
    const hours = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ];
    hours.forEach((hour) => {
      const hourData = forecast[0].hour.find(
        (h) => new Date(h.time).getHours() === hour
      );
      if (hourData) {
        hourlyForecast.innerHTML += `
                    <div class = "text-center me-3">
                        <div>${hourData.time.split(" ")[1]}</div>
                        <img src="http:${hourData.condition.icon}" width=32>
                        <div>${hourData.temp_c}°C</div>
                    </div>`;
      }
    });

    // Dự báo theo ngày
    forecast.forEach((day) => {
      const currentDay = new Date(day.date);
      const weekday = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][
        currentDay.getDay()
      ];

      dailyForecast.innerHTML += `<div class = "text-center">
                                      <div>${weekday}</div>
                                      <img src="http:${day.day.condition.icon}" width=36>
                                      <div>${day.day.mintemp_c}° / ${day.day.maxtemp_c}°</div>
                                      </div>`;
    });
  } catch (error) {
    error.innerHTML =
      "Có lỗi xảy ra khi lấy dữ liệu thời tiết. Vui lòng thử lại.";
    console.log(error);
  }
}

function createLocationCard(city, weatherType, temp) {
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

  const bgColor = colorMap[weatherType] || colorMap.Default;

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
