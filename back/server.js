'use strict';

// ------------------------ Constants ----------------------
require('./database'); //Connection to MongoDB
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// ------------------------ Server -------------------------
/**
 * @apiHeader {String} Access-Control-Allow-Origin *
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization ");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
app.use(cookieParser());
app.use(bodyParser.json());
// CORS HEADERS MIDDLEWARE

app.listen(3000, () => {
    console.log('API Started on port 3000')
});

// ------------------------ Controller ---------------------
const articleController = require(path.join(__dirname, 'Controller', 'article'));

// ------------------------ Routes -------------------------
app.use('/', articleController);