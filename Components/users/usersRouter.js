const router = require("express").Router();

router.get("/register", (req, res) => {
    res.render("users/register", {layout: "reglogLayout"});
});

router.get("/login", (req, res) => {
    res.render("users/login", {layout: "reglogLayout"});
});

module.exports = router;