const indexController = {
    index: function(req, res, next) {
        res.render('index');
    },

    search: function(req, res) {
        res.render("search-results");
    }

}

module.exports = indexController