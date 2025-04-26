const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController'); 
const authenticate = require("../middleware/authenticate");

router.get("/read", userController.readUsers);
router.get("/edit/:userId", userController.editUser);
router.post("/update/:userId", userController.Update);  // Changed 'userid' to 'userId'
router.post("/create", userController.createUser);
router.get("/delete/:id", userController.deleteUser);

router.post("/signup", userController.signup);
router.post("/login", authenticate, userController.login);
router.post('/verify-otp', userController.verifyOtp);

module.exports = router;
