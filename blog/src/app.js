var express=require('express');
var	swig=require('swig');  //引入引擎模板
var bodyParser=require('body-parser');
var Cookies=require('cookies');
var connection=require('./db/mysql');
var app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use('/public',express.static(__dirname+'/public'));
app.use(function(req,res,next){  //请求拦截器
	req.cookies=new Cookies(req,res);
	req.userInfo={};
	if(req.cookies.get('userInfo')){  //对于没有cookie的请求，也就是没有登陆的时候，就拦截下来
		try{
			req.userInfo=JSON.parse(req.cookies.get('userInfo'));
			var select=`select isAdmin from boke_userinfo where username='${req.userInfo.username}'`;
			connection.query(select,function(err,result){
				result.forEach((item)=>{
					req.userInfo.isAdmin=Boolean(item.isAdmin);
					console.log(req.userInfo);
				})
				next();
			})
			
		}catch(e){
			next();
		}
	}
	else{
	next();	
	}

	
	
	
})
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
swig.setDefaults({cache:false});
app.use('/',require('./routes/main'));
app.use('/api',require('./routes/api'));
app.use('/admin',require('./routes/admin'));
app.listen(8081);