const express = require("express");
const userController = require("./controllers/userController");
const authMiddleware = require("./middlewares/authMiddleware");

const router = express.Router();

router.post("/login", userController.login);
router.post("/users", authMiddleware.verifyToken, userController.createUser);
router.get("/users", authMiddleware.verifyToken, userController.getUsers);
router.get("/users/:id", authMiddleware.verifyToken, userController.getUserById);
router.put("/users/:id", authMiddleware.verifyToken, userController.updateUser);
router.delete("/users/:id", authMiddleware.verifyToken, userController.deleteUser);

module.exports = router;