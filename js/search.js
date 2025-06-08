import { displayWeather, clear, changeBackGround } from "./weatherDisplay.js";
import { writeLog } from "./writeLog.js";
const api_key = "dc135abe71b948b7a13162258252305";

const error = document.getElementById("error");
const hourlyForecast = document.getElementById("hourly-forecast");
const dailyForecast = document.getElementById("daily-forecast");


async function TimKiem() {
  try {
    const input = encodeURIComponent(document.getElementById("timkiem").value);
    if (!input) {
      error.innerHTML = "Vui lòng nhập tên thành phố";
      return;
    }

    writeLog(input);
    clear();

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${input}&lang=vi`;
    const ketqua = await fetch(url);
    console.log(ketqua);
    

    const data = await ketqua.json();

    if (data.error) {
      error.innerHTML = "Không tìm thấy thành phố! Vui lòng nhập lại";
      return;
    }

    const current = data.current;
    const location = data.location;
    const forecast = data.forecast.forecastday;
    displayWeather(location, current, forecast);
    changeBackGround(current.condition.text);

 
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
                                      <img src="https:${day.day.condition.icon}" width=36>
                                      <div>${day.day.mintemp_c}° / ${day.day.maxtemp_c}°</div>
                                      </div>`;
    });
  } catch (error) {
    error.innerHTML =
      "Có lỗi xảy ra khi lấy dữ liệu thời tiết. Vui lòng thử lại.";
    console.log(error);
  }
}
export { TimKiem };