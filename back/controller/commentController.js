const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../data/comment.json');


module.exports.getComment = async (req, res, next) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading the file:', error);
        res.status(500).json({ message: "서버에서 파일을 읽는 중 오류가 발생했습니다." });
    }
};

module.exports.postComment = async (req, res, next) => {
    res.status(500).json({ message: "서버에서 파일을 읽는 중 오류가 발생했습니다." });

};

module.exports.updateComment = async (req, res, next) => {
    res.status(500).json({ message: "서버에서 파일을 읽는 중 오류가 발생했습니다." });

};

module.exports.deleteComment = async (req, res, next) => {
    const commentId = parseInt(req.params.id);
    console.log(commentId);
    const isDeleted = await deleteCommentById(commentId);

    if (isDeleted) {
        res.status(200).send({ message: "comment deleted successfully" });
    } else {
        res.status(404).send({ message: "comment not found" });
    }
};




//댓글삭제로직
async function deleteCommentById(commentId) {
    try {
        const data = await fs.readFile(filePath, 'utf8'); // 파일 읽기
        let comments = JSON.parse(data);

       //여기 때문에 이상한 댓글이 삭제되는 현상이 있었음.
       //commentid를 commentindex로 잘못해석하고있기 때문 const commentIndex = commentId; //
        //filter로 commentid와 일치하지 않는 댓글만 남긴다.
        comments = comments.filter(comment => comment.commentId !== commentId);
        
        await fs.writeFile(filePath, JSON.stringify(comments, null, 2)); // 변경된 데이터를 파일에 쓰기
        console.log("The Comment has been deleted.");
        return true;
    } catch (err) {
        throw err; // 에러 처리
    }
}

