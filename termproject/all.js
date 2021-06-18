$(document).ready(function() { //회원가입
    $("#signup_btn").on("click", function() {
      var valid = this.form.checkValidity(); //form의 vaildition을 수행
      if(valid){ //validation이 유효하다면, 사용자가 입력한 값들을 가져와 json화
        var name = $("#name").val();
        var birthday = $("#birthday").val();
        var id = $("#id").val();
        var pw = $("#pw").val();
        var email = $("#email").val();
        var address = $("#address").val();
        var phoneNumber = $("#phoneNumber").val();
        var jsonData = JSON.stringify({ "name": name, "birthday": birthday, "id": id, "pw": pw, "email": email, "address": address, "phoneNumber": phoneNumber });
        $.ajax({ //그 후 ajax로 서버와 통신
          type: "POST", //POST 방식으로 통신
          url: "../signup/signup2.php", //signup2.php와 통신
          data: {data : jsonData}, //data는 json화 한 jsonData를 보냄
          success: function(name) { //통신 성공
            alert(name + "님의 회원가입을 환영합니다.");
            page_replace(); //main_section로 되돌아간다.
          },
          error: function(jqXHR, textStatus, errorThrown) { //통신 실패
            alert("error");
            console.log(jqXHR.responseText);
          }
        });
      }
      else{ //validation이 유효하지 않은 경우
        alert("필수 사항을 조건에 맞게 전부 채웠는지 확인하세요.");
      }
    });
});

$(document).ready(function() { //아이디 중복 확인
    $("#isIDExist_btn").on("click", function() {
        var id = $("#id").val(); //id값을 가져와 json화
        var jsonData = JSON.stringify({ "id":id });
        //validation 검증 추가 : 빈칸인지 아닌지, id 형식에 맞추었는지
        $.ajax({ //그 후 ajax로 서버와 통신
          type: "POST", //POST 방식으로 통신
          url: "../signup/isIDExist.php", //isIDExist.php와 통신
          data: {data : jsonData}, //data는 json화 한 jsonData를 보냄
          success: function(testedID) { //통신 성공
            if(testedID == false){ //아이디가 이미 존재하는 경우
              alert("이미 존재하는 id 입니다.");
            }
            else if(testedID === id){ //아이디가 존재하지 않는 경우(중복x)
              alert(testedID + "는 사용 가능한 id 입니다.");
              $('#signup_btn').attr('disabled', false); //회원가입 버튼을 활성화하고,
              $('#id').attr('disabled', true); //id를 입력하는 란을 비활성화한다.
            }
          },
          error: function(jqXHR, textStatus, errorThrown) { //통신 실패
            alert("error");
            console.log(jqXHR.responseText);
          }
        });
    });
  });

  $(document).ready(function() { //로그인
    $("#login_btn").on("click", function() { 
      var valid = this.form.checkValidity(); //form의 vaildition을 수행
      if(valid){ //validation이 유효하다면, 사용자가 입력한 값들을 가져와 json화
        var id = $("#id").val();
        var pw = $("#pw").val();
        var jsonData = JSON.stringify({ "id": id, "pw": pw });
        $.ajax({ //그 후 ajax로 서버와 통신
          type: "POST", //POST 방식으로 통신
          url: "../login/login2.php", //login2.php와 통신
          data: {data : jsonData}, //data는 json화 한 jsonData를 보냄
          success: function(testedID) { //통신 성공
            if(testedID == false){ //아이디 혹은 비밀번호가 틀렸을 경우
              alert("아이디 혹은 비밀번호가 틀렸습니다.");
            }
            else if(testedID === id){ //아이디와 비밀번호가 일치할 경우
              alert(testedID + "님 환영합니다.");
              page_replace(); //main_section로 되돌아간다.
            }
          },
          error: function(jqXHR, textStatus, errorThrown) { //통신 실패
            alert("error");
            console.log(jqXHR.responseText);
          }
        });
      }
      else{
        alert("아이디와 비밀번호를 올바르게 입력했는지 확인하세요."); //통신 실패
      }
    });
  });

  $(document).ready(function() { //로그아웃
    $("#toLogoutLink").on("click", function() {
        $.ajax({ //ajax로 서버와 통신
          type: "POST", //POST 방식으로 통신
          url: "../login/logout.php", //logout.php와 통신
          success: function() { //통신 성공
            alert("로그아웃 되었습니다."); 
            page_replace(); //main_section로 되돌아간다.
          },
          error: function(jqXHR, textStatus, errorThrown) { //통신 실패
            alert("error");
            console.log(jqXHR.responseText);
          }
        });
    });
});


$(document).ready(function() { //초기화 버튼
    $("#reset_btn").on("click", function() { //reset_btn을 누르면
      $('#signup_btn').attr('disabled', true); //signup_btn을 비활성화하고,
      $('#id').attr('disabled', false); //id를 입력하는 란을 활성화한다.
    });
  });


function page_replace() { //main_section으로 돌아감
    location.replace("../main/main_section.php");
}







//쿠폰이 화면의 랜덤한 위치에 생성되도록 하는 함수 구현 
function show_randomPosition(){
  //쿠폰이 생성되도록 구현하고,
  //일정 시간이 경과하거나 사용자가 그 쿠폰을 클릭하면
  //쿠폰이 화면에서 사라지는 함수를 불러옴
  //쿠폰을 클릭했을 경우에는 사용자에게 랜덤 쿠폰을 발급함
}

function hide_randomPostion(){
  //쿠폰이 화면에서 사라지도록 구현
}