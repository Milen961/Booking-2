const express = require('express')
const cookieParser = require('cookie-parser');
const session = require('../middlewares/session');
const trimBody = require('../middlewares/trimBody');

module.exports = (app) => {
   app.use('/static', express.static('static'));
   app.use(express.urlencoded({ extended: true }));
   app.use(cookieParser());
   app.use(session());
   app.use(trimBody('password'))

}