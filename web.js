var express = require('express');
var app = express.createServer(express.logger());
var io = require('socket.io').listen(app);

// Disable websockets since they do not work on heroku
io.configure(function() {
  io.set('transports', ['xhr-polling']);
  io.set('polling duration', 10);
  io.set('log level', 2);
});

var redis = require('redis-url').createClient();

app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/download', function(request, response) {
  console.log('Starting file download...');
  response.writeHead(200, {
    'Content-Type': 'application/binary'
  });
  var getData = function(t, data) {
    if (!data) {
      console.log('No data for download. Retrying BRPOP...');
      redis.brpop('pipe', 5, getData);
      return;
    }
    if (data[1] != 'FILEDONE') {
      console.log('Sending packet to client...');
      response.write(data[1], 'binary');
      redis.brpop('pipe', 5, getData);
    } else {
      console.log('Sent entire file, closing connection...');
      response.end();
    }
  };

  redis.brpop('pipe', 5, getData);
});

io.sockets.on('connection', function(socket) {
  console.log('client connected');
  socket.on('upload', function(data, fn) {
    if (!!data) {
      console.log('Packet uploading...');
      redis.lpush('pipe', data);
    } else {
      console.log('All packets uploaded.');
      redis.lpush('pipe', 'FILEDONE');
    }

    // TODO: Remove this
    fn();
    // AND: Find out why this is so slow...
    var completePacket = function() {
      console.log('Checking pipe size...');
      redis.llen('pipe', function(t, data) {
        if (data < 5) {
          console.log('Pipe not full, requesting another packet...');
          fn();
        } else {
          console.log('Pipe full, waiting to add more packets...');
          setTimeout(completePacket, 1000);
        }
      });
    };
    completePacket();
  });
});

var port = process.env.PORT || 4000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
