"use strict";

const contentButton = document.querySelector('.content-button')
let contentDate = document.querySelectorAll('.content-author-date')
var contentTitle = document.querySelectorAll('.content-author-header')
var contentWrapperButton = document.querySelectorAll('.content-author-wrapper')
var contentViews = document.querySelectorAll('.content-author-views')

//마우스 호버

contentButton.addEventListener('mouseenter', () => {
    contentButton.style.backgroundColor = '#7F6AEE';
});

contentButton.addEventListener('mouseleave', () => {
    contentButton.style.backgroundColor = '#ACA0EB';
});

//페이지 이동
contentButton.addEventListener('click', function(){
    window.location.href = "createpost.html"
});

//제목 26글자 제한 함수
//add event listener 는 특정 이벤트가 발생했을 때 실행할 함수를 등록할 때 사용.
//DOMContentLoaded 는 웹 페이지의 html이 완전히 로드되고 파싱됐을 때 발생, 한마디로 (반응, 행위)
document.addEventListener("DOMContentLoaded", function(){
    
    contentTitle.forEach(function(header){

        var text = header.innerText;
        if (text.length > 26){
            header.innerText = text.substring(0, 26) + '...'; 
        }
    });
});
//날짜 및 시간 설정
//yyyy-mm-dd hh:mm:ss
document.addEventListener("DOMContentLoaded", function(){

    contentDate.forEach(function(header){
        var text = header.innerText;
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth()+ 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        header.innerText = year + "-" + month + "-" + day +" "+hours+":"+minutes+":"+seconds
        
    })
});




document.addEventListener('DOMContentLoaded', function() {
    fetch('/data/post.json') 
    .then(response => response.json()) 
    .then(data => {
        const contentWrapper = document.querySelector('.content-body');
        
        // 기존 게시글 데이터 제거
        while (contentWrapper.firstChild) {
            contentWrapper.removeChild(contentWrapper.firstChild);
        }
        
        data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('content-author-wrapper');
            
            // 게시글 데이터를 기반으로 HTML 요소 생성
            postElement.innerHTML = `
                <div class="content-author">
                    <div class="content-author-header">${post.title}</div>
                    <div class="content-author-body-wrapper">
                        <div class="content-author-views">
                            <p>좋아요 ${post.likes}  댓글 ${post.comments}  조회수 ${post.views}</p>                            
                        </div>
                        <div class="content-author-date">${post.createtime}</div>
                    </div>
                </div>
                <div class="content-author-profile">
                    <img src="${post.profile_image}" class="content-author-img" width="36px" height="36px">
                    <div class="content-author-name">${post.nickname}</div>
                </div>
            `;

            postElement.dataset.id = post.id;

            postElement.addEventListener('click', function() {
                // 여기서 수정된 부분: template literal을 사용하여 문자열 내 변수를 올바르게 삽입
                window.location.href = `detailpost.html?postId=${this.dataset.id}`;
            });
            contentWrapper.appendChild(postElement);
        });
    })
    .catch(error => console.error('Error loading post data:', error));
});

