const express = require("express");
const router = express.Router();
const userPath = require("../controller/userController");

const cors = require('cors');

router.get('/session', (req, res) => {
    if (req.session && req.session.user && req.session.user.id) {
        return res.status(200).json({ result: req.session.user.id });
    } else {
        return res.status(200).json({ result: 0 });
    }
})

router.post('/signin', userPath.postUserdata);

router.post('/', userPath.createUserdata);

// router.get('/:userId', userPath.getUserdataById);

router.patch('/:userId', userPath.updateUserdata);

router.delete('/:userId', userPath.deleteUserdata);

// router.patch('/:userId/password', userPath.updateUserPassword);

module.exports = router;