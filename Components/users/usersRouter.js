const router   = require("express").Router();
const config   = require("../../config");
const path     = require("path");
const mongoose = require("mongoose");
const crypto   = require("crypto");
const multer   = require("multer");
const Grid     = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const User     = require("../../Models/User");

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
                            if(err) throw err;
                            else{
                                console.log(user);
                                res.redirect("login");
                            }
                        });
                    }
                }
            });
        });
    }
});



router.get("/userImage/:filename", (req, res) => {
    gfs.files.find({filename: req.params.filename}, (err, file) => {
        if(err) throw err;
        else{
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }
    });
});

module.exports = router;