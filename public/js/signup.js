"use strict";
/*
1. helper text 밀리지 않는다 지정된 이ㅜ치에 보여짐
이메일은 영문과 @ , . 만 사용 가능

프로필사진 업로드 안했을시 -> *프로필 사진을 추가해주세요

인풋값을 입력했다가 포커스 아웃댔을 때
이메일 input
    -> 이메일이 비어있거나 작성중인경우 : *이메일을 입력해주세요
    -> 이메일 형식이 짧거나, 입력하지 않았을 경우, 유효하지 않은 경우 : *올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)
    -> 중복된 이메일인 경우 : *중복된 이메일입니다.

비밀번호, 비밀번호 확인 유효성 : *비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함

비밀번호 input
    -> 비밀번호 입력 안했을 시 : *비밀번호를 입력해주세요.
    -> 비밀번호가 확인과 다를 시 : *비밀번호가 다릅니다.

닉네임
    -> 닉네임 유효성 :  띄어쓰기 불가, 10글자 이내
    -> 닉네임 입력하지 않을 시 : *닉네임을 입력해주세요.
    -> 닉네임에 띄어쓰기 있을 시 : *띄어쓰기를 없애주세요.
    -> 닉네임 중복 시 : *중복된 닉네임입니다.
    -> 닉네임 11자 이상 작성시 : *닉네임은 최대 10자 까지 작성 가능합니다.

회원가입 버튼
    -> 1번에 입력한 내용이 모두 작성되고 유효성 검사를 통과한 경우 버튼이 활성화된다. (#ACA0EB -> 7F6AEE)
    -> 회원가입 버튼 클릭시 회원 정보는 저장되고 로그인 페이지로 이동한다.
    -> 인풋 값에 입력한 내용이 부족할 시 버튼이 비활성화된다.

*/
    const emailInput = document.querySelector('.sign-up-email-input');
    const passwordInput = document.querySelector('.sign-up-passwd-input');
    const passwordCheckInput = document.querySelector('.sign-up-passwdck-input');
    const nicknameInput = document.querySelector('.sign-up-name-input');
    const profileInput = document.querySelector('input[type="file"]'); //? , wrapper는 css에 없음.
    const signUpButton = document.querySelector('.sign-up-button');
    const emailHelper = document.querySelector('.sign-up-email-helper');
    const passwordHelper = document.querySelector('.sign-up-passwd-helper');
    const passwordCheckHelper = document.querySelector('.sign-up-passwdck-helper');
    const nicknameHelper = document.querySelector('.sign-up-name-helper');
    const profileHelper = document.querySelector('.profile-helper');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        return re.test(password);
    }

    //이메일, 닉네임, 비밀번호 유효성 검사 및 버튼 색상, 그저 함수
    function checkAllValidations() {
        const isEmailValid = validateEmail(emailInput.value) && emailInput.value !== '';
        const isPasswordValid = validatePassword(passwordInput.value);
        const isPasswordMatching = passwordInput.value === passwordCheckInput.value;
        const isNicknameValid = nicknameInput.value !== '' && !nicknameInput.value.includes(' ') && nicknameInput.value.length <= 10;
        const isProfileUploaded = profileInput.files.length > 0;

        if (isEmailValid && isPasswordValid && isPasswordMatching && isNicknameValid ) {//&& isProfileUploaded 프로필 추가.
            signUpButton.style.backgroundColor = '#7F6AEE';
            signUpButton.href = "login.html"; // Assuming this should be the action on click
        } else {
            signUpButton.style.backgroundColor = '#ACA0EB';
            signUpButton.removeAttribute('href'); // Prevent navigation
        }
    }
    //focusout ->사용자가 텍스트 필드에 입력하다가 다른 부분을 클릭하여 포커스를 벗어낫을 때, 텍스트필드, 드롭다운메뉴 같이 사용자 입력을 받는 요소에서 사용.
    //focusin -> 사용자가 텍스트 필드를 클릭하여 입력을 시작할 때

    //addeventlistener 로 사용자로부터 동작발생.
    emailInput.addEventListener('focusout', function() {
        if (emailInput.value === '') {
            emailHelper.innerText = '*이메일을 입력해주세요';
        } else if (!validateEmail(emailInput.value)) {
            emailHelper.innerText = '*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';
        } else {
            emailHelper.innerText = ''; // Assumign API call for email check is not required here
        }
        checkAllValidations(); //이걸 해주므로써 버튼 색상 바뀌는지 안바뀌는지 결정 가능
    });

    passwordInput.addEventListener('focusout', function() {
        if (passwordInput.value === '') {
            passwordHelper.innerText = '*비밀번호를 입력해주세요.';
        } else if (!validatePassword(passwordInput.value)) {
            passwordHelper.innerText = '*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        } else {
            passwordHelper.innerText = '';
        }
        checkAllValidations();
    });

    passwordCheckInput.addEventListener('focusout', function() {
        if (passwordCheckInput.value !== passwordInput.value) {
            passwordCheckHelper.innerText = '*비밀번호가 다릅니다.';
        } else {
            passwordCheckHelper.innerText = '';
        }
        checkAllValidations();
    });

    nicknameInput.addEventListener('focusout', function() {
        if (nicknameInput.value === '') {
            nicknameHelper.innerText = '*닉네임을 입력해주세요.';
        } else if (nicknameInput.value.includes(' ')) {
            nicknameHelper.innerText = '*띄어쓰기를 없애주세요.';
        } else if (nicknameInput.value.length > 10) {
            nicknameHelper.innerText = '*닉네임은 최대 10자 까지 작성 가능합니다.';
        } else {
            nicknameHelper.innerText = ''; // Assuming API call for nickname check is not required
        }
    });

