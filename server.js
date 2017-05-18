var express = require('express');
var	app     = express();

app.get('/', (req, res) => {
	res.send('This is working!');
	res.status(200);
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Oops');
});

app.listen(8080, () => {
	console.log(`Server now running!`);
});
