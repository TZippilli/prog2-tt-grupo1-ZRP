const usersController = {
    login: function(req, res, next) {
        res.render('login');
    },

    profileEdit: function(req, res, next) {
        res.render("profile-edit");
    },

    profile: function(req, res, next) {
        const nombreUsuario = req.user.username;
        res.render("profile", { nombreUsuario });
    },

    register: function(req, res, next) {
        res.render("register");
    }

}

module.exports = usersController