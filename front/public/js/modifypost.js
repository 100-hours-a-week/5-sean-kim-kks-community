"use strict";
const titleInput = document.querySelector('.content-header-subtitle-input');
const fileUpload = document.getElementById('file-upload');
const completeButton = document.querySelector('.complete-button');


document.addEventListener('DOMContentLoaded', function() {
    
    fileUpload.addEventListener('change', function() {
        if (this.files.length > 1) {
            alert('이미지 파일은 1개만 업로드할 수 있습니다.');
            this.value = ''; // 선택된 파일 초기화
        }
    });
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    fetch(`http://localhost:3001/posts`)
    .then(response => response.json())
    .then(data => {
        data.forEach(post => {
        if(data.id !== postId){
            return;
        } else{
            document.querySelector('.content-header-subtitle-input').value = data.title;
            document.getElementById('body-input').value = data.content;
        }
    });
});
});
// 예를 들어, 수정 폼의 제출 버튼에 대한 이벤트 리스너를 추가합니다.
completeButton.addEventListener('click', async function(e) {
    e.preventDefault(); // 폼 기본 제출 방지

    // URL에서 postId 파라미터 값을 가져옵니다.
    const postId = new URLSearchParams(window.location.search).get('postId');
    // 수정 폼에서 데이터를 가져옵니다.
    const title = document.querySelector('.content-header-subtitle-input').value;
    const content = document.getElementById('body-input').value;
    // 데이터를 서버로 보내는 fetch 요청
    try {
        const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            content: content,
            // 기타 필드도 포함
        })
    });

    if (response.ok) { // 성공적으로 삭제되었을 때
        alert('수정 되었습니다.');
        window.location.href = `detailpost.html?postId=${postId}`; // 수정이 완료된 후, 상세 페이지로 리디렉션
        // 삭제 후, 홈페이지나 다른 페이지로 리다이렉트 할 수 있습니다.
        // 예: window.location.href = 'index.html';
    } else {
        // 서버에서 문제가 발생했을 때의 처리
        alert('수정 실패. 서버에 문제가 발생했습니다.');
    }
    } catch (error) {
        console.error('Error:', error);
        alert('수정 중 에러가 발생했습니다.');
    }
});