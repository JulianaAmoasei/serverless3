const { connectRabbitMQ, createChannel } = require('../../rabbitmqConfig/connection')

const queueName = 'cadastro';

module.exports.taskCadastro = async (event, context) => {
  const connection = await connectRabbitMQ();
  const channel = await createChannel(connection);

  const message = JSON.stringify(event.body);

  channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(message));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message sent to RabbitMQ' }),
  };
};