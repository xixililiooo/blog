var express=require('express');
var connection=require('../db/mysql');
var router=express.Router();
var data;
router.use(function(req,res,next){
	data={
		userInfo:req.userInfo,
		categories:[]
	}
	var select=`select * from fenleitable`;
	connection.query(select,function(err,categories){
		if(err){
			console.log(err);
		}
		else{
	
			data.categories=categories;
			next();
		}
	})
	
})
router.get('/',function(req,res,next){
	
		data.page=Number(req.query.page||1);
		data.limit=2;
		 data.pages=0;
		 data.category=req.query.category||'';
		 data.contents=[];
		 data.count=0;

	
			if(data.category){
				var count1=`select count(*) as count from contenttable  where category='${data.category}'`;
			}
			else{
				var count1=`select count(*) as count from contenttable`;
			}
			connection.query(count1,function(err,count){
				if(err){
					console.log(err);
				}
				else{
					console.log(count);
					data.count=count[0].count;
					data.pages=Math.ceil(data.count/data.limit);
					data.page=Math.min(data.page,data.pages);
					data.page=Math.max(data.page,1);
					var skip=(data.page-1)*data.limit;
					
					if(data.category){
						var selectcontent=`select * from contenttable  where category='${data.category}' order by addtime desc limit ${skip},${data.limit} `;
					}
					else{
						var selectcontent=`select * from contenttable order by addtime desc limit ${skip},${data.limit} `;
					}
					
					connection.query(selectcontent,function(err,contents){
						if(err){
							console.log(err);
						}
						else{
					data.contents=contents;
					// var countcomments=`select count(*) as count from comment where id='${data.category}'`;
// 					connection.query(countcomments,function(err,commentcount){
// 						if(err){
// 							console.log(err);
// 						}
// 						else{
							// console.log(commentcount);
							res.render('showpage/index',data);	
						// }
					// })
						
						}
					
					})
				}
			
			})
		
		
	})
	

router.get('/view',function(req,res,next){
	data.page=req.query.page||1;
	data.limit=3;
	data.category=Number(req.query.contentid)||'';
	var contentid=req.query.contentid||'';
	var select=`select * from contenttable where id='${contentid}'`;
	connection.query(select,function(err,content){
		if(err){
			console.log(err);
		}
		else{
			console.log(content);
			data.content=content[0];
			// var data_content=content[0];
			content[0].readcount+=1;
			var selectcount=`Update contenttable set readcount='${content[0].readcount}' where id='${contentid}'`;
 			connection.query(selectcount,function(err,result){
				if(err){
							console.log(err);
				}
				else{	
					var count_comment=`select count(*) as count from comment where id='${contentid}'`;
					connection.query(count_comment,function(err,countcomment){
						if(err){
							console.log(err);
						}
						else{
							
							data.commentcount=countcomment[0].count;
							data.pages=Math.ceil(data.commentcount/data.limit);
							data.page=Math.min(data.page,data.pages);
							data.page=Math.max(data.page,1);
							var skip=(data.page-1)*data.limit;
							console.log(`${data.pages} ${data.page} ${skip}`);
							var selectcomment=`select * from comment where id="${contentid}" order by time desc limit ${skip},${data.limit}`;
							connection.query(selectcomment,function(err,comments){
								if(err){
									console.log(err);
							}
							else{
								
								data.comments=comments;
								console.log(data.comments.length);
								res.render('showpage/view',data);
							}
								
							})
							
						}
						
					})
						
 				}
			})
			
		}
	})
	
})
router.post('/comment/post',function(req,res,next){
	// console.log(req.body);
	var contentid=req.body.contentid;

		username=req.userInfo.username;
		
		content=req.body.content;
// 	if(content==''){
// 	res.render('admin/error',{
// 		message:'输入的评论不能为空',
// 		url:'/comment'
// 	})
// }
// else{
	var insertcomment=`insert into comment (id,username,content) values('${contentid}','${username}','${content}')`;
	connection.query(insertcomment,function(err,comments){
		if(err){
			console.log(err);
		}
		else{
			var count_comment=`select count(*) as count from comment where id='${contentid}'`;
			connection.query(count_comment,function(err,countcomment){
				if(err){
					console.log(err);
				}
				else{
					console.log(countcomment);
					data.commentcount=countcomment[0].count;
					res.render('showpage/view',data);
				}
				
			})
		}
	})
// }
	
})
// router.get('/comment',function(req,res,next){
// 	var contentid=req.body.contentid;
// 	var selectcomment=`select * from comment where id='${contentid}'`;
// 	connection.query(selectcomment,function(err,comment){
// 		res.render('showpage/view')
// 	})
// 	
// })
// router.get('/comment',function(req,res,next){
// 	
// })
module.exports=router;