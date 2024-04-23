"use strict";
//먼저 2번 먼저 하자구. 수정하기 버튼 클릭시 

const editButton = document.querySelector('.tail-edit-button');
const helperText = document.querySelector('.profile-content-helper');

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