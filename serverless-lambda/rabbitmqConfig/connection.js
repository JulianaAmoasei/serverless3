const amqp = require('amqplib/callback_api');

const rabbitmqURL = 'amqp://localhost';

module.exports.connectRabbitMQ =() => {
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

module.exports.createChannel = (connection) => {
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