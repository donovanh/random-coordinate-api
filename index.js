'use strict';
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.send('World Map API - opening a socket');
});

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

io.on('connection', function(socket) {
  // Here would be a good place to prompt the removal of the "waking up Heroku" notice
  io.emit('connected');
  // For testing purposes - emit an event every second to show it's working
  setInterval(function() {
    // Generate random world coords
    let latitude = getRandomNumber(-40,60),
        longitude = getRandomNumber(-160, 160)
    io.emit('ticket sale', { name: 'Foo', coords: [latitude,longitude]});
    console.log('Doing the event', latitude, longitude);
  }, 2000);
});

http.listen(3567, function() {
  console.log('World map API now listening on *:3567');
});
