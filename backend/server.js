require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes/index");

const app = express();
const { PORT = 3005, DB_URL } = process.env;

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

(async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Db connected successfully!!!");
  } catch (error) {
    console.error(`Error when connecting to db :${error}`);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
