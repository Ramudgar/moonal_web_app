const mongoose = require("mongoose");

// Define chalk globally inside this module
let chalk;
(async () => {
  chalk = await import("chalk");
})();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (chalk) {
      console.log(chalk.default.greenBright(`✅ MongoDB Connected: ${conn.connection.host}`));
    } else {
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (err) {
    if (chalk) {
      console.log(chalk.default.redBright("❌ MongoDB Connection Error: "), err.message);
    } else {
      console.error("❌ MongoDB Connection Error: ", err.message);
    }
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  if (chalk) {
    console.log(chalk.default.yellow("🔌 MongoDB disconnected due to app termination (SIGINT)"));
  } else {
    console.log("🔌 MongoDB disconnected due to app termination (SIGINT)");
  }
  process.exit(0);
});

module.exports = connectDB;
