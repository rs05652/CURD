// index.js
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config(); 
const userRoutes = require("./routes/userRoutes");


app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

  app.use("/", userRoutes);
app.get("/", (req, res) => {
  res.render("index");
});
app.use('/verify-otp', userRoutes);



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
