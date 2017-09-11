var express = require('express');
var app = express();
var bp = require('body-parser');
var cors = require('cors');
var router = require('./endpoints');

app.use(cors());
app.use(bp.urlencoded({extended:false}));
app.use(bp.json());
app.use('/api', router);

module.exports = app;
