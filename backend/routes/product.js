const express= require('express');
const { getProducts, newProducts, getSingleProduct, updateProduct, deletProduct } = require('../controllers/productController');
const router=express.Router();

router.route('/product').get(getProducts);
router.route('/product/:id').get(getSingleProduct).put(updateProduct).delete(deletProduct);
router.route('/product/new').post(newProducts);




module.exports=router;