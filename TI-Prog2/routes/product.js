//productos y -add

var express = require('express'); //importo el módulo
var router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.index);
router.get("/add", productController.newProd);

module.exports = router; //exporto el router