const express = require("express");
const { getUserProfile } = require("../controllers/authController");
const {
  getProducts,
  newProducts,
  getSingleProduct,
  updateProduct,
  deletProduct,
} = require("../controllers/productController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewars/authenticate");

// getSingleProduct
router.route("/product").get(isAuthenticatedUser, getProducts);
router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deletProduct);
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles('admin'),newProducts);

router.route("/getUser").get(isAuthenticatedUser,getUserProfile);

module.exports = router;
