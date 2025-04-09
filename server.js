const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const tasksRoutes = require("./routes/tasks");
const projectsRoutes = require("./routes/projects");
const requestsRoutes = require("./routes/requests");
const membersRoutes = require("./routes/members");
const completionsRoutes = require("./routes/taskCompletion");
const cors = require("cors");
const WebSocket = require("ws");

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000"], 
    credentials: true,
  })
);

// WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.use(express.json());

// Routes
app.use("/", authRoutes);
app.use("/auth", authRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/tasks", tasksRoutes); // This will handle all /api/tasks routes
app.use("/api/tasks", completionsRoutes); // Add this line to handle completion routes under /api/tasks
app.use("/api/projects", projectsRoutes);
app.use("/api/members", membersRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));