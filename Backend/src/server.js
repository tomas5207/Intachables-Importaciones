const express = require('express');
const router = require('./routes');
const morgan = require('morgan');
const cors = require('cors');

const server = express();



const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
};

server.use(morgan("dev"));
server.use(express.json());
server.use(cors(corsOptions));

server.use(router);

module.exports = server;