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
  if($_REQUEST['data'] != ""){
    $data = $_REQUEST['data']; //data 값을 요청하여 얻음
    $decodedData = json_decode($data); //얻어온 data값은 json화 되어있으므로 decode

    if(file_exists($url)){
        if($method == 'POST'){
            $file = explode("\n", file_get_contents($url));
            unlink($url); //파일 삭제

            foreach ($file as $val) {
                $obj = json_decode($val);
                if($obj !== null){
                    if(test_input($obj->issued_date) == test_input($decodedData->issued_date) && test_input($obj->discount_rate) == test_input($decodedData->discount_rate)){ //삭제해야 할 값, 그대로 둠
                    }
                    else{ //수정하지 않는 값, 그대로 넣어줌
                        $encoded = json_encode(array("issued_date" => test_input($obj->issued_date), "discount_rate" => test_input($obj->discount_rate)));
                        file_put_contents($url, $encoded."\n", FILE_APPEND);

                    }
                }
            }
        }
    }
  }






  ?>