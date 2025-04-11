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
connectDB();

const app = express();

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/", authRoutes);
app.use("/auth", authRoutes);
app.use("/api/requests", requestsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/tasks", completionsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/members", membersRoutes);
app.use("/api/completions", completionsRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start Express server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// ✅ Attach WebSocket to the SAME server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
