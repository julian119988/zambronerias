const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        file: { data: Buffer, contentType: String },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    {
        versionKey: false,
    }
);
const PostModel = mongoose.model("posts", PostSchema);

module.exports = PostModel;
