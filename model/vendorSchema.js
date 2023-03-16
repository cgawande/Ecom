const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: true,
    },
    vendorEmail: {
      type: String,
      required: true,
    },
    vendorPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "vendor",
    },
    city: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isActive: {
      type: String,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vendor", vendorSchema);
