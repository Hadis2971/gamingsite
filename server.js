const express = require("express");

const app = express();
app.set("port", (process.env.PORT || 3000));





app.listen(app.get("port"), (err) => {
    if(err) throw err;
    else console.log(`Server Started On Port ${app.get("port")}`);
});