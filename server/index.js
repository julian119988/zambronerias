require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const routes = require("./routes/routes");
const { notFind, handleError } = require("./middlewares/middlewares");
const cors = require("cors");
const db = require("./services/db");

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes); //Ruteo

app.use(notFind); //Manejadores de errores.
app.use(handleError);

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
