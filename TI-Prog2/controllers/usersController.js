const usersController = {
    login: function(req, res, next) {
        res.render('login');
    },

    profileEdit: function(req, res, next) {
        res.render("profileEdit");
    },

    profile: function(req, res, next) {
        res.render("profile");
    },

    register: function(req, res, next) {
        res.render("register");
    }

}

module.exports = usersController