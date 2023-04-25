const amqp = require('amqplib/callback_api');

const rabbitmqURL = 'amqp://localhost'; // Replace with your RabbitMQ URL
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

module.exports.rabbitmqConsumer = async (event, context) => {
  console.log("EVENTO", event);
  console.log("CONTEXTO", context);
  const connection = await connectRabbitMQ();
  const channel = await createChannel(connection);

  channel.assertQueue(queueName, { durable: true });

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
};

module.exports.rabbitmqProducer = async (event, context) => {
  const connection = await connectRabbitMQ();
  const channel = await createChannel(connection);

  const message = 'Hello RabbitMQ';

  console.log("chegou obj evento", event);

  channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(message));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message sent to RabbitMQ' }),
  };
};

// module.exports.rabbitmqConsumer = async (event, context) => {
//   const connection = await connectRabbitMQ();
//   const channel = await createChannel(connection);

//   channel.assertQueue(queueName, { durable: true });

//   channel.consume(queueName, (msg) => {
//     console.log('Message received:', msg.content.toString());
//     channel.ack(msg);
//   }, { noAck: false });

//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: 'RabbitMQ consumer started' }),
//   };
// };

// module.exports.compute = async (event, context) => {
//   const message = JSON.parse(event.Records[0].body);
//   console.log('Message received from RabbitMQ:', message);

//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: 'Lambda function triggered by RabbitMQ event' }),
//   };
// };
