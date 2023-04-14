const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { fromIni } = require("@aws-sdk/credential-providers");

module.exports.geraUrlPreassinada = async (chaveArquivo) => {

  const s3Payload = { credentials: fromIni(), region: "us-east-1"};
  const s3Client = new S3Client(s3Payload)
  const command = new PutObjectCommand({
    Bucket: "alunos-csv",
    Key: chaveArquivo
  });

  const preSignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 })
  return preSignedUrl;
}
