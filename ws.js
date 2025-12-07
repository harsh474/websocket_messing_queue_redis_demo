const WebSocket = require('ws');

const {addMyJob} = require("./queue")
// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

// Event handler for new connections
wss.on('connection', (ws) => {
    console.log('New client connected',ws);

    // Send a welcome message to the newly connected client
    ws.send('Welcome to the WebSocket server!');

    // Event handler for messages received from the client
    ws.on('message', (message) => {
        console.log(`Received from client: ${message}`);

        // Echo the message back to the client
        ws.send(`Server received: ${message}`);

        // Optionally, broadcast the message to all connected clients (excluding sender)
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(`Broadcast: ${message}`);
            }
        });
    });
  
    // Event handler for when a client disconnects
    ws.on('close', () => {
        console.log('Client disconnected');
    });

    // Event handler for errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});



    addMyJob({ message: 'Hello from BullMQ!' });
