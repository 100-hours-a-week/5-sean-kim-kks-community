"use strict";

/* 
1. 비밀번호 input에 입력하지 않거나 유효성 검사를 통과하지 못할 경우.
    유효성 검사 -> *비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야한다.

비밀번호 input
    비밀번호 입력 안했을 시 : *비밀번호를 입력해주세요.
    비밀번호가 확인과 다를 시 : *비밀번호 확인과 다릅니다. 

비밀번호 확인 input
    비밀번호 확인 입력 안했을 시 : *비밀번호를 한번 더 입력해주세요.
    비밀번호 확인이 비밀번호 다를 시 : * 비밀번호와 다릅니다.

2. 모든 정보를 입력하고 유효성검사를 통과했을 시 수정하기 버튼 활성화 (ACA0EB -> 7F6AEE)
    수정하기 클릭시 
    수정 성공하면 '수정 성공'이라는 토스트메세지 표시
*/


    const passwordInput = document.querySelector('.body-passwd-input');
    const passwordCheckInput = document.querySelector('.body-passwdck-input');
    const editButton = document.querySelector('.edit-button');
    const passwordHelper = document.querySelector('.body-passwd-helper');
    const passwordCheckHelper = document.querySelector('.body-passwdck-helper');

    function validatePassword(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        return re.test(password);
    }

    //비밀번호 유효성 검사 및 버튼 색상, 그저 함수
    function checkAllValidations() {
        const isPasswordValid = validatePassword(passwordInput.value);
        const isPasswordMatching = passwordInput.value === passwordCheckInput.value;

        if (isPasswordValid && isPasswordMatching ) {
            editButton.style.backgroundColor = '#7F6AEE';
            editButton.disabled = false;
            // Assuming this should be the action on click
        } else {
            editButton.style.backgroundColor = '#ACA0EB';
            editButton.disabled = true; // Prevent navigation
        }

    }

    editButton.addEventListener('click', function(event){
        event.preventDefault();
        if(!editButton.disabled){
            alert('수정 성공');
        }

    });


    passwordInput.addEventListener('focusout', function() {
        if (passwordInput.value === '') {
            passwordHelper.innerText = '*비밀번호를 입력해주세요.';
        } else if (!validatePassword(passwordInput.value)) {
            passwordHelper.innerText = '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        } 
        else if (passwordCheckInput.value !== passwordInput.value ){
            passwordHelper.innerText = '*비밀번호 확인과 다릅니다.'
        }
        else {
            passwordHelper.innerText = '';
        }
        checkAllValidations();
    });

    passwordCheckInput.addEventListener('focusout', function() {
        if (passwordCheckInput.value !== passwordInput.value) {
            passwordCheckHelper.innerText = '*비밀번호와 다릅니다.';
        } 
        else if (passwordCheckInput.value === ''){
            passwordCheckHelper.innerText = '*비밀번호를 한번 더 입력해주세요.';
        }

        else {
            passwordCheckHelper.innerText = '';
        }
        checkAllValidations();
    });

//입력값 수정시에마다 확인
passwordInput.addEventListener('input', checkAllValidations);
passwordCheckInput.addEventListener('input', checkAllValidations);
