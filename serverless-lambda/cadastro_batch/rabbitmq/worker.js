var amqp = require('amqplib/callback_api');

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

module.exports.worker = async (event, context) => {
  const connection = await connectRabbitMQ();
  const channel = await createChannel(connection);

  channel.assertQueue(queueName, { durable: true });
  channel.prefetch(1);

  channel.consume(queueName, (msg) => {
    if (msg !== null) {
      console.log('Message received:', msg.content.toString());
      channel.ack(msg);

      // Process the message here
    }
  }, { noAck: false });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'RabbitMQ poll triggered' }),
  };
}
