require('dotenv').config();
const express = require('express');
const http = require('http'); // Add this
const { Server } = require('socket.io'); // Add this
const app = express();
const server = http.createServer(app); // Create the server


const io = new Server(server, {
  cors: { origin: "http://localhost:5173" } // Match your Vite port
});
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoute');

app.use(express.json());
connectDB();

app.use('/user', userRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');
});

server.listen(3000, () => {
  console.log('Server & Socket running on port 3000');
});