function forecastHourly(hours, hourlyForecast) {
    hourlyForecast.innerHTML = "";
    hours.forEach((hour) => {
        hourlyForecast.innerHTML += `
            <div class="me-3 text-center flex-shrink-0">
                <div class="card p-2 shadow-sm">
                    <h6>${new Date(hour.time).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}</h6>
                    <img src="http:${hour.condition.icon}" width="36" />
                    <p class="mb-0">${hour.temp_c}°C</p>
                </div>
            </div>`;
    });
}

function forecastDaily(days, dailyForecast) {
    dailyForecast.innerHTML = ""; // Clear cũ
    days.forEach((day) => {
        dailyForecast.innerHTML += `
            <div class="col-6 col-md-4 mb-3">
                <div class="card p-3 shadow-sm text-center bg-light">
                    <h5 class="text-primary">${new Date(day.date).toLocaleDateString("vi-VN", {
                        weekday: "long",
                        month: "numeric",
                        day: "numeric",
                    })}</h5>
                    <img src="http:${day.day.condition.icon}" class="weather-icon mx-auto my-2" width="40" />
                    <p class="mt-2">${day.day.mintemp_c}°C / ${day.day.maxtemp_c}°C</p>
                </div>
            </div>`;
    });
}

export { forecastHourly, forecastDaily};
