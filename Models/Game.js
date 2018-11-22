const mongoose = require("mongoose");
const Schema   = mongoose.Schema

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Every Game Needs A Title"]
    },
    genre: {
        type: String
    },
    description: {
        type: String
    },
    imgURI: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Game = module.exports = mongoose.model("Game", gameSchema);