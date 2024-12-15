const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { getAllUsers } = require("../../controllers/common/users-controller");

const router = express.Router();

router.get("/get", getAllUsers); // `/api/users` will return all users

module.exports = router;
