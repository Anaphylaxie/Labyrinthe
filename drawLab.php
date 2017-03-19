<?php
include_once("include/autoload.inc.php");
$lab = new Labyrinthe(20,20);
$lab->bordure();
$lab->build();
$lab->finalise();
//$lab->drawTable();
echo $lab->getJson();
?>
