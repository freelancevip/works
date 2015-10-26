<h3>Установка:</h3>

	1. Скопировать папку libs на один уровень с файлами данных
	2. Скопировать файл php_processor.php на один уровень с файлами данных
	3. В файл со статьями добавить строку, в самое начало:
		
		<?php require_once './php_processor.php'; ?>
		
	4. В файл с ссылками на статьи в самый конец перед
		
		</body>
		
		добавить подключение скрипта и стилей:
		
		<link rel="stylesheet" href="./libs/popup.css">
		<script type="text/javascript" src="./libs/js-popup-linker.js"></script>
	
	Это все!
