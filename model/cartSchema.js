const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    deliveryStatus: {
      type: String,
      default: "pending",
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchema);
