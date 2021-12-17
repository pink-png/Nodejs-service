const express = require("express");
const server = express();
const path = require("path")
const Buffer = require("buffer")
const Stream = require("stream")
const fs = require('fs')

const cors = require("cors");
const multer = require('multer');

// 导入自定义中间件
const GSQjwtmiddleware = require('./middleware/AuthJwt')
// console.log(111,GSQjwtmiddleware)

// controller模块
const User = require("./controller/user")
const Upload = require("./controller/upload")
const Thirdparty = require("./controller/Thirdparty")
const WxAPI = require("./controller/wx")
const WebSocket = require("./controller/websocket")
const Login = require('./controller/login')


// 中间件
server.use(cors());
server.use(multer().any())
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(express.static(__dirname));
// server.use(GSQjwtmiddleware)

//和图片相关的是req.file 
server.use('/public', express.static(path.join(__dirname, './public/images')))

//设置跨域访问
server.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



// 开启websocket
// WebSocket.webdemo()

// process中的事件模块设置
const stream = require("./core/stream")
stream.exit() //监听系统退出
stream.uncaughtException() // uncaughtException
stream.SIGINT()  // 信号(触发某个按键)相关事件


// 子线程
// const child1 = require("./child_process/child_process_1")
// child1.child1()

// 本地自测API 
server.get('/', User.selecttpadmim)
server.get('/updateuser/:id/', User.updateuser)
server.post('/insertuser', User.insertuser)
server.get('/text', User.text11)
server.post('/uploadimg', multer().single('img'), Upload.uploadimg)

// 微信API
server.post('/wxlogin', WxAPI.wxlogin)

// 第三方API
server.post("/Sendmailbox", Thirdparty.Sendmailbox)

// jwt登录
server.post('/jwtlogin', Login.jwtlogin)


server.listen(8080, () => {
    console.log("启动服务8080完毕!");
    // process.title = '测试进程 Node.js' // 进程进行命名
    // console.log(`process.pid: `, process.pid); // process.pid: 19556  //每次都会改变
    // console.log(`当前环境:`,process.env.NODE_ENV)
    // console.log('winnodejs.pid:',process.ppid)  //当前进程的父亲进程 大概是计算中中的node服务
    // console.log('获取当前进程工作目录:',process.cwd())
    // console.log('获取当前进程运行的操作系统平台',process.platform)
})


