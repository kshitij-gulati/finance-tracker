const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.originalUrl);
  next();
});

app.get("/", (req, res) => {
  res.send("Finance Tracker API running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

const dashboardRoutes = require("./routes/dashboardRoutes.js");
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});