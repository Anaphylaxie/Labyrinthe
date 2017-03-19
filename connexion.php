<?php
//on initie la session
session_start();

$message="";
//si le login a bien été soumis
if (isset($_POST["login"])){
	//connexion a la base donnee mysql
		$bdd = new PDO('mysql:host=localhost;dbname=laby;charset=utf8', 'root', '');
	//vérifier que le login et le mot de passe corresponde
	$login = $_POST['login'];
	$password = $_POST['password'];
	$trouve = false;
	$reponse = $bdd->query('SELECT login, password FROM joueurs');
	while ($donnees = $reponse->fetch()){
		///echo '<p>' . $donnees['login'] . ' ' . $donnees['password'] . '</p>' . $login;
		if ($donnees['login'] == $login){
			$trouve = true;
			if($donnees['password'] == $password){
				$_SESSION['user'] = $login;
	      header('Location: index.php'); // on redirige vers la page de connexion
        exit;
			} else {
				$message= "ce n'est pas le bon mot de passe";
			}
		}
	}
	if ($trouve == false){
		$message="ce pseudo n'existe pas";
	}
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Se connecter</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="labyrinthe.css">

</head>
<body>
  <form action="connexion.php" method="POST">
    Votre pseudo :<br>
    <input type="text" name="login" placeholder=""><br>
    Votre mot de passe :<br>
    <input type="password" name="password"placeholder=""><br><br>
    <input type="submit" value="Et hop !">
    <p><?php echo $message ?></p>
  </form>
<div> Pas encore inscrit? <a href="inscription.php">cliquez ici</a></div>
</body>
</html>
