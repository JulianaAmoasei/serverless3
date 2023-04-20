import NaoEncontrado from "../erros/NaoEncontrado.js";
import { alunos } from "../models/index.js";

class AlunoController {
  static listarAlunos = async (req, res, next) => {
    try {
      const alunosResultado = alunos.find();

      req.resultado = alunosResultado;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarAlunoPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const alunoResultado = await alunos.findById(id);

      if (alunoResultado !== null) {
        res.status(200).send(alunoResultado);
      } else {
        next(new NaoEncontrado("Id do Aluno não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAluno = async (req, res, next) => {
    try {
      let aluno = new alunos(req.body);

      const alunoResultado = await aluno.save();

      res.status(201).send(alunoResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAluno = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const alunoResultado = await alunos.findByIdAndUpdate(id, {$set: req.body});

      if (alunoResultado !== null) {
        res.status(200).send({message: "Aluno atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Aluno não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static excluirAluno = async (req, res, next) => {
    try {
      const id = req.params.id;

      const alunoResultado = await alunos.findByIdAndDelete(id);


      if (alunoResultado !== null) {
        res.status(200).send({message: "Aluno removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Aluno não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AlunoController;