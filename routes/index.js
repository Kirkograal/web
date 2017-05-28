const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
	res.send('Site is in development');
	res.status(200);
});

module.exports = router;