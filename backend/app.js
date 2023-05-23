const express = require('express');
const app = express();
const cors = require("cors");
const authRoutes = require("./Routes/userAuth");
const userRoutes = require("./Routes/user");
const projectRoutes = require("./Routes/projects");
const projectMemberRoutes = require("./Routes/projectMembers");
const matchRoutes = require("./Routes/matches");
const messageRoutes = require("./Routes/messages");
const { authenticateJWT } = require("./Middleware/auth");

// process.env.NODE_ENV = "test";

// middleware for ALL routes.
app.use(express.json());
// enables preflight requests // use of middleware with cross-origin resource sharing
app.use(cors());
app.use(authenticateJWT);

// app use this prefix for routes in this file.
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/matches", matchRoutes);
app.use("/projectmembers", projectMemberRoutes);
app.use("/messages", messageRoutes);

app.get("/works", async function (req, res, err) {
  return res.status(200).json({ "worked": "like a charm" })
});

// Generic error handler for cases not explicitly caught."
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({ error: { message, status } });
});


// starts server on port 3000
module.exports = app;

