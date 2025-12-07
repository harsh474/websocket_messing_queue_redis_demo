    // queue.js
    const { Queue } = require('bullmq');
    const connection = require('./redis-config'); // Import your Redis connection

    const myQueue = new Queue('myJobQueue', { connection });

    async function addMyJob(data) {
        await myQueue.add('myJobName', data);
        console.log('Job added to queue:', data);
    }

    module.exports = { addMyJob }; 
    