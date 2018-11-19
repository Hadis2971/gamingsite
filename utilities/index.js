module.exports = {
    isAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()){  
            return next();
        }else{
            req.flash("error_msg", "Please Login First!!!");
            res.redirect("/users/login");
        }
    }
}