const config = require('../config/config.json')
const { connectRabbitMQ, createChannel } = require('../config/rabbitmqConnection')
const { sendEmail } = require('../fn_emailSender/index');

const queueName = config.queue.email;

module.exports.emailWorker = async () => {
  const connection = await connectRabbitMQ();
  const channel = await createChannel(connection);

  channel.assertQueue(queueName, { durable: true });

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {

      try {
        await sendEmail(msg.content.toString());
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing email:', error);
      }
    }
  }, { noAck: false });
};
