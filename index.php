<?php
session_start();
if(!isset($_SESSION['user']))
{
    header('Location: connexion.php');
    Exit;
}
else
{

}
?><!DOCTYPE html>
<html>
<head>
	<title>Un dessin avec CANVAS</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="asset/css/labyrinthe.css">
		<script src="asset/js/socket.io/socket.io.js"></script>
		
	<script type="text/javascript" src="asset/js/classJoueur.js"></script>
	<script type="text/javascript" src="asset/js/labyrinthe.js"></script>
</head>
<body data-user="<?php echo $_SESSION['user'];?>">
  <div id="loading"><p>Bienvenu <?php echo $_SESSION['user'];?> !</p>
  <p id="test">Attente d'un autre joueur..</p></div>
	<div class="canvas">
		<canvas id="labyrinthe"></canvas>
	</div>

</body>
</html>
