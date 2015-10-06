<?php $time_start = microtime(true);
$result_array = false;
set_time_limit(200); 
error_reporting(E_ALL);
?>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>Парсер Etsy.com</title>
	<link rel="stylesheet" href="./css/styles.css?v=2">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" href="./js/style.css">
	
	<script type="text/javascript" src="./js/jquery-2.1.4.min.js"></script>
	<script type="text/javascript" src="./js/jquery.tablesorter.js"></script>
	<script type="text/javascript" src="./js/jquery-ui.js"></script>
	<script type="text/javascript" src="./js/scripts.js"></script>
</head>
<body>
	<form action="" method="post">
		<div class="container header clearfix">
			<span id="proxy-toggler" class="ui-icon ui-icon-gear"></span>
			<span id="info-toggler" class="ui-icon ui-icon-info"></span>
			<div id="proxy-container" class="hidden container">
				<h3>Список прокси</h3>
				<textarea name="proxy" id="proxy" cols="30" rows="10" placeholder="Список прокси в формате xxx.xxx.xxx.xxx:port"><?php if(isset($_POST['proxy'])) echo $_POST['proxy'];	?></textarea>
			</div>
			<div id="info-container" class="hidden container">
				<p>Парсер товаров etsy.com.</p>
				<p>Как пользоваться: 
					<ol>
						<li>Введите корректный адрес на страницу товаров, например https://www.etsy.com/ru/shop/SkiddawTshirts?ref=l2-shopheader-name</li>
						<li>При необходимости, выберите временные интервалы.</li>
						<li>Нажать Парсить.</li>
						<li>При необходимости, сохраните полученные данные в csv (открывается в microsoft office или любой подобной программе).</li>
					</ol>
				</p>
				<p>Автор: <a href="http://freelancevip.pro">freelancevip.pro</a></p>
			</div>
		</div>
		<div class="container">
				<p><input type="text" name="link" value="<?php if(isset($_POST['link'])) echo $_POST['link']; ?>" placeholder="Ссылка, например https://www.etsy.com/shop/HatterShop/sold"></p>
				<p class="date clearfix">
					<input type="text" name="date_from" value="" id="date_from" placeholder="Дата от..">
					<input type="text" name="date_to" value="" id="date_to" placeholder="Дата до..">
				</p>
				<p class="clearfix"><input type="checkbox" name="open_prod" id="open_prod" value="1"><label for="open_prod">Парсить каждый товар (замедляет парсинг) ?</label></p>
				<p><input type="submit" class="btn" value="Парсить"></p>
		</div>
	</form>
	<?php
	ob_start();
	if(isset($_POST['link'])) {
		
		require './simple_html_dom.php';
		require './Curl.php';
		require './functions.php';
		
		$result_array = get_results();
		echo "<div class='container'><p>Фильтры: от " . $_POST['date_from'] . ". <br>До: ".$_POST['date_to']."</p></div>";
	}
	?>
	<table class="resultat tablesorter" id="myTable">
		<thead>
			<tr>
				<th>Название</th>
				<th>Ссылка</th>
				<th>Продаж</th>
				<th>Favorited</th>
			</tr>
		</thead>
		<tbody>
			<?php 
			if($result_array) :
				foreach($result_array as $key=>$value) : ?>
				<tr>
					<td><?php echo $key ?></td>
					<td><a href="<?php echo $value['href'] ?>"><?php echo $value['href'] ?></a></td>
					<td><?php echo $value['count'] ?></td>
					<td><?php echo $value['fav_num'] ?></td>
				</tr>
			<?php 
				//$result_array[$key]['href'] = "=HYPERLINK(\"".$value['href'].'")';
				endforeach;
			endif; ?>
		</tbody>
	</table>
	<?php
	$buf = ob_get_contents();
	ob_end_clean();
	$time_end = microtime(true);
	
	if(isset($_POST['link'])) {
		// $path = "./csv/".$time_end.".csv";
		$path = "./csv/".$time_end.".xls";
		
		// result_to_csv($result_array, $path);
		result_to_xls($result_array, $path);
		
		echo "<div class='container'><a href='$path' class='btn' download>Скачать XLS</a></div>";
	}
	echo '<div class="container">Время выполнения скрипта, сек.: ' . ($time_end - $time_start) . '</div>';
	echo $buf;
	?>
</body>
</html>