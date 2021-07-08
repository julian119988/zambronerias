const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const PostModel = require("../models/post");
const nodemailer = require("nodemailer");

const controllers = {
    helloToServer: async function helloToServer(req, res) {
        const response = await storage.bucket("image-products").getFiles();
        res.send({ message: response });
    },
    uploadPost: async function uploadPost(req, res, next) {
        const {
            file,
            body: { title, description, price },
        } = req;
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            let postToUpload = new PostModel({
                title: title,
                description: description,
                file: {
                    data: file.buffer,
                    contentType: file.mimetype,
                },
                price: price,
            });
            try {
                const postSaved = await postToUpload.save();
                res.status(200).send({
                    message: "Post guardado exitosamente!",
                    data: postSaved,
                });
            } catch (error) {
                console.log(error);
                res.status(400).send({
                    message: "Error inesperado!",
                    error: error,
                });
            }
        } else {
            next(new Error("Invalid file type."));
            res.status(400).send({
                message: "Invalid file type",
            });
        }
    },
    getPosts: async function getPosts(req, res, next) {
        try {
            const allPosts = await PostModel.find();
            res.send({
                message: "Todos los posts han sido enviados!",
                data: allPosts,
            });
        } catch (error) {
            res.status(400).send({
                message: "Error inesperado!",
                error: error,
            });
            next(error);
        }
    },
    removePost: async function removePost(req, res, next) {
        const { id } = req.body;
        try {
            const removedPost = await PostModel.deleteOne({ _id: id });
            res.send({ message: `Post with id ${id} removed succesfully!` });
        } catch (error) {
            res.status(400).send({
                message: "Ups! Something unespected happened.",
            });
            next(error);
        }
    },
    editPost: async function editPost(req, res, next) {
        const { id, title, description, price } = req.body;
        if (!title || !description || !price) {
            res.status(400).send({
                message: "Ups! Something unespected happened.",
            });
        }
        try {
            const updatedPost = await PostModel.findByIdAndUpdate(
                { _id: id },
                {
                    title: title,
                    description: description,
                    price: price,
                }
            );
            res.send({
                message: `Post with id: ${id} updated succesfully!`,
                data: updatedPost,
            });
        } catch (error) {
            console.error(error);
            res.status(400).send({
                message: "Ups! Something unespected happened.",
            });
            next(error);
        }
    },
    sendMail: (sendMail = async (req, res, next) => {
        const { title, description, email } = req.body;
        if (!title || !description || !email) {
            res.status(400).send({ message: "Error faltan datos!" });
        } else {
            try {
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });
                const info = await transporter.sendMail({
                    from: `"ZAMBRONERIAS" ${process.env.EMAIL_USER}`, // sender address
                    to: "flor.zambroni43@gmail.com", // list of receivers
                    subject: title, // Subject line
                    text: `${description}. 
Email enviado por: ${email}`, // plain text body
                });
                res.send({ message: info });
            } catch (error) {
                res.status(400).send({ message: "Ha ocurrido un error" });
                next(error);
            }
        }
    }),
};

module.exports = controllers;
