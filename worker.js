    // worker.js
    const { Worker } = require('bullmq');
    const connection = require('./redis-config'); // Import your Redis connection

    const worker = new Worker('myJobQueue', async (job) => {
        console.log('Processing job:', job.data);
        // Simulate a long-running task
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Job completed:', job.data);
    }, { connection });

    worker.on('completed', (job) => {
        console.log(`Job ${job.id} completed successfully.`);
    });

    worker.on('failed', (job, err) => {
        console.error(`Job ${job.id} failed with error: ${err.message}`);
    });

    console.log('Worker started, listening for jobs...'); 


    