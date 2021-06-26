const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1dnvc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};
(async () => {
    try {
        await mongoose.connect(uri, connectionParams);
        console.log("Database connected");
    } catch (e) {
        console.log(e);
    }
})();
