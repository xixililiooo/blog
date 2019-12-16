var mysql=require('mysql');
var connection=mysql.createConnection({
	host:'localhost',
	user:"root",
	password:"9i659259",
	port:'3306',
	database:"boke",
	useConnectionPooling: true
})

connection.connect(function(){
	console.log('连接成功');	
});
module.exports=connection;
