const Queue = require('bull');
const sendEmail = require('../helpers/sendEmail');

const emailQueue = new Queue('emailQueue', {
     redis: { port: 6379, host: '0.0.0.0' }
}); // Specify Redis connection using object

emailQueue.process(async (job) => {
        await sendEmail(job.data);
})

module.exports = emailQueue;