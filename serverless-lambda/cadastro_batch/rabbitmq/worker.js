const { connectRabbitMQ, createChannel } = require('../../rabbitmqConfig/connection')

const queueName = 'cadastro';

module.exports.worker = async (event, context) => {
  const connection = await connectRabbitMQ();
  const channel = await createChannel(connection);

  channel.assertQueue(queueName, { durable: true });
  channel.prefetch(1);

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      channel.ack(msg);
      const objNovoAluno = JSON.parse(msg.content);

      await fetch("http://localhost:3001/dev/api-caller", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "PUT,POST,GET",
          },
          body: JSON.stringify(objNovoAluno)
        })
    }
  }, { noAck: false });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'RabbitMQ poll triggered' }),
  };
}
