const db = require('../db/data');

const usersController = {
    login: function(req, res, next) {
        res.render('login');
    },

    profileEdit: function(req, res, next) {
        res.render("profile-edit");
    },

    profile: function(req, res, next) {
        res.render("profile", { db: db }); 
    },

    register: function(req, res, next) {
        res.render("register");
    }
}

module.exports = usersController;
