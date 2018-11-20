const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const themeSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "Every Theme Needs A User"]
    },
    title: {
        type: String,
        required: [true, "Every Theme Needs A Title"]
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

const Theme = module.exports = mongoose.model("Them", themeSchema);