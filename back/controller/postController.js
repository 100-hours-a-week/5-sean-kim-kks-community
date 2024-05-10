const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const filePath = path.join(__dirname, '../data/post.json');


function formatDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth()+ 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return year + "-" + month + "-" + day +" "+hours+":"+minutes+":"+seconds
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
    const { title, content } = req.body;

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const posts = JSON.parse(data);
        
        // 새 게시글 객체를 생성합니다.
        const newPost = {
            id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
            title: title,
            content: content,
            //image: image,
            createtime: formatDate(),
            views: 0,
            nickname:"익명",
            profile_image:"/images/free-icon-whale-1045140.png",
            likes: 0,
            comments: 0,

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