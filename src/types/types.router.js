const router = require("express").Router();
const typeServices = require("./types.services");
const passport = require("passport");
const adminValidate = require("../middlewares/role.middleware");

router
  .route("/")
  .get(typeServices.getAllTypes)
  .post(
    passport.authenticate("jwt", { session: false }),
    adminValidate,
    typeServices.createType
  );

router
  .route("/:id")
  .get(typeServices.getTypeById)
  .delete(
    passport.authenticate("jwt", { session: false }),
    adminValidate,
    typeServices.deleteType
  );

module.exports = router;
