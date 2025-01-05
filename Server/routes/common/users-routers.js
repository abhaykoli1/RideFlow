const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const {
  fetchAllUsers,
  updateUserRole,
  deleteUser,
} = require("../../controllers/common/users-controller");

const router = express.Router();

router.get("/getList", fetchAllUsers);
router.put("/updateRole", updateUserRole);
router.delete("/delete/:id", deleteUser);

module.exports = router;
