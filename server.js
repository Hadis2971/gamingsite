const express = require("express");
const exphbs  = require("express-handlebars");
const path    = require("path");

const app = express();
app.set("port", (process.env.PORT || 3000));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({defaultLayout: "layout"}));

app.use(express.static("public"));


app.listen(app.get("port"), (err) => {
    if(err) throw err;
    else console.log(`Server Started On Port ${app.get("port")}`);
});