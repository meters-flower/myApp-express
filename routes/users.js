var express = require('express');
var router = express.Router();
var crypto = require('crypto');  //用来生成散列值来加密密码
const userModel = require('../models/user');

/* 注册 */
router.post('/signup', (req, res, next) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    req.body.email && (user.email = req.body.email);

    if (!user.username || !user.password) {
	  		return res.send({
					message: '用户名或密码不能为空'
				});
    }

    userModel.find({username: user.username}, (err, result) => {
    	if(err) return console.log(err);
    	let curUser = result[0];
	    if(!curUser) {
		    var md5 = crypto.createHash('md5');//生成密码的md5值
		    user.password = md5.update(user.password).digest('hex');

		    userModel.create(user, (err, result) => {
		        if(err) return console.log(err);
		        res.send(result);
		    });
	    }else {
					res.send({
						message: '该用户已经存在'
					});
	    }
    });
});

/* 登录 */
router.post('/login', function(req, res, next) {
  let user = {
    username: req.body.username,
    password: req.body.password
  }	

  if (!user.username || !user.password) {
  		return res.send({
				message: '用户名或密码不能为空'
			});
  }  

  userModel.find({username: user.username}, (err, result) => {
  	if(err) return console.log(err);
  	let curUser = result[0];
  	if(!curUser) return res.send({message: '用户不存在'});

	  var md5 = crypto.createHash('md5');
	  user.password = md5.update(user.password).digest('hex');

    //检查密码是否一致
    if(user.password !== curUser.password) return res.send({message:'密码错误'});

    //用户名密码都匹配后，将用户信息存入session
    req.session.user = curUser; 
    res.send(curUser);	     	
  }); 
});

/* 退出 */
router.get('/logout/:username', function(req, res, next) {
  console.log(req.params.username);
	req.session.user = null;
	res.send({'message': '退出成功'});
});

module.exports = router;
