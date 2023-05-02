const { cadastrarAlunosNoBd } = require('./cadastrarAlunosNoBd')
const config = require('../config/config.json')
const { buildFetchObj } = require('../utils/fetchHelper')

module.exports.apiCaller = async (event) => {
  try {
    const res = await cadastrarAlunosNoBd(event.body)
    if (res.statusCode === 201) {
      // aqui entra o trigger e a mensagem rabbit para envio de email
      const fetchObj = buildFetchObj("POST", "application/json", event.body) //já é string
      await fetch(`${config.fetchApi.dev}/rabbit-email`, fetchObj)
    }

    return {
      status: res.statusCode 
    }
  } catch (erro) {
    console.log(erro)
  }
}