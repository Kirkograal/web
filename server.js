
if (process.env.NODE_ENV !== 'production') {
	console.log('not in production');
	require('dotenv').config();
}

const http  = require('http');
const app   = require('./app');

http.createServer(app).listen(app.get('port'), () => {
	console.log(`Server now running on port ${app.get('port')}`);
});
