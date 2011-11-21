var express = require('express');

var app = express.createServer(express.logger());

// use $REDIS_URL or redis://localhost:6379
var redis = require('redis-url').createClient();

redis.set('status', 'working!');

app.get('/', function(request, response) {
    redis.get('status', function(err, redis_status) {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('Hello world!\nRedis is: ' + redis_status);
        response.end();
    });
});

var port = process.env.PORT || 4000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
