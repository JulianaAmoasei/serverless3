const { geraUrlPreassinada } = require("./geradorUrl");

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
}

async function geraResposta (status, body) {
  return {
    statusCode: status,
    headers: headers,
    body: JSON.stringify({ url: body }),
  }
}

function extractBody(event) {
  if (!event?.body) {
    return buildResponse(422, { error: 'Missing body' })
  }
  return JSON.parse(event.body)
}

module.exports.enviaUrlPreassinada = async (evento) => {
  const { nomeArquivo } = extractBody(evento)
  const url = await geraUrlPreassinada(nomeArquivo)
  
  return geraResposta(201, url)
}