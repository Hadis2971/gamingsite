
const LocalStrategy = require('passport-local').Strategy;
const User = require("../Models/User");


module.exports.localStrg = (passport) => {
    passport.use(new LocalStrategy(
        function(username, password, done) {
          User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect Username.' });
            }
            User.comparePasswords(password, user.password, (err, isMatch) => {
                if(err) throw err;
                else{
                    if(!isMatch){
                        return done(null, false, {message: "Incorrect Password"});
                    }else{
                        return done(null, user);
                    }
                }
            });
          });
        }
      ));
      
      passport.serializeUser(function(user, done) {
          done(null, user.id);
      });
        
        passport.deserializeUser(function(id, done) {
          User.findById(id, function(err, user) {
            done(err, user);
          });
      });
};

