"use strict";
/* 
1. 제목 최대 26자 작성 가능 27자 이상시 작성 안됨
2. 게시글 본문 longtext 타입 저장
3. 기존 이미지 파일로 저장되어 보여주고, 이미지 파일은 1개만 올릴 수 있음.
4. 클릭시 게시글이 수정되고 해당 게시글 상세보기로 이동.
*/

//게시글 수정 -> fetch로 해야할 듯 게시글 상세이동만 해야겟다.
// 이미지파일 보류지
    // 3. 이미지 파일 업로드 제한
    const titleInput = document.querySelector('.content-header-subtitle-input'); // 제목 입력 필드 선택
    const fileUpload = document.getElementById('file-upload');
    const completeButton = document.querySelector('.complete-button');

    document.addEventListener('DOMContentLoaded', function() {
        
        
        fileUpload.addEventListener('change', function() {
            if (this.files.length > 1) {
                alert('이미지 파일은 1개만 업로드할 수 있습니다.');
                this.value = ''; // 선택된 파일 초기화
            }
        });
});

//게시글 수정
document.addEventListener('DOMContentLoaded', () => {
    const editingPost = JSON.parse(localStorage.getItem('editingPost')); //이 부분 조사좀 해야됌 아마 이부분이 문제일 가능성이 큼
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (editingPost) {
        document.querySelector('.content-header-subtitle-input').value = editingPost.title;
        document.getElementById('body-input').value = editingPost.content;

    } else {
        console.error('수정할 게시글 정보를 찾을 수 없습니다.');
        // 여기에 게시글 정보가 없을 때의 처리 로직을 추가하세요.
    }
    // 수정 완료 버튼 이벤트 리스너
    // 수정 완료 버튼 이벤트 리스너
    completeButton.addEventListener('click', function() {
        const updatedTitle = document.querySelector('.content-header-subtitle-input').value;
        const updatedContent = document.getElementById('body-input').value;
        
        if (titleInput.value.trim() === '' || document.getElementById('body-input').value.trim() === '') {
            alert('제목과 내용은 필수로 입력해야 합니다.');
            return;
        }

        // 수정된 데이터를 서버로 전송
        fetch(`http://localhost:3001/posts/${postId}`, { // 여기 수정
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: updatedTitle,
                content: updatedContent,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // 성공적으로 수정되면, 게시물 상세페이지로 리다이렉트
            window.location.href = `detailpost.html?postId=${editingPost.id}`;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

});

