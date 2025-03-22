let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
const connectDB = require("./database/db");

// Import routes
const userRoutes = require("./routes/router");

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API routes
app.use("/users", userRoutes);

// PORT
const PORT = process.env.PORT || 4000;

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).send("❌ Error 404! Page not found");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❗️", err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message || "Internal Server Error");
});
