const mongoose = require("mongoose");

const delearshipSchema = new mongoose.Schema({
  // personal details
  firstName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
    unique: true,
  },
  // Business details
  businessName: {
    type: String,
    required: [true, "Please provide a company name"],
  },

  businessAddress: {
    type: String,
    required: [true, "Please provide a address"],
  },
  businessType: {
    type: String,
    required: [true, "Please provide a business type"],
  },
  yearsInBusiness: {
    type: String,
    required: [true, "Please provide a years in business"],
  },
  businessCity: {
    type: String,
    required: [true, "Please provide a city"],
  },
  businessDistrict: {
    type: String,
    required: [true, "Please provide a district"],
  },
  businessState: {
    type: String,
    required: [true, "Please provide a state"],
  },
  businessExperience: {
    type: String,
    required: [true, "Please provide a experience"],
  },
  investment: {
    type: String,
    required: [true, "Please provide a investment range"],
  },
  comments: {
    type: String,
    required: [true, "Please provide a additional comments"],
  },
  terms: {
    type: Boolean,
    required: [true, "Please accept terms"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Delearship = mongoose.model("Delearship", delearshipSchema);
module.exports = Delearship;
