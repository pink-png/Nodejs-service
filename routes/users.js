const express = require("express");
const multer = require('multer');
express().use(multer().any())
let usersRouter = express.Router();

// controller模块
const User = require("../controller/user")
const Upload = require("../controller/upload")
const Thirdparty = require("../controller/Thirdparty")
const WxAPI = require("../controller/wx")
const WebSocket = require("../controller/websocket")
const Login = require('../controller/login');

// 本地自测API 
usersRouter.get('/hhh', User.hhh)
usersRouter.get('/', User.selectuser)
usersRouter.get('/updateuser/:id/', User.updateuser)
usersRouter.post('/insertuser', User.insertuser)
usersRouter.post('/uploadimg', multer().single('img'), Upload.uploadimg)

// 微信API
usersRouter.post('/wxlogin', WxAPI.wxlogin)

// 第三方API
usersRouter.post("/Sendmailbox", Thirdparty.Sendmailbox)

// jwt登录
usersRouter.post('/jwtlogin', Login.jwtlogin)


module.exports = usersRouter;