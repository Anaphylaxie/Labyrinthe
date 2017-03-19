
function Joueur(posX, posY, persX, persY){
  this.persPosX;
  this.persPosY;
  this.posX = posX;
  this.posY = posY;
  this.persX = persX;
  this.persY = persY;
  this.vitesse = 10;
  this.spriteSrc = "asset/img/perso/megamanFace.png";
  
  this.draw = function(g){
    var imagePers = new Image();
    imagePers.src = this.spriteSrc;
    imagePers.onload = function(){
      //console.log("chargement image joueur")
      g.drawImage(imagePers,this.posX,this.posX,CASE-LINEWIDTH,CASE-LINEWIDTH);
	 // g.drawImage(imgDuBoss,this.posX,this.posY,CASE-LINEWIDTH,CASE-LINEWIDTH);
    }
     g.drawImage(imagePers,this.posX,this.posX,CASE-LINEWIDTH,CASE-LINEWIDTH);
  }
  //méthode pour gérer le mouvement du perso du joueur
 

/* this.move = function(evt){
  
  
    switch(evt){
			case 37 :
				//console.log("gauche");
				//on arrondit à la case d'au dessus pour ne s'arréter que lorsqu'on arrive à la bonne case
				alert("gauche");
				this.persY= Math.ceil(this.posY/CASE);
				this.persX= Math.ceil(this.posX/CASE);
        //console.log("x : "+persX1+", y : "+persY1)
        //console.log("x : "+posX1+", y : "+posY1)
        //console.log(posY1%CASE)
				//on vérifie que le mouvement précédent est bien terminé sur une case
				if(this.posY%CASE==0||this.posY%CASE>CASE-this.vitesse-1){
					if(monLab[this.persY*dim+this.persX].O>=0)
						this.posX = this.posX-this.vitesse;
				}
				break;
			case 38 :
				//console.log("haut");
				//on arrondit à la case d'au dessus pour ne s'arréter que lorsqu'on arrive à la bonne case
				this.persY= Math.ceil(this.posY/CASE);
				this.persX= Math.ceil(this.posX/CASE);
				//on vérifie que le mouvement précédent est bien terminé sur une case
				if(this.posX%CASE==0||this.posX%CASE>CASE-this.vitesse-1){
					if(monLab[this.persY*dim+this.persX].N>=0)
						this.posY = this.posY-this.vitesse;
				}
				break;
			case 39 :
				//console.log("droite");
				//on arrondit à la case d'en dessous pour ne s'arréter que lorsqu'on arrive à la bonne case
				this.persY= Math.trunc(this.posY/CASE);
				this.persX= Math.trunc(this.posX/CASE);
				//on vérifie que le mouvement précédent est bien terminé sur une case
				if(this.posY%CASE==0||this.posY%CASE>CASE-this.vitesse-1){
					if(monLab[this.persY*dim+this.persX].E>=0)
						this.posX = this.posX+this.vitesse;
				}
				break;
			case 40 :
				//console.log("bas");
				//on arrondit à la case d'en dessous pour ne s'arréter que lorsqu'on arrive à la bonne case
				this.persY= Math.trunc(this.posY/CASE);
				this.persX= Math.trunc(this.posX/CASE);
				//on vérifie que le mouvement précédent est bien terminé sur une case
				if(this.posX%CASE==0||this.posX%CASE>CASE-this.vitesse-1){
					if(monLab[this.persY*dim+this.persX].S>=0)
						this.posY = this.posY+this.vitesse;
				}
				break;
		}
    
  } */
  
  
}