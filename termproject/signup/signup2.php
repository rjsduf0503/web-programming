<?php
  function test_input($data) { //validation 함수
    $data = trim($data); //처음과 끝 앞뒤의 공백 제거
    $data = stripslashes($data); //백슬래시 제거
    $data = htmlspecialchars($data); //특수 문자를 HTML 엔티티로 변환
    return $data;
  }

  // header("Content-Type: application/json");
  $method = $_SERVER['REQUEST_METHOD'];
  $url = "./data.json";

  if($method == 'POST'){
    $data = $_REQUEST['data'];
    $decodedData = json_decode($data);
    $encoded = json_encode(array("name" => test_input($decodedData->name), "birthday" => test_input($decodedData->birthday), "id" => test_input($decodedData->id), "pw" => test_input($decodedData->pw), "email" => test_input($decodedData->email), "address" => test_input($decodedData->address), "phoneNumber" => test_input($decodedData->phoneNumber)));
    file_put_contents($url, $encoded."\n", FILE_APPEND);
    echo(test_input($decodedData->name));
  }


  // $url = "./data.json";
  // $id = test_input($_POST["id"]);
  // $pw = test_input($_POST["pw"]);



?>