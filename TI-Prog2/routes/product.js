//productos y -add

var express = require('express');
var router = express.Router();
const productController = require("../controllers/productController");

// agregamos el id para buscar por prod. 
router.get("/:id", productController.index);

router.get("/add", productController.newProd);

module.exports = router;
