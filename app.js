"use strict";
let express = require('express'),
http = require('http'),
fs = require('fs'),
bodyParser = require('body-parser'),
app = express(),
router = require('./router');

let postData ='';
let server = http.createServer(app);
app.set('port', 8888);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res) {

    console.log("Request string: " + req.url);
    postData = req.body;
    console.log("incoming data:" + JSON.stringify(req.body));
    router.match(req, res, req.url, postData);
});
app.listen(app.get('port'));
let io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
   socket.on('getRecs', function(text, callback) {
       socket.broadcast.emit('getRecs', text);
   });
});
