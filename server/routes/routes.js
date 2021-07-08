const express = require("express");
const router = express.Router();
const {
    sendMail,
    uploadPost,
    getPosts,
    removePost,
    editPost,
} = require("../controllers/controllers");
const multer = require("multer");

const upload = multer();

router.get("/getPosts", getPosts);

router.post("/uploadPost", upload.single("file"), uploadPost);

router.post("/removePost", removePost);

router.put("/updatePost", upload.none(), editPost);

router.post("/sendMail", upload.none(), sendMail);

module.exports = router;
