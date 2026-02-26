// 1. Controle de Modais
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

document.getElementById('btnUserModal').addEventListener('click', () => openModal('userModal'));
document.getElementById('btnLogoutModal').addEventListener('click', () => openModal('logoutModal'));


function confirmLogout() {
    window.location.href = 'index.html';
}

// 2. Menu Mobile Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('ph-list');
    icon.classList.toggle('ph-x');
});

// 3. Inicialização do Gráfico (Chart.js)
const ctx = document.getElementById('productionChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Produção (Kg)',
            data: [45, 59, 80, 81, 56, 95, 120],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
        }
    }
});