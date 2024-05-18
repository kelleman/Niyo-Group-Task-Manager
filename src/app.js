const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); 
require('dotenv').config();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Export the io instance for use in other files
module.exports = io;

// Define Routes
app.use('/api/v1', [authRoutes, taskRoutes]);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
