const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../data/userdata.json');

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


module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = JSON.parse(await fs.readFile(filePath, 'utf8'));
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            req.session.userId = user.userid; // 세션에 userId를 저장
            res.json({ success: true, message: "Login successful" });
        } else {
            // 로그인 실패시 JSON 형태로 명확한 오류 메시지 전달
            res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

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

module.exports.deleteUserdata = async (req, res) => {
    try {
        let userData = JSON.parse(await fs.readFile(filePath, 'utf8'));
        const userId = parseInt(req.params.userId);
        userData = userData.filter(u => u.userid !== userId);
        await fs.writeFile(filePath, JSON.stringify(userData, null, 2), 'utf8');
        res.status(200).json({ message: "User data deleted successfully" });
    } catch (error) {
        console.error('Error in deleteUserdata:', error);
        res.status(500).send("Server Error");
    }
};
