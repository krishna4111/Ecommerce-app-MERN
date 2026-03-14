const express = require("express");
const router = express.Router();
const authRoutes = require("./auth/auth-routes");

app.use("/auth", authRoutes);

module.exports = router;
