if(process.env.NODE_ENV === "production"){
    module.exports = {
        dbURI: process.env.dbURI || "",
        sessionSecret: process.env.sessionSecret

    }
}else{
    module.exports = {
        dbURI: "mongodb://localhost:27017/gamingsite",
        sessionSecret: "topsecretsecret"
    }
}



