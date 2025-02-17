const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const membersRoutes = require("./routes/members"); // Import members routes
const cors = require("cors");

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000"], // Add more origins if needed
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api/members", membersRoutes); // Added members route

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
