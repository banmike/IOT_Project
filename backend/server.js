const express = require("express");
const app = express();
const port = 5000;
const actionhistory = require("./routes/ActionhistoryRouter");
const datasensor = require("./routes/DatasensorRouter");
const dashboard = require("./routes/DashboardRouter");
const bodyParser = require("body-parser");
const client = require("./mqtt");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Sử dụng middleware cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    // Thay đổi MONGODB_URI thành MONGO_URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/dashboard", dashboard);
app.use("/datasensor", datasensor);
app.use("/actionhistory", actionhistory);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
