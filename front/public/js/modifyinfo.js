"use strict";

const editButton = document.querySelector('.tail-edit-button');
const helperText = document.querySelector('.profile-content-helper');
const mainButton = document.querySelector('.header-title');
const fileInput = document.getElementById('profile-image-upload');
const filePreview = document.querySelector('.profile-img');
const previewContainer = document.querySelector('.profile-img-wrapper');
//이미지 파일 삽입
document.addEventListener('DOMContentLoaded', function () {
    

    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        
        // 이 부분에서 선택된 파일이 이미지인지 확인
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function (e) {
                // 이미지 미리보기를 표시하기 위한 img 요소를 생성
                filePreview.src = e.target.result;
                // 이전에 추가된 이미지를 제거
                // 새로운 이미지를 추가
            };
            
            reader.readAsDataURL(file);
        } else {
            alert('이미지 파일을 선택해주세요.');
            
        }
    });
});


mainButton.addEventListener('click', function(){
        window.location.href = 'checkpostlist.html';
    });

editButton.addEventListener('click', function(event){
    event.preventDefault();

    var nicknameInput = document.querySelector('.profile-input');
    if(!nicknameInput.value ){
        helperText.textContent = '*닉네임을 입력해주세요.';
        return;
    }
    if(nicknameInput.value.length > 10){
        helperText.textContent = '*닉네임을 최대 10자 까지 작성이 가능합니다.';
        return;
    }

    alert('수정 완료') //수정하기 누르면 수정완료라는 토스트 메세지 나오게 바꿔야함.

});

//헤더 프로필 이미지 호버 배경 변경
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(function(menuItem) {
    menuItem.addEventListener('mouseover', function() {
        menuItem.style.backgroundColor = '#E9E9E9';
    });

    menuItem.addEventListener('mouseout', function() {
        menuItem.style.backgroundColor = '#d9d9d9';
    });
});

// 프로필 이미지 클릭 이벤트 추가
document.addEventListener('DOMContentLoaded', function() {
    var menuItems = document.querySelectorAll('.menu-item');

    // 첫 번째 menu-item (회원정보수정)에 클릭 이벤트 추가
    menuItems[0].addEventListener('click', function() {
        // 오타로 인한 문제를 JS로 해결
        window.location.href = 'modifyinfo.html'; // 오타가 있는 herf 속성 사용
    });

    // 두 번째 menu-item (비밀번호수정)에 클릭 이벤트 추가
    menuItems[1].addEventListener('click', function() {
        window.location.href = 'modifypasswd.html'; // 비밀번호 변경 페이지로 이동
    });

    // 세 번째 menu-item (로그아웃)에 클릭 이벤트 추가
    menuItems[2].addEventListener('click', function() {
        window.location.href = 'login.html'; // 로그아웃 처리 페이지로 이동
    });
});


//모달 팝업창으로 수정해야함.

    var infoModal = document.querySelector('.info-delete-modal');
    const infoModalOpen = document.querySelector('.tail-resign-button');
    const infoModalCancel = document.querySelector('.info-delete-modal-cancel');
    const infoModalConfirm = document.querySelector('.info-delete-modal-confirm')

    //게시글 삭제 모달
    infoModalOpen.addEventListener('click',function(){
        //display 속성을 block로 변경
            infoModal.style.display = 'block';
        });
        infoModalCancel.addEventListener('click',function(){
        //display 속성을 none으로 변경
            infoModal.style.display = 'none';
        });
    
        infoModalConfirm.addEventListener('click', function(){
            infoModal.style.display = 'none';
            window.location.href = "checkpostlist.html"
        });




/*
1. 헤더 프로필 이미지 hover시 배경식 E9E9E9
    클릭시 각 페이지로 이동

2. '수정하기'버튼 클릭시
    닉네임 입력하지 않을 시 : *닉네임을 입력해주세요
    닉네임 중복 시 : *중복된 닉네임입니다.
    니겐임 11자 이상 작성시 : *닉네임은 최대 10자 까지 작성 가능합니다.

3. '수정하기'클릭시 
    수정 성공하면 5. '수정완료'라는 토스트 메세지가 보여진다.

4. 회원 탈퇴 클릭시 
    회원 탈퇴 확인 모달이 나온다. 
    확인 클릭시 회원 탈퇴가 완료되고, 로그인페이지로 이동한다.
*/