<h1>Модуль открытия ссылок в попапе</h1>
Ищет элементы с аттрибутом 
<code>
date-link="file_name-st-N"
</code>
При клике на такие элементы открывает попап, в который подгружает содержимое div id="file_name-st-N" из файла file_name.php<br>
Установка:<br>
Добавить такие строки к странице со ссылками
<code>
<script src="//code.jquery.com/jquery-latest.js"></script>
<!-- Подключение popup featherlight -->
<link href="//cdn.rawgit.com/noelboss/featherlight/1.3.4/release/featherlight.min.css" type="text/css" rel="stylesheet" />
<script src="//cdn.rawgit.com/noelboss/featherlight/1.3.4/release/featherlight.min.js" type="text/javascript" charset="utf-8"></script>
<!-- / Подключение popup featherlight -->
<script type="text/javascript" src="./libs/js-popup-linker.js"></script>
</code>
Настройка:<br>
Открыть файл libs/js-popup-linker.js
<code>
/* Настройки */
var options = {
	selector : '.open-law', // Класс элемента
	tag      : 'date-link', // Аттрибут элемента, ссылка на файл с данными
	action   : 'click', // Действие, например клик, после которого происходит подгрузка
	maxWidth : '600px', // Ширина попапа
	maxHeight: '400px', // Высота попапа
	notFoundText : '<h3>Информация не найдена!</h3>' // Вывод текста, если данные не найдены
};
</code>