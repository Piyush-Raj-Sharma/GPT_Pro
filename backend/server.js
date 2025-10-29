const app = require('./src/app');
const initializeSocketServer = require('./src/sockets/socket.server');
const httpServer = require('http').createServer(app);

initializeSocketServer(httpServer);

httpServer.listen(3000, () => {
    console.log("Socket server is running at port 3000");
});
