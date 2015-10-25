<h3>Установка:</h3>

	1. Скопировать папку libs на один уровень с файлами данных
	2. Скопировать файл php_processor.php на один уровень с файлами данных
	3. В файл со статьями добавить строку, в самое начало:
		<code>
		<?php require_once './php_processor.php'; ?>
		</code>
	4. В файл с ссылками на статьи в самый конец перед
		<code>
		&lt;/body&gt;
		</code>
		```
		добавить подключение скрипта и стилей:
		<code>
		<link href="./libs/featherlight.min.css" type="text/css" rel="stylesheet" />
		<script src="./libs/jquery-latest.js"></script>
		<script src="./libs/featherlight.min.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="./libs/js-popup-linker.js"></script>
		</code>
	
	Это все!

