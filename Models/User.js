const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String
    }
});

const User = module.exports = mongoose.model("User", userSchema);

module.exports.createUser = (newUser, cb) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) throw err;
            else{
                newUser.password = hash;
                newUser.save(cb);
            }
        });
    });
};

module.exports.comparePasswords = (candidatePassword, hash, cb) => {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        else{
            cb(null, isMatch);
        }
    });
};