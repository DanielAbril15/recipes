const router = require("express").Router();
const categoriesServices = require("./categories.services");

router
  .route("/")
  .get(categoriesServices.getAllCategories)
  .post(categoriesServices.createCategory);

router
  .route("/:id")
  .get(categoriesServices.getCategoryById)
  .delete(categoriesServices.deleteCategory);

module.exports = router;
