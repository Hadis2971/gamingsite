const router = require("express").Router();

router.use((req, res, next) => {
    res.status(404);
    res.render("errorViews/404", {layout: "errorLayout"});
});

router.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500);
    res.render("errorViews/500", {layout: "errorLayout"});
});

module.exports = router;