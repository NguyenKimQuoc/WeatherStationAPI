const axios = require('axios');
const db = require('../database/database');
async function getWeather(node) {
    try{
    let res = await axios.get('http://api.openweathermap.org/data/2.5/weather?lat='+String(node.latitude)+'&lon='+String(node.longitude)+'&units=metric&appid='+process.env.API_Key+'&lang=vi');
    var weatherJson = res.data;
    var weatherData  = [];
    var weather_={
        "nodeid"            : node.nodeid,
        "temp"              : Math.round(weatherJson.main.temp), // Calcius unit
        "humi"              : Math.round(weatherJson.main.humidity), // %
    };
    weatherData.push(weather_);
    //console.log(weatherData);
    return weatherData;
    }catch(err){
      console.log(err);
    }
};

async function GetandSaveData(){
    var list = await db.GetListNode();
    //console.log(list);
    var today = new Date();
    var time = today.getFullYear() + "-" +
               (today.getMonth()+1) + "-" +
               today.getDate() + " " +
               today.getHours() + ":" + 
               today.getMinutes() + ":" +
               today.getSeconds();
    console.log(time); 
    for(var i = 0; i < list.length; i++){
        getWeather(list[i]).then((results)=>db.InsertDataOpenWT(results, time));
    }
}
exports.getDataOpenweatherInterval = (intervalTime) => {
    var count = 0;
    setInterval(function(){
        var today = new Date();
        if(today.getSeconds() == 0 && today.getMinutes() == 0){
            count++;
            if(count == intervalTime){
                GetandSaveData();
                count = 0;
            }
        }
    }, 1000);
}