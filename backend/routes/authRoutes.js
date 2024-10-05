const express = require("express");
const { register, login } = require("../controllers/authController");
const { validateUserRegister, validateUserLogin, validate } = require("../validations/validate");

const router = express.Router();

router.post("/register", validateUserRegister, validate, register);
router.post("/login", validateUserLogin, validate, login);

module.exports = router;
