const config = require('../config/config.json')
const { buildFetchObj } = require('../utils/fetchHelper')
const { connectRabbitMQ, createChannel } = require('../config/rabbitmqConnection')

const queueName = config.queue.cadastro;

module.exports.worker = async (event, context) => {
  const connection = await connectRabbitMQ();
  const channel = await createChannel(connection);
  
  channel.assertQueue(queueName, { durable: true });
  channel.prefetch(1);
  
  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      channel.ack(msg);
      const objNovoAluno = JSON.parse(msg.content);
      const fetchObj = buildFetchObj("POST", "application/json", objNovoAluno)
      await fetch(`${config.fetchApi.dev}/api-caller`, fetchObj)
    }
  }, { noAck: false });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'RabbitMQ poll triggered' }),
  };
}
