var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

io.on('connection', (socket) => {
  console.log("Connected to:", socket.id);
  socket.on('search', (value) => {
    request.get(
      'https://apisandbox.dev.clover.com/v3/merchants/' + '8T8VYFD236V4W' + '/items?=access_token=' + '37231e0b-b510-6a35-076d-7376cc13e791',
      (err, res, body) => {
        socket.emit('searchResult', JSON.parse(body));
      }
    );
  });
});


const port = 8000;
http.listen(port, () => {
  console.log('listening on port ', port);
});
