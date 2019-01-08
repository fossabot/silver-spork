const colyseus = require('colyseus');
const http = require('http');

const express = require('express');
const app = express();
const port = process.env.PORT || 3554;

const server = http.createServer(app);
const gameServer = new colyseus.Server({server: server});

gameServer.register('pushbutton', require('./rooms/pushbutton'));
server.listen(port);

app.use(express.static(__dirname + "/../frontend/public"));
console.log(`Listening on localhost:${ port }`);
