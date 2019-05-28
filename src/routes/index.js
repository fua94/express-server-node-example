const express = require('express');
const taskRoute = require('./tasks.route') ;
const userRoute = require('./users.route');

module.exports = { taskRoute, userRoute };
