'use strict';
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*/*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  }
);

app.get('/', function(req, res) {
  res.send('World Map API - opening a socket');
});

app.get('/favicon.ico', function(req, res) {
  res.send('nope');
});

app.set('port', (process.env.PORT || 5000));

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

io.on('connection', function(socket) {
  // Here would be a good place to prompt the removal of the "waking up Heroku" notice
  io.emit('connected');
});

const aEventNames = [
  'Úll',
  'Úll',
  'Úll',
  'Úll',
  'Úll',
  'Úll',
  'CodePen Dublin',
  'Techcrunch',
  'Realtors Anonymous',
  'Annual Shower Curtain Ring Summit'
];

// For testing purposes - emit an event every second to show it's working
setInterval(function() {
  // Generate random world coords
  let latitude = getRandomNumber(-40,60),
      longitude = getRandomNumber(-160, 160),
      eventName = aEventNames[Math.floor(Math.random()*aEventNames.length)];
  io.emit('ticket sale', { name: eventName, coords: [latitude,longitude]});
  console.log('Sending an event', latitude, longitude);
}, 2000);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



