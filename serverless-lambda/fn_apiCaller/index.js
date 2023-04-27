const { cadastrarAlunosNoBd } = require('./cadastrarAlunosNoBd')

module.exports.apiCaller = async (event) => {
  try {
    const res = await cadastrarAlunosNoBd(event.body)
    return {
      status: res.statusCode 
    }
  } catch (erro) {
    console.log(erro)
  }
}