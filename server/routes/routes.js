const express = require("express");
const router = express.Router();
const {
    home,
    uploadPost,
    getPosts,
    removePost,
} = require("../controllers/controllers");
const multer = require("multer");

const upload = multer();

router.get("/", home);

router.get("/getPosts", getPosts);

router.post("/uploadPost", upload.single("file"), uploadPost);

router.post("/removePost", removePost);

module.exports = router;
