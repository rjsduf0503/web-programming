var to_cart_btn = document.querySelectorAll('.to_cart_btn');
to_cart_btn.forEach(element => {
    element.addEventListener('click', event => to_cart(event));
});

//장바구니에 담는 함수
//각각 img와 상품명, 최고가, 최저가, 판매몰을 저장하여 ajax로 통신
function to_cart(event){
  var tr = event.target.parentNode.parentNode;
  var td1 = tr.firstChild.nextSibling;
  console.log(td1);
  var img_src = td1.firstChild.src;

    var td2 = td1.nextSibling.nextSibling;
    var product_name = td2.firstChild.innerHTML;
    product_name = product_name.replace(/(<([^>]+)>)/ig,"");

    var td3 = td2.nextSibling.nextSibling;
    var highest_price = td3.innerHTML;

    var td4 = td3.nextSibling.nextSibling;
    var lowest_price = td4.innerHTML;

    var td5 = td4.nextSibling.nextSibling;
    var mallName = td5.innerHTML;

            var jsonData = JSON.stringify({ "img": img_src, "name": product_name, "hprice": highest_price, "lprice": lowest_price, "mallName": mallName });
            $.ajax({ 
              type: "POST", //POST 방식으로 통신
              url: "../cart/cart.php", 
              data: {data : jsonData}, //data는 json화 한 jsonData를 보냄
              success: function(data) { //통신 성공
                // alert(data);
                if(data === 'false1'){
                    alert("로그인 하셔야 이용 가능합니다.");
                }
                else{
                    alert("장바구니에 물품을 담았습니다!");
                }
              },
              error: function(jqXHR, textStatus, errorThrown) { //통신 실패
                alert("error");
                console.log(jqXHR.responseText);
              }
            });

}