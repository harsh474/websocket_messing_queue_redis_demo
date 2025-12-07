// server.js
const http = require('http');
const WebSocketServer = require('websocket').server;

const httpserver = http.createServer((req, res) => {
  // simple response for normal HTTP requests
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
  });
  res.end("I don't want your http server rubbish");
});

httpserver.listen(8080, () => {
  console.log('The http server is listening on port 8080');
});

// create the WebSocket server, attached to the above http server
const wsServer = new WebSocketServer({
  httpServer: httpserver,
  // autoAcceptConnections: false // default is false — we'll check origin manually
});

function origin_allowed(origin) {
  // implement whatever checks you want here
  return true;
}

wsServer.on('request', (req) => {
  // check origin
  if (!origin_allowed(req.origin)) {
    req.reject(403, 'Origin not allowed');
    console.log('Client request rejected from origin:', req.origin);
    return;
  }

  // IMPORTANT: call req.accept() (not assign it). Provide protocol if needed: req.accept(protocol, origin)
  const connection = req.accept(null, req.origin);
  console.log('Connection accepted from', req.origin);

  // Send a welcome message (text) using sendUTF
  connection.sendUTF('connection established');

  // receive messages
  connection.on('message', (message) => {
    // message.type === 'utf8' for text, 'binary' for binary
    if (message.type === 'utf8') {
      console.log('Received Message:', message.utf8Data);
      // reply back
      connection.sendUTF(`ping message received: ${message.utf8Data}`);
    } else if (message.type === 'binary') {
      console.log('Received Binary Message of', message.binaryData.length, 'bytes');
      // echo binary
      connection.sendBytes(message.binaryData);
    }
  });

  connection.on('close', (reasonCode, description) => {
    // Note: connection.remoteAddress is not guaranteed; use connection.socket.remoteAddress if you need IP
    const remote = connection.socket && connection.socket.remoteAddress ? connection.socket.remoteAddress : 'unknown';
    console.log(`Peer connection ${remote} disconnected. Reason: ${reasonCode} - ${description}`);
  });

  connection.on('error', (err) => {
    console.error('Connection error:', err);
  });
});
