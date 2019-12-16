var express=require('express');
var router=express.Router();
var connection=require('../db/mysql');
router.use(function(req,res,next){
	if(!req.userInfo.isAdmin){
		res.send('shibai');
		return;
	}
	next();
})

router.get('/',function(req,res,next){
	
	res.render('admin/index',{
		userInfo:req.userInfo
		
	});
})
router.get('/user',function(req,res,next){
	var page=Number(req.query.page||1);
	var skip=2;
	
	var count1='select count(*) as count from boke_userinfo';
	connection.query(count1,function(err,count){
		
		var pages=Math.ceil(count[0].count/skip);
		page=Math.min(page,pages);
		page=Math.max(page,1);
		var begin=(page-1)*skip;
		var select=`select * from boke_userinfo limit ${begin},${skip}`;
		connection.query(select,function(err,result){
			
			res.render('admin/user_index',{
				userInfo:req.userInfo,
				users:result,
				page:page,
				pages:pages,
				limit:skip,
				count:count[0].count
			})
		});
	})
	
	
})
router.get('/category',function(req,res,next){
	var page=Number(req.query.page||1);
	var skip=2;
	
	var count1='select count(*) as count from fenleitable';
	connection.query(count1,function(err,count){
		
		var pages=Math.ceil(count[0].count/skip);
		page=Math.min(page,pages);
		page=Math.max(page,1);
		var begin=(page-1)*skip;
		var select=`select * from fenleitable order by _id desc limit ${begin},${skip}`;
		connection.query(select,function(err,categories){
			
			res.render('admin/category_index',{
				userInfo:req.userInfo,
				categories:categories,
				page:page,
				pages:pages,
				limit:skip,
				count:count[0].count
			})
		});
	})
	
})
router.get('/category/add',function(req,res,next){
	res.render('admin/category_add',{
		userInfo:req.userInfo
	})
})
router.post('/category/add',function(req,res,next){
	var name=req.body.name||'';
	if(name==''){
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:'名称不能为空'
		});
		return;
	}
	var selectfenlei=`select * from fenleitable where name='${name}'`;
	connection.query(selectfenlei,function(err,resultfenlei){
		if(resultfenlei.length==0){
			var insertfenlei=`insert into fenleitable(name) values('${name}')`;
			connection.query(insertfenlei,function(err,result){
				res.render('admin/success',{
					userInfo:req.userInfo,
					message:"保存成功",
					url:'/admin/category'
				})
			})
		}else{
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:"您输入的分类名称已经存在"
			})
		}
	})
})
router.get('/category/edit',function(req,res,next){
	var id=req.query.id||'';
	var findfenlei=`select * from fenleitable where _id='${id}'`;
	connection.query(findfenlei,function(err,category){
		if(category.length==0){
			res.render('admin/error',{
				userInfo:userInfo,
				message:"不存在这个分类"
			})
		}else{
			console.log(category);
			res.render('admin/category_edit',{
				userInfo:req.userInfo,
				category:category[0]
			});
		}
	})
	
})
router.post('/category/edit',function(req,res,next){
	var id=parseInt(req.query.id)||'';
	var name=req.body.name||'';
	var findid=`select * from fenleitable where _id!='${id}'&&name='${name}'`;
	connection.query(findid,function(err,result){
		console.log(result);
		if(result.length!=0){
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:"你输入的分类名称已经存在"
			})
		}else{
			console.log(typeof(id));
			console.log(name);
			
			var updatefenlei=`Update fenleitable set name='${name}' where _id='${id}' `;
// 			var userModSql = 'UPDATE fenleitable SET name = ? WHERE id = ?';
// 
// var userModSql_Params = ['${name}',1];
			connection.query(updatefenlei,function(err,result){
				
				res.render('admin/success',{
					userInfo:req.userInfo,
					message:'修改成功',
					url:"/admin/category"
				})
			})
		}
	})
	
})
router.get('/category/delete',function(req,res,next){
	var id=parseInt(req.query.id)||'';
	var deletefenlei=`delete from fenleitable where _id='${id}'`;
	connection.query(deletefenlei,function(err,result){
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'删除成功',
			url:'/admin/category'
		})
	})
})
router.get('/content',function(req,res,next){
	var page=Number(req.query.page||1);
	var skip=2;
	
	var count1='select count(*) as count from contenttable';
	connection.query(count1,function(err,count){
		
		var pages=Math.ceil(count[0].count/skip);
		page=Math.min(page,pages);
		page=Math.max(page,1);
		var begin=(page-1)*skip;
		// var select=`select * from contenttable order by categroy desc limit ${begin},${skip}`;
		var select=`select contenttable.*,fenleitable.name,boke_userinfo.username from contenttable,fenleitable,boke_userinfo where _id=category&&user=username order by addtime desc limit ${begin},${skip}`;
		connection.query(select,function(err,contents){
			if(err){
				console.log(err);
			}
			else{
				console.log(contents)
				res.render('admin/content_index',{
					userInfo:req.userInfo,
					contents:contents,
					page:page,
					pages:pages,
					limit:skip,
					count:count[0].count
				})
			}
			
		});
	})
	
})
router.get('/content/add',function(req,res,next){
	var selectcontent=`select * from fenleitable`;
	connection.query(selectcontent,function(err,categories){
			res.render('admin/content_add',{
				userInfo:req.userInfo,
				categories:categories
			})	
	})
})
router.post('/content/add',function(req,res,next){
	if(req.body.content==''||req.body.title==''){
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"输入的标题或者内容不可为空",
			url:'/admin/content'
		})
	}
	else{
		console.log(req.body);
		var category1=parseInt(req.body.category);
		var title1=req.body.title;
		var content1=req.body.content;
		var description1=req.body.description;
		var username=req.userInfo.username;
		var date=new Date();
		console.log(date);
		var insert=`Insert into contenttable(title,content,description,category,user) values('${title1}','${content1}','${description1}','${category1}','${username}')`;
		var select=`select * from contenttable`;
		connection.query(insert,function(err,result){
			if(err){
				console.log(err);
			}
			else{
				console.log(result);
				res.render('admin/success',{
					userInfo:req.userInfo,
					message:"提交成功",
					url:"/admin/content"
				})
			}
			
		})
	}
	
})
router.get('/content/edit',function(req,res,next){
	var category=req.query.id||'';
	var _categories=[];
	console.log(category);
	var selectfenlei=`select * from fenleitable`;
	connection.query(selectfenlei,function(err,categories){
		_categories=categories;
	})
	var selectcontent=`select * from contenttable where category='${category}'`;
	connection.query(selectcontent,function(err,content){
		if(err){
			console.log(err);
		}else{
			console.log(content);
			res.render('admin/content_edit',{
				userInfo:req.userInfo,
				content:content[0],
				categories:_categories
			})
		}
			
	})
	
})
router.post('/content/edit',function(req,res,next){
	var category1=parseInt(req.body.category);
	var title1=req.body.title;
	var content1=req.body.content;
	var description1=req.body.description;
	if(title1==''||content1==''||description1==''){
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:'输入的标题,描述或者内容不能为空'
		})
	}
	else{
		console.log(req.body);
		var update=`Update contenttable set title='${title1}',content='${content1}',description='${description1}',category='${category1}'`;
		connection.query(update,function(err,result){
			res.render('admin/success',{
				userInfo:req.userInfo,
				message:'修改成功',
				url:'/admin/content'
			})
		})
	}
	
})
router.get('/content/delete',function(req,res,next){
	var id=parseInt(req.query.id)||'';
	var title=req.query.title||'';
	console.log(`${title}`);
	var deletecontent=`Delete from contenttable where category='${id}' && title=${title} `;
	connection.query(deletecontent,function(err,result){
		if(err){
			console.log(err)
		}
		else{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:'删除成功',
			url:"/admin/content"
		})	
		}
		
	})
})

module.exports=router;