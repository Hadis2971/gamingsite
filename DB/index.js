const mongoose = require("mongoose");
const config   = require("../config");




module.exports = {
    setConnection: () => {
        mongoose.connect(config.dbURI);
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
        mongoose.connection.once('open', function() {
            console.log("MongoDB Connected!!!");
        });
    },

    getDB: () => {
        return mongoose.connection;
    }
}