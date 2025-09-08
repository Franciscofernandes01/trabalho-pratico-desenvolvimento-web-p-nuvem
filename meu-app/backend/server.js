import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import Tarefa from "./models/tarefas.js";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Configurar __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 🔹 Servir frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// 🔗 Conectar ao MongoDB Atlas
const MONGO_URI = "mongodb+srv://franciscofernandes10_db_user:ObBP4uqp2nYR8nEn@cluster0.acqlt5x.mongodb.net/";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado ao MongoDB Atlas"))
.catch(err => console.error("❌ Erro ao conectar:", err));

// 🔹 Rotas da API (prefixo /api)
app.get("/api", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

app.post("/api/tarefas", async (req, res) => {
  try {
    const tarefa = new Tarefa({ titulo: req.body.titulo });
    await tarefa.save();
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao salvar tarefa" });
  }
});

app.get("/api/tarefas", async (req, res) => {
  const tarefas = await Tarefa.find().sort({ _id: -1 });
  res.json(tarefas);
});

// 🔹 Fallback: qualquer outra rota retorna index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// 🔹 Porta dinâmica para Render ou padrão 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
