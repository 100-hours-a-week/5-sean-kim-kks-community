const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../data/post.json');

function formatDate(date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hour = `${date.getHours()}`.padStart(2, '0');
    const minute = `${date.getMinutes()}`.padStart(2, '0');
    const second = `${date.getSeconds()}`.padStart(2, '0');
    
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}


module.exports.getPost = async (req, res, next) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading the file:', error);
        res.status(500).json({ message: "서버에서 파일을 읽는 중 오류가 발생했습니다." });
    }
};

module.exports.postPost = async (req, res, next) => {
    try {
        // 파일에서 기존 데이터를 읽어옵니다.
        const data = await fs.readFile(filePath, 'utf8');
        const posts = JSON.parse(data);
        
        // 새 게시글 객체를 생성합니다.
        const newPost = {
            id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1, // 마지막 게시글 ID에 1을 더해 새 ID를 생성
            ...req.body, // 요청 본문에서 새 게시글의 정보를 받아옵니다.
            createtime: formatDate(new Date()), // 생성 시간을 현재 시간으로 설정
            views: 0, // 조회수는 0에서 시작
            nickname:"",
            profile_image:"/images/free-icon-whale-1045140.png",
            likes: 0, // 좋아요 수는 0에서 시작
            comments: 0 // 댓글 수는 0에서 시작
        };
        
        // 새 게시글을 배열에 추가합니다.
        posts.push(newPost);

        // 변경된 데이터를 파일에 다시 씁니다.
        await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8');
        
        res.status(201).send({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creating post' });
    }
};

module.exports.deletePost = async (req, res, next) => {
    const postId = parseInt(req.params.id);
    const isDeleted = await deletePostById(postId);

    if (isDeleted) {
        res.status(200).send({ message: "Post deleted successfully" });
    } else {
        res.status(404).send({ message: "Post not found" });
    }
};

module.exports.updatePost = async(req, res, next) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;

    try {
        const data = await fs.readFile(filePath, 'utf8');
        let posts = JSON.parse(data);

        const postIndex = posts.findIndex(post => post.id == postId);
        if (postIndex !== -1) {
            posts[postIndex].title = title;
            posts[postIndex].content = content;

            await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
            res.status(200).send('Post updated');
        } else {
            return res.status(404).send('Post not found');
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send('Error processing your request');
    }
};


//postid로 포스트 삭제
async function deletePostById(postId) {
    try {
        const data = await fs.readFile(filePath, 'utf8'); // 파일 읽기
        let posts = JSON.parse(data);

        const postIndex = posts.findIndex(post => post.id === postId);
        if (postIndex === -1) {
            return false; // 포스트를 찾지 못한 경우
        }
        posts.splice(postIndex, 1); // 포스트 삭제

        await fs.writeFile(filePath, JSON.stringify(posts, null, 2)); // 변경된 데이터를 파일에 쓰기
        console.log("The post has been deleted.");
        return true;
    } catch (err) {
        throw err; // 에러 처리
    }
}