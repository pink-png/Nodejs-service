const express = require("express");
const usersRouter = express.Router();
const User = require("../controller/user")

// 用户登录
usersRouter.get('/login', User.login)
// 用户注册
usersRouter.get('/register', User.register)
// 获取当前登录用户
usersRouter.get('/getCurentUser', User.getCurentUser)
// 更新当前登录用户
usersRouter.get('/updateCurentUser', User.updateCurentUser)

module.exports = usersRouter;