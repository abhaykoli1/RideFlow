const express = require("express");

const {
  addToWishlist,
  fetchWishlistItems,
  deleteWishlistItem,
} = require("../../controllers/user/wishlist-Controller");

const router = express.Router();

// Route to add a ride to the wishlist
router.post("/add", addToWishlist);

// Route to fetch wishlist items for a specific user
router.get("/get/:userId", fetchWishlistItems);

// Route to delete a specific ride from the user's wishlist
router.delete("/:userId/:rideId", deleteWishlistItem);

module.exports = router;
