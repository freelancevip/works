<?php

/**
 * 
 * Get paginstions last page number
 * 
 * @param <String> $string 
 * 
 * @return <int>
 */

function get_num_pages($string) {
	$html = str_get_html($string);
	$last_pager = $html->find("ul.pages a", -1);
	return (int) $last_pager->plaintext;
}


/**
 * 
 * Returns plain html
 * 
 * @param <Object> $curl 
 * @param <String> $url 
 * 
 * @return <String>
 */

function curl_get($curl, $url) {
	$response    = false;
	
	if(isset($_POST['proxy']) && $_POST['proxy'] != '') {
		$proxy_array = array_map('trim', explode("\n", $_POST['proxy']));
		$rand_key = array_rand($proxy_array, 1);
		$proxy = $proxy_array[$rand_key];
		
		while(proxy_on($proxy) == false) {
			$_POST['proxy'] = str_replace($proxy, "", $_POST['proxy']);
			$proxy_array = array_map('trim', explode("\n", $_POST['proxy']));
			$rand_key = array_rand($proxy_array, 1);
			$proxy = $proxy_array[$rand_key];
		}
		
		$curl->setOpt(CURLOPT_PROXY, $proxy);
	}
	$content     = $curl->get($url);
	if ($curl->error) {
		echo 'Error: ' . $curl->errorCode . ': ' . $curl->errorMessage;
		return false;
	}
	else {
		return $curl->response;
	}
}


/**
 * 
 * 
 * @param <array> $array 
 * @param <string> $path 
 * 
 * @return <void>
 */

function result_to_csv($array, $path) {
	$fp = fopen($path, 'w');
	foreach ($array as $fields) {
		fputcsv($fp, $fields, ";");
	}
	fclose($fp);
}



function result_to_xls($array, $path) {
	require_once './PHPExcel.php';
	// Create new PHPExcel object
	$objPHPExcel = new PHPExcel();

	// Set document properties
	$objPHPExcel->getProperties()->setCreator("Анатолий Демченко freelancevip")
								 ->setLastModifiedBy("Анатолий Демченко freelancevip")
								 ->setTitle("Office 2007 XLSX Результаты парсинга")
								 ->setSubject("Office 2007 XLSX Результаты парсинга")
								 ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
								 ->setKeywords("office 2007 openxml php")
								 ->setCategory("Result file");
	// Add some data
	$objPHPExcel->setActiveSheetIndex(0)
				->setCellValue('A1', 'Название')
				->setCellValue('B1', 'Ссылка')
				->setCellValue('C1', 'Продаж');
	
	//$objPHPExcel->getActiveSheet()->fromArray($array, null, 'B1');
	$row = 2;
	foreach($array as $key=>$value) {
		$title = str_replace("&quot;", '"', $key);
		$objPHPExcel->getActiveSheet()
					->setCellValue("A".$row, $title)
					->setCellValue("B".$row, $value['href'])
					->setCellValue("C".$row, $value['count']);
		$objPHPExcel->getActiveSheet()->getCell("B".$row)->getHyperlink()->setUrl($value['href']);
		$row++;
	}
	
	$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
	$objWriter->save($path);
}

/**
 * 
 * Main function
 * 
 * @return <array>
 */

function get_results() {
	if(strpos($_POST['link'], "?")) {
		$canonic_url = substr($_POST['link'], 0, strpos($_POST['link'], "?")) . '?view_type=list';
	} else {
		$canonic_url = $_POST['link'] . "?view_type=list";
	}
	$cookie_file = "cookie.txt";
	$curl        = new Curl();
	$curl->setUserAgent('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1');
	$curl->setOpt(CURLOPT_FOLLOWLOCATION, 1);
	$curl->setOpt(CURLOPT_HEADER, 1);
	$curl->setOpt(CURLOPT_CONNECTTIMEOUT, 10);
	
	$response = curl_get($curl, $canonic_url);
	
	$result_array = array();
	
	if($response) {
		$date_from = false;
		$date_to = false;
		if(isset($_POST['date_from'])) {
			$date_from = strtotime($_POST['date_from']);
		}
		if(isset($_POST['date_to'])) {
			$date_to = strtotime($_POST['date_to']);
		}
		$html = str_get_html($response);
		// $num_pages = 1;
		$num_pages = get_num_pages($response);
		for($i = 1; $i<=$num_pages; $i++) {
			$url = $canonic_url . "&page=$i";
			$response = curl_get($curl, $url);
			$html        = str_get_html($response);
			foreach($html->find("li.listing-card") as $li) {
				$in_date = true;
				$in_date_to = true;
				$date_wear = false;
				if($date_from || $date_to) {
					foreach($li->find("div.listing-date") as $date) {
						$date_wear = format_date_from_rus(trim($date->plaintext));
						if($date_from) {
							if($date_wear < $date_from) {
								$in_date = false;
								break 3;
							}
						}
						if($date_to) {
							if($date_wear > $date_to) {
								$in_date_to = false;
							}
						}
					}
				}
				
				if($in_date && $in_date_to) {
					foreach($li->find("a.title") as $element) {
						// Parse each product, find string like Favorited by: 506 people
						$fav_num = 0;
						if(isset($_POST['open_prod'])) {
							$prod_response = curl_get($curl, $element->href);
							if($prod_response) {
								$prod_html = str_get_html($prod_response);
								$fav_li = $prod_html->find("ul.properties li", -1);
								if($fav_li) {
									$fav_num_match = preg_match('/([\d]+)/',$fav_li->plaintext, $matches);
									$fav_num = $matches[0];
								}
							}
						}
						$key = str_replace('"', '&quote;', trim($element->plaintext));
						$count = 1;
						if(array_key_exists($key, $result_array)) {
							$count = $result_array[$key]["count"] + 1;
						} else {
							$count = 1;
						}
						$result_array[$key] = array(
							"href"         => $element->href,
							"text"         => $key,
							"count"        => $count,
							"fav_num"=> $fav_num
						);
					}
				}
			}
		}
	}
	return $result_array;
}


function format_date_from_rus($date_wear) {
	$hours_ago = array("часов назад", "часа назад", "час назад", "hours ago", "hour ago");
	$days_ago = array("дня назад", "дней назад", "день назад", " days ago", "day ago");
	
	if(strposa($date_wear, $hours_ago)) {
		$date_wear = date("M d, Y");
	} elseif(strposa($date_wear, $days_ago)) {
		$returnValue = preg_match('/(\d)\s[d|д]/', $date_wear, $matches);
		$days = $matches[1];
		$minus_time = (int) $days * 86400;
		$date_wear = date("M d, Y", strtotime("now") - $minus_time);
	} else {
	}
	$rus_months = array("Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек", "янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек");
	$en_months = array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Now","Dec", "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Now","Dec");
	$date_wear = str_replace(" r", "", $date_wear);
	$date_wear = str_replace($rus_months, $en_months, $date_wear);
	return strtotime($date_wear);
}


function strposa($haystack, $needles=array(), $offset=0) {
        $chr = array();
        foreach($needles as $needle) {
                $res = strpos($haystack, $needle, $offset);
                if ($res !== false) $chr[$needle] = $res;
        }
        if(empty($chr)) return false;
        return min($chr);
}


function proxy_on($proxy) { 
	$timeout = 5;
	$splited = explode(':',$proxy); // Separate IP and port
	if($con = @fsockopen($splited[0], $splited[1], $errorNumber, $errorMessage, $timeout)) {
		return true;
	} else {
		echo $errorNumber . ' ' . $errorMessage . '<br>';
		return false;
	}
}