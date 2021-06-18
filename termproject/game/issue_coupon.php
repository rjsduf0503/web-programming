<?php
    session_start(); //세션을 시작하고

    function test_input($data) { //validation 함수
        $data = trim($data); //처음과 끝 앞뒤의 공백 제거
        $data = stripslashes($data); //백슬래시 제거
        $data = htmlspecialchars($data); //특수 문자를 HTML 엔티티로 변환
        return $data;
    }
    $already_issued = false;

    if(!isset($_SESSION['id'])){ //세션에 id값이 존재x
        header("Refresh:0; url=../main/main_section.php");
    }
    // else{
        $discount_rate = rand(10,50); //10에서 50퍼의 할인율
        $today = date("Ymd"); //오늘 날짜

        $method = $_SERVER['REQUEST_METHOD'];
        $url = "./".$_SESSION['id']."_coupon.json";
        
        if(file_exists($url)){ //오늘 이미 발급 받았는지 여부를 체크, 받지 않았다면 발급해줌
            if($method == 'POST'){
                $file = explode("\n", file_get_contents($url));
                foreach ($file as $val) {
                    $obj = json_decode($val);
                    if($obj !== null){
                        if(strcmp(test_input($obj->issued_date), $today) == 0){
                            $already_issued = true;
                            echo false;
                            break;
                        }
                    }
                }
            }
        }


        if(!$already_issued){ //오늘 발급 x
            if($method == 'POST'){
                $encoded = json_encode(array("issued_date" => $today, "discount_rate" => $discount_rate));
                file_put_contents($url, $encoded."\n", FILE_APPEND);
                echo($discount_rate);
            }
        }
    
    
    
    
    
    
    
    
    
    
    
    
        // }
?>