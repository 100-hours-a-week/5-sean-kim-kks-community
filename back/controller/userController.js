const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const filePath = path.join(__dirname, '../data/userdata.json');


module.exports.getUserdata = async (req, res, next) => {
    res.status(200).json({ message: "유저 데이터 조회 성공" });
};

module.exports.postUserdata = async (req, res) => {
    const { email, password } = req.body;

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const users = JSON.parse(data);
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            req.session.userId = user.userid; // 사용자 ID를 세션에 저장
            res.json({ success: true, message: "로그인 성공" });
        } else {
            res.status(400).json({ success: false, message: "이메일 또는 비밀번호가 잘못되었습니다." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("서버 에러");
    }
};
module.exports.deleteUserdata = async (req, res, next) => {
    res.status(200).json({ message: "유저 데이터 삭제 성공" });
};

module.exports.updateUserdata = async (req, res, next) => {
    res.status(200).json({ message: "유저 데이터 수정 성공" });
};