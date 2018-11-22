const router = require("express").Router();
const util   = require("../../utilities");
const Game   = require("../../Models/Game");

router.get("/", (req, res) => {
    res.render("sellGames/sellGamesIndex");
});

router.post("/postGame/:id", (req, res) => {
    let newGame = new Game({
        title: req.body.gameTitle,
        genre: req.body.gameGenre,
        description: req.body.gameDescription,
        imgURI: req.body.gameUrl,
        user: req.params.id
    });

    newGame.save((err) => {
        if(err){
            const mongooseErrors = util.getMongooseErr(err);
            res.render("sellGames/sellGamesIndex", {mongooseErrors: mongooseErrors});
        }else{
            console.log(newGame);
            req.flash("success_msg", "You Have Successfully Added A Game For Salle");
            res.redirect("/sell");
        }
    });

});

module.exports = router;