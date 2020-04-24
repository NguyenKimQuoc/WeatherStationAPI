const mysql = require('mysql');
const dotenvn = require('dotenv').config();
var con = mysql.createConnection({
    host: "localhost",
    user: process.env.UserDB,
    password: process.env.PassDB,
    database: "weatherdb"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected database success!")
  });
// data of nodes
exports.AddNode = function(data){
  return new Promise (function(resolve, reject){
    var sql = "insert into nodes values ('"+data.nodeid+"', '"+data.nodename+"', '"+data.location+"','"+data.latitude+"','"+data.longitude+"');";
    con.query(sql, function(err, result){
      if (err) reject(err);
      console.log("1 data inserted");
			resolve(true);
    })
  })
}
exports.GetListNode = function () {
	return new Promise (function (resolve, reject) {
		con.query("select * from nodes;", function(err, rows, fields) {
			if (err) reject(err);
			else resolve(rows);
		});
	});
}
exports.GetCoordinate = function(nodeid){
  return new Promise (function(resolve, reject){
    var sql = "Select latitude, longitude from nodes where nodeid = '"+nodeid+"';";
    con.query(sql, function(err, result, fields){
      if (err) reject(err);
      //console.log("1 data get");
			resolve(result);
    })
  })
}
exports.CountNode = function(){
  return new Promise(function(resolve, reject){
    con.query("select COUNT(*) as total from nodes;", function(err, result){
      if (err) reject(err);
      else
        resolve(result[0].total);
    })
  })
}
// real data from node
exports.GetLastDataNode = function (nodeid, amount) {
	return new Promise (function (resolve, reject) {
		con.query("select * from realnodedata where nodeid='"+nodeid+"' order by timeget desc limit "+amount+";", function(err, rows, fields) {
			if (err) reject(err);
			else resolve(rows);
		});
	});
}
exports.GetDataNodeByDate = function (nodeid, date) {
	return new Promise (function (resolve, reject) {
		con.query("select * from realnodedata where nodeid ='"+nodeid+"' and date(timeget) = '"+date+"';", function(err, rows, fields) {
			if (err) reject(err);
			else resolve(rows);
		});
	});
}


exports.InsertDataNode = function (nodeid, data, timeget) {
	return new Promise (function (resolve, reject) {
		con.query("insert into realnodedata (nodeid, humi, temp, dusty, co2, timeget) values ('"+nodeid+"', "+data.humi+", "+data.temp+", "+data.dusty+", "+data.co2+", '"+timeget+"');", function(err, result) { 
      if (err) reject(err);
      else{
        console.log('node inserted');
        resolve(true);
      }
		});
	});
};
// SQL for tabel openweatherdata
exports.InsertDataOpenWT = function(data, timeget){
  return new Promise (function (resolve, reject) {
    var sql = "insert into openweatherdata (nodeid, humi, temp, timeget) values ('"+data[0].nodeid+"','"+data[0].humi+"','"+data[0].temp+"','"+timeget+"');";
    con.query(sql, function(err, result) {
      if (err) reject(err);
      else{
        console.log("1 data inserted");
        resolve(true);
      }
		});
	});
}
exports.GetLastDataOpenWT = function(nodeid, amount){
  return new Promise (function (resolve, reject) {
    var sql = "select * from openweatherdata where nodeid='"+nodeid+"' order by timeget desc limit "+amount+";";
		con.query(sql, function(err, result, fields) {
      if (err) reject(err);
      else{
        console.log("1 data openweather get");
        console.log(result);
        resolve(result);
      }
		});
	});
}
exports.GetDataOpenWTByDate = function (nodeid, date) {
	return new Promise (function (resolve, reject) {
		con.query("select * from openweatherdata where nodeid ='"+nodeid+"' and date(timeget) = '"+date+"';", function(err, rows, fields) {
			if (err) reject(err);
			else resolve(rows);
		});
	});
}
