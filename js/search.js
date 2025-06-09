import { displayWeather, clear, changeBackGround } from "./weatherDisplay.js";
import { forecastHourly, forecastDaily } from "./forecast.js";
import { writeLog } from "./writeLog.js";

export const api_key = "dc135abe71b948b7a13162258252305";

const error = document.getElementById("error");
const hourlyForecast = document.getElementById("hourly-forecast");
const dailyForecast = document.getElementById("daily-forecast");
const searchInput = document.getElementById("timkiem");

async function TimKiem() {
  try {
    const input = searchInput.value.trim();
    if (!input) {
      error.innerHTML = "Vui lòng nhập tên thành phố";
      return;
    }

    writeLog(input);
    clear();

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${encodeURIComponent(input)}&days=3&lang=vi`;
    console.log('API URL:', url);
    const ketqua = await fetch(url);
    console.log('API Response status:', ketqua.status);
    
    const data = await ketqua.json();
    console.log('Location data:', {
      name: data.location?.name,
      region: data.location?.region,
      country: data.location?.country,
      lat: data.location?.lat,
      lon: data.location?.lon
    });

    if (data.error) {
      error.innerHTML = "Không tìm thấy thành phố! Vui lòng nhập lại";
      console.log('API Error:', data.error);
      return;
    }

    const current = data.current;
    const location = data.location;
    const forecast = data.forecast.forecastday;
    const hourly = data.forecast.forecastday[0].hour;

    displayWeather(location, current, forecast);
    changeBackGround(current.condition.text);
    forecastHourly(hourly, hourlyForecast);
    forecastDaily(forecast, dailyForecast); 
    console.log('Weather condition:', current.condition.text);
 
    
  } catch (error) {
    error.innerHTML =
      "Có lỗi xảy ra khi lấy dữ liệu thời tiết. Vui lòng thử lại.";
    console.log(error);
  }
}
export { TimKiem };