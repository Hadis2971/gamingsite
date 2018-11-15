if(process.env.NODE_ENV === "production"){
    module.exports = {
        dbURI: process.env.dbURI || ""
    }
}else{
    module.exports = {
        dbURI: "mongodb://localhost:27017/gamingsite"
    }
}



