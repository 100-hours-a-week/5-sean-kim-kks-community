const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../data/comment.json');

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
        
        try {
            comments = JSON.parse(await fs.readFile(filePath, { encoding: 'utf8' }));

            const newComment = {
                postId: req.body.postId,
                commentId: comments.length > 0 ? comments[comments.length - 1].commentId + 1 : 1, // 마지막 댓글 ID에서 1 증가
                nickname: "익명",
                createtime: formatDate(),
                content: req.body.content
            };
    
            // 새 댓글을 배열에 추가
            comments.push(newComment);
    
            // 파일에 새로운 댓글 배열을 저장
            await fs.writeFile(filePath, JSON.stringify(comments, null, 2), 'utf8');

            res.status(201).json({ message: "댓글이 성공적으로 등록되었습니다.", comment: newComment });

        } 
        // 성공 응답 전송
        catch (error) {
        // 서버 오류 
            console.error(error);
            res.status(500).json({ message: "서버에서 오류가 발생했습니다.", error: error.message });
        }
};

//댓글수정
module.exports.updateComment = async(req, res, next) => {
    const commentId = parseInt(req.params.id);
    const newContent = req.body.content;

    try{
        const Data = await fs.readFile(filePath, 'utf8');
        let comments = JSON.parse(Data);
        const commentIndex = comments.findIndex(comment => comment.commentId == commentId);

        if (commentIndex !== -1) {
            comments[commentIndex].content = newContent;
            await fs.writeFile(filePath, JSON.stringify(comments, null, 2));
            res.status(200).send('Comment updated');
        }
        else {
            return res.status(404).send({message: 'comment not found'});
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send('Error processing your request');
    }
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

