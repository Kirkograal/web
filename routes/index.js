var express = require('express');
var router  = express.Router();

router.get('/', (req, res) => {
	res.send('In development');
	res.status(200);
});

module.exports = router;