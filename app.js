const express = require('express')
const path = require('path');
const cors=require('cors')
const bodyParser = require('body-parser');
const app = express()

//导入cors
app.use(cors())


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 连接MySQL数据库
const db = require("./handle/connection")
const connection = db.connection
db.startConnection()

// 提供静态文件服务
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// 注册路由
const router = require("./routes/img")
app.use('/img', router)

// 启动服务器
app.listen(8080, () => {
    console.log("server running at http://127.0.0.1:8080")
})
