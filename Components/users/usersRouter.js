const router   = require("express").Router();
const config   = require("../../config");
const path     = require("path");
const mongoose = require("mongoose");
const crypto   = require("crypto");
const multer   = require("multer");
const Grid     = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const User     = require("../../Models/User");
const authStrg = require("../../auth_strategies");
const passport = require("passport");

const storage = new GridFsStorage({
url: config.dbURI,
file: (req, file) => {
    return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
        if (err) {
        return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
        filename: filename || "",
        bucketName: 'profileImages'
        };
        resolve(fileInfo);
    });
    });
}
});
const upload = multer({ storage });

let gfs;
var conn = mongoose.createConnection(config.dbURI);
conn.once('open', function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("profileImages");  
});

authStrg.localStrg(passport);

router.get("/register", (req, res) => {
    res.render("users/register", {layout: "reglogLayout"});
});

router.get("/login", (req, res) => {
    res.render("users/login", {layout: "reglogLayout"});
});

router.post("/register", upload.single('profileImage'), (req, res) => {
    req.checkBody("username", "The Username Field is Mandatory").notEmpty();
    req.checkBody("email", "The Email Field is Mandatory").notEmpty();
    req.checkBody("password", "The Password Field is Mandatory").notEmpty();
    req.checkBody("password2", "The Confirm Password Field is Mandatory").notEmpty();
    req.checkBody("password2", "The Passwords Must Match").equals(req.body.password);

    let file = "";
    if(req.file){
        file = req.file.filename;
    }

    const errors = req.validationErrors();

    if(errors){
        res.render("users/register", {errors: errors, layout: "reglogLayout"});
    }else{

        User.findOne({username: req.body.username}, (err, user) => {
            User.findOne({email: req.body.email}, (err, mail) => {
                if(err) throw err;
                else{
                    if(user || mail){
                        res.render("users/register", 
                        {user: user, mail: mail, layout: "reglogLayout"});
                    }else{
                        let newUser =  new User({
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            profileImage: file
                        });

                        User.createUser(newUser, (err, user) => {
                            if(err){
                                const mongooseErrors = Object.keys(err.errors).map(key => {                                
                                    return err.errors[key].properties.message
                                });
                                res.render("users/register", 
                                {mongooseErrors: mongooseErrors, layout: "reglogLayout"});
                            }
                            else{
                                console.log(user);
                                req.flash("success_msg", "You Have Successfully Registred And Can Now Login");
                                res.redirect("login");
                            }
                        });
                    }
                }
            });
        });
    }
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/users/login");
});

router.get("/userImage/:filename", (req, res, next) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if(err){
            next(err);
        }else{
            if(!file){
                res.send("<h1 style=text-align:center;font-size:250%;color:#595959;>The Image That You Are Looking For Does Not Exist!!!</h1>");
            }else{
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            }
        }        
    });
});

module.exports = router;