const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    profilePic: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    contact:{
     type:Number,
     required:true,
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

module.exports = mongoose.model("user", userSchema);
