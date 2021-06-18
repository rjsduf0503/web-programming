<?php
  function test_input($data) { //validation 함수
    $data = trim($data); //처음과 끝 앞뒤의 공백 제거
    $data = stripslashes($data); //백슬래시 제거
    $data = htmlspecialchars($data); //특수 문자를 HTML 엔티티로 변환
    return $data;
  }

  $method = $_SERVER['REQUEST_METHOD'];
  $url = "./data.json";
  $data = $_REQUEST['data'];
  $jsoninfo = [];
  $decodedData = json_decode($data);
  $id = test_input($decodedData->id); //id가 존재하는지를 체크하므로 id만 가져옴
  $isExist = false; //is값이 존재하는지의 여부는 최초에 false
  if(file_exists($url)){
      if($method == 'POST'){
        $file = explode("\n", file_get_contents($url));
        foreach ($file as $val) {
            $obj = json_decode($val);
            //여기까지는 login2.php와 같음
            if($obj !== null){
                $jsoninfo[$obj->id] = $obj->pw;
            }//jsoninfo에 id값과 pw쌍들을 저장하고
        }
        if($jsoninfo == null){ //jsoninfo에 저장된 값이 없다면
            echo($id); //중복되는 아이디가 없다는 뜻이므로 id를 보내줌
        }
        $jsonIDs = array_keys($jsoninfo); //jsoninfo의 key값(id)만을 가져와서 저장
        foreach($jsonIDs as $val){ //그 id들을 돌며
            if(strcmp($val, $id) == 0){ //사용자가 입력한 id와 같은 값이 있다면(존재)
                $isExist = true; //아이디가 존재한다고 변경
                break;
            }
        }
    }
}
if($isExist){ //아이디가 존재한다면
    echo(false); //false를 보내줌
}
else{ //아이디가 존재하지 않다면(중복 x)
    echo($id); //id를 보내줌
}