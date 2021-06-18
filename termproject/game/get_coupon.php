<?php
session_start();
if(!isset($_SESSION['id'])){ //세션에 id값이 존재x
    echo("false");
}
  function test_input($data) { //validation 함수
    $data = trim($data); //처음과 끝 앞뒤의 공백 제거
    $data = stripslashes($data); //백슬래시 제거
    $data = htmlspecialchars($data); //특수 문자를 HTML 엔티티로 변환
    return $data;
  }

  $method = $_SERVER['REQUEST_METHOD']; //method는 POST로 받아왔으므로 POST
  $url = "../game/".$_SESSION['id']."_coupon.json"; //json 파일의 주소
    if(file_exists($url)){
      if($method == 'POST'){
        $file = explode("\n", file_get_contents($url)); //개행 기준으로 잘라서 가져옴
        foreach ($file as $val) {
          $obj = json_decode($val); //decode
          if($obj !== null){ //발행일과 할인율을 반환
            echo(json_encode(array("issued_date" => test_input($obj->issued_date), "discount_rate" => test_input($obj->discount_rate)))."\n");
          }
      }
      }
    else{ //쿠폰이 비어 있는 경우
      echo("false");
    }
  }




  ?>