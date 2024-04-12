const express = require("express");
const router = express.Router();

const {registerUser, registerAdminUser, login, getCurrentUser, getUserById, update} = require("../controllers/UserControllers");
const { userCreateValidation, loginValidation, UpdateValidation } = require("../middlewares/userValidation");
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

router.post("/register/user", userCreateValidation(), validate, registerUser);
router.post("/register/admin", authGuard, registerAdminUser);
router.post("/login", loginValidation(), validate, login);
router.put("/", authGuard, UpdateValidation(), validate, imageUpload.single("profileImage"), update);
router.get("/profile", authGuard, getCurrentUser);
router.get("/:id", getUserById);

module.exports = router;