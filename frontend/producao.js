// =======================================
// 🌐 CONFIG
// =======================================

const API_URL = "/producao";
const producaoAPI = createCrud(API_URL);

const form = document.getElementById("formProducao");
const tabela = document.getElementById("tabelaProducoes");

document.addEventListener("DOMContentLoaded", carregarProducoes);


// =======================================
// 📥 LISTAR PRODUÇÕES
// =======================================

async function carregarProducoes() {
    try {
        const dados = await producaoAPI.getAll();

        tabela.innerHTML = "";

        dados.forEach(p => {
            tabela.innerHTML += `
                <tr>
                    <td>${formatarData(p.data)}</td>
                    <td>${p.cultura}</td>
                    <td>${p.quantidade} Kg</td>
                    <td>${p.observacao || "-"}</td>
                    <td>
                        <button class="btn-edit" onclick="editar(${p.id})">
                            Editar
                        </button>
                        <button class="btn-delete" onclick="confirmarExclusao(${p.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Erro ao carregar produções:", error);
    }
}


// =======================================
// 💾 SALVAR (CRIAR OU EDITAR)
// =======================================

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("producaoId").value;

    const dados = {
        data: document.getElementById("data").value,
        cultura: document.getElementById("cultura").value,
        quantidade: document.getElementById("quantidade").value,
        observacao: document.getElementById("observacao").value
    };

    if (id) {
        confirmarEdicao(id, dados);
    } else {
        try {
            await producaoAPI.create(dados);
            form.reset();
            carregarProducoes();
        } catch (error) {
            console.error("Erro ao criar produção:", error);
        }
    }
});


// =======================================
// ✏️ EDITAR (CARREGA NO FORM)
// =======================================

async function editar(id) {
    try {
        const p = await producaoAPI.getById(id);

        document.getElementById("producaoId").value = p.id;
        document.getElementById("data").value = p.data;
        document.getElementById("cultura").value = p.cultura;
        document.getElementById("quantidade").value = p.quantidade;
        document.getElementById("observacao").value = p.observacao;

        window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {
        console.error("Erro ao buscar produção:", error);
    }
}


// =======================================
// 💾 CONFIRMAR EDIÇÃO (MODAL)
// =======================================

function confirmarEdicao(id, dados) {

    openActionModal({
        title: "Salvar Alterações",
        message: "Deseja realmente salvar as alterações realizadas?",
        confirmText: "Salvar",
        type: "success",
        onConfirm: async () => {

            try {
                await producaoAPI.update(id, dados);

                form.reset();
                document.getElementById("producaoId").value = "";

                carregarProducoes();

            } catch (error) {
                console.error("Erro ao atualizar produção:", error);
            }

        }
    });
}


// =======================================
// ❌ CONFIRMAR EXCLUSÃO (MODAL)
// =======================================

function confirmarExclusao(id) {

    openActionModal({
        title: "Excluir Produção",
        message: "Essa ação não poderá ser desfeita. Deseja continuar?",
        confirmText: "Sim, excluir",
        type: "danger",
        onConfirm: async () => {

            try {
                await producaoAPI.remove(id);
                carregarProducoes();

            } catch (error) {
                console.error("Erro ao excluir produção:", error);
            }

        }
    });
}


// =======================================
// 📅 FORMATAR DATA
// =======================================

function formatarData(data) {
    return new Date(data).toLocaleDateString("pt-BR");
}
