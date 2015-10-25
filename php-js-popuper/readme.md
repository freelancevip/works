<h3>Установка:</h3>

	1. Скопировать папку libs на один уровень с файлами данных
	2. Скопировать файл php_processor.php на один уровень с файлами данных
	3. В файл со статьями добавить строку, в самое начало:
		```html
		<?php 
		require_once './php_processor.php'; 
		?>
		```
	
	4. Открыть файл php_processor.php и вписать url сайта, например
		```php
		$url = "http://test.freelancevip.pro"; // Адрес вашего сайта
		```
	
	5. В файл с ссылками на статьи в самый конец перед
		```html
		</body>
		```
		добавить подключение скрипта и стилей:
		```html
		<link href="./libs/featherlight.min.css" type="text/css" rel="stylesheet" />
		<script src="./libs/jquery-latest.js"></script>
		<script src="./libs/featherlight.min.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="./libs/js-popup-linker.js"></script>
		```
	
	Это все!

