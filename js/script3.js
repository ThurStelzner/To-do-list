const input = document.querySelector("#tarefa");
const btn = document.querySelector("#btnSubmit");
const ul = document.querySelector("#lista");
const limpa = document.querySelector("#limpar")
const btnModo = document.querySelector("#modo")
const body = document.querySelector("body")

function obterTarefa() {
    const dados = localStorage.getItem("Tarefas");
    return dados ? JSON.parse(dados) : [];
}

function salvarTarefa(tarefa) {
    localStorage.setItem("Tarefas", JSON.stringify(tarefa));
}

function mostrarLista() {
    ul.innerHTML = ''
    const tarefas = obterTarefa()
    tarefas.forEach((nome, index) => {
        const li = document.createElement("li")
        li.innerHTML = `
            ${nome.nome} <button type='submit' class='remover btn danger ex' data-index='${index}'>X</button>
        `
        ul.appendChild(li)
    });
};

btn.addEventListener('click', (e) => {
    e.preventDefault();

    if(!input.value.length == 0) {
        const tarefas = obterTarefa()

        const novaTarefa = {
            nome: input.value
        };

        tarefas.push(novaTarefa);
        salvarTarefa(tarefas);
        mostrarLista();

        input.value = '';
    } else {
        alert("Preencha o campo de tarefas")
    }
});

ul.addEventListener('click', (e) => {
    if(e.target.classList.contains('remover')) {
        const index = e.target.getAttribute('data-index');
        const tarefa = obterTarefa();
        tarefa.splice(index, 1);

        salvarTarefa(tarefa);
        mostrarLista();
    }
})

limpa.addEventListener('click', () => {
    const tarefa = obterTarefa();
    while(tarefa.length) {
        tarefa.pop();
    };
    salvarTarefa(tarefa);
    mostrarLista();
})

btnModo.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const modoEscuroAtivo = body.classList.contains('dark-mode');

    if (modoEscuroAtivo) {
        btnModo.textContent = '☀︎ Modo Claro';
        localStorage.setItem("tema", "escuro");
    } else {
        btnModo.textContent = '⏾ Modo Escuro';
        localStorage.setItem("tema", "claro");
    }
});

mostrarLista()