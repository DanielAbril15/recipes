const router = require("express").Router();
const categoriesServices = require("./categories.services");
const passport = require("passport");
const adminValidate = require("../middlewares/role.middleware");

router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    adminValidate,
    categoriesServices.getAllCategories
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    adminValidate,
    categoriesServices.createCategory
  );

router
  .route("/:id")
  .get(categoriesServices.getCategoryById)
  .delete(categoriesServices.deleteCategory);

module.exports = router;
