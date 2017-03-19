<?php
$message="";
//si le login a bien été soumis
if (isset($_POST["login"])){
    //connexion a la base donnee mysql
    	$bdd = new PDO('mysql:host=localhost;dbname=labyrinthe;charset=utf8', 'root', 'root');
    //vérifier que le login est unique
    $login = $_POST['login'];
    $password = $_POST['password'];
    $unique = true;
    $reponse = $bdd->query('SELECT login FROM joueurs');
    while ($donnees = $reponse->fetch()){
      //echo '<p>' . $donnees['login'] . '</p>';
      if ($donnees['login'] == $login){
        $unique=false;
      }
    }
    $reponse->closeCursor();
    if ($unique){
      //si le login n'existe pas déjà, insérer le joueur dans la bdd
      $requete = $bdd->prepare('INSERT INTO joueurs(login, password) VALUE(:login, :password)');
      $requete->execute(array(
        'login' => $login,
        'password' => $password
      ));
      header('Location: connexion.php'); // on redirige vers la page de connexion
      Exit;
    } else {
      $message= "ce pseudo est déjà pris";
    }
}
?>


<!DOCTYPE html>
<html>
<head>
	<title>S'inscrire</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="labyrinthe.css">

</head>
<body>
  <form action="inscription.php" method="POST">
    <label for="login">Votre pseudo :<br></label>
    <input type="text" name="login" placeholder="" required="required"><br>
    <label for="password">Votre mot de passe :<br></label>
    <input type="password" name="password" placeholder="" required="required"><br><br>
    <input type="submit" value="Et hop !">
    <p><?php echo $message ?></p>
  </form>
<div> Déjà inscrit? <a href="connexion.php">cliquez ici</a></div>
</body>
</html>
