require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoute');
const chatRoutes = require('./src/routes/chatRoute');


const io = new Server(server, {
  cors: { origin: "http://localhost:5173" } //lora temporary chhe delete ni kar
});

const cors = require('cors');
app.use(cors());

app.use(express.json());
connectDB();

app.use('/user', userRoutes);
app.use('/chat', chatRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');
});

server.listen(3000, () => {
  console.log('Server & Socket running on port 3000');
});