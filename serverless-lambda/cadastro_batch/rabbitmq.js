const amqp = require('amqplib/callback_api');

async function cadastroProducer (event) {

  console.log(event);

  return new Promise((resolve, reject) => {
    // const rabbitmqHost = process.env.RABBITMQ_HOST;
    // const rabbitmqUsername = process.env.RABBITMQ_USERNAME;
    // const rabbitmqPassword = process.env.RABBITMQ_PASSWORD;
    const connectionString = "amqp://localhost";

    amqp.connect(connectionString, (error, connection) => {
      if (error) {
        reject(error);
      } else {
        connection.createChannel((error, channel) => {
          if (error) {
            reject(error);
          } else {
            const queue = 'cadastro';
            const message = JSON.stringify({ text: 'Hello from Lambda!' });

            channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(message));

            console.log(`Message sent: \${message}`);

            setTimeout(() => {
              connection.close();
              resolve('Message published');
            }, 500);
          }
        });
      }
    });
  });
};

module.exports = { cadastroProducer }