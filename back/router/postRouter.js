const express = require("express");
const router = express.Router();
const postPath = require("../controller/postController");

router.get("/", postPath.getPost);

router.post("/", postPath.postPost);

router.delete("/:id", postPath.deletePost);

router.patch("/:id", postPath.patchPost);

module.exports = router;
