var express=require('express');
var app=express();
app.get('/api/demo',(req,res)=>{
	res.send('跨域成功');
})
app.listen(8088,function(){
	console.log('链接成功');
})