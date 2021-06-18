<?php session_start(); 

?>
<!-- 모든 페이지의 공통으로 들어가는 header에서 세션을 시작 -->

<!-- <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<!DOCTYPE html>
<html lang="ko">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

        
    <title>Home</title>
    <link rel="stylesheet" href="../all.css">
    <link rel="stylesheet" href="../main/main.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
    <div class="head">
        <header>
            <div class="wrap">
                <div id="home_logo">
                    <a href="../main/main_section.php">S&G</a>
                    <small>Shopping & Game</small>
                </div>
                <div class="login_logout">
                        <ul>
                            <?php if(isset($_SESSION['id'])) : ?>
                                <li><a class="hide" href="../login/login.php" name="toLoginLink" id="toLoginLink">LOGIN</a></li>
                                <li><a class="hide" href="../signup/signup.php" name="toSignupLink" id="toSignupLink">SIGNUP</a></li>
                                <li><a class="show" href="../main/main_section.php" name="toLogoutLink" id="toLogoutLink">LOGOUT</a></li>
                            <?php else : ?>
                                <li><a class="show" href="../login/login.php" name="toLoginLink" id="toLoginLink">LOGIN</a></li>
                                <li><a class="show" href="../signup/signup.php" name="toSignupLink" id="toSignupLink">SIGNUP</a></li>
                                <li><a class="hide" href="../main/main_section.php" name="toLogoutLink" id="toLogoutLink">LOGOUT</a></li>
                            <?php endif; ?>
                        </ul>
                </div>
            </div>
        </header>
        <nav id="menu" class="center">
            <div class="wrap">
                <div>
                    <a href="../main/coupon_section.php" >Coupon</a>
                    <a href="../main/product_section.php" >Product</a>
                    <a href="../main/cart_section.php" >Cart</a>
                </div>
            </div>
        </nav>
    </div>




<!-- 사용자가 흥미를 잃지 않도록 게임 외에도 랜덤 시간에 화면의 랜덤 위치에 일정 시간동안만 쿠폰을 획득할 수 있는 창을 띄운다.
만일 사용자가 그 창을 보고 일정 시간이 지나기 전에 클릭한다면 쿠폰을 획득할 수 있다.  -->
<!-- 이를 header에 구현하여 어떤 페이지에서도 항상 쿠폰이 생성되도록 한다. -->