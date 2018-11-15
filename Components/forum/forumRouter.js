const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("forum/forumIndex");
});

module.exports = router;