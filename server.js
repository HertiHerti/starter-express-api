const { createServer } = require("http");
const express = require("express");
const WebSocket = require("ws");
var cors = require('cors')


// Configure express for serving files
const app = express();
app.use(cors({credentials: true,origin: 'https://server-socket-three.vercel.app'}));

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, PATCH, DELETE, OPTIONS");  
    res.setHeader('Access-Control-Allow-Credentials', true);  
    res.setHeader("Content-Security-Policy", "script-src 'self'");
    next();
  });

var options = {
  allowUpgrades: true,
  allowEIO3: true,
  allowEIO2: true, 
  allowEIO1: true, 
 transports: ['websocket', 'file', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling'],
  pingTimeout: 9000,
  pingInterval: 3000,
  httpCompression: true,
  origins: '*:*' ,
  cors: {
    origin: ["http://localhost","https://ariel-server-socket.glitch.me",'https://server-socket-three.vercel.app'],
    methods: ["GET", "POST"],
    credentials: true,
    
  }
};

app.use(express.json({ extended: false }));
app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/driver.html");
});
app.get("/robot", (request, response) => {
  response.sendFile(__dirname + "/public/robot.html");
});

// Launch express server
var  port  = 3000;
const server = createServer(app);
const io = require('socket.io')(server,options)
io.on('connection', function (socket){
  console.log('connected dfdf ')
  io.emit('user', {name: 'Marcelo Aires'});

    //logger.info('SocketIO > Connected socket ' + socket.id);

    socket.on('broadcast', function (message) {

       // logger.info('ElephantIO broadcast > ' + JSON.stringify(message));
         io.emit('infos', {name: JSON.stringify(message)});
    });

    socket.on('disconnect', function () {
       // logger.info('SocketIO : Received ' + nb + ' messages');
        //logger.info('SocketIO > Disconnected socket ' + socket.id);
    });
});
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// Launch websocket server
/** const webSocketServer = new WebSocket.Server({ server });
webSocketServer.on("connection", socket => {
  console.info("Total connected clients:", webSocketServer.clients.size);
  app.locals.clients = webSocketServer.clients;

  // Send all messages to all other clients
  socket.on("message", message => {
    webSocketServer.clients.forEach(client => {
      if (client != socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // End call when any client disconnects
  socket.on("close", () => {
    webSocketServer.clients.forEach(client => {
      if (client != socket && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "endCall" }));
      }
    });
  });
  
  socket.send("Hello from server"); 
});**/
