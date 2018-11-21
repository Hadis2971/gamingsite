module.exports = {
    isAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()){  
            return next();
        }else{
            req.flash("error_msg", "Please Login First!!!");
            res.redirect("/users/login");
        }
    },

    getMongooseErr: (obj) => {
       let messages = Object.keys(obj.errors).map(key => {                                
            return obj.errors[key].properties.message
        });
        return messages;
    }
}