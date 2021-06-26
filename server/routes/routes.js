const express = require("express");
const router = express.Router();
const {
    home,
    helloToServer,
    uploadPost,
    getPosts,
} = require("../controllers/controllers");
const multer = require("multer");

const upload = multer();

router.get("/", home);

router.get("/getPosts", getPosts);

router.post("/uploadPost", upload.single("file"), uploadPost);

module.exports = router;
