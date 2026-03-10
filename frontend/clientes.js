// =======================================
// 🌐 CONFIG
// =======================================

const API_URL = "/clientes";
const clientesAPI = createCrud(API_URL);

const form = document.getElementById("formClientes");
const tabela = document.getElementById("tabelaClientes");

document.addEventListener("DOMContentLoaded", carregarClientes);

// =======================================
// 📥 LISTAR
// =======================================

async function carregarClientes() {
    try {
        const dados = await clientesAPI.getAll();

        tabela.innerHTML = "";

        dados.forEach(c => {
            tabela.innerHTML += `
                <tr>
                    <td>${c.nome}</td>
                    <td>${c.telefone || "-"}</td>
                    <td>${c.email || "-"}</td>
                    <td>
                        <button class="btn-edit" onclick="editar(${c.id})">
                            Editar
                        </button>
                        <button class="btn-delete" onclick="confirmarExclusao(${c.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}

// =======================================
// 💾 SALVAR
// =======================================

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("clienteId").value;

    const dados = {
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value
    };

    try {

        if (id) {
            await clientesAPI.update(id, dados);
        } else {
            await clientesAPI.create(dados);
        }

        form.reset();
        document.getElementById("clienteId").value = "";
        carregarClientes();

    } catch (error) {
        console.error("Erro ao salvar cliente:", error);
    }
});

// =======================================
// ✏️ EDITAR
// =======================================

async function editar(id) {
    try {
        const c = await clientesAPI.getById(id);

        document.getElementById("clienteId").value = c.id;
        document.getElementById("nome").value = c.nome;
        document.getElementById("telefone").value = c.telefone || "";
        document.getElementById("email").value = c.email || "";

        window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
    }
}

// =======================================
// ❌ CONFIRMAR EXCLUSÃO
// =======================================

function confirmarExclusao(id) {

    openActionModal({
        title: "Excluir Cliente",
        message: "Essa ação não poderá ser desfeita.",
        confirmText: "Sim, excluir",
        type: "danger",
        onConfirm: async () => {

            try {
                await clientesAPI.remove(id);
                carregarClientes();

            } catch (error) {
                console.error("Erro ao excluir cliente:", error);
            }

        }
    });
}
