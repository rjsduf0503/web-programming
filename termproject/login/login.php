<?php include("../header.php") ?> 
<link rel="stylesheet" href="login.css">
<?php 
    if(isset($_SESSION['id'])){ //세션 값을 확인하여 이미 로그인되어 있다면 main_section.php로 되돌아감
        header("Refresh:0; url=../main/main_section.php");
    }
?> 
<section>
    <div class="wrap">
        <div id="login_div">
            <p>
                로그인
            </p>
        </div>
        <div class="info_div">
            <form method="post">
                아이디 : <input type="text" name="id" id="id" required size="10" pattern="^([a-z0-9]){6,15}$"><br>
                비밀번호 : <input type="password" name="pw" id="pw" required size="10" pattern="^[A-Za-z0-9]{6,12}$"><br>
                <br><button type="reset">초기화</button>
                <button type="button" name="login_btn" id="login_btn">로그인</button>
            </form>
        </div>  
    </div>
</section>




<?php include("../footer.php") ?>