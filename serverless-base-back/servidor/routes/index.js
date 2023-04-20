import express from "express";
import alunos from "./alunosRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({titulo: "Curso de node"});
  });

  app.use(
    express.json(),
    alunos,
  );
};

export default routes;