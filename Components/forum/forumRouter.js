const router = require("express").Router();
const util   = require("../../utilities");

router.get("/", util.isAuthenticated, (req, res) => {
    res.render("forum/forumIndex");
});

module.exports = router;