<?php
session_start();
if(!isset($_SESSION['id'])){ //세션에 id값이 존재x
    echo("false1");
    return;
}
  function test_input($data) { //validation 함수
    $data = trim($data); //처음과 끝 앞뒤의 공백 제거
    $data = stripslashes($data); //백슬래시 제거
    $data = htmlspecialchars($data); //특수 문자를 HTML 엔티티로 변환
    return $data;
  }

  $method = $_SERVER['REQUEST_METHOD']; //method는 POST로 받아왔으므로 POST
  $url = "../signup/".$_SESSION['id']."_cart.json"; //json 파일의 주소
  if($_REQUEST['data'] != ""){ //장바구니에 추가하는 경우
    $data = $_REQUEST['data']; //data 값을 요청하여 얻음

    $decodedData = json_decode($data); //얻어온 data값은 json화 되어있으므로 decode
    if($method == 'POST'){
      $encoded = json_encode(array("img" => test_input($decodedData->img), "name" => test_input($decodedData->name), "hprice" => test_input($decodedData->hprice), "lprice" => test_input($decodedData->lprice), "mallName" => test_input($decodedData->mallName))); //data 값들을 encode하여 개행과 함께 파일에 추가
      file_put_contents($url, $encoded."\n", FILE_APPEND);
      echo true;
    }
  }
  else{ //장바구니에서 가져오는 경우
    if(file_exists($url)){
      if($method == 'POST'){
        $file = explode("\n", file_get_contents($url)); //개행 기준 자르기
        foreach ($file as $val) {
          $obj = json_decode($val);
          if($obj !== null){
            echo(json_encode(array("img" => test_input($obj->img), "name" => test_input($obj->name), "hprice" => test_input($obj->hprice), "lprice" => test_input($obj->lprice), "mallName" => test_input($obj->mallName)))."\n"); //장바구니에서 각 상품을 개행을 포함하여 encode한 값들을 넘김
          }
      }
      }
    }
    else{ //장바구니가 비어 있는 경우
      echo("false2");
    }
  }




  ?>