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
const fileInput = document.getElementById('file-upload');
const previewContainer = document.querySelector('.image-preview-wrapper');
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
        
    }
});


document.addEventListener('DOMContentLoaded', function () {
    

    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        
        // 이 부분에서 선택된 파일이 이미지인지 확인
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function (e) {
                // 이미지 미리보기를 표시하기 위한 img 요소를 생성
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%'; // 이미지 크기 조정
                img.style.height = 'auto';
                
                // 이전에 추가된 이미지를 제거
                previewContainer.innerHTML = '';
                // 새로운 이미지를 추가
                previewContainer.appendChild(img);
            };
            
            reader.readAsDataURL(file);
        } else {
            alert('이미지 파일을 선택해주세요.');
            
        }
    });
});

const createPostButton = document.querySelector('.complete-button');

createPostButton.addEventListener('click', async function(e){
    
    e.preventDefault();
    try{
        const response = await fetch('http://localhost:3001/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
            },
            body: JSON.stringify({
                title: contentHeader.value,
                content: contentBody.value,

                //image 추가 요망
            })
        });
        if (response.ok){
            alert('게시글이 작성되었습니다.')
            window.location.href = "checkpostlist.html"; // 모두 작성되었을 때 페이지 이동
        }
    } catch (error){
        console.error('Error', error);
        alert('생성 중 에러 발생')
    }
});


