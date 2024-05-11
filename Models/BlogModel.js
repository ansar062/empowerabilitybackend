const mongoose = require("mongoose");
const Schema = mongoose;

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Blog title is required"],
    },
    content: {
        type: String,
        required: [true, "Blog content is required"]
    },
    cover: {
        type: String,
        required: [true, "Blog Cover Image is required"]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Author is required"]
    },

}, {timestamps: true});

module.exports = mongoose.model("Blog", blogSchema);

