const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

connectDB()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.IO initialization and integration with Express
const io = socketIo(server);
app.set('io', io);

// Middleware to add Socket.IO instance to each request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.IO event listeners
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Routes
app.use('/api/v1', [authRoutes, taskRoutes]);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const port = process.env.PORT || 2020;
server.listen(port, async () => {
  console.log(`Server running at: http://localhost:${port}`);
});
