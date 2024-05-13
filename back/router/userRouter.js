const express = require("express");
const router = express.Router();
const userPath = require("../controller/userController");

const cors = require('cors');


router.get("/", userPath.getUserdata);

router.post("/", userPath.postUserdata);

router.delete("/:id", userPath.deleteUserdata);

router.put("/:id", userPath.updateUserdata); // 수정 요청을 처리할 PUT 엔드포인트 추가

module.exports = router;