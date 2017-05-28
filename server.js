
const http  = require('http');
const app   = require('./app');

http.createServer(app).listen(app.get('port'), () => {
	console.log(`Server now running on port ${app.get('port')}`);
});
