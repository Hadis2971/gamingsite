const router = require("express").Router();

router.use((err, req, res, next) => {
    res.render("errorViews/500", {layout: "errorLayout"});
});

router.use((req, res, next) => {
    res.render("errorViews/404", {layout: "errorLayout"});
});

module.exports = router;