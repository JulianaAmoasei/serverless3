module.exports.cadastrarAlunosNoBd = async (aluno) => {
  const res = await fetch("http://curso-serverless2-api-65783251.us-east-1.elb.amazonaws.com/alunos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "PUT,POST,GET",
      },
      body: aluno,
    }
  );
  return {
    statusCode: res.status,
  };
}
