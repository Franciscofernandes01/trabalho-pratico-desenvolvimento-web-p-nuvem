import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Tarefa from "./models/tarefas.js";

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Conectar ao MongoDB Atlas
const MONGO_URI = "mongodb+srv://franciscofernandes10_db_user:ObBP4uqp2nYR8nEn@cluster0.acqlt5x.mongodb.net/";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" Conectado ao MongoDB Atlas"))
.catch(err => console.error(" Erro ao conectar:", err));

// Rota inicial
app.get("/", (req, res) => {
  res.send("API com MongoDB Atlas funcionando ");
});

// Criar tarefa
app.post("/tarefas", async (req, res) => {
  try {
    const tarefa = new Tarefa({ titulo: req.body.titulo });
    await tarefa.save();
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao salvar tarefa" });
  }
});

// Listar tarefas
app.get("/tarefas", async (req, res) => {
  const tarefas = await Tarefa.find().sort({ _id: -1 });
  res.json(tarefas);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
