const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const validation = require("./validation");

router.get("/users/signup", userController.signUpForm);
router.post("/users/signup", validation.validateUsers, userController.create);

module.exports = router;




