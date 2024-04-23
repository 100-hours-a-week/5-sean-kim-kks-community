"use strict";

const loginWrapperElem = document.querySelector('.login')
const emailInput = document.querySelector('.login_id input')
const passwordInput = document.querySelector('.login_pw input')
const loginButton = document.querySelector('.submit input')
const helperText = document.querySelector('.helper p');
const signUpLink = document.querySelector('.sign_up a')

// 이메일 유효성 검사

function validateEmail(email) {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
    if(pattern.test(email) === false) {return false;}
    else { return true; }
}

// 비밀번호 유효성 검사
function validatePassword(password){
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return pattern.test(password);
}

loginWrapperElem.addEventListener('keyup', () => {

    if (emailInput.value && passwordInput.value) {  
        loginButton.style.backgroundColor = '#7F6AEE';
    } else{  
        loginButton.style.backgroundColor = '#ACA0EB';
    }
});

//json 파일 가져오기
function fetchData(){ //사용자데이터를 비동기적으로 가져오는 함수. 
    return new Promise(function(receive){ //fetchdata 함수는 promise 객체를 반환.
        fetch("/data/userdata.json") 
            .then(function(response){ // 첫 번재 then 메서드는 fetch에서 받은 response 객체를 처리한다. 
                return response.json(); // 응답 본문을 json으로 파싱 이를 then 메서드로 전달
            })
            .then(function(data){ //
                receive(JSON.stringify(data)); //javascripit객체를 문자열로 변환 후 fetchdata 함수가 반환하는 receiive 함수에 전달.
            });
    });
}

//로그인 버튼 유효성 검사
loginButton.addEventListener('click', async function(){
    
    const email = emailInput.value.trim(); // 공백 제거 한 후 email 에 저장
    const password = passwordInput.value.trim();

    if (!email || email.length < 5 || !validateEmail(email)){
        helperText.textContent = '올바른 이메일 주소 형식을 입력해주세요.(예: example@example.com)';
        return;
    }
    if (!password){
        helperText.textContent = '*비밀번호를 입력해주세요.';
        return;
    }
    if (!validatePassword(password)){
        helperText.textContent = '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야합니다.';
        return;
    }
    try {
        // userdata.json 파일에서 사용자 데이터 불러오기
        const response = await fetch("./data/userdata.json");
        const users = await response.json();
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
});