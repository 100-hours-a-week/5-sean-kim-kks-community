const { response, json } = require("express")

//유저 데이터 불러오기
fetch("/data.json")
.then((response) => response.json())
.then((json) => {
    id_data = json.email;
    pwd_data = json.password;
})

let login = function(req, res){
    //유저데이터 불러온 것과 아이디 비밀번호 일치시 로그인
    try {
        // userdata.json 파일에서 사용자 데이터 불러오기
        const response = fetch("./data/userdata.json");
        const users = response.json();
        // 사용자 데이터 내에서 입력된 이메일과 비밀번호가 일치하는 사용자가 있는지 확인
        const userExists = users.some(user => user.email === email && user.password === password);
        
        if (userExists) {
            alert('로그인 성공!');
            window.location.href = "checkpostlist.html";
        } else {
            alert('로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.');
        }
    } catch (error) {
        console.error('로그인 에러:', error);
    }

}