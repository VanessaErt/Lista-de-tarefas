document.addEventListener('DOMContentLoaded', function() {
    const inputNovaTarefa = document.getElementById('inputNovaTarefa');
    const listaTarefas = document.getElementById('listaTarefas');

    // Função para adicionar uma nova tarefa
    function adicionarTarefa() {
        const tarefaNome = inputNovaTarefa.value.trim();
        if (tarefaNome !== '') {
            const li = document.createElement('li');
            li.innerText = tarefaNome;
            li.classList.add('tarefa');
            listaTarefas.appendChild(li);
            inputNovaTarefa.value = '';
            configurarTarefa(li);
            salvarTarefas(); // Salvando tarefas após adicionar uma nova
        }
    }

    // Função para marcar/desmarcar uma tarefa como concluída
    function toggleConcluida(tarefa) {
        tarefa.classList.toggle('concluida');
        salvarTarefas(); // Salvando tarefas após marcar/desmarcar como concluída
    }

    // Função para excluir uma tarefa
    function excluirTarefa(tarefa) {
        tarefa.remove();
        salvarTarefas(); // Salvando tarefas após excluir uma
    }

    // Função para configurar uma nova tarefa
    function configurarTarefa(tarefa) {
        // Adicionar evento de clique para marcar/desmarcar como concluída
        tarefa.addEventListener('click', function() {
            toggleConcluida(tarefa);
        });

        // Adicionar evento de clique para excluir a tarefa
        const excluirBtn = document.createElement('button');
        excluirBtn.innerHTML = '<i class="fa fa-trash"></i>';
        excluirBtn.classList.add('excluir-btn');
        excluirBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            excluirTarefa(tarefa);
        });
        tarefa.appendChild(excluirBtn);
    }

    // Adicionar evento de clique para adicionar uma nova tarefa
    document.getElementById('btnAddTarefa').addEventListener('click', function() {
        adicionarTarefa();
    });

    // Adicionar evento de tecla para o inputNovaTarefa
    inputNovaTarefa.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            adicionarTarefa();
        }
    });

    // Configurar tarefas existentes
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(function(tarefaNome) {
        const li = document.createElement('li');
        li.innerText = tarefaNome;
        li.classList.add('tarefa');
        listaTarefas.appendChild(li);
        configurarTarefa(li);
    });

    // Função para salvar as tarefas no armazenamento local
    function salvarTarefas() {
        const tarefas = [];
        const tarefasNodes = document.querySelectorAll('.tarefa');
        tarefasNodes.forEach(function(tarefa) {
            tarefas.push(tarefa.innerText);
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
});
