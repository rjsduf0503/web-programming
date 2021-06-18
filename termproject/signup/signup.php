<?php include("../header.php") ?> 
<link rel="stylesheet" href="signup.css">
<?php 
    if(isset($_SESSION['id'])){ //id값을 가진 세션이 존재한다면 main_section로 돌아감(이미 로그인 되어있으므로)
        header("Refresh:0; url=../main/main_section.php");
    }
?> 

<section>
    <div id="signup_div">
        <div class="wrap">
            <p>
                회원 가입
            </p>
        </div>
    </div>
    <div class="info_div">
        <div class="wrap">
            <form method="post">
                *이름 : <input type="text" name="name" id="name" required size="5" pattern="^[가-힣]+$"><br>
                생년월일 : <input type="date" name="birthday" id="birthday"><br>
                *아이디 : <input type="text" name="id" id="id" required size="10" pattern="^([a-z0-9]){6,15}$"> (소문자와 숫자로 이루어진 6~15자리의 조합)<br>
                *비밀번호 : <input type="password" name="pw" id="pw" required size="10" pattern="^[A-Za-z0-9]{6,12}$"> (영문 대소문자, 숫자로 이루어진 6~12자리의 조합)<br>
                이메일 : <input type="text" name="email" id="email" size="20" pattern="^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$"><br>
                *주소 : <input type="text" name="address" id="address" required size="30"><br>
                *전화번호 : <input type="text" name="phoneNumber" id="phoneNumber" required size="13" pattern="^\d{3}-\d{3,4}-\d{4}$"> (하이픈(-)을 포함하여 입력)<br>
                <br><button type="reset" name="reset_btn" id="reset_btn">초기화</button>
                <button type="button" name="isIDExist_btn" id="isIDExist_btn">아이디 중복 확인</button>
                <button type="button" name="signup_btn" id="signup_btn" disabled="disabled" formaction="signup.php">회원 가입</button>
            </form>
        </div>
    </div>
</section>




<?php include("../footer.php") ?>