
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); 


router.get("/read", userController.readUsers);
router.get("/edit/:userId", userController.editUser);
router.post("/update/:userid", userController.Update);
router.post("/create", userController.createUser);
router.get("/delete/:id", userController.deleteUser);

module.exports = router;
