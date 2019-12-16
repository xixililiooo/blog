var mysql=require('mysql');
var express=require('express');
var router=express.Router();
var connection=require('../db/mysql');
var tixingmsg;
router.use(function(req,res,next){
	tixingmsg={
		code:0,
		message:""
	}
	next();
});

router.post('/user/register',function(req,res,next){
	var username=req.body.username;
	var password=req.body.password;
	var repassword=req.body.repassword;
	var isregister=false;
	var queryinfo=`select * from boke_userinfo where username='${username}'`;
	if(username==''){
		tixingmsg.code=1;
		tixingmsg.message='用户名不能为空';
		res.json(tixingmsg);
		return;
	}
	if(password==''){
		tixingmsg.code=2;
		tixingmsg.message='密码不能为空';
		res.json(tixingmsg);
		return;
	}
	if(password!=repassword){
		tixingmsg.code=3;
		tixingmsg.message='两次输入的密码不一致';
		res.json(tixingmsg);
		return;
	}
	connection.query(queryinfo,function(err,result){
		console.log(result.length);
		if(err){
			res.send(err);
		}
		if(result.length!=0){
			isregister=true;
				
		}
	if(isregister){
		tixingmsg.code=5;
		tixingmsg.message='该用户名已经注册';
		res.json(tixingmsg);
	}
	if(!isregister){
	tixingmsg.code=4;
	tixingmsg.message='注册成功';
	res.json(tixingmsg);
	var chucundata=`Insert into boke_userinfo(password,username) values('${password}','${username}')`;
	connection.query(chucundata,function(err,result){
		console.log(result);
	})
	}	
	})

	
	
	
});
router.post('/user/login',function(req,res,next){
	var username=req.body.username;
	var password=req.body.password;
	if(username==''||password==''){
		tixingmsg.code=1
		tixingmsg.message='用户名或者密码不能为空';
		res.json(tixingmsg);
		return;
	}
	var chaxun=`select * from boke_userinfo where username='${username}'&&password='${password}'`;
	connection.query(chaxun,function(err,result){
		if(result.length!=0){
			tixingmsg.code=6;
			tixingmsg.message='登录成功';
			tixingmsg.userInfo={
				username:username
			};
			req.cookies.set('userInfo',JSON.stringify({
				username:username
			}));
			res.json(tixingmsg);
		}
		else{
			tixingmsg.code=7;
			tixingmsg.message='用户名或者密码不正确';
			res.json(tixingmsg);
		}
	})
})
router.get('/user/logout',function(req,res,next){
	req.cookies.set('userInfo',null);
	tixingmsg.code=7;
	tixingmsg.message='退出成功';
	res.json(tixingmsg);
})
module.exports=router;
