require('dotenv').config()
const express = require("express");
const http = require('http')
const db = require('./config/database')
const app = express() ;
const cors = require("cors");

const server = http.createServer(app);
const PORT = process.env.PORT ; 
const eventRoutes= require('./routes/eventRoutes')
const sessionRoutes = require("./routes/sessionRoutes")
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use('/api',eventRoutes);
app.use('/api',sessionRoutes);

db.connect();

server.listen(PORT, () =>{
   console.log("Server Listen at the Port",PORT)
}) 