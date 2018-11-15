const express = require("express");
const exphbs  = require("express-handlebars");
const path    = require("path");
const db      = require("./DB");


const app = express();
app.set("port", (process.env.PORT || 3000));

const forumRouter = require("./Components/forum/forumRouter");
const errorRouter = require("./Components/errorHandling");

db.setConnection();

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({defaultLayout: "layout"}));

app.use(express.static("public"));

app.use("/", forumRouter);

app.use(errorRouter);

app.listen(app.get("port"), (err) => {
    if(err) throw err;
    else console.log(`Server Started On Port ${app.get("port")}`);
});