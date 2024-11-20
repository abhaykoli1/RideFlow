const Rides = require("../../models/Rides");
const Wishlist = require("../../models/wishlist");

const addToWishlist = async (req, res) => {
  try {
    const { userId, rideId } = req.body;

    if (!userId || !rideId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const ride = await Rides.findById(rideId);

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    const existingItemIndex = wishlist.items.findIndex(
      (item) => item.rideId.toString() === rideId
    );

    if (existingItemIndex === -1) {
      wishlist.items.push({ rideId });
    } else {
      //   wishlist.items[existingItemIndex].quantity += quantity;
    }

    await wishlist.save();
    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error: Could not add item to Wishlist",
    });
  }
};

const fetchWishlistItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required!",
      });
    }

    const wishlist = await Wishlist.findOne({ userId }).populate({
      path: "items.rideId",
      select: "image rideName rentPerDay rentPerHour",
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found!",
      });
    }

    const validItems = wishlist.items.filter((item) => item.rideId);

    if (validItems.length < wishlist.items.length) {
      wishlist.items = validItems;
      await wishlist.save();
    }

    const populatedItems = validItems.map((item) => ({
      rideId: item.rideId._id,
      image: item.rideId.image,
      rideName: item.rideId.rideName,
      rentPerDay: item.rideId.rentPerDay,
      rentPerHour: item.rideId.rentPerHour,
      //   quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...wishlist._doc,
        items: populatedItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching wishlist items",
    });
  }
};

const deleteWishlistItem = async (req, res) => {
  try {
    const { userId, rideId } = req.params;
    if (!userId || !rideId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found!",
      });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.rideId.toString() !== rideId
    );

    await wishlist.save();

    await wishlist.populate({
      path: "items.rideId",
      select: "image rideName rentPerDay rentPerHour",
    });

    const populatedItems = wishlist.items.map((item) => ({
      rideId: item.rideId ? item.rideId._id : null,
      image: item.rideId ? item.rideId.image : null,
      rideName: item.rideId ? item.rideId.rideName : "Ride not found",
      rentPerDay: item.rideId ? item.rideId.rentPerDay : null,
      rentPerHour: item.rideId ? item.rideId.rentPerHour : null,
      //   quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...wishlist._doc,
        items: populatedItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting wishlist item",
    });
  }
};

module.exports = {
  addToWishlist,
  fetchWishlistItems,
  deleteWishlistItem,
};
