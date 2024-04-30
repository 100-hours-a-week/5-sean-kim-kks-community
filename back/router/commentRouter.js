const express = require("express");
const router = express.Router();
const commentPath = require("../controller/commentController");

router.get("/", commentPath.getComment);

router.post("/", commentPath.postComment);

router.delete("/:id", commentPath.deleteComment);

router.put("/:id", commentPath.updateComment); // 수정 요청을 처리할 PUT 엔드포인트 추가

module.exports = router;