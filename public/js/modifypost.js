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
    document.addEventListener('DOMContentLoaded', function() {
        const titleInput = document.querySelector('.content-header-subtitle-input'); // 제목 입력 필드 선택
        const fileUpload = document.getElementById('file-upload');
        
        fileUpload.addEventListener('change', function() {
            if (this.files.length > 1) {
                alert('이미지 파일은 1개만 업로드할 수 있습니다.');
                this.value = ''; // 선택된 파일 초기화
            }
        });
    
    const completeButton = document.querySelector('.complete-button');
    completeButton.addEventListener('click', function(event) {
        // 입력값 검증 (실제 애플리케이션에서는 더 엄격한 검증이 필요할 수 있음)
        if (titleInput.value.trim() === '' || document.getElementById('body-input').value.trim() === '') {
            alert('제목과 내용은 필수로 입력해야 합니다.');
            event.preventDefault(); // 기본 이벤트 차단
        }
        else {
            window.location.href = 'checkpostlist.html'; // 수정 성공 후 게시글 상세보기 페이지로 이동
        }
    });
});
      // 게시글 수정 로직 구현
        // 예시로는 로컬에서 실행되는 로직이 포함되지 않으므로, 실제로 서버에 데이터를 전송하고
        // 성공적으로 수정되었다는 응답을 받은 후에 페이지 이동을 해야 합니다.
        // 여기서는 예시로 페이지 이동 코드만 작성합니다.