const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Hash the password with salt rounds
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Higher salt rounds = stronger security
  return await bcrypt.hash(password, salt);
};


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,

    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  contactNumber: {
    type: String,
    required: [true, "Please provide a contact number"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "adminAssistant"],
    default: "adminAssistant",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if modified
  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
