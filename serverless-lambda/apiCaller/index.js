const { cadastrarAlunosNoBd } = require('./cadastrarAlunosNoBd')

module.exports.apiCaller = async (event) => {
  console.log("AQUI ESTOU MAIS UM DIA");
  console.log("EVENTO", event.body);

  const cadastro = await cadastrarAlunosNoBd(event.body)
}