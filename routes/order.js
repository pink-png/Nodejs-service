const express = require("express");
const multer = require('multer');
express().use(multer().any())
let orderRouter = express.Router();

// controller模块
const User = require("../controller/user")
const Upload = require("../controller/upload")
const Thirdparty = require("../controller/Thirdparty")
const WxAPI = require("../controller/wx")
const WebSocket = require("../controller/websocket")
const Login = require('../controller/login');


// 本地自测API 
orderRouter.get('/', User.selectuser)
orderRouter.get('/updateuser/:id/', User.updateuser)
orderRouter.post('/insertuser', User.insertuser)
orderRouter.post('/uploadimg', multer().single('img'), Upload.uploadimg)

// 微信API
orderRouter.post('/wxlogin', WxAPI.wxlogin)

// 第三方API
orderRouter.post("/Sendmailbox", Thirdparty.Sendmailbox)

// jwt登录
orderRouter.post('/jwtlogin', Login.jwtlogin)


module.exports = orderRouter;