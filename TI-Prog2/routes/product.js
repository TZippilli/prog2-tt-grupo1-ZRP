//productos y -add

var express = require('express');
var router = express.Router();
const productController = require("../controllers/productController");

// agregamos el id para buscar por prod. 
router.get("/:id", productController.index);

router.get("/edit/:id", productController.editProd);
router.get("/add", productController.create);



module.exports = router;
