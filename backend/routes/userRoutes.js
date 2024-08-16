const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUser,
  deleteUser,
  saveUser,
} = require("../controller/userController");
const { auth, adminAuth } = require("../middleware/authMiddleware");

router.get("/", auth, adminAuth, getUsers);
router.put("/:id", auth, adminAuth, updateUser);
router.delete("/:id", auth, adminAuth, deleteUser);
router.post("/", auth, adminAuth, saveUser);

module.exports = router;
