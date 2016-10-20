var express=require('express');
var app = express();
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var debaters = new Map();

app.use(express.static("./assets"));
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('new debater', function(msg){
  	debaters.set(socket.client.id, msg);
  	console.log(socket.client.id, msg)
  })
  socket.on('start', function(msg){
  	start(msg);
  })
  socket.on('reset', function(){
  	io.emit('reset');
  })
});
var start=function(id){
	// console.log(players.get(id))
	io.emit('start', debaters.get(id));
}

server.listen(app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
}));

