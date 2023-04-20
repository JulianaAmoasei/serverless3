import mongoose from "mongoose";

const alunoSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String,
      required: [true, "O nome é obrigatório"]
    },
    email: {
      type: String,
      required: [true, "O e-mail é obrigatório"],
      unique: true,
      validate: {
        validator: (valor) => {
          return /^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(valor);
        },
        message: "Please enter a valid email"
      }
    }
  },
  {
    versionKey: false
  }
);

const alunos = mongoose.model("alunos", alunoSchema);

export default alunos;