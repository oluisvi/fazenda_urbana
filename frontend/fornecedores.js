// =======================================
// 🌐 CONFIG
// =======================================

const API_URL = "/fornecedores";
const fornecedoresAPI = createCrud(API_URL);

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formFornecedores");
    const tabela = document.getElementById("tabelaFornecedores");

    carregarFornecedores();

    // =======================================
    // 📥 LISTAR
    // =======================================

    async function carregarFornecedores() {
        try {
            const dados = await fornecedoresAPI.getAll();

            tabela.innerHTML = "";

            dados.forEach(f => {
                tabela.innerHTML += `
                    <tr>
                        <td>${f.nome}</td>
                        <td>${f.cnpj || "-"}</td>
                        <td>${f.telefone || "-"}</td>
                        <td>${f.email || "-"}</td>
                        <td>
                            <button class="btn-edit" onclick="editar(${f.id})">
                                Editar
                            </button>
                            <button class="btn-delete" onclick="confirmarExclusao(${f.id})">
                                Excluir
                            </button>
                        </td>
                    </tr>
                `;
            });

        } catch (error) {
            console.error("Erro ao carregar fornecedores:", error);
        }
    }

    // =======================================
    // 💾 SALVAR
    // =======================================

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = document.getElementById("fornecedorId").value;

        const dados = {
            nome: document.getElementById("nome").value,
            cnpj: document.getElementById("cnpj").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value
        };

        try {

            if (id) {
                await fornecedoresAPI.update(id, dados);
            } else {
                await fornecedoresAPI.create(dados);
            }

            form.reset();
            document.getElementById("fornecedorId").value = "";
            carregarFornecedores();

        } catch (error) {
            console.error("Erro ao salvar fornecedor:", error);
        }
    });

    // =======================================
    // ✏️ EDITAR
    // =======================================

    window.editar = async function (id) {
        try {
            const f = await fornecedoresAPI.getById(id);

            document.getElementById("fornecedorId").value = f.id;
            document.getElementById("nome").value = f.nome;
            document.getElementById("cnpj").value = f.cnpj || "";
            document.getElementById("telefone").value = f.telefone || "";
            document.getElementById("email").value = f.email || "";

            window.scrollTo({ top: 0, behavior: "smooth" });

        } catch (error) {
            console.error("Erro ao buscar fornecedor:", error);
        }
    };

    // =======================================
    // ❌ CONFIRMAR EXCLUSÃO
    // =======================================

    window.confirmarExclusao = function (id) {

        openActionModal({
            title: "Excluir Fornecedor",
            message: "Essa ação não poderá ser desfeita.",
            confirmText: "Sim, excluir",
            type: "danger",
            onConfirm: async () => {

                try {
                    await fornecedoresAPI.remove(id);
                    carregarFornecedores();

                } catch (error) {
                    console.error("Erro ao excluir fornecedor:", error);
                }

            }
        });
    };

});
