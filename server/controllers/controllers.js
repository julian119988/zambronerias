const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

const controllers = {
    home: function home(req, res) {
        res.send("Hola mundo esto es home");
    },
    helloToServer: async function helloToServer(req, res) {
        const response = await storage.bucket("image-products").getFiles();
        res.send({ message: response });
    },
    getFile: function getFile(req, res, next) {
        const {
            file,
            body: { title, description, price },
        } = req;
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            res.status(200).send({
                //Seguir aca agregar db y hacer request correspondientes (CRUD)
                message: "Mensaje recibido exitosamente!",
                data: [title, description, price, file],
            });
        } else {
            next(new Error("Invalid file type."));
            res.status(400).send({
                message: "Invalid file type",
            });
        }
    },
};

module.exports = controllers;
