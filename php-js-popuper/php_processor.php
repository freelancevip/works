<?php
$url = 'http://'.$_SERVER['SERVER_NAME'];
// $url = 'http://'.$_SERVER['SERVER_NAME'] . ':2323';

if(isset($_GET['mode']) && $_GET['mode'] == 'one_article') {
	$current_url = explode("?", $_SERVER['REQUEST_URI']);
	require './libs/simple_html_dom.php';
	$dom = file_get_html( $url . $current_url[0] );
	$art_id = str_replace('..', '', $_GET['articleId']);
	$art = $dom->find("div[id=$art_id]", 0);
	$title = $dom->find("h1", 0);
	if($art == null) {
		echo "Информация не найдена";
	} else {
		if($title) {
			echo $title->outertext;
		}
		echo $art->innertext;
	}
	die();
}
