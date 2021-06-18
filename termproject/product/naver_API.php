<?php
 
 class ShopApiManager {
         
        private $key = "W3WigsZMLb"; //나의 오픈API 키 
        private $searchUrl = "http://openapi.naver.com/v1/search/shop.json"; // 오픈API 호출URL
        private $target = "shop";
 
        /**
         * API 결과를 받아오기 위하여 오픈API 서버에 Request 를 하고 결과를 XML Object 로 반환하는 메소드
         * @return object
         */
        private function query($query)
        {
                $url = sprintf("%s?query=%s", $this->searchUrl, $query);
                $data =file_get_contents($url);
                $xml = simplexml_load_string($data);
                return $xml;
        }
 
        /**
         * API의 결과를 Array 형태로 반환하는 사용자 커스터마이징 메소드
         * XML을 직접 parsing 하여 Array형태로 변환한다  
         */
        public function getShopData($query)
        {
                $xml = $this->query($query);
 
                $result = array();
                $shop = array();
                 
                foreach($xml->channel->item as $data){
 
                        $result['title'] = (string)$data->title;
                        $result['link'] = (string)$data->link;
                        $result['image'] = (string)$data->image;
                        $result['lprice'] = (int)$data->lprice;
                        $result['hprice'] = (int)$data->hprice;
                        $result['mallname'] = (string)$data->mallName;
                        $shop[] = $result;
                }
                 
                return $shop;
        }
}
?>
