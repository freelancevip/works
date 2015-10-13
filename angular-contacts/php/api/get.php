<?php
header('Content-Type: text/html; charset=utf-8');
echo file_get_contents("./data.json");
die();