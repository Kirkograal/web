const path    = require('path');
const express = require('express');
const config  = require('./config/index');
const db      = require('./database/index');
const bot     = require('./bot/index')(db);
const app     = express();

// App settings
app.set('env', process.env);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', config.port);

// Middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Oops');
});

// Routes
app.use('/', require('./routes/index'));

module.exports = app;