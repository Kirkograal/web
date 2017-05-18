var express = require('express');
var	app     = express();

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

console.log(`PORT ${process.env.PORT}`);
console.log(`IP ${process.env.IP}`);
console.log(`OPENSHIFT_NODEJS_PORT ${process.env.OPENSHIFT_NODEJS_PORT}`);
console.log(`OPENSHIFT_NODEJS_IP ${process.env.OPENSHIFT_NODEJS_IP}`);

app.get('/', (req, res) => {
	res.contentType('application/json');
	res.send(process.env);
	res.status(200);
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Oops');
});

app.listen(port, ip, () => {
	console.log(`Server running on http://${ip}:${port}`);
});
