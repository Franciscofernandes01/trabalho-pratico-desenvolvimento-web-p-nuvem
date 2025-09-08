const API_URL = "/api/tarefas";

const form = document.getElementById("form");
const tituloInput = document.getElementById("titulo");
const lista = document.getElementById("lista");

// Carregar tarefas ao abrir a página
async function carregarTarefas() {
  const res = await fetch(API_URL);
  const tarefas = await res.json();
  lista.innerHTML = "";
  tarefas.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.titulo;
    lista.appendChild(li);
  });
}

// Adicionar nova tarefa
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const titulo = tituloInput.value;
  if (!titulo) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo })
  });

  tituloInput.value = "";
  carregarTarefas();
});

// Inicializar
carregarTarefas();
