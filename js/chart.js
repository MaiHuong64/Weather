let tempChart = null;

export function showChart(labels, data) {
  document.getElementById('chart-col').classList.remove('d-none');
  document.getElementById('location-detail-col').classList.remove('text-center');
  document.getElementById('location-detail-col').classList.add('text-start');

  if (tempChart) tempChart.destroy();

  const ctx = document.getElementById('tempChart').getContext('2d');
  tempChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: '',
        data,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ctx.parsed.y + '°C' } }
      },
      scales: {
        x: { title: { display: false }, grid: { color: '#ccc', borderDash: [4, 4] }, ticks: { color: '#444' } },
        y: { display: false }
      }
    }
  });
}