var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var db = require('./controllers/db');
var main = require('./routes/main')(app);

app.use(express.static('public'));

server.listen(3000, function(){
  console.log("Server started on port 3000");
});
