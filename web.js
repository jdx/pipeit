var express = require('express');
var app = express.createServer(express.logger());
var redis = require('redis-url').createClient();

app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.render('index');
});

var port = process.env.PORT || 4000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});
