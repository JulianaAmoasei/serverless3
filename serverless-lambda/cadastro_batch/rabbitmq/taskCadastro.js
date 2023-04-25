const amqp = require('amqplib/callback_api');

const rabbitmqURL = 'amqp://localhost';
const queueName = 'cadastro';

async function connectRabbitMQ() {
  return new Promise((resolve, reject) => {
    amqp.connect(rabbitmqURL, (error, connection) => {
      if (error) {
        reject(error);
      } else {
        resolve(connection);
      }
    });
  });
}

async function createChannel(connection) {
  return new Promise((resolve, reject) => {
    connection.createChannel((error, channel) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
}

module.exports.taskCadastro = async (event, context) => {
  const connection = await connectRabbitMQ();
  const channel = await createChannel(connection);

  const message = 'arquivo taskCadastro';

  console.log("agora está na task", event);

  channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(message));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message sent to RabbitMQ' }),
  };
};