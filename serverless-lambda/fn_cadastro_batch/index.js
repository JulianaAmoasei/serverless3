const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { converteDadosCsv } = require("./converteDadosCsv");
const config = require("../config/config.json")
const { buildFetchObj } = require("../utils/fetchHelper")

async function criaClienteS3() {

  if(process.env.STAGE === "dev") {
    return new S3Client({
      forcePathStyle: true,
      credentials: {
        accessKeyId: "S3RVER",
        secretAccessKey: "S3RVER"
      },
      endpoint: "http://localhost:4569"
    });
  } 
  else if (process.env.STAGE === "prod") {
    return new S3Client({});
  }
}

async function obtemDadosDoCsvDoBucket(nome, chave) {

  const cliente = await criaClienteS3()

  const comando = new GetObjectCommand({
    Bucket: nome,
    Key: chave
  });

  const resposta = await cliente.send(comando);
  const dadosCsv = await resposta.Body.transformToString("utf-8");

  return dadosCsv;
}

async function cadastrarAlunos (evento) {
  try {
    const eventoS3 = evento.Records[0].s3;

    const nomeBucket = eventoS3.bucket.name;
    const chaveBucket = decodeURIComponent(eventoS3.object.key.replace(/\+/g, " "));
    const dadosArquivo = await obtemDadosDoCsvDoBucket(nomeBucket, chaveBucket);
    const alunos = await converteDadosCsv(dadosArquivo);

    const alunosPromessas = alunos.map((aluno) => {
      // vai ser substituído por um trigger do rabbit ao invés de http
      const fetchObj = buildFetchObj("POST", "application/json", JSON.stringify(aluno))
      return fetch(`${config.fetchApi.dev}/rabbit`, fetchObj)
    });
  
    const respostas = await Promise.all(alunosPromessas);

    return respostas;
  
  } catch (erro) {
    console.log(erro);
  }
};

module.exports = {
  criaClienteS3,
  cadastrarAlunos
}