// =====================================================
// 🔐 1. PROTEÇÃO DE ACESSO
// =====================================================

const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!usuario) {
    window.location.href = "index.html";
}


// =====================================================
// 🚀 2. INICIALIZAÇÃO GERAL
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    atualizarUsuarioUI();
    controlarMenuAtivo();
    inicializarModais();
    inicializarMenuMobile();
    carregarDashboard(); // Só executa se existir gráfico

});


// =====================================================
// 👤 3. ATUALIZAÇÃO DA UI DO USUÁRIO
// =====================================================

function atualizarUsuarioUI() {

    const nomeSidebar = document.querySelector(".user-text strong");
    const cargoSidebar = document.querySelector(".user-text span");

    if (nomeSidebar) nomeSidebar.textContent = usuario.nome;

    if (cargoSidebar) {
        cargoSidebar.textContent =
            usuario.role === "admin"
                ? "Administrador"
                : "Usuário";
    }

    const profileDetails = document.querySelector(".profile-detail");

    if (profileDetails) {
        profileDetails.innerHTML = `
            <p><strong>Nome:</strong> ${usuario.nome}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Acesso:</strong> ${usuario.role}</p>
        `;
    }

    // 🛡️ Controle de permissão (oculta menu se não for admin)
    if (usuario.role !== "admin") {
        const fornecedores = document.querySelector(".menu a[href='fornecedores.html']");
        const clientes = document.querySelector(".menu a[href='clientes.html']");

        if (fornecedores) fornecedores.style.display = "none";
        if (clientes) clientes.style.display = "none";
    }
}


// =====================================================
// 📌 4. CONTROLE DE MENU ATIVO
// =====================================================

function controlarMenuAtivo() {

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".menu-item").forEach(item => {
        const link = item.getAttribute("href");
        if (link === currentPage) {
            item.classList.add("active");
        }
    });
}


// =====================================================
// 🪟 5. CONTROLE DE MODAIS (PERFIL / LOGOUT)
// =====================================================

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "flex";
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}

function inicializarModais() {

    const btnUserModal = document.getElementById("btnUserModal");
    const btnLogoutModal = document.getElementById("btnLogoutModal");

    if (btnUserModal) {
        btnUserModal.addEventListener("click", () => openModal("userModal"));
    }

    if (btnLogoutModal) {
        btnLogoutModal.addEventListener("click", () => openModal("logoutModal"));
    }
}


// =====================================================
// ⚠️ 6. MODAL GLOBAL DE CONFIRMAÇÃO (CRUD)
// =====================================================

let confirmCallback = null;

function openActionModal({
    title = "Confirmar ação",
    message = "Deseja continuar?",
    confirmText = "Confirmar",
    type = "danger",
    onConfirm
}) {

    const titleEl = document.getElementById("modalTitle");
    const messageEl = document.getElementById("modalMessage");
    const icon = document.getElementById("modalIcon");
    const confirmBtn = document.getElementById("modalConfirmBtn");
    const modal = document.getElementById("actionModal");

    if (!modal) return;

    titleEl.innerText = title;
    messageEl.innerText = message;

    confirmBtn.innerText = confirmText;
    confirmBtn.style.background = "";

    if (type === "danger") {
        icon.className = "ph ph-warning-circle";
        icon.style.color = "#ef4444";
        confirmBtn.style.background = "#ef4444";
    }

    if (type === "success") {
        icon.className = "ph ph-check-circle";
        icon.style.color = "#10b981";
        confirmBtn.style.background = "#10b981";
    }

    confirmCallback = onConfirm;

    modal.style.display = "flex";
}

function closeActionModal() {
    const modal = document.getElementById("actionModal");
    if (modal) modal.style.display = "none";
    confirmCallback = null;
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "modalConfirmBtn") {
        if (confirmCallback) confirmCallback();
        closeActionModal();
    }
});


// =====================================================
// 🚪 7. LOGOUT
// =====================================================

function confirmLogout() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}


// =====================================================
// 📱 8. MENU MOBILE
// =====================================================

function inicializarMenuMobile() {

    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");

    if (!menuToggle || !sidebar) return;

    menuToggle.addEventListener("click", () => {

        sidebar.classList.toggle("active");

        const icon = menuToggle.querySelector("i");
        if (icon) {
            icon.classList.toggle("ph-list");
            icon.classList.toggle("ph-x");
        }
    });
}


// =====================================================
// 📊 9. DASHBOARD REAL (API)
// =====================================================

let grafico;

async function carregarDashboard() {

    const chartElement = document.getElementById("productionChart");
    if (!chartElement) return;

    try {

        const response = await fetch("http://localhost:3000/dashboard");
        const data = await response.json();

        const totalProducoesEl = document.getElementById("totalProducoes");
        const totalKgEl = document.getElementById("totalKg");

        if (totalProducoesEl)
            totalProducoesEl.textContent = data.totalProducoes;

        if (totalKgEl)
            totalKgEl.textContent = data.totalKg + " Kg";

        const labels = data.porProduto.map(p => p.produto || "Sem nome");
        const valores = data.porProduto.map(p => p.total);

        const ctx = chartElement.getContext("2d");

        if (grafico) {
            grafico.destroy();
        }

        grafico = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Produção por Produto (Kg)",
                    data: valores,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                }
            }
        });

    } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
    }
    document.addEventListener("DOMContentLoaded", carregarDashboard);
}