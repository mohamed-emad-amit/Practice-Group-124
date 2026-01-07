// Imports
const { rateLimit } = require("express-rate-limit");
const express = require("express");
const dotenv = require("dotenv");
const jsend = require("jsend");
const cors = require("cors");
const path = require("path");

// Config
dotenv.config();

// Imports Routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

// Generated Middleware
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const limiter = rateLimit({ limit: 100, windowMs: 1000 * 60 * 15 });

// System Variable
const app = express();
const PORT = process.env.PORT ?? 3000;

// Global Middlware
app.use(express.json());
app.use(limiter);

app.use(jsend.middleware);

// Enable Cors
app.use(cors({ origin: process.env.CLIENT_URL }));

// Serve Static Files
app.use("/views", express.static(path.join(__dirname, "views")));

// Routes
app.use("/api/users", userRoutes); // [] {} error
app.use("/api/products", productRoutes);

// Handle Error Middleware
app.use(errorMiddleware);

// Run Server
app.listen(PORT, function () {
  console.log(`SERVER RUNNING @PORT: ${PORT}`);
});
