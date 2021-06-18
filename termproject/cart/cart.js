var cart_list = document.getElementById('cart_list');
var present_cart; //현재 장바구니
var total_price = 0; //총 가격

$(document).ready(get_cart); //페이지가 로딩되면 장바구니를 가져옴
function get_cart() { //장바구니에 품목들을 가져오는 함수
    $.ajax({ 
        type: "POST", //POST 방식으로 통신
        url: "../cart/cart.php",
        async: false, 
        success: function(from_cart) { //통신 성공
          if(from_cart == 'false'){
              alert("장바구니가 비어 있습니다.");
          }
          else{
            locate_cart(from_cart); //장바구니에 있는 값들을 가져와서 배치
          }
        },
        error: function(jqXHR, textStatus, errorThrown) { //통신 실패
          alert("error");
          console.log(jqXHR.responseText);
        }
    });
}

function locate_cart(from_cart){ //from_cart의 값들을 table에 배치하는 함수

    if(from_cart != ""){
        present_cart = from_cart;
        // from_cart = from_cart.substring(5);
        var arr = from_cart.split("\n"); //개행 기준으로 자르기
        for(var i = 0; i<arr.length; i++){
            if(arr[i] != ""){
                //각 요소들에 속성을 달아주고 append로 요소들을 연결
                var data = JSON.parse(arr[i]);
                var img_src = data.img;
                var name = data.name;
                var hprice = data.hprice;
                var lprice = data.lprice;
                var mallName = data.mallName;

                var tr = document.createElement('tr');
                tr.setAttribute('id', 'cart_tr'+(i+1));

                var td1 = document.createElement('td');
                var chkbox = document.createElement('input');
                chkbox.setAttribute('type', 'checkbox');
                chkbox.setAttribute('class', 'cart_chkbox');
                td1.appendChild(chkbox);

                var td2 = document.createElement('td');
                var img = document.createElement('img');
                img.setAttribute('src', img_src);
                img.setAttribute('width', '50px');
                img.setAttribute('height', '70px');
                td2.appendChild(img);

                var td3 = document.createElement('td');
                td3.innerHTML = name;

                var td4 = document.createElement('td');
                td4.innerHTML = hprice;

                var td5 = document.createElement('td');
                td5.innerHTML = lprice;

                var td6 = document.createElement('td');
                td6.innerHTML = mallName;

                var td7 = document.createElement('td');
                var btn = document.createElement('input');
                btn.setAttribute('type', 'button');
                btn.setAttribute('value', 'X');
                btn.setAttribute('class', 'remove_btn');
                td7.appendChild(btn);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);

                //최종적으로 cart에 추가해줌
                cart_list.appendChild(tr);
            }
        }
        //다 추가하면 체크박스와 삭제버튼에 eventLinstener를 추가해줌
        get_chkbox();
        get_remove_btn();
    }
}
function get_chkbox(){ //각각의 체크박스들이 click되면 가격의 변동이 일어났는지 체크하여 값을 바꿔줌
    var cart_chkbox = document.querySelectorAll('#cart_list .cart_chkbox');
    cart_chkbox.forEach(element => {
        element.addEventListener('click', price_change);
});
}
function get_remove_btn(){ //각각의 삭제버튼들이 눌리면 그 테이블에서 상품을 삭제해줌
    var remove_btn = document.querySelectorAll('#cart_list .remove_btn');
    remove_btn.forEach(element => {
        element.addEventListener('click', e=>cart_out(e, true));
    })
}

var price = document.getElementById('total_price');
function price_change(){ //가격의 변동이 일어날 때 마다 모든 checkbox를 돌아 price를 수정해줌
    var cart_chkbox = document.querySelectorAll('#cart_list .cart_chkbox');
    var temp = 0;
    cart_chkbox.forEach(element => {
        if(element.checked){
            temp+=Number(element.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML);
        }
    });
    price.innerHTML = temp;
    total_price = price.innerHTML;
}

function cart_out(e, event_exist){ //장바구니에서 선택된 품목을 삭제하는 함수. event_exist가 참이면 삭제버튼을 눌러서 실행된 경우, 거짓이면 결제버튼을 눌러서 실행된 경우
    // console.log(e.target);
    if(event_exist){ //삭제버튼을 누른 경우 event가 존재
        var tr = e.target.parentElement.parentElement;
    }
    else{ //결제 버튼을 누른 경우 event가 존재하지 않음
        var tr = e.parentElement.parentElement;
    }
    //각 요소들을 가져와 ajax로 전송
    var td1 = tr.firstChild.nextElementSibling;
    var img_src = td1.firstChild.src;

    var td2 = td1.nextElementSibling;
    var product_name = td2.innerHTML;

    var td3 = td2.nextElementSibling;
    var highest_price = td3.innerHTML;

    var td4 = td3.nextElementSibling;
    var lowest_price = td4.innerHTML;

    var td5 = td4.nextElementSibling;
    var mallName = td5.innerHTML;

    var jsonData = JSON.stringify({ "img": img_src, "name": product_name, "hprice": highest_price, "lprice": lowest_price, "mallName": mallName });
    $.ajax({ 
        type: "POST", //POST 방식으로 통신
        url: "../cart/cart_out.php",
        async: false, 
        data: {data : jsonData}, //data는 json화 한 jsonData를 보냄
        success: function(from_cart) { //통신 성공
          if(from_cart == "false1"){
              alert("로그인 하세요.");
          }
          else if(from_cart == "false2"){
              alert("장바구니가 비어 있습니다.");
          }
          else{ //성공적으로 장바구니에서 제거를 완료하면 페이지를 새로고침함
            location.reload();
          }
        },
        error: function(jqXHR, textStatus, errorThrown) { //통신 실패
          alert("error");
          console.log(jqXHR.responseText);
        }
    });
}

//각각 장바구니 모달, 쿠폰적용버튼, 취소 버튼, 적용 버튼, 초기화 버튼, 결제하기 버튼
var cart_modal = document.getElementById('cart_modal');
var coupon_btn = document.getElementById('coupon_btn');
var close_btn = document.getElementById('close_btn');
var apply_btn = document.getElementById('apply_btn');
var reset_btn = document.getElementById('reset_btn');
var pay_btn = document.getElementById('pay_btn');
coupon_btn.addEventListener('click', show_coupon_window);
close_btn.addEventListener('click', hide_coupon_window);
apply_btn.addEventListener('click', apply_coupon);
reset_btn.addEventListener('click', reset);
pay_btn.addEventListener('click', show_pay_windows);
function show_coupon_window(){
    if(total_price != 0){ //총 가격이 0이 아니라면
        get_coupons(); //coupon이 있는지 체크
        cart_modal.style.display ="block"; //쿠폰적용 모달 창을 띄움
    }
    else{ //총 가격이 0이면 쿠폰을 적용할 수 없음
        alert("상품을 하나 이상 선택하세요.");
    }
}
function hide_coupon_window(){ //쿠폰적용 모달 창을 숨김
    cart_modal.style.display ="none";
}

function get_coupons(){ //쿠폰이 있는지 체크 
    $.ajax({ 
        type: "POST", //POST 방식으로 통신
        url: "../game/get_coupon.php",
        async: false, 
        success: function(coupons) { //통신 성공
            show_coupon(coupons); //쿠폰이 존재한다면 모달 창에 쿠폰들을 띄워줌
        },
        error: function(jqXHR, textStatus, errorThrown) { //통신 실패
          alert("error");
          console.log(jqXHR.responseText);
        }
    });
}

function show_coupon(coupons){ //coupons를 쿠폰 모달창에 띄워주는 함수
    var modal_contents = document.querySelector('#cart_modal .modal_contents');
    while(modal_contents.hasChildNodes()){ //초기화
        modal_contents.removeChild(modal_contents.firstChild);
    }
    var arr = coupons.split("\n"); //개행 기준으로 자름
    for(var i = 0; i<arr.length; i++){
        if(arr[i] != ""){
            var data = JSON.parse(arr[i]);
            var date = data.issued_date; //발행일
            var rate = data.discount_rate; //할인율
            
            var radio = document.createElement('input'); //각각의 쿠폰은 하나씩만 적용되므로 radio버튼으로
            radio.setAttribute('type', 'radio');
            radio.setAttribute('name', 'coupon_radio');
            radio.setAttribute('value', date+"/"+rate);
            var div1 = document.createElement('div');
            div1.appendChild(radio);
            var span = document.createElement('span');
            span.innerHTML = "발급일 : " + date + " / 할인율 : " + rate + "%";
            div1.appendChild(span);
            // console.log(div1);
            // console.log(rate);
            modal_contents.appendChild(div1);
        }
    }
}
var apply_date = 0; //적용된 쿠폰의 발행일
var apply_rate = 0; //적용된 쿠폰의 할인율
function apply_coupon(){ //쿠폰을 적용하는 함수
    var radio = document.getElementsByName('coupon_radio');
        var val = null;
        //radio 버튼을 돌며 check된 값의 value를 가져와 발행일과 할인율을 추출하여 저장
        //그 후 할인율로 할인된 가격으로 총 가격을 조정하고, 쿠폰 모달창을 숨기고 체크박스를 클릭할 수 없도록 함
		for(var i=0;i<radio.length;i++){
			if(radio[i].checked == true){ 
                val = radio[i].value;
                apply_rate = val.substr(-2);
                apply_date = val.substr(0,8);
                // console.log(apply_date);
                price.innerHTML = Math.floor(Number(price.innerHTML)*(1-Number(apply_rate)/100));
                coupon_btn.setAttribute('disabled', 'disabled');
                hide_coupon_window();
                disable_chkbox();

			}
		}
		if(val == null){
                alert("쿠폰을 선택하세요."); 
			return false;
		}

}


function disable_chkbox(){ //모든 체크박스들을 클릭할 수 없도록
    var cart_chkbox = document.querySelectorAll('#cart_list .cart_chkbox');
    cart_chkbox.forEach(element => {
        element.setAttribute('disabled', "disabled");
});
}
function able_chkbox(){ //모든 체크박스들을 클릭할 수 있도록
    var cart_chkbox = document.querySelectorAll('#cart_list .cart_chkbox');
    cart_chkbox.forEach(element => {
        element.disabled = false;
});
}

function reset(){ //초기화 버튼을 누른 경우, 체크박스, 쿠폰 적용 버튼을 모두 사용 가능하도록 하게 변경하고, 가격을 변동(쿠폰이 적용되지 않은 가격으로)
    able_chkbox(); 
    coupon_btn.disabled = false;
    price_change();
}
function show_pay_windows(){ //결제 창을 띄우는 함수
    if(total_price != 0){
        pay_modal.style.display ="block";
    }
    else{
        alert("상품을 하나 이상 선택하세요.");
    }
}
function hide_pay_windows(){ //결제 창을 숨기는 함수
    pay_modal.style.display = "none";
}
var pay = document.getElementById('pay'); //결제 버튼
var cancel = document.getElementById('cancel'); //취소 버튼
pay.addEventListener('click', payment);
cancel.addEventListener('click', hide_pay_windows);

function payment(){ //결제를 수행하는 함수
    var cart_chkbox = document.querySelectorAll('#cart_list .cart_chkbox');
    cart_chkbox.forEach(element => { //결제를 수행하는 상품들에 대해 장바구니에서 제거하고, 쿠폰이 사용됐다면 쿠폰도 제거
        if(element.checked){
            cart_out(element.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstChild, false);
            use_coupon();
        }
    });
}

function use_coupon(){ //쿠폰이 사용되었다면 쿠폰을 삭제
    var jsonData = JSON.stringify({ "issued_date": apply_date, "discount_rate": apply_rate});
    $.ajax({ 
        type: "POST", //POST 방식으로 통신
        url: "../game/use_coupon.php",
        data: {data : jsonData}, //data는 json화 한 jsonData를 보냄
        success: function() { //통신 성공
        },
        error: function(jqXHR, textStatus, errorThrown) { //통신 실패
          alert("error");
          console.log(jqXHR.responseText);
        }
    });

}