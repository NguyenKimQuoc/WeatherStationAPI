const router = require('express').Router();
const db = require('../database/database');
router.get('/', function(req, res){
    //res.send('select node');
    res.render('weather_graph'); // Select node view
})
router.post('/getnodes', async function(req, res){
    var listnode = await db.GetListNode();
    res.send(JSON.stringify(listnode));
})
router.post('/getdatarealnode', async function(req, res){
    var realdata = await db.GetLastDataNode(req.body.nodeid, req.body.nData);
    res.send(JSON.stringify(realdata));
})
router.post('/getdataopenweather', async function(req, res){
    console.log(req.body.nodeid);
    console.log(req.body.nData);
    var dataopenWT = await db.GetLastDataOpenWT(req.body.nodeid, req.body.nData);
    res.send(JSON.stringify(dataopenWT));
})
router.post('/getdatanodebydate', async function(req, res){
    var dataopenWT = await db.GetDataNodeByDate(req.body.nodeid, req.body.date);
    res.send(JSON.stringify(dataopenWT));
})
router.post('/getdataopenweatherbydate', async function(req, res){
    var dataopenWT = await db.GetDataOpenWTByDate(req.body.nodeid, req.body.date);
    res.send(JSON.stringify(dataopenWT));
})
router.post('/adddatarealnode', async function(req, res){
    try{
        var today = new Date();
        var time =  today.getFullYear() + "-" +
                    (today.getMonth()+1) + "-" +
                    today.getDate() + " " +
                    today.getHours() + ":" + 
                    today.getMinutes() + ":" +
                    today.getSeconds();
        console.log(req.body.nodeid);
        console.log(JSON.parse(req.body.data));
        await db.InsertDataNode(req.body.nodeid, JSON.parse(req.body.data), time);
        res.send("-OK");
    }catch(err){
        console.log(err);
        res.send("NOT-OK");
    }
})
module.exports = router;