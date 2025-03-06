const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const meetingRoutes = require("./routes/meetingRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static frontend files

// API Routes
app.use("/api", meetingRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Meeting Scheduler API!");
});

// Start Server
const PORT = 5000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.error("Database connection error");
  });

