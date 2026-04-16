# 📝 To-Do List Web App

Aplicação web de lista de tarefas desenvolvida com HTML, CSS e JavaScript puro (Vanilla JS), com foco em boas práticas de desenvolvimento, organização de código e clareza arquitetural.

Este projeto foi construído com o objetivo de consolidar fundamentos essenciais de desenvolvimento front-end, simulando um cenário real de aplicação simples, porém bem estruturada.

---

## 🚀 Funcionalidades

A aplicação permite ao usuário:

- Adicionar novas tarefas com descrição  
- Definir prioridade (Alta, Média ou Baixa)  
- Visualizar tarefas dinamicamente na interface  
- Marcar tarefas como concluídas  
- Excluir tarefas individualmente  
- Limpar todas as tarefas concluídas  
- Filtrar tarefas por status:  
  - Todas  
  - Pendentes  
  - Concluídas  
- Visualizar indicadores em tempo real:  
  - Total de tarefas  
  - Tarefas pendentes  
  - Tarefas concluídas  
- Persistir dados localmente utilizando localStorage  

---

## 🧠 Conceitos e Práticas Aplicadas

### JavaScript

- Manipulação do DOM  
- Event Handling (addEventListener)  
- Estruturação de dados com objetos  
- Métodos funcionais (map, filter)  
- Geração de identificadores únicos (crypto.randomUUID)  
- Separação de responsabilidades por função  

### Arquitetura e Organização

- Separação clara de camadas:  
  - Estrutura (HTML)  
  - Estilo (CSS)  
  - Lógica (JavaScript)  
- Funções pequenas e reutilizáveis  
- Nomeação semântica (clean code)  
- Baixo acoplamento entre partes do sistema  

### Persistência

- Armazenamento local via localStorage  
- Serialização com JSON.stringify e JSON.parse  

---

## 📁 Estrutura do Projeto

### Arquivos principais

- index.html — Estrutura da aplicação  
- style.css — Estilização e layout  
- script.js — Lógica da aplicação  
- README.md — Documentação do projeto  

---

## ▶️ Como Executar

### Passo a passo

1. Faça o download ou clone do repositório:

git clone https://github.com/seu-usuario/todo-list.git

2. Acesse a pasta do projeto  

3. Abra o arquivo index.html em qualquer navegador moderno  

---

## ⚠️ Observações Técnicas

- Os dados são armazenados no navegador do usuário  
- Ao limpar o cache/localStorage, as tarefas serão perdidas  
- Não há integração com backend ou banco de dados externo  

---

## 📈 Possíveis Evoluções

### Melhorias sugeridas

- Implementar edição de tarefas  
- Adicionar datas e prazos (deadline)  
- Criar modo escuro (dark mode)  
- Integrar com API (Node.js, Firebase, etc.)  
- Implementar autenticação de usuários  
- Persistência em banco de dados real  

---

## 👨‍💻 Autor

Leonardo Felix  

---

## 📄 Licença

Este projeto é de uso livre para fins educacionais e de estudo.