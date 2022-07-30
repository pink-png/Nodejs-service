const express = require("express");
const usersRouter = express.Router();
const User = require("../controller/user")
const anth = require("../middleware/AuthJwt").auth


// 用户登录
usersRouter.post('/login', User.login)
// 用户注册
usersRouter.post('/register', User.register)
// 验证登录
usersRouter.get('/profile', User.profile)
// 列表返回
usersRouter.get('/swiperlist', anth, User.swiperlist)

usersRouter.get('/imgaaa', User.imgaaa)

module.exports = usersRouter;