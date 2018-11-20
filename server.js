const express  = require("express");
const exphbs   = require("express-handlebars");
const expval   = require("express-validator");
const path     = require("path");
const db       = require("./DB");
const session  = require("./Session");
const flash    = require("connect-flash");
const passport = require("passport");

const app = express();
app.set("port", (process.env.PORT || 3000));

const forumRouter = require("./Components/forum/forumRouter");
const errorRouter = require("./Components/errorHandling");
const usersRouter = require("./Components/users/usersRouter");

db.setConnection();

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({defaultLayout: "layout"}));

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/client"));

app.use(expval());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg   = req.flash("error_msg");
    res.locals.error       = req.flash("error");
    res.locals.user        = req.user || null;
    next();
});

app.use("/users", usersRouter);
app.use("/", forumRouter);

app.use(errorRouter);

app.listen(app.get("port"), (err) => {
    if(err) throw err;
    else console.log(`Server Started On Port ${app.get("port")}`);
});