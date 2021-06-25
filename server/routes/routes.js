const express = require("express");
const router = express.Router();
const { home, helloToServer, getFile } = require("../controllers/controllers");
const multer = require("multer");

const upload = multer();

router.get("/", home);

router.get("/asd", helloToServer);

router.post("/send", upload.single("file"), getFile);

module.exports = router;
