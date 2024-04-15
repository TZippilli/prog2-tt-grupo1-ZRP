const db = require('../db/data');

const indexController = {
    index: function(req, res, next) {
        res.render('index', { db: db }); 
    },

    search: function(req, res) {
        res.render("search-results", { db: db });
    }
}

module.exports = indexController;
