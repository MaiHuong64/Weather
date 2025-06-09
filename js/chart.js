let tempChart = null;

export function showChart(labels, data) {
  document.getElementById('chart-col').classList.remove('d-none');
  const locationDetailCol = document.getElementById('location-detail-col');
  locationDetailCol.classList.remove('text-center');
  locationDetailCol.classList.add('text-start');

  if (tempChart) tempChart.destroy();

  const canvas = document.getElementById('tempChart');
  if (!canvas) {
    console.error("Canvas element 'tempChart' not found");
    return;
  }
  
  if (typeof Chart === 'undefined') {
    console.error("Chart.js library not loaded");
    return;
  }
  
  const ctx = canvas.getContext('2d');
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