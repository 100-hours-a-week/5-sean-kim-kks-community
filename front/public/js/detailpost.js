"use strict";

var editButton = document.querySelector('.content-edit-button');
var viewCount = document.querySelector('.content-view-button p');
var commentCount = document.querySelector('.content-comment-button p');
var commentInput = document.querySelector('.comment-box-content');
var commentSubmitButton = document.querySelector('.comment-box-submit-button');
var contentModal = document.querySelector('.content-delete-modal');
const contentModalOpen = document.querySelector('.content-delete-button');
const contentModalCancel = document.querySelector('.content-delete-modal-cancel');
const contentModalConfirm = document.querySelector('.content-delete-modal-confirm')
const commentModal = document.querySelector('.comment-delete-modal');
const commentModalCancel = document.querySelector('.comment-delete-modal-cancel');
const commentModalConfirm = document.querySelector('.comment-delete-modal-confirm')

document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    //게시글 불러오기
    fetch('http://localhost:3001/posts')
        .then(response => response.json())
        .then(data => {
        const post = data.find(post => post.id == postId);
        if (post) {
            document.querySelector('.content-title').textContent = post.title;
            document.querySelector('.content-author p').textContent = post.nickname;
            document.querySelector('.content-author-date').textContent = post.createtime;
            document.querySelector('.content-paragraph').textContent = post.content;
            document.querySelector('.content-author-img').src = post.profile_image;
            document.querySelector('.content-thumbnail').src = post.image;
            document.querySelector('.content-view-button p:first-child').textContent = formatCount(Number(post.views));
            document.querySelector('.content-comment-button p:first-child').textContent = formatCount(Number(post.comments));
        }
//===================게시글 수정(제목, 컨텐츠 수정페이지에 추가 필요)===============================
        editButton.addEventListener('click', function() {
            localStorage.setItem('editingPost', JSON.stringify(post));
            window.location.href = `modifypost.html?postId=${post.id}`;
        });
//=======================================================================================
        })
        .catch(error => console.error('Error loading post data:', error));
    
    //댓글 불러오기
    fetch('http://localhost:3001/comments')
        .then(response => response.json())
        .then(comments => {
            const commentsForPost = comments.filter(comment => comment.postId == postId);
            const commentsContainer = document.querySelector('.comment-footer');
            
            // 기존 게시글 데이터 제거
            while (commentsContainer.firstChild) {
                commentsContainer.removeChild(commentsContainer.firstChild);
            }

            commentsForPost.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment-author-wrapper');
                commentElement.innerHTML = `
                <div class="comment-author">
                    <div class="comment-author-header">
                        <div class="comment-author-profile">
                            <p>${comment.nickname}</p>
                        </div>
                        <div class="comment-author-date">${comment.createtime}</div>
                    </div>
                <div class="comment-author-content">${comment.content}</div>
                </div>
                <div class="comment-button">
                    <button class="comment-edit-button" data-commentid="${comment.commentId}">수정</button>
                    <button class="comment-delete-button" data-commentid="${comment.commentId}">삭제</button>
                </div>
                `;

                commentsContainer.appendChild(commentElement);
//===========================================================================================================
                // 각 댓글에 대한 댓글 삭제 버튼 모달 생성
                commentElement.querySelector('.comment-delete-button').addEventListener('click', function() {
                    commentModal.style.display = 'block';

                    //각 댓글 모달창 댓글 삭제
                    commentModalConfirm.onclick = async () => {
                        try {
                            const response = await fetch(`http://localhost:3001/comments/${comment.commentId}`, {
                                method: 'DELETE',
                            });
                            if (response.ok) { 
                                alert('삭제되었습니다.');
                                commentsContainer.removeChild(commentElement);
                                commentModal.style.display = 'none';
                            } else {
                                alert('삭제 실패. 서버에 문제가 발생했습니다.');
                                commentModal.style.display = 'none';
                            }
                        } catch (error) {
                            console.error('Error:', error);
                            alert('삭제 중 에러가 발생했습니다.');
                            commentModal.style.display = 'none';
                        }
                    };
                    //댓글 모달창 삭제 취소
                    commentModalCancel.onclick = () => {
                        commentModal.style.display = 'none';
                    };
                });
//===============================================================================================================
//                      댓글 수정.
 // commentElement.querySelector('.comment-edit-button').addEventListener('click', function() {
            //     isEditing = true;
            //     currentEditingComment = commentElement.querySelector('.comment-author-content');
            //     var originalContent = currentEditingComment.textContent;
            //     commentInput.value = originalContent;
            //     commentSubmitButton.textContent = '댓글 수정';
            //     commentSubmitButton.style.backgroundColor = '#7F6AEE';
            // });

            commentElement.querySelector('.comment-edit-button').addEventListener('click', async function() {
                try{
                } catch (error) {
                    console.error('error: ', error);
                    alert('수정 중 에러가 발생했습니다.')
                }
                
            }); 
//==============================================================================================================
        }); //commentsForPost.forEach(comment => {
    });     // fetch('http://localhost:3001/comments')  .then(response => response.json()).then(comments => {   
}); //      document.addEventListener('DOMContentLoaded', () => {



// 댓글 등록, 수정??
var isEditing = false; // 댓글 수정중인지 여부를 추적하는 변수
var currentEditingComment = null; // 현재 수정 중인 댓글 요소를 저장하는 변수
// 댓글 등록/수정 버튼에 대한 이벤트 리스너는 한 번만 설정
commentSubmitButton.addEventListener('click', function(){
    if (isEditing) {
        // 댓글 수정 로직
        currentEditingComment.textContent = commentInput.value;
        isEditing = false; 
        currentEditingComment = null;
    } else {
    }
    commentSubmitButton.textContent = '댓글 등록';
    commentSubmitButton.style.backgroundColor = '#ACA0EB';
});


//게시글 수정 로직 (게시글)
editButton.addEventListener('click', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    // modifypost.html로 이동하면서 postId 파라미터를 포함시킵니다.
    window.location.href = `modifypost.html?postId=${postId}`;
}); 


    //게시글 삭제 모달 오픈
    contentModalOpen.addEventListener('click',function(){
    //display 속성을 block로 변경
        contentModal.style.display = 'block';
    });

    //게시글 삭제 취소
    contentModalCancel.addEventListener('click',function(){
    //display 속성을 none으로 변경
        contentModal.style.display = 'none';
    });

    //게시글 삭제
contentModalConfirm.addEventListener('click', async function(){   
    // URL에서 postId 파라미터 값을 가져옵니다.
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('postId');
        try {
            const response = await fetch(`http://localhost:3001/posts/${postId}`, {
                method: 'DELETE',
            });
            if (response.ok) { // 성공적으로 삭제되었을 때
                alert('삭제되었습니다.');
                contentModal.style.display = 'none';
                window.location.href = 'checkpostlist.html';
                // 삭제 후, 홈페이지나 다른 페이지로 리다이렉트 할 수 있습니다.
                // 예: window.location.href = 'index.html';
            } else {
                // 서버에서 문제가 발생했을 때의 처리
                alert('삭제 실패. 서버에 문제가 발생했습니다.');
                
            }
        } catch (error) {
            console.error('Error:', error);
            alert('삭제 중 에러가 발생했습니다.');
        }
    });


// 조회수 댓글 k 로 변경
    viewCount.textContent = formatCount(Number(viewCount.textContent));
    commentCount.textContent = formatCount(Number(commentCount.textContent));

// 4. 댓글 입력 기능
document.addEventListener('DOMContentLoaded', function(){
    //만약 댓글에 아무것도 입력되어있지 않으면 버튼 비활성화 + 색상변경
    // 댓글에 입력되어있으면 버튼 활성화 + 색상변경
    commentInput.addEventListener('input', function() {
        if(commentInput.value === ''){
            commentSubmitButton.addEventListener('click', function(event){
                event.preventDefault();
            });
            commentSubmitButton.style.backgroundColor = '#ACA0EB';
        }
        else {
            commentSubmitButton.style.backgroundColor = '#7F6AEE';
            commentSubmitButton.addEventListener('click', function(event){
                // document.location.reload(true);
            });
        }
    });
});


//조회수, 댓글 k 로직
function formatCount(count) {
    if (count >= 100000) {
        return (count / 1000).toFixed(0) + 'k';
    } else if (count >= 10000) {
        return (count / 1000).toFixed(0) + 'k';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(0) + 'k';
    } else {
        return count.toString();
    }
}


