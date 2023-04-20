import express from "express";
import AlunoController from "../controllers/alunosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/alunos", AlunoController.listarAlunos, paginar)
  .get("/alunos/:id", AlunoController.listarAlunoPorId)
  .post("/alunos", AlunoController.cadastrarAluno)
  .put("/alunos/:id", AlunoController.atualizarAluno)
  .delete("/alunos/:id", AlunoController.excluirAluno);

export default router;