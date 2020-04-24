const express = require('express');

const dotenvn = require('dotenv').config();
const http = require('http');
const app = express();
const server = http.createServer(app);
var multer = require('multer');
var upload = multer();
var appPort = 8000;
app.set("view engine", "ejs");
app.set("views","./views");
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
let routes = require('./api/routes'); // importing route
app.use('/', routes);
//Get dataweather from Openweather
var openweather = require('./utils/openweather');
openweather.getDataOpenweatherInterval(1); // get data every 1 hour
server.listen(appPort, ()=> {
	console.log(`server listening at port ${appPort}`);
});
