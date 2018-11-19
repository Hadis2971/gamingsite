const session = require("express-session");
const config  = require("../config");
const MongoStore = require("connect-mongo")(session);
const db = require("../DB");

if(process.env.NODE_ENV === "production"){
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongooseConnection: db.getDB()})
    })
}else{
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
    })
}