
var socket = io.connect('http://192.168.168.48:8080');//on se connecte au serveur

window.addEventListener("DOMContentLoaded",function(){
//on récupère l'user grace à l'attribut data-user passé au body

/* var employe = new Employe();
Employe.nom = "Test";
alert(Employe.nom); */

var user = document.getElementsByTagName("body")[0].getAttribute('data-user');
var users;
console.log("user="+user);
socket.emit('ident',user); //On envoie l'user dans le tableau des users
//on demande la liste complète des users pour vérifier que l'autre joueur est connecté
socket.emit("liste","x");

socket.on("liste", function(liste){
  console.log(liste);
  users = liste;
  if (liste.length == 2){
    // Envoie du labyrinthe ->>
    // envoie unique du lab au serveur, pour na pas dupliquer
    if(users.indexOf(user) == 0)  sendLab();
	// <-- Recuperation du labyrinthe
    socket.on("laby", function(laby){
		monLab = JSON.parse(laby);
		getLab();
		// <-- On ecoute les entrees au clavier.
		document.addEventListener("keydown",function(e){
			ecouteurClavier(e);
		},false);
		
		// <-- Recuperation des coordonnees des joueurs.
		socket.on("position", function(pos){
			if(users.indexOf(user)==0){
			joueur2.setX(pos.x2);
			joueur2.setY(pos.y2);
			//window.requestAnimationFrame(dessine);
			}
			else{
			joueur1.posX=pos.x1;
			joueur1.posY=pos.y1;
			//window.requestAnimationFrame(dessine);
		  }
		});
		socket.on("positionBossTest", function(positionX, positionY){
		/*	boss2.posX = positionX;
			boss2.posY = positionY; */
			boss2=new Boss(positionX,positionY);
			alert("BOSS X DE BASE : "+positionX);
			alert("BOSS Y DE BASE : "+positionY);
			//window.requestAnimationFrame(dessine);
		}); 

		socket.on("positionBoss", function(pos){
			boss.posX = pos.boss.x;
			boss.posY = pos.boss.y;
			//window.requestAnimationFrame(dessine);	
		 });
	})
 }
})

var monLab; //objet contenant le labyrinthe
const LINEWIDTH = 4;//épaisseur des murs
const STROKESTYLE = "white";
const FILLSTYLE = "black";
const CASE = 30; //Taille en pixel de la case
var imgLab;
var init = false;
var dim;

var boss2;

function Joueur(posX, posY){
	this.posX = posX;
	this.posY = posY;
	this.vitesse = 10;
	this.spriteSrc = "asset/img/perso/megamanFace.png";

	this.setX=function(val){
		this.posX=val;
	}

	this.setY=function(val){
		this.posY=val;
	}

	this.draw = function(g){
		var imagePers = new Image();
		imagePers.src = this.spriteSrc;
		imagePers.onload = function(){
			g.drawImage(imagePers,this.posX*CASE+LINEWIDTH,this.posY*CASE+LINEWIDTH,CASE-LINEWIDTH,CASE-LINEWIDTH);
		}
			g.drawImage(imagePers,this.posX*CASE+LINEWIDTH,this.posY*CASE+LINEWIDTH,CASE-LINEWIDTH,CASE-LINEWIDTH);
	}

	this.move = function(evt){
		var index = this.posY*dim+this.posX;

		switch(evt){
		case 81 : // q
			if(monLab[index].O>=0){
				this.posX = this.posX-1;
			}
			break;
		case 90 : // z
			if(monLab[index].N>=0){
				this.posY = this.posY-1;
			}
			break;
		case 68 : // d
			if(monLab[index].E>=0){
			  this.posX = this.posX+1;
			}
			break;
		case 83 : // s
  		if(monLab[index].S>=0){
			console.log(this.posY);
  			this.posY = this.posY+1;
			console.log(this.posY);
  		}
		  break;
		}
	}
}

function sendLab(){
	var requete = new XMLHttpRequest();
	var url = "drawLab.php";
	requete.open("GET",url,true);
	requete.send();
	requete.onreadystatechange = function(){
		if((requete.readyState==4)&&(requete.status==200)){
		  monLab = requete.responseText;
		  socket.emit("laby",monLab);
		}
	}
}

function getLab(){
	dim = Math.floor(Math.sqrt(monLab.length));
	joueur1 = new Joueur(0,0);
	joueur2 = new Joueur(dim-5,dim-5);
	
	//boss2 = new Boss();
	socket.emit("positionBossTest", "boss2");
	
	/*
	if (users.indexOf(user)==0){
		socket.emit("positionBoss", {"boss2": {x:boss2.posX, y:boss2.posY } });
		socket.emit("positionBossTest", {"boss2": {x:boss2.posX, y:boss2.posY } }); 
	}
	socket.emit("positionBoss", {"boss2": {x:boss2.posX, y:boss2.posY } });
	socket.emit("positionBossTest", {"boss2": {x:boss2.posX, y:boss2.posY } });*/
	
	
	
	//window.requestAnimationFrame(dessine);
}



function Boss(x, y){
	this.imgBoss = "asset/img/perso/pikachu.png";
	this.posX=x;
	this.posY=y;
	this.persY;
	this.persX;
	this.vitesse = 1
	this.listeDirections = ["Nord", "Sud", "Est", "Ouest"];
	this.direction = this.listeDirections[Math.floor(Math.random() * this.listeDirections.length)];
	/* Dessiner le boss */
	this.draw = function(g){
		var imgDuBoss = new Image();
		imgDuBoss.src = this.imgBoss;
		g.drawImage(imgDuBoss,this.posX*CASE+LINEWIDTH,this.posY*CASE+LINEWIDTH,CASE-LINEWIDTH,CASE-LINEWIDTH);
		imgDuBoss.onload = function(){
			g.drawImage(imgDuBoss,this.posX*CASE+LINEWIDTH,this.posY*CASE+LINEWIDTH,CASE-LINEWIDTH,CASE-LINEWIDTH);
		}
		g.drawImage(imgDuBoss,this.posX*CASE+LINEWIDTH,this.posY*CASE+LINEWIDTH,CASE-LINEWIDTH,CASE-LINEWIDTH);
    }
	/* Animer le bosss */
	this.move = function(){
	
		var index = this.posY*dim+this.posX;

		switch(this.direction) {
		
		case "Nord":
		console.log(" Nord");	
		if(monLab[index].N>=0){
			this.posX = this.posX-1;
		}
		else{
			console.log('mur au dessus');
			this.direction = this.listeDirections[Math.floor(Math.random() * this.listeDirections.length)];
			//alert(this.direction);
			this.move(); 
		}		
		break;
		case "Sud": 
			console.log("Sud");	
            if(monLab[index].S>=0){
				this.posY = this.posY+1;
			} 
			else {
				this.direction = this.listeDirections[Math.floor(Math.random() * this.listeDirections.length)];
				this.move();
			}
		break;
		case "Est":
			console.log("Est");	
            if(monLab[index].E>=0){
				this.posX = this.posX-1;
			} 
			else {
				this.direction = this.listeDirections[Math.floor(Math.random() * this.listeDirections.length)];
				this.move();
			}
		break;
		case "Ouest": 
			console.log("Ouest");	
            if(monLab[index].O>=0){
				this.posX = this.posY+1;
			} 
			else {
				this.direction = this.listeDirections[Math.floor(Math.random() * this.listeDirections.length)];
				this.move();
			}
		}
	alert('JENVOIE LES POSITIONS!');
	//socket.emit("positionBoss", {"boss2": {x:boss2.posX, y:boss2.posY } });
	
	//socket.emit("positionBossTest", {"boss2": {x:boss2.positionX, y:boss2.positionY } }); 
	}
}



function dessine(){
	imageLabyrinthe();
	var zoneDessin = document.getElementById("labyrinthe");
	zoneDessin.width = dim*CASE+LINEWIDTH*2;
	zoneDessin.height = dim*CASE+LINEWIDTH*2;
	var g = zoneDessin.getContext("2d");


	var imagePers2 = new Image();
	imagePers2.src = "asset/img/perso/megamanFace.png";

	/* Au chargement */
    imgLab.onload = function(){

	if (users.indexOf(user)%2==0){
		g.drawImage(imgLab,0,0);
		joueur1.draw(g);
		joueur2.draw(g);
		boss2.draw(g);
		boss2.move(g);
	}
	else{
		g.drawImage(imgLab,0,0);
		joueur1.draw(g);
		joueur2.draw(g);
		boss2.draw(g);
		boss2.move(g);
 	}
	
	//boss2.move(g);
	
  }
  

}

function imageLabyrinthe(){
  var canvasLab = document.createElement("canvas");
  canvasLab.width = dim*CASE+LINEWIDTH*2;
  canvasLab.height = dim*CASE+LINEWIDTH*2;
  var g = canvasLab.getContext("2d");
  g.beginPath();

  for(i=0; i<monLab.length;i++){
    x = (i%dim)*CASE+1;
    y = (Math.floor(i/dim)*CASE+1);

	// Lignes horizontales
    if(monLab[i].N<0){
      g.moveTo(x,y);
      g.lineTo(x+CASE+LINEWIDTH,y);
    }

	// Cote droit (lignes verticales)
    if(monLab[i].E<0){
      g.moveTo(x+CASE+LINEWIDTH/2,y);
      g.lineTo(x+CASE+LINEWIDTH/2,y+CASE+LINEWIDTH/2);
    }

    if(monLab[i].O==-1){
     g.moveTo(x,y);
     g.lineTo(x,y+CASE+LINEWIDTH/2);
    }
    if(monLab[i].S==-1){
      g.moveTo(x,y+CASE+LINEWIDTH/2);
      g.lineTo(x+CASE+LINEWIDTH/2,y+CASE+LINEWIDTH/2);
    }
  }

  g.strokeStyle = STROKESTYLE;
  g.stroke();
  g.lineWidth = LINEWIDTH;
  var url = canvasLab.toDataURL();
  imgLab = new Image();
  imgLab.src = url;
}

var vitesse = 5;

function ecouteurClavier(evt){
	if (users.indexOf(user)%2==0){
		joueur1.move(evt.keyCode);
	} else {
		joueur2.move(evt.keyCode);
  }
  socket.emit("position", { x1:joueur1.posX, y1:joueur1.posY, x2:joueur2.posX, y2:joueur2.posY } );

/*

 if (users.indexOf(user)%2==0){

    //il faut convertir la position en pixel par la position dans le tableau pour vérifier qu'il n'y a pas de mur
    // la position en pixel est égale à pos*CASE+LINEWIDTH;
    //donc la position dans le tableau est égale à (pospixel - LINEWIDTH)/CASE

    var posX = (persX1 - LINEWIDTH)/CASE;
    var posY = (persY1 - LINEWIDTH)/CASE;
    var roundX = Math.floor(posX);
    var roundY = Math.floor(posY);
    var index = roundY*dim+roundX;
    if (roundX==-1) roundX=0;
    if (roundY==-1) roundY=0;
	//alert("ECOUTEUR EVENT"+index);

	 //joueur1.move(evt.keyCode);

    //console.log(evt.keyCode);
    switch(evt.keyCode){

      case 'q' :
        console.log("Gauche");
        roundX = Math.ceil(posX);
        index = roundY*dim+roundX;

        if(monLab[index].O>=0)
          persX1 = persX1-vitesse;
        //  dessine();
        break;
      case 'z' :
        console.log("haut");
        roundY = Math.ceil(posY);
        index = roundY*dim+roundX;

        if(monLab[index].N>=0)
          persY1 = persY1-vitesse;
         // dessine();
        break;
      case 'd' :
        console.log("droite");
        if(monLab[index].E>=0)
          persX1 = persX1+vitesse;
         // dessine();
        break;
      case 's' :
        console.log("bas");
        if(monLab[index].S>=0)
          persY1 = persY1+vitesse;
          //dessine();
        break;
    }
 }  else {

        var posX = (persX2 - LINEWIDTH)/CASE;
        var posY = (persY2 - LINEWIDTH)/CASE;
        var roundX = Math.floor(posX);
        var roundY = Math.floor(posY);
        var index = roundY*dim+roundX;

        if (roundX==-1) roundX=0;
        if (roundY==-1) roundY=0;
        //console.log(evt.keyCode);
        switch(evt.keyCode){
          case 37 :
          //  console.log("gauche");
            roundX = Math.ceil(posX);
            index = roundY*dim+roundX;

            if(monLab[index].O>=0)
              persX2 = persX2-vitesse;
              //dessine();
            break;
          case 38 :
          //  console.log("haut");
            roundY = Math.ceil(posY);
            index = roundY*dim+roundX;

            if(monLab[index].N>=0)
              persY2 = persY2-vitesse;
              //dessine();
            break;
          case 39 :
        //    console.log("droite");
            if(monLab[index].E>=0)
              persX2 = persX2+vitesse;
              //dessine();
            break;
          case 40 :
         //   console.log("bas");
            if(monLab[index].S>=0)
              persY2 = persY2+vitesse;
              //dessine();
            break;
      }
  }

	socket.emit("position", {"perso1":{x:persX1, y:persY1}, "perso2": {x:persX2, y:persY2} });

		  // socket.emit("positionBoss", {"boss": {x:boss.posX, y:boss.posY } });
		  */
}
},false);
