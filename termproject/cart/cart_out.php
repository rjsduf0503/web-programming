<?php
session_start();
if(!isset($_SESSION['id'])){ //세션에 id값이 존재x
    echo("false1");
}
  function test_input($data) { //validation 함수
    $data = trim($data); //처음과 끝 앞뒤의 공백 제거
    $data = stripslashes($data); //백슬래시 제거
    $data = htmlspecialchars($data); //특수 문자를 HTML 엔티티로 변환
    return $data;
  }

  $method = $_SERVER['REQUEST_METHOD']; //method는 POST로 받아왔으므로 POST
  $url = "../signup/".$_SESSION['id']."_cart.json"; //json 파일의 주소
  if($_REQUEST['data'] != ""){
    $data = $_REQUEST['data']; //data 값을 요청하여 얻음
    $decodedData = json_decode($data); //얻어온 data값은 json화 되어있으므로 decode
    $not_removed = true; //중복되는 것이 있으면 최초 한번만 삭제되도록 하기 위한 변수

    if(file_exists($url)){
        if($method == 'POST'){
            $file = explode("\n", file_get_contents($url));
            unlink($url); //파일 삭제

            foreach ($file as $val) {
                $obj = json_decode($val);
                if($obj !== null){
                  //삭제해야 할 값, 그대로 둠
                    if(test_input($obj->img) == test_input($decodedData->img) && test_input($obj->name) == test_input($decodedData->name) && test_input($obj->hprice) == test_input($decodedData->hprice) && test_input($obj->lprice) == test_input($decodedData->lprice) && test_input($obj->mallName) == test_input($decodedData->mallName) && $not_removed){ 
                        $not_removed = false;
                        continue;
                    }
                    else{ //수정하지 않는 값, 그대로 넣어줌
                        $encoded = json_encode(array("img" => test_input($obj->img), "name" => test_input($obj->name), "hprice" => test_input($obj->hprice), "lprice" => test_input($obj->lprice), "mallName" => test_input($obj->mallName)));
                        file_put_contents($url, $encoded."\n", FILE_APPEND);
                        echo($encoded."\n");

                    }
                }
            }
            return;
        }
    }
  }
    if(!file_exists($url)){ //장바구니가 비어있는 경우
      echo("false2");
    }


  ?>