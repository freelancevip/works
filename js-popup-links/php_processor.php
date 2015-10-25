<?php
require './libs/simple_html_dom.php';
//var_dump($_SERVER);
$current_url = explode("?", $_SERVER['REQUEST_URI']);

if(isset($_GET['mode']) && $_GET['mode'] == 'one_article') {
	$dom = file_get_html( 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] );
	$art = $dom->find("div[id={$_GET['articleId']}]", 0);
	echo $art->innertext;
	die();
}