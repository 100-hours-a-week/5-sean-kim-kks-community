"use strict";
/*
1. 제목 최대 26자 작성 가능, 27자 이상 작성 안됌 html로 구현해놈.
2. 게시글 본문으 LONGTEXT 타입으로 저장
3. 클릭시 컴퓨터에서 이미지 파일 업로드
4. 제목과 본문이 채워지면 버튼 색상이 ACA0EB -> 7E6AEE 색상으로 변경
    제목 본문 모두 입력시 등록 버튼 활성화
    버튼 클릭시 -> 제목, 내용이 작성되어있지 않을 때 제목, 내용 모두 작성해주세요.
*/
const contentHeader = document.querySelector('.content-header-subtitle-input');
const createButton = document.querySelector('.complete-button')
const contentBody = document.getElementById('body-input')
const helperText = document.getElementsByClassName('content-tail-helper')
const conTainer = document.getElementsByClassName('container')

//제목 본문이 채워지면 버튼 색상이 변하게.
//addeventlistener 은 클래스 이름이 아닌 특정 요소에 바인딩 해야한다. 제목, 내용 필드에 각각 이벤트 리스너를 추가해야함.
//큰 function 하나로 eventlistener 를 제목, 본문 두개를 쓰고 if 로 묶어야될 듯?
function updateButtonColor(){
    if (contentHeader.value.trim() && contentBody.value.trim()){
        createButton.style.backgroundColor = '#7F6AEE'; // 모두 채워졌을 때 색상
    } else {
        createButton.style.backgroundColor = '#ACA0EB'; // 하나라도 비어있을 때 색상
    }
}
contentHeader.addEventListener('input', updateButtonColor);
contentBody.addEventListener('input', updateButtonColor);

createButton.addEventListener('click', function(event){
    event.preventDefault();

    const header = contentHeader.value.trim(); 
    const body = contentBody.value.trim();

    if ( !header || !body ){
        helperText[0].textContent = '*제목과 내용을 모두 작성해주세요.'; // 텍스트 변경
    } else { 
        window.location.href = "checkpostlist.html"; // 모두 작성되었을 때 페이지 이동
    }
});

