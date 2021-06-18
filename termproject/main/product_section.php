<?php include("../header.php") ?> 
<link rel="stylesheet" href="../product/product.css">


<div class="search_shop">
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
                <input type="hidden" name="mode" value="search" />
                <fieldset class="search">
                        <legend>검색영역</legend>
                        검색어 : <input type="text" name="query" id="query" accesskey="s" title="검색어" class="keyword">
                        페이지 : <input type="number" name="page" id="page" min="1">
                        정렬 방식 :   <select name="sort" id="sort">
                                        <option value="sim">유사도순</option>
                                        <option value="date">날짜순</option>
                                        <option value="asc">가격오름차순</option>
                                        <option value="dsc">가격내림차순</option>
                                </select>
                        <input type="submit" id="search" value="검색" />
                </fieldset>
        </form> 
        <table cellspacing="0" border="1" summary="쇼핑검색 API 결과" class="tbl_type">
                <caption>쇼핑검색 API 결과</caption>
                <colgroup>
                        <col width="10%">
                        <col width="20%">
                        <col width="10%">
                        <col width="10%">
                        <col width="15%">
                        <col width="10%">
                </colgroup>
                <thead>
                        <tr>
                                <th scope="col">상품이미지</th>
                                <th scope="col">상품명</th>
                                <th scope="col">최고가</th>
                                <th scope="col">최저가</th>
                                <th scope="col">판매몰</th>
                                <th scope="col">장바구니</th>
                        </tr>
                </thead>
                <tbody id="list">


<?php 
// 네이버 API를 활용하여 
    function naverProductResult($query='', $sort='', $display=0, $start=0) {
 
        $api_url = "";
     
        $client_id = "NCAvI6S7COjtkV1i_4Za";
        $client_secret = "W3WigsZMLb";
     
        // 요청 URL
        $api_url .= "https://openapi.naver.com/v1/search/shop.json"; //상품 검색 결과 json
        
        // 검색어
        $api_url .= "?query=".urlencode($query);
     
        // 정렬방식
        if($sort != "")
            $api_url .= "&sort=".$sort;
     
        // 검색 시작 위치
        if($start > 0)
            $api_url .= "&start=".$start;
     
        // 한 페이지에 보여줄 개수
        if($display > 0)
            $api_url .= "&display=".$display;
     
        $ch = curl_init();
        $ch_headers[] = "X-Naver-Client-Id: ".$client_id;
        $ch_headers[] = "X-Naver-Client-Secret: ".$client_secret;
        curl_setopt($ch, CURLOPT_URL, $api_url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $ch_headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);
     
        return $result;
    }
?> 
<?php
if($_POST['mode'] == "search"){ //검색버튼을 누른 경우
        if($_POST['query'] != "" && $_POST['sort'] != "" && $_POST['page'] != ""){ //모든 값을 채웠을 때
                $result = naverProductResult($_POST['query'], $_POST['sort'], 5, $_POST['page']*5 - 4); //한 페이지에 5개씩, 사용자가 입력한 조건으로 검색
        }
        else{
                ?>
                <script>
                        alert("검색어, 페이지, 정렬 방식을 전부 입력하세요.");
                </script>
                <?php
        }
        // echo($result);
}
if($result != ""){
        //json형태의 검색 결과를 decode 과정
        $result_1 = explode('"items": [', $result);
        $result_2 = substr($result_1[1], 0, -4);
        $file = explode("},", $result_2);
        for($i = 0; $i<sizeof($file)-1; $i++){
                $file[$i] .= "}";
        }
        for($i = 0; $i<sizeof($file); $i++){
                // echo($file[$i]);
                $data = json_decode($file[$i]);
                ?>
                                <!-- decode된 값들을 각각 table의 td에 넣어줌  -->
                        <tr> 
                                <td><img src="<?php echo($data->image) ?>"  width="50px" height="70px" /></td>
                                <td><a href="<?php echo($data->link) ?>" target="_blank"><?php echo($data->title)?></a></td>
                                <td><?php echo($data->hprice == 0 ? $data->lprice : $data->hprice) ?></td>
                                <td><?php echo($data->lprice == 0 ? $data->hprice : $data->lprice) ?></td>
                                <td><?php echo($data->mallName) ?></td>
                                <td><input type="button" value="담기" class="to_cart_btn"></td>
                        </tr>
                        <?php } }
                        else return;?> 
                </tbody>
        </table>
</div>
<!-- 상품들을 검색하는 section. -->
<script src="../product/product.js"></script>
<?php include("../footer.php") ?>