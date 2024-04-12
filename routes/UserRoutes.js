const express = require("express");
const router = express.Router();

const {registerUser, registerAdminUser, login, getCurrentUser, getUserById} = require("../controllers/UserControllers");
const { userCreateValidation, loginValidation } = require("../middlewares/userValidation");
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");

router.post("/register/user", userCreateValidation(), validate, registerUser);
router.post("/register/admin", authGuard, registerAdminUser);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.get("/:id", getUserById);

module.exports = router;