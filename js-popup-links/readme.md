<h1>������ �������� ������ � ������</h1>
���� �������� � ���������� 
<code>
date-link="file_name-st-N"
</code>
��� ����� �� ����� �������� ��������� �����, � ������� ���������� ���������� div id="file_name-st-N" �� ����� file_name.php<br>
���������:<br>
�������� ����� ������ � �������� �� ��������
<code>
<script src="//code.jquery.com/jquery-latest.js"></script>
<!-- ����������� popup featherlight -->
<link href="//cdn.rawgit.com/noelboss/featherlight/1.3.4/release/featherlight.min.css" type="text/css" rel="stylesheet" />
<script src="//cdn.rawgit.com/noelboss/featherlight/1.3.4/release/featherlight.min.js" type="text/javascript" charset="utf-8"></script>
<!-- / ����������� popup featherlight -->
<script type="text/javascript" src="./libs/js-popup-linker.js"></script>
</code>
���������:<br>
������� ���� libs/js-popup-linker.js
<code>
/* ��������� */
var options = {
	selector : '.open-law', // ����� ��������
	tag      : 'date-link', // �������� ��������, ������ �� ���� � �������
	action   : 'click', // ��������, �������� ����, ����� �������� ���������� ���������
	maxWidth : '600px', // ������ ������
	maxHeight: '400px', // ������ ������
	notFoundText : '<h3>���������� �� �������!</h3>' // ����� ������, ���� ������ �� �������
};
</code>