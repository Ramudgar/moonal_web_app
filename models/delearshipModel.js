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
  // Bussiness details
  bussinessName: {
    type: String,
    required: [true, "Please provide a company name"],
  },

  bussinessAddress: {
    type: String,
    required: [true, "Please provide a address"],
  },
  bussinessType: {
    type: String,
    required: [true, "Please provide a bussiness type"],
  },
  yearsInBussiness: {
    type: String,
    required: [true, "Please provide a years in bussiness"],
  },
  bussinessCity: {
    type: String,
    required: [true, "Please provide a city"],
  },
  bussinessDistrict: {
    type: String,
    required: [true, "Please provide a district"],
  },
  bussinessState: {
    type: String,
    required: [true, "Please provide a state"],
  },
  bussinessExperience: {
    type: String,
    required: [true, "Please provide a experience"],
  },
  plannedInvestmentRange: {
    type: String,
    required: [true, "Please provide a investment range"],
  },
  additionalComments: {
    type: String,
    required: [true, "Please provide a additional comments"],
  },
  acceptTerms: {
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
