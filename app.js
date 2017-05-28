const path    = require('path');
const express = require('express');
const app     = express();

// App settings
app.set('env', process.env);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Oops');
});

// Routes
app.use('/', require('./routes/index'));

module.exports = app;