const express = require('express');
const router = require('./routes');
const morgan = require('morgan');
const cors = require('cors');

const server = express();



const corsOptions = {
    origin: "https://intachables.com", // Cambia "*" por tu dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

server.use(morgan("dev"));
server.use(cors(corsOptions)); 
server.use(express.json({ limit: '100mb' }));
server.use(express.urlencoded({ limit: '100mb', extended: true }));
server.use(router);

module.exports = server;