const router = require("express").Router();
const util   = require("../../utilities");
const User   = require("../../Models/User");
const Theme  = require("../../Models/Theme");
const Post   = require("../../Models/Post");

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
    Theme.findOne({title: themeTitle}, (err, theme) => {
        if(theme){
            req.flash("info_msg", "That Theme Already Exists!!!");
            res.redirect("/")
        }else{
            let newTheme     = new Theme({user: req.params.user, title: themeTitle});
            newTheme.save((err) => {
                if(err){
                    const mongooseErrors = util.getMongooseErr(err);
                    req.flash("warning_msg", mongooseErrors[0]);
                    res.redirect("/");
                }else{
                    req.flash("success_msg", `New Theme ${themeTitle} Created Successfully`);
                    res.redirect("/");
                }
            });
        }
    });    
});

router.get("/theme/:title", (req, res) => {
    Theme.findOne({title: req.params.title}, (err, theme) => {
        if(err) throw err;
        else{
            Post.find({thema: theme._id}, (err, posts) => {
                if(err) throw err;
                else{
                    console.log(posts);
                    res.render("forum/theme", {title: req.params.title, posts: posts});
                }
            });
        }
    });
});

router.post("/newPost/:title", (req, res) => {
    const postText = req.body.postInput;
    Theme.findOne({title: req.params.title}, (err, theme) => {
        if(err) throw err;
        else{
            theme.save((err) => {
                if(err) throw err;
                else{
                    let newPost = new Post({
                        text: postText,
                        thema: theme._id
                    });
                    
                    newPost.save((err) => {
                        if(err) throw err;
                        else{
                            theme.posts.push(newPost);
                            theme.save((err) => {
                                if(err) throw err;
                                else{
                                    res.redirect('back');
                                }
                            });
                        }
                    });                    
                }
            }); 
        }
    });
});


router.post("/newComment/:id", (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if(err) throw err;
        else{
            post.comments.push(req.body.commentInput);
            post.save((err) => {
                if(err) throw err;
                else{
                    res.redirect("back");
                } 
            });
        }
    });
});

module.exports = router;