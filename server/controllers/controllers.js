const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const PostModel = require("../models/post");

const controllers = {
    home: function home(req, res) {
        res.send("Hola mundo esto es home");
    },
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
};

module.exports = controllers;
