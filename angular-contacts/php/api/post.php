<?php
$request_payload = file_get_contents("php://input");
if(file_put_contents("./data.json", $request_payload))
	echo "Saved";
else
	echo "Error";