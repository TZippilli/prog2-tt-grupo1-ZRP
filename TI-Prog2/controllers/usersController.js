const db = require('../database/models');

const usersController = {
    login: function(req, res, next) {
        res.render('login');
        let filtro = {
            where: [{email: form.email}]
        };

        db.User.findOne(filtro)
        .then((result)=>{
            if(result != null){
                req.session.user = result;

                if(form.recordarme != undefined){
                    res.cookie("userId", result.id, {maxAge: 1000 * 60 * 35})
                }



                req.session.user = result;
                return res.redirect("/product");
            } else {
                return res.send("No hay mails parecidos a: " + form.email);
            }

        }).catch((err)=>{
            return console.log(err);
        })
    },

    profileEdit: function(req, res, next) {
        res.render("profile-edit", {db:db});
    },

    profile: function(req, res, next) {
        res.render("profile", { db: db}); 
    },

    register: function(req, res, next) {
        res.render("register");
    },
    
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookies("userId")
        return res.redirect("/");
    }
    
}

module.exports = usersController;
