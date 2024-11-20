const Rides = require("../../models/Rides");
const Cart = require("../../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { userId, rideId, quantity } = req.body;

    if (!userId || !rideId || quantity <= 0) {
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

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentRideIndex = cart.items.findIndex(
      (item) => item.rideId.toString() === rideId
    );

    if (findCurrentRideIndex === -1) {
      cart.items.push({ rideId, quantity });
    } else {
      cart.items[findCurrentRideIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error : add item to cart",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is manadatory!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.rideId",
      select: "image rideName rentPerDay rentPerHour",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const validItems = cart.items.filter((rideItem) => rideItem.rideId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      rideId: item.rideId._id,
      image: item.rideId.image,
      rideName: item.rideId.rideName,
      rentPerDay: item.rideId.rentPerDay,
      rentPerHour: item.rideId.rentPerHour,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const updateCartItemQty = async (req, res) => {
  try {
    const { userId, rideId, quantity } = req.body;

    if (!userId || !rideId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const findCurrentRideIndex = cart.items.findIndex(
      (item) => item.rideId.toString() === rideId
    );

    if (findCurrentRideIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present !",
      });
    }

    cart.items[findCurrentRideIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.rideId",
      select: "image rideName rentPerDay rentPerHour",
    });

    const populateCartItems = cart.items.map((item) => ({
      rideId: item.rideId ? item.rideId._id : null,
      image: item.rideId ? item.rideId.image : null,
      rideName: item.rideId ? item.rideId.rideName : "Ride not found",
      rentPerDay: item.rideId ? item.rideId.rentPerDay : null,
      rentPerHour: item.rideId ? item.rideId.rentPerHour : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, rideId } = req.params;
    if (!userId || !rideId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.rideId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.rideId._id.toString() !== rideId
    );

    await cart.save();

    await cart.populate({
      path: "items.rideId",
      select: "image rideName rentPerDay rentPerHour",
    });

    const populateCartItems = cart.items.map((item) => ({
      rideId: item.rideId ? item.rideId._id : null,
      image: item.rideId ? item.rideId.image : null,
      rideName: item.rideId ? item.rideId.rideName : "Ride not found",
      rentPerDay: item.rideId ? item.rideId.rentPerDay : null,
      rentPerHour: item.rideId ? item.rideId.rentPerHour : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = {
  addToCart,
  updateCartItemQty,
  deleteCartItem,
  fetchCartItems,
};
