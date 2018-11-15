const router = require("express").Router();
const config =  require("../../config");
const path   = require("path");
const crypto = require("crypto");
const multer = require("multer");
const Grid   = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");

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
        filename: filename,
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