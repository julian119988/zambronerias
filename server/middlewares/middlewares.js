const middlewares = {
    notFind: function (req, res, next) {
        res.status(404).send("No se encuentra la direccion indicada.");
    },
    handleError: function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send("Ups! Se ha roto algo. :S");
    },
};
module.exports = middlewares;
