var http = require('http');
var fs = require('fs');
var url = require('url');

var users = new Array();
var laby = "";

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(query, result) {
	var page = url.parse(query.url).pathname;
	var content;
	console.log(page);
	if (page.match("\.(html|js)$")) {
		fs.readFile("."+page, 'utf-8', function(error, content) {
			result.writeHead(200, {"Content-Type": "text/html"});
			result.end(content);
		});
	} else {
		console.log("erreur");
		result.writeHead(200, {"Content-Type": "text/html"});
		result.end("<h1>Erreur</h1>");
	}
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// connexion client
io.sockets.on('connection', function (socket) {
    	console.log('Un client est connecté !');

	socket.on('ident', function (user) {
        console.log(user + ' est connecté');
		//socket.emit("message","Soit le bienvenu "+ user);
		if (users.indexOf(user)==-1){
			 users.push(user);}
			 console.log(users);
    	})


	socket.on('liste',function (msg) {
		console.log("envoi liste");
			console.log(users);
		socket.emit("liste",users);
		socket.broadcast.emit("liste",users);
	});

	socket.on('laby',function (laby) {
		laby = laby;
		console.log("envoi labyrinthe à tous les joueurs");
			//console.log(laby);
		socket.emit("laby",laby);
		socket.broadcast.emit("laby",laby);
	});
	
	
	
	socket.on('position',function (pos) {
		console.log("envoi des positions des joueurs");
		console.log(pos);
		socket.emit("position",pos);
		socket.broadcast.emit("position",pos);
	});
	
	
	
	/* La position du boss */ 
	socket.on('positionBoss',function (pos) {
		console.log(pos);
	//pos=pos;
		console.log("envoi du boss");
		socket.emit("position du boss",pos);
		socket.broadcast.emit("position Boss",pos);
		
	});
	
	socket.on('positionLapin',function (pos) {
		//console.log("envoi des positions du lapin aux joueurs");
		//console.log(pos);
		socket.emit("positionLapin",pos);
		socket.broadcast.emit("positionLapin",pos);
	});
	
	socket.on('bonus', function (bonus) {
		console.log("envoi des positions des bonus aux joueurs");
		//console.log(bonus);
		socket.broadcast.emit("bonus",bonus);
	});
});


server.listen(8080);
