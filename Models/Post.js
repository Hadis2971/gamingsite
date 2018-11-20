const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    comments: [{type: String}],
    timeStamp: {
        type: Date,
        default: Date.now
    },
    thema: {
        type: Schema.Types.ObjectId,
        ref: "Theme"
    }
});

const Post = module.exports = mongoose.model("Post", postSchema);