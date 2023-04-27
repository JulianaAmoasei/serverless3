const { fazUploadNoBucket } = require("./servidorS3");

async function simulandoUploadDoCsv (evento) {
  try {
    await fazUploadNoBucket();

    return {
      statusCode: 200,
      body: JSON.stringify({
        mensagem: "Simulando upload de arquivo..."
      })
    };
  } catch (erro) {
    return {
      statusCode: erro.statusCode || 500,
      body: JSON.stringify(erro)
    };
  }
}

module.exports = { simulandoUploadDoCsv }