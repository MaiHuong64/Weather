import Chart from "https://cdn.jsdelivr.net/npm/chart.js"; // hoặc import từ file nếu bạn dùng bundler

export function renderTemperatureChart(hours) {
    const labels = hours.map(h => new Date(h.time).toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit"
    }));

    const temps = hours.map(h => h.temp_c);

    const ctx = document.getElementById("tempChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Nhiệt độ (°C)",
                data: temps,
                borderColor: "#007bff",
                backgroundColor: "rgba(0,123,255,0.1)",
                tension: 0.3,
                fill: true,
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

}
