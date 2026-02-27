// ===============================
// 🔐 1. PROTEÇÃO DE ACESSO
// ===============================

const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    window.location.href = "index.html";
}


// ===============================
// 👤 2. QUANDO A PÁGINA CARREGAR
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // Atualiza nome na sidebar
    const nomeSidebar = document.querySelector(".user-text strong");
    const cargoSidebar = document.querySelector(".user-text span");

    if (nomeSidebar) nomeSidebar.textContent = usuario.nome;

    if (cargoSidebar) {
        cargoSidebar.textContent =
            usuario.role === "admin"
                ? "Administrador"
                : "Usuário";
    }

    // Atualiza modal de perfil
    const profileDetails = document.querySelector(".profile-detail");

    if (profileDetails) {
        profileDetails.innerHTML = `
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Acesso:</strong> ${usuario.role}</p>
        `;
    }

    // 🛡️ Controle de permissão (usuário comum não vê algumas opções)
    if (usuario.role !== "admin") {
        const fornecedores = document.querySelector(".menu-item:nth-child(3)");
        const clientes = document.querySelector(".menu-item:nth-child(4)");

        if (fornecedores) fornecedores.style.display = "none";
        if (clientes) clientes.style.display = "none";
    }
});


// ===============================
// 🪟 3. CONTROLE DE MODAIS
// ===============================

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "flex";
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}

const btnUserModal = document.getElementById('btnUserModal');
const btnLogoutModal = document.getElementById('btnLogoutModal');

if (btnUserModal) {
    btnUserModal.addEventListener('click', () => openModal('userModal'));
}

if (btnLogoutModal) {
    btnLogoutModal.addEventListener('click', () => openModal('logoutModal'));
}


// ===============================
// 🚪 4. LOGOUT REAL
// ===============================

function confirmLogout() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}


// ===============================
// 📱 5. MENU MOBILE
// ===============================

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');

        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('ph-list');
            icon.classList.toggle('ph-x');
        }
    });
}


// ===============================
// 📊 6. GRÁFICO (Chart.js)
// ===============================

const chartElement = document.getElementById('productionChart');

if (chartElement) {
    const ctx = chartElement.getContext('2d');

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
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            }
        }
    });
}