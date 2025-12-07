    // redis-config.js
    const IORedis = require('ioredis');

    const connection = new IORedis({
        port: 6379, // Replace with your Redis port
        host: '127.0.0.1', // Replace with your Redis host
        maxRetriesPerRequest: null // Recommended for BullMQ
    });

    module.exports = connection;