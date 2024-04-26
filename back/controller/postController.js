const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../data/post.json');


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
    // try {
    //     let newPost = req.body; // 클라이언트에서 보낸 새 게시글 데이터
    //     const data = await fs.readFile(filePath, 'utf8');
    //     const posts = JSON.parse(data);
    //     posts.push(newPost); // 새 게시글을 배열에 추가
    //     await fs.writeFile(filePath, JSON.stringify(posts, null, 2), 'utf8');
    //     res.json({ message: "게시글이 성공적으로 추가되었습니다." });
    // } catch (error) {
    //     console.error('Error writing the file:', error);
    //     res.status(500).json({ message: "서버에서 파일을 쓰는 중 오류가 발생했습니다." });
    // }
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

module.exports.putPost = (req, res, next) => {
    // PUT 요청 처리
};


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