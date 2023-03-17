const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
    {
        title: String,
        description: String,
        content: String,
        img: String,
    },
    {
        //another param object with extra options
        //extra two columns with updatetAt and createdAt
        timestamps: true,
    }
);

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
