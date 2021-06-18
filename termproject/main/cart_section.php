<?php include("../header.php") ?> 
<link rel="stylesheet" href="../cart/cart.css">
<?php 
    if(!isset($_SESSION['id'])){ //세션값을 확인하여 로그인 했을 경우에만 이용 가능하도록함
        echo '<script>alert("로그인 후 이용 가능합니다.");</script>';
        header("Refresh:0; url=../main/main_section.php");
    }
?> 

<section class="cart_section">
    <div class="wrap">
        <div class="table_div">
            <table cellspacing="0" border="1" summary="<?php echo($_SESSION['id']); ?>님의 장바구니" id="cart_table">
                <caption><?php echo($_SESSION['id']); ?>님의 장바구니</caption>
                <colgroup>
                    <col width="10%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="5%">
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">선택</th> 
                        <th scope="col">상품이미지</th>
                        <th scope="col">상품명</th>
                        <th scope="col">최고가</th>
                        <th scope="col">최저가</th>
                        <th scope="col">판매몰</th>
                        <th scope="col">삭제</th>
                    </tr>
                </thead>
                <tbody id="cart_list">
                </tbody>
            </table>
        </div>
        <div id="pay_div">
            <div class="text">
                
                총 가격은 <span id="total_price">0</span> 원 입니다.
                <br>
            <input type="button" value="초기화" id="reset_btn">
                <input type="button" value="쿠폰 적용하기" id="coupon_btn">
                <input type="button" value="결제하기" id="pay_btn">
            </div>
        </div>
    </div>
</section>

<div id="cart_modal" data-backdrop="static" data-keyboard="false">
    <div class="modal_head">
        <p>쿠폰 적용하기</p><br>
    </div>
    <div class="modal_contents">
    
    </div>
    <div class="btn_div">
        <form action="">
            <button type="button" id="apply_btn">적용하기</button>
            <button type="button" id="close_btn">닫기</button>

        </form>
    </div>
</div>

<div id="pay_modal" data-backdrop="static" data-keyboard="false">
    <div class="modal_head">
        <p>결제창</p><br>
    </div>
    <div class="modal_contents">
    
    </div>
    <div class="btn_div">
        <form action="">
            <button type="button" id="pay">결제</button>
            <button type="button" id="cancel">취소</button>

        </form>
    </div>
</div>
<!-- 사용자의 장바구니를 표현한 section. -->

<script src="../cart/cart.js"></script>
<?php include("../footer.php") ?>