const canvas = document.getElementById('game');
const game_ctx = canvas.getContext('2d');
const banana_canvas = document.getElementById('banana');
const banana_ctx = banana_canvas.getContext('2d');

var start_btn = document.getElementById('gameStart_btn');
start_btn.addEventListener('click', game_start);

var drawing;

var leftKey = false;
var rightKey = false;
var upKey = false;
var downKey = false;
var spaceKey = false;
document.addEventListener('keydown', event => keyDown(event));
document.addEventListener('keyup', event => keyUp(event));

//발사 장치 관련 변수
const launcher_width = 20; //발사 장치의 너비(가로)
const launcher_height = 20; //발사 장치의 높이(세로)
var launcher_x = 0; //발사 장치의 x좌표
var launcher_center_x; //발사 장치의 중심 x좌표
var launcher_center_y; //발사 장치의 중심 y좌표
const launcher_speed = 2; //발사 장치가 움직이는 속도
var cannon_length = 20; //cannon의 길이
var cannon_angle = 0; //cannon의 각도는 0도~90도 (0~PI/2)
const cannon_angle_speed = (Math.PI/2)/90; //cannon의 발사 각도 조정 속도
var cannon_end_x; //cannon의 제일 끝 x좌표
var cannon_end_y; //cannon의 제일 끝 y좌표

//발사물 관련 변수
var projectile_x; //발사물의 x좌표
var projectile_y; //발사물의 y좌표
var projectile_radius = 3; //발사물의 반지름
var is_gauge_charging = false; //게이지를 채우고 있나?
var is_shot = false; //발사물이 발사되었나
var guage = 0; //게이지
var guage_charging_speed = launcher_width / 60; //게이지 채우는 속도
var projectile_power; //발사물의 힘
var projectile_x_speed; //발사물의 x 방향 속도
var projectile_y_speed; //발사물의 y 방향 속도
const GRAVITY = 0.098; //중력 가속도

//벽 관련 변수
const WALL_SIZE = 4;

//목표물 관련 변수
//목표물의 가로,세로, x,y 좌표는 랜덤하게 배치
var target_width = Math.floor(Math.random()*40 + 30);
var target_height = Math.floor(Math.random()*20 + 20);
//목표물의 x좌표는 canvas.width/2 ~ canvas.width-target_width
var target_x = canvas.width - Math.floor(Math.random()*(canvas.width/2));
if(target_x + target_width > canvas.width){
    target_x -= target_width;
}
//목표물의 y좌표는 0~canvas.height-target_height
var target_y = Math.floor(Math.random()*canvas.height);
if(target_y + target_height > canvas.height){
    target_y -= target_height;
}



function game_start(){ //처음에 게임을 시작하는 함수
    draw_banana(); //바나나를 따로 그림
    start_btn.setAttribute('disabled', 'disabled'); //시작 버튼 비활성화
    drawing = setInterval(draw_all, 30); //30ms 간격으로 draw_all함수를 호출해 움직이는 것이 자연스럽게 보이도록 함
}
function draw_banana(){ //바나나를 그리는 함수
    var banana = new Image();
    banana.onload = function(){
        banana_ctx.drawImage(banana,target_x,target_y,target_width,target_height);
    }
    banana.src = "../game/banana.png";
}

function draw_all(){ //모두 그리는 함수
    // set_background();
    game_ctx.clearRect(0, 0, canvas.width, canvas.height); //그리기 전 캔버스 초기화
    if(leftKey == true && launcher_x > 0){ //왼쪽키가 눌리고 왼쪽 벽보다 오른쪽이라면 발사체의 x좌표 -
        launcher_x -= launcher_speed;
    }
    else if(rightKey == true && launcher_x + launcher_width/2 + cannon_length*Math.cos(cannon_angle) < canvas.width/2 - WALL_SIZE && launcher_x + launcher_width < canvas.width/2 - WALL_SIZE+1){
        //오른쪽 키가 눌리고 발사체의 대포와 발사체의 몸체가 가운데 벽보다 왼쪽일때, 발사체의 x좌표 +
        launcher_x += launcher_speed;
    }
    else if(upKey == true && cannon_angle > -Math.PI/2){ //위 키가 눌리고 cannon의 각도가 (-)90도 일때 
        // console.log(cannon_angle);
        if(launcher_x + launcher_width/2 + cannon_length*Math.cos(cannon_angle) < canvas.width/2 - WALL_SIZE){
            //벽보다 왼쪽이라면 cannon의 각도 -
            cannon_angle -= cannon_angle_speed;
        }
    }
    else if(downKey == true && cannon_angle < 0){ //아래 키가 눌리고 cannon의 각도가 0보다 작을 때
        if(launcher_x + launcher_width/2 + cannon_length*Math.cos(cannon_angle) < canvas.width/2 - WALL_SIZE){
            //벽보다 왼쪽이라면 cannon의 각도 +
            cannon_angle += cannon_angle_speed;

        }
    }
    draw_launcher(); //발사체를 그리고
    draw_wall(); //벽을 그리고
    // draw_target();
    charging_gauge(); //게이지를 채우는 바를 그리고
    draw_projectile(); //발사물을 그리고
    on_hit(); //명중했는지 체크
}
function draw_wall(){ //벽을 그리는 함수
    game_ctx.lineCap = "round";
    game_ctx.lineWidth = WALL_SIZE;
    game_ctx.beginPath();
    game_ctx.moveTo(canvas.width/2, canvas.height);
    game_ctx.lineTo(canvas.width/2, canvas.height/2);
    game_ctx.stroke();
    game_ctx.closePath();
}
function draw_launcher(){ //발사체를 그리는 함수
    //발사체의 몸체
    game_ctx.lineCap = 'round';
    game_ctx.lineWidth = 2;
    game_ctx.beginPath();
    game_ctx.moveTo(launcher_x, canvas.height);
    game_ctx.lineTo(launcher_x, canvas.height-launcher_height);
    game_ctx.lineTo(launcher_x+launcher_width, canvas.height-launcher_height);
    game_ctx.lineTo(launcher_x+launcher_width, canvas.height);
    game_ctx.lineTo(launcher_x, canvas.height);


    //발사하는 곳
    launcher_center_x = launcher_x + (launcher_width/2);
    launcher_center_y = canvas.height - (launcher_height/2);
    cannon_end_x = launcher_center_x + cannon_length*Math.cos(cannon_angle);
    cannon_end_y = launcher_center_y + cannon_length*Math.sin(cannon_angle);
    game_ctx.moveTo(launcher_center_x, launcher_center_y);
    game_ctx.lineTo(cannon_end_x, cannon_end_y);


    game_ctx.stroke();
    game_ctx.closePath();
}
// function draw_target(){
//     //몸체
//     // game_ctx.fillRect(target_x, target_y, target_width, target_height);
//     // game_ctx.fillStyle = "black";
//     var banana = new Image();
//     banana.onload = function(){
//         game_ctx.drawImage(banana,target_x,target_y,target_width,target_height);
//     }
//     banana.src = "../game/banana.png";

// }

function keyDown(event){ //키를 눌렀을 때
    if(event.keyCode === 39){ //오른쪽 키
        rightKey = true;
    }
    else if(event.keyCode === 37){ //왼쪽 키
        leftKey = true;
    }
    else if(event.keyCode === 38){ //위 키
        upKey = true;
    }
    else if(event.keyCode === 40){ //아래 키
        downKey = true;
    }
    else if(event.keyCode === 32 && !is_shot){ //스페이스 바, 발사되지 않은 경우
        is_gauge_charging = true; //게이지를 충전 중
    }
}
function keyUp(event){ //키를 뗐을 때
    if(event.keyCode === 39){ //오른쪽 키
        rightKey = false;
    }
    else if(event.keyCode === 37){ //왼쪽 키
        leftKey = false;
    }
    else if(event.keyCode === 38){ //위 키
        upKey = false;
    }
    else if(event.keyCode === 40){ //아래 키
        downKey = false;
    }
    else if(event.keyCode === 32 && !is_shot){ //스페이스 바, 발사되지 않은 경우
        is_gauge_charging = false; //게이지 그만 충전
        is_shot = true; //발사됨
        launch_projectile(); //발사물을 발사
        guage = 0; //guage는 0으로 초기화
    }
}

//게임 시작 버튼을 누르면 게임이 실행되도록 구현

//발사체와 발사 장치와 목표물을 그리는 함수 구현
//발사 장치는 좌측 하단 끝에서 일정 거리까지만 이동 가능하고,
//목표물은 난이도를 위해 랜덤한 위치에 랜덤한 높이를 갖고 생성된다.
//발사 장치는 좌우로만 움직일 수 있고, 바닥에 붙어있으며 벽을 통과할 수 없음을 구현



function charging_gauge(){ //발사물을 발사할 파워 게이지를 설정
    //스페이스바를 누르는 동안 게이지를 충전하고,
    //스페이스바를 떼면 현재 게이지의 값을 갖고 발사체를 발사한다.
    if(is_gauge_charging == true && is_shot == false){
        if(guage < launcher_width){
            guage += guage_charging_speed;
        }
        draw_guage();
    }
}
function draw_guage(){ //게이지 바를 그리는 함수
    // charging_gauge();
    var gauge_bar_x = launcher_x;
    var gauge_bar_y = launcher_center_y-cannon_length-5;

    //게이지 바 그리기
    game_ctx.lineCap = 'round';
    game_ctx.lineWidth = 2;
    game_ctx.beginPath();
    game_ctx.moveTo(gauge_bar_x, gauge_bar_y);
    game_ctx.lineTo(gauge_bar_x, gauge_bar_y-5);
    game_ctx.lineTo(gauge_bar_x+launcher_width, gauge_bar_y-5);
    game_ctx.lineTo(gauge_bar_x+launcher_width, gauge_bar_y);
    game_ctx.lineTo(gauge_bar_x, gauge_bar_y);

    //게이지 바 채우기
    game_ctx.fillRect(gauge_bar_x, gauge_bar_y-5, guage, 5)

    game_ctx.stroke();
    game_ctx.closePath();
}

function draw_projectile(){ //발사물을 그리는 함수
    if(is_shot == true){ //발사된 경우라면 
        projectile_y_speed -= GRAVITY; //y 방향 속도는 중력의 영향을 받음
        projectile_x += projectile_x_speed; //x좌표는 x방향 속도 +
        projectile_y -= projectile_y_speed; //y좌표는 y방향 속도 -
    }
    else{ //발사되지 않았다면 cannon의 끝에 달려있음
        projectile_x = launcher_center_x + cannon_length*Math.cos(cannon_angle)
        projectile_y = launcher_center_y + cannon_length*Math.sin(cannon_angle);
    }
    //발사물 그리기
    game_ctx.beginPath();
    game_ctx.arc(projectile_x, projectile_y, 2, 0, Math.PI*2);
    game_ctx.fillStyle = "red";
    game_ctx.fill();
    game_ctx.closePath();
}

function launch_projectile(){//발사물을 발사하는 함수
    //설정된 각도와 게이지로 발사물을 발사한다.
    projectile_power = guage / 3;
    projectile_x_speed = projectile_power * Math.cos(cannon_angle);
    projectile_y_speed = projectile_power * (-Math.sin(cannon_angle));
}


// 발사 파워 게이지, 발사체가 날아가는 동안에도 화면에 그려질 수 있도록 구현한다.


function on_hit(){ //발사물이 목표물에 명중했는지를 체크하는 함수
    //발사한 발사물이 목표물의 border에 닿는다면 명중
    //차례대로 왼쪽 벽, 오른쪽 벽, 아래 바닥에 닿았을 경우 실패
    if(projectile_x<=0 || projectile_x >= canvas.width || projectile_y >= canvas.height){
        // console.log(canvas.width);
        // console.log(canvas.height);
        // console.log(projectile_x);
        // console.log(canvas.height);
        
        clearInterval(drawing); //setInterval 한 것을 초기화
        if(confirm("실패하였습니다. 다시 도전하시겠습니까?")){
            location.reload();
        }
    }
    //가운데 벽에 닿았을 경우 실패
    if(projectile_x>=canvas.width/2-3 && projectile_x<=canvas.width/2+3 && projectile_y <= canvas.height && projectile_y >= canvas.height/2){
        clearInterval(drawing); //setInterval 한 것을 초기화
        if(confirm("실패하였습니다. 다시 도전하시겠습니까?")){
            location.reload();
        }
    }
    if(projectile_x >= target_x && projectile_x <= target_x + target_width && projectile_y >= target_y+target_height/4 && projectile_y <= target_y + 3*target_height/4){
        clearInterval(drawing); //setInterval 한 것을 초기화
        issue_coupon(); //쿠폰 발행
    }
            // banana_ctx.fillStyle = "pink";
        // banana_ctx.fillRect(target_x, target_y+target_height/4, target_width, target_height/2);
}
function issue_coupon(){ //랜덤 쿠폰을 발행하는 함수
    $.ajax({ //ajax로 서버와 통신
        type: "POST", //POST 방식으로 통신
        url: "../game/issue_coupon.php", //logout.php와 통신
        success: function(discount_rate) { //통신 성공
            if(discount_rate == false){
                alert("오늘 이미 할인 쿠폰을 발행 받으셨습니다. 내일 또 찾아와 주세요!");
            }
            else{
                alert(discount_rate + "% 할인 쿠폰이 발행되었습니다."); 
            }
            // page_replace(); //main_section로 되돌아간다.
        },
        error: function(jqXHR, textStatus, errorThrown) { //통신 실패
            alert("error");
            console.log(jqXHR.responseText);
        }
    });
}