var express = require('express');
var router = express.Router();
const userModel = require('../models/user');

/* 注册 */
router.post('/signup', (req, res, next) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    req.body.email && (user.email = req.body.email);

    if (user.username.length === 0 || user.password.length === 0) {
	  		return res.send({
					message: '用户名或密码不能为空'
				});
    }

    userModel.find({username: user.username}, (err, result) => {
    	if(err) return console.log(err);
	    if(result.length) {
					res.send({
						message: '该用户已经存在'
					});
	    }else {
		    userModel.create(user, (err, result) => {
		        if(err) return console.log(err);
		        res.send(result);
		    });
	    }
    });
});

/* 登录 */
router.post('/login', function(req, res, next) {
	console.log(req.body.username,req.body.password);
  res.send({
		user: req.body.username
  });
});

module.exports = router;
