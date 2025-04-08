const express = require("express");
const app = express();

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const PORT = process.env.PORT;

// import the routes
const authRoute = require("./routes/authRoute");
const contactRoute = require("./routes/contactRoute");
const delearshipRoute = require("./routes/delearshipRoute");
const reviewRoute = require("./routes/reviewRoute");
const eventRoute = require("./routes/eventRoute");
const galleryRoute = require("./routes/galleryRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const teamRoute = require("./routes/teamRoute");

// import the connectDB function from the db.js file
const connectDB = require("./configs/db");

// call the connectDB function
connectDB();

// Middleware to parse incoming requests with JSON payloads (body-parser)
app.use(express.json());

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true,
}));


// Middleware to log HTTP requests
app.use(morgan("dev"));
//Format	Description
// "combined"	Apache-style logs with full info (used in prod)
// "common"	Shorter Apache format
// "tiny"	Minimal log info
// "dev"	Fast, color-coded, ideal for development

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/delearship", delearshipRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/gallery", galleryRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/team", teamRoute);


import("chalk").then((chalk) => {
  app.listen(PORT, () => {
    console.log(
      chalk.default.blueBright(
        `🚀 Server is running on http://localhost:${PORT}`
      )
    );
  });

  process.on("SIGINT", () => {
    console.log(
      chalk.default.yellow(
        "🔌 Server is shutting down due to app termination (SIGINT)"
      )
    );
    process.exit(0);
  });
});
