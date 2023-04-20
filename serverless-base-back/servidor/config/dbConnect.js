import mongoose from "mongoose";

if(process.env.ENVIRONMENT === "prod") {
  mongoose.connect(process.env.STRING_CONEXAO_DB, {tlsCAFile: "rds-combined-ca-bundle.pem"});
} else {
  mongoose.connect(process.env.STRING_CONEXAO_DB);
}


let db = mongoose.connection;

export default db;