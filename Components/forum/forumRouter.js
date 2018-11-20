const router = require("express").Router();
const util   = require("../../utilities");
const User   = require("../../Models/User");
const Theme  = require("../../Models/Theme");

router.use(util.isAuthenticated)

router.get("/", (req, res) => {
    Theme.find({}, (err, thems) => {
        if(err){
            res.send("<h1 style=text-align:center;font-size:250%;color:#595959;margin-top:25%;>Internal Error Please Try Again Latter</h1>")
        }else{
            res.render("forum/forumIndex", {thems: thems});
        }
    });
});

router.post("/newTheme/:user", (req, res) => {
    const themeTitle = req.body.themeInput;
    let newTheme     = new Theme({user: req.params.user, title: themeTitle});
    newTheme.save(() => {
        req.flash("success_msg", `New Theme ${themeTitle} Created Successfully`);
        res.redirect("/");
    });
    
});

module.exports = router;