var express = require('express');
var router = express.Router();
const userModel = require('../models/user');

/* 登录 */
router.post('/login', function(req, res, next) {
	console.log(req.body.username,req.body.password);
  res.send({
		user: req.body.username
  });
});

module.exports = router;
