const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const filePath = path.join(__dirname, '../data/userdata.json');

// 이 함수는 사용자 정보를 ID로 검색하는 것 같으나, userRouter에서 이 이름으로 호출하는 부분이 없습니다.
// 필요에 따라 userRouter.js에서 이 함수를 호출하도록 추가하거나 이름을 변경해야 합니다.
module.exports.getUserdataById = async (req, res) => {
    try {
        const users = JSON.parse(await fs.readFile(filePath, 'utf8'));
        const user = users.find(u => u.id === parseInt(req.params.userId));
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in getUserdataById:', error);
        res.status(500).send("Server Error");
    }
};

// createUserdata 함수는 제대로 정의되어 있습니다.
module.exports.createUserdata = async (req, res) => {
    const { email, password, nickname, image } = req.body;

    const uploadsDir = path.join(__dirname, '../uploads/user');
    const imageName = `${nickname}-${Date.now()}.png`;
    const imagePath = path.join(uploadsDir, imageName);

    try {
        await fs.mkdir(uploadsDir, { recursive: true });
        await fs.writeFile(imagePath, image, { encoding: 'base64' });

        let userData = JSON.parse(await fs.readFile(filePath, 'utf8'));
        const userId = userData.reduce((maxId, user) => user.userid > maxId ? user.userid : maxId, 0) + 1;
        const newUser = {
            userid: userId,
            email: email,
            password: password,
            nickname: nickname,
            image: imagePath
        };
        userData.push(newUser);
        await fs.writeFile(filePath, JSON.stringify(userData, null, 2), 'utf8');

        res.status(201).json({ message: "User data created successfully", user: newUser });
    } catch (error) {
        console.error('Error in createUserdata:', error);
        res.status(500).send("Server error occurred");
    }
};

// postUserdata 함수는 로그인 기능을 처리합니다.
module.exports.postUserdata = async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = JSON.parse(await fs.readFile(filePath, 'utf8'));
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            req.session.userId = user.id; // 세션에 userId를 저장
            res.json({ success: true, message: "Login successful" });
        } else {
            res.status(400).json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.error('Error in postUserdata:', error);
        res.status(500).send("Server Error");
    }
};

// deleteUserdata 함수는 사용자 데이터 삭제 기능을 처리합니다.
module.exports.deleteUserdata = async (req, res) => {
    try {
        let userData = JSON.parse(await fs.readFile(filePath, 'utf8'));
        const userId = parseInt(req.params.userId);
        userData = userData.filter(u => u.id !== userId);
        await fs.writeFile(filePath, JSON.stringify(userData, null, 2), 'utf8');

        res.status(200).json({ message: "User data deleted successfully" });
    } catch (error) {
        console.error('Error in deleteUserdata:', error);
        res.status(500).send("Server Error");
    }
};

// updateUserdata 함수는 사용자 정보 업데이트 기능을 처리합니다.
module.exports.updateUserdata = async (req, res) => {
    const { email, password, nickname } = req.body;
    const userId = parseInt(req.params.userId);

    try {
        let userData = JSON.parse(await fs.readFile(filePath, 'utf8'));
        const userIndex = userData.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            userData[userIndex] = {...userData[userIndex], email, password, nickname};
            await fs.writeFile(filePath, JSON.stringify(userData, null, 2), 'utf8');

            res.status(200).json({ message: "User data updated successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error in updateUserdata:', error);
        res.status(500).send("Server Error");
    }
};

