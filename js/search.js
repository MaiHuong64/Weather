import { displayWeather, clear, changeBackGround } from "./weatherDisplay.js";
import { forecastHourly, forecastDaily } from "./forecast.js";
import{renderTemperatureChart} from "./temperatureChart.js";
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

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${input}&days=3&lang=vi`;
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
    const hourly = data.forecast.forecastday[0].hour;
renderTemperatureChart(forecast[0].hour); // hoặc danh sách giờ bạn muốn vẽ

    displayWeather(location, current, forecast);
    changeBackGround(current.condition.text);
    forecastHourly(hourly, hourlyForecast);
    forecastDaily(forecast, dailyForecast);
    
    
  } catch (error) {
    error.innerHTML =
      "Có lỗi xảy ra khi lấy dữ liệu thời tiết. Vui lòng thử lại.";
    console.log(error);
  }
}
export { TimKiem };