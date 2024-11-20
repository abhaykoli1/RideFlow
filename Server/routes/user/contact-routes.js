const express = require("express");
const {
  addContactQuery,
} = require("../../controllers/user/contact-controller");

const router = express.Router();
router.post("/add", addContactQuery);
// router.put("/edit/:id", editContactQuery);
// router.delete("/delete/:id", deleteContactQuery);
// router.get("/fetch", fetchAllContactQuery);

module.exports = router;
