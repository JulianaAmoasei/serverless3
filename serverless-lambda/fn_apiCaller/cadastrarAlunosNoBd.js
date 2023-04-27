const config = require('../config/config.json')
const { buildFetchObj } = require('../utils/fetchHelper')

module.exports.cadastrarAlunosNoBd = async (aluno) => {
  const fetchObj = buildFetchObj("POST", "application/json", aluno)
  const res = await fetch(`${config.fetchApi.prod}/alunos`, fetchObj);
  return {
    statusCode: res.status,
  };
}
