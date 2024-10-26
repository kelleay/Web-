const db = require("./connection");
const connection = db.connection;


function queryByTime(req, res){
    const time = req.body.time
    const sql = `select img_path from image where time like '${time}%'`
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('查询数据库失败:', err);
            return res.status(500).send({ error: '查询失败' });
        }
        else {
            res.send(results);
        }
    });
}

function queryByLocation(req, res){
    const location = req.body.location
    const sql = `select img_path from image where location like '%${location}%'`
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('查询数据库失败:', err);
            return res.status(500).send({ error: '查询失败' });
        }
        else {
            res.send(results);
        }
    });
}

function queryByLocationAndTime(req, res){
    const location = req.body.location
    const time = req.body.time
    const sql = `select img_path from image where location like '%${location}%' and time like '${time}%'`
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('查询数据库失败:', err);
            return res.status(500).send({ error: '查询失败' });
        }
        else {
            res.send(results);
        }
    });
}

function queryAll(req, res){
    const sql = `select img_path from image where 1=1`
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('查询数据库失败:', err);
            return res.status(500).send({ error: '查询失败' });
        }
        else {
            res.send(results);
        }
    });
}


module.exports = {
    queryByTime,
    queryByLocation,
    queryByLocationAndTime,
    queryAll
}