const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
