const { connectRabbitMQ, createChannel } = require('../config/rabbitmqConnection')
const config = require('../config/config.json')

const queueName = config.queue.email;

module.exports.emailProducer = async (event, context) => {
  const connection = await connectRabbitMQ();
  const channel = await createChannel(connection);

  // const message = event.body;
  const messageBodyJson = JSON.parse(event.body)
  const messageString = JSON.stringify(messageBodyJson.email)

  channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(messageString));

  // mandou pra fila, agora tem que fazer uma requisição http para disparar o evento de consumer

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message sent to RabbitMQ' }),
  };
};
