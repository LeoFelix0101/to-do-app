/*
  ==========================
  CONFIGURAÇÕES GERAIS
  ==========================
*/

// Chave usada para salvar no navegador
const STORAGE_KEY = 'todo-list-tasks';

/*
  ==========================
  SELETORES DO DOM
  ==========================
*/

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const filterSelect = document.getElementById('filter-select');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const feedbackMessage = document.getElementById('feedback-message');
const clearCompletedButton = document.getElementById('clear-completed-btn');

const totalTasksElement = document.getElementById('total-tasks');
const pendingTasksElement = document.getElementById('pending-tasks');
const completedTasksElement = document.getElementById('completed-tasks');

/*
  ==========================
  ESTADO DA APLICAÇÃO
  ==========================
*/

let tasks = loadTasks();

/*
  ==========================
  INICIALIZAÇÃO
  ==========================
*/

renderTasks();
updateSummary();

/*
  ==========================
  EVENTOS
  ==========================
*/

taskForm.addEventListener('submit', handleTaskSubmit);
filterSelect.addEventListener('change', renderTasks);
clearCompletedButton.addEventListener('click', clearCompletedTasks);

/*
  ==========================
  FUNÇÕES PRINCIPAIS
  ==========================
*/

/*
  Disparado ao enviar o formulário
*/
function handleTaskSubmit(event) {
  event.preventDefault();

  const description = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (!isTaskDescriptionValid(description)) {
    showFeedback('Digite pelo menos 3 caracteres.');
    taskInput.focus();
    return;
  }

  const newTask = createTask(description, priority);

  tasks.unshift(newTask);

  persistTasks();
  renderTasks();
  updateSummary();
  resetForm();

  showFeedback('Tarefa adicionada.');
}

/*
  Cria uma nova tarefa padronizada
*/
function createTask(description, priority) {
  return {
    id: crypto.randomUUID(),
    description,
    priority,
    completed: false,
    createdAt: new Date().toLocaleString('pt-BR')
  };
}

/*
  Renderiza a lista na tela
*/
function renderTasks() {
  const filteredTasks = getFilteredTasks();

  taskList.innerHTML = '';

  filteredTasks.forEach((task) => {
    const element = buildTaskElement(task);
    taskList.appendChild(element);
  });

  toggleEmptyState(filteredTasks.length === 0);
}

/*
  Cria o HTML de cada tarefa
*/
function buildTaskElement(task) {
  const li = document.createElement('li');
  li.className = `task-item ${task.completed ? 'completed' : ''}`;

  const content = document.createElement('div');
  content.className = 'task-content';

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.className = 'task-checkbox';

  checkbox.addEventListener('change', () => {
    toggleTaskStatus(task.id);
  });

  // Texto
  const info = document.createElement('div');
  info.className = 'task-info';

  const title = document.createElement('p');
  title.className = 'task-title';
  title.textContent = task.description;

  const meta = document.createElement('div');
  meta.className = 'task-meta';

  const badge = document.createElement('span');
  badge.className = `priority-badge priority-${task.priority}`;
  badge.textContent = formatPriority(task.priority);

  const date = document.createElement('span');
  date.textContent = `Criada em: ${task.createdAt}`;

  meta.append(badge, date);
  info.append(title, meta);

  content.append(checkbox, info);

  // Botão excluir
  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Excluir';
  deleteBtn.className = 'icon-btn delete';

  deleteBtn.addEventListener('click', () => {
    deleteTask(task.id);
  });

  actions.appendChild(deleteBtn);

  li.append(content, actions);

  return li;
}

/*
  Alterna status concluído
*/
function toggleTaskStatus(taskId) {
  tasks = tasks.map(task =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task
  );

  persistTasks();
  renderTasks();
  updateSummary();
}

/*
  Remove tarefa
*/
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);

  persistTasks();
  renderTasks();
  updateSummary();
}

/*
  Limpa concluídas
*/
function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);

  persistTasks();
  renderTasks();
  updateSummary();
}

/*
  ==========================
  FUNÇÕES AUXILIARES
  ==========================
*/

/*
  Filtra tarefas
*/
function getFilteredTasks() {
  const filter = filterSelect.value;

  if (filter === 'pending') {
    return tasks.filter(task => !task.completed);
  }

  if (filter === 'completed') {
    return tasks.filter(task => task.completed);
  }

  return tasks;
}

/*
  Atualiza contadores
*/
function updateSummary() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  totalTasksElement.textContent = total;
  completedTasksElement.textContent = completed;
  pendingTasksElement.textContent = total - completed;
}

/*
  Mostra ou esconde estado vazio
*/
function toggleEmptyState(show) {
  emptyState.style.display = show ? 'block' : 'none';
}

/*
  Validação simples
*/
function isTaskDescriptionValid(text) {
  return text.length >= 3;
}

/*
  Formata prioridade
*/
function formatPriority(priority) {
  const map = {
    alta: 'Alta',
    media: 'Média',
    baixa: 'Baixa'
  };

  return map[priority];
}

/*
  Limpa form
*/
function resetForm() {
  taskForm.reset();
  prioritySelect.value = 'media';
}

/*
  Feedback simples
*/
function showFeedback(msg) {
  feedbackMessage.textContent = msg;
}

/*
  Salva no navegador
*/
function persistTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/*
  Carrega do navegador
*/
function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}