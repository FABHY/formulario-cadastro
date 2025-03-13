const apiUrl = "http://localhost:5000";

// Função para salvar os dados no backend

async function salvarCadastro() {
    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;
    let cidade = document.getElementById("cidade").value;
    let estado = document.getElementById("estado").value;

    if (!nome || !endereco || !telefone || !email || !cidade || !estado) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let dados = { nome, endereco, telefone, email, cidade, estado };

    try {
        let response = await fetch("http://localhost:5000/salvar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        let result = await response.json();
        
        if (response.ok) {
            alert(result.message);
            // Limpar os campos após o cadastro
            document.getElementById("nome").value = "";
            document.getElementById("endereco").value = "";
            document.getElementById("telefone").value = "";
            document.getElementById("email").value = "";
            document.getElementById("cidade").value = "";
            document.getElementById("estado").value = "";
        } else {
            // Exibe o erro retornado pelo servidor (duplicidade de email)
            alert(result.message);
        }

    } catch (error) {
        console.error("Erro ao salvar:", error);
    }
}


// Função para carregar um cadastro e preencher o formulário
async function editarCadastro() {
    let id = prompt("Digite o ID do cadastro para editar:");

    if (!id) return;

    try {
        let response = await fetch(`${apiUrl}/usuario/${id}`);
        let dados = await response.json();

        if (!dados) {
            alert("Cadastro não encontrado!");
            return;
        }

        document.getElementById("nome").value = dados.nome;
        document.getElementById("endereco").value = dados.endereco;
        document.getElementById("telefone").value = dados.telefone;
        document.getElementById("email").value = dados.email;
        document.getElementById("cidade").value = dados.cidade;
        document.getElementById("estado").value = dados.estado;

        let confirmacao = confirm("Deseja salvar as alterações?");
        if (confirmacao) {
            let novosDados = {
                nome: document.getElementById("nome").value,
                endereco: document.getElementById("endereco").value,
                telefone: document.getElementById("telefone").value,
                email: document.getElementById("email").value,
                cidade: document.getElementById("cidade").value,
                estado: document.getElementById("estado").value,
            };

            await fetch(`${apiUrl}/editar/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novosDados),
            });

            alert("Cadastro atualizado!");
        }
    } catch (error) {
        console.error("Erro ao editar:", error);
    }
}
