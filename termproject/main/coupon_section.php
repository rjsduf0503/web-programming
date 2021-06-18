<?php include("../header.php") ?> 
<?php 
    if(!isset($_SESSION['id'])){ //세션값을 확인하여 로그인 했을 경우에만 이용 가능하도록함
        echo '<script>alert("로그인 후 이용 가능합니다.");</script>';
        header("Refresh:0; url=../main/main_section.php");
    }
?> 
    <link rel="stylesheet" href="../game/game.css">
    <!-- 게임 페이지를 구현한다. -->
    <!-- 게임은 간단한 포트리스를 구현하여 사용자는 키보드 방향키로 발사 각도를 조절할 수 있고, 스페이스 바로 발사 세기를 조절할 수 있다.
    목표물은 랜덤한 높이의 기둥 위에 생성된다.
    사용자가 방향키로 발사 각도와 발사 세기를 조절하여 목표물을 향해 대포를 발사 후 폭탄이 목표물에 명중했다면,
    사용자는 0~50%의 랜덤한 할인 쿠폰을 얻을 수 있다.
    이 게임의 이용 가능 횟수에 제한을 걸어두어 무한하게 쿠폰을 발급받지 못하도록 한다.
    만약 게임에서 패배한다면, 사용자는 쿠폰을 발급받지 못한다.
     -->
     <!-- 게임 시작 버튼을 누르면 게임이 실행된다. -->
     <div class="section_div">
         쿠폰을 얻기 위한 게임 페이지
         <section class="coupon_section">
            
             <div id="canvas_parent">
                <canvas id="game"></canvas>
                <canvas id="banana"></canvas>
             </div>
             <div class="explanation_div">
                파워 게이지 충전 : SPACEBAR<br>
                좌,우 이동 : ← , →<br>
                상,하 조절 : ↑ , ↓
             </div>
             <div class="btn_div"><br>
                <button id="gameStart_btn">게임 시작</button>
             </div>
        </section>
    </div>

</section>
<!-- 게임을 통해 쿠폰을 얻을 수 있는 section. -->


<script src="../game/game.js"></script>

<?php include("../footer.php") ?>