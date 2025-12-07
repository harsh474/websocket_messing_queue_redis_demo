const { createClient } = require('redis');

const client = createClient();   
client.on('error', err => console.error('Redis Client Error', err));

(async () => {
     await client.connect();
     console.log('Connected to Redis!');
})();

// Example usage after connection
(async () => {
     // await client.set('name', 'harsh');
     // const value = await client.get('name');
     // console.log('Value of mykey:', value);  
     client.flushDb()
     client.lPush('age', '12')
     client.lPush('age', '13')
     client.lPush('age', '14')
     client.lPush('age', '15')
     client.lPush('age', '16')
      let value = await client.rPop('age');
     console.log('Value of mykey:', value); 
       value = await client.rPop('age');
     console.log('Value of mykey:', value); 
       value = await client.rPop('age');
     console.log('Value of mykey:', value); 
       value = await client.rPop('age');
     console.log('Value of mykey:', value); 
     // Disconnect when done (optional, depending on your application's needs)
     // await client.quit();
})(); 


