import { displayWeather, clear, changeBackGround } from "./weatherDisplay.js";
import { forecastHourly, forecastDaily } from "./forecast.js";
import { writeLog } from "./writeLog.js";
import { showChart } from "./chart.js";

export const api_key = "dc135abe71b948b7a13162258252305";

const error = document.getElementById("error");
const hourlyForecast = document.getElementById("hourly-forecast");
const dailyForecast = document.getElementById("daily-forecast");
const searchInput = document.getElementById("timkiem");

async function TimKiem() {
  try {
    const input = searchInput.value.trim();
   
    // const invalidCharPattern = /[^a-zA-ZÀ-ỹà-ỹ\s\-']/u;
    if (!input) {
      error.innerHTML = "Vui lòng nhập tên thành phố";
      return;
    }
    if (input.length > 50) {
      error.innerHTML = "Tên thành phố quá dài. Vui lòng nhập tối đa 50 ký tự.";
      return;
    }
    // if (invalidCharPattern.test(input)) {
    //   error.innerHTML = "Tên thành phố chứa ký tự không hợp lệ.";
    //   return;
    // }

    writeLog(input);
    clear();

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${encodeURIComponent(input)}&days=3&lang=vi`;
    console.log('API URL:', url);
    let ketqua;
    try {
      ketqua = await fetch(url);
    } catch (networkErr) {
      error.innerHTML = "Không thể kết nối đến máy chủ thời tiết. Vui lòng kiểm tra kết nối mạng.";
      console.log('Network error:', networkErr);
      return;
    }
    console.log('API Response status:', ketqua.status);
    let data;
    try {
      data = await ketqua.json();
    } catch (jsonErr) {
      error.innerHTML = "Dữ liệu trả về không hợp lệ từ máy chủ thời tiết.";
      console.log('JSON parse error:', jsonErr);
      return;
    }
    if (data.error) {
      error.innerHTML = "Không tìm thấy thành phố! Vui lòng nhập lại";
      console.log('API Error:', data.error);
      return;
    }
    if (!data.current || !data.location || !data.forecast || !Array.isArray(data.forecast.forecastday)) {
      error.innerHTML = "Dữ liệu thời tiết không đúng định dạng. Vui lòng thử lại sau.";
      console.log('Unexpected data format:', data);
      return;
    }
    const current = data.current;
    const location = data.location;
    const { name, region, country } = location;

    console.log(`${name} → ${region || "(không có vùng)"} → ${country}`);
    const forecast = data.forecast.forecastday;
    const hourly = data.forecast.forecastday[0].hour;

    displayWeather(location, current, forecast);
    changeBackGround(current.condition.text);
    forecastHourly(hourly, hourlyForecast);
    forecastDaily(forecast, dailyForecast); 
    console.log(forecast);
    
    const labels = hourly.map(h => new Date(h.time).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }));
    const chartData = hourly.map(h => h.temp_c);

    // Ensure the chart container is visible before rendering the chart
    document.getElementById('weather-row').classList.remove('d-none');
    document.getElementById('chart-col').classList.remove('d-none');

    showChart(labels, chartData);
    
    console.log('Weather condition:', current.condition.text);

    document.getElementById('weather-message').classList.add('d-none');
  } catch (err) {
    error.innerHTML =
      "Có lỗi không xác định xảy ra khi lấy dữ liệu thời tiết. Vui lòng thử lại.";
    console.log('Unexpected error:', err);
  }
}
export { TimKiem };