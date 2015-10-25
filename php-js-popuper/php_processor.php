<?php
$url = 'http://'.$_SERVER['SERVER_NAME'];

if(isset($_GET['mode']) && $_GET['mode'] == 'one_article') {
	$current_url = explode("?", $_SERVER['REQUEST_URI']);
	require './libs/simple_html_dom.php';
	$dom = file_get_html( $url . $current_url[0] );
	$art_id = str_replace('..', '', $_GET['articleId']);
	$art = $dom->find("div[id=$art_id]", 0);
	echo $art->innertext;
	die();
}
