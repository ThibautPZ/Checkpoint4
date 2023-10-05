const express = require("express");

const router = express.Router();

const authControllers = require("../controllers/authControllers");

const checkUserExistsByEmailWithPassword = require("../middlewares/checkUserExistsByEmailWithPassword");
const checkUserDoesntExist = require("../middlewares/checkUserDoesntExist");
const { hashPassword } = require("../middlewares/hashPassword");
const validateSchema = require("../middlewares/validateSchema");
const loginSchema = require("../Validators/login.validator");
const createUserSchema = require("../Validators/createUser.validator");

router.post(
  "/login",
  validateSchema(loginSchema),
  checkUserExistsByEmailWithPassword,
  authControllers.login
);
router.post(
  "/signup",
  validateSchema(createUserSchema),
  checkUserDoesntExist,
  hashPassword,
  authControllers.signUp
);

router.get("/logout", authControllers.logout);

router.get("/", authControllers.browse);

module.exports = router;
