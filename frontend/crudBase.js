// =======================================
// 🧠 CRUD BASE REUTILIZÁVEL
// =======================================

function createCrud(baseURL) {

    async function getAll() {
        const response = await fetch(baseURL);
        return await response.json();
    }

    async function getById(id) {
        const response = await fetch(`${baseURL}/${id}`);
        return await response.json();
    }

    async function create(data) {
        const response = await fetch(baseURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        return await response.json();
    }

    async function update(id, data) {
        const response = await fetch(`${baseURL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        return await response.json();
    }

    async function remove(id) {
        const response = await fetch(`${baseURL}/${id}`, {
            method: "DELETE"
        });

        return await response.json();
    }

    return {
        getAll,
        getById,
        create,
        update,
        remove
    };
}