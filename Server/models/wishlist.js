const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        rideId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Rides",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
