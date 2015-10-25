<?php
$url = "http://test.freelancevip.pro";
require './libs/simple_html_dom.php';
//var_dump($_SERVER);
$current_url = explode("?", $_SERVER['REQUEST_URI']);

if(isset($_GET['mode']) && $_GET['mode'] == 'one_article') {
	$dom = file_get_html( $url . $current_url[0] );
	$art = $dom->find("div[id={$_GET['articleId']}]", 0);
	echo $art->innertext;
	die();
}
