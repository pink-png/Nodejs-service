const Usermodel = require("../models/user")
const SECRET = require('../config/config.default').SECRET
const jwt = require('jsonwebtoken')
const RESULT = require("../utils/result")

exports.auth = async (req, res, next) => {
    try {
        // 在头部拿到加密的token
        const raw = req.headers.authorization.split(' ').pop().toString()
        // 解密
        const { id } = jwt.verify(raw, SECRET)
        // 根据解密出来的id查找用户
        const infoid = await Usermodel.findone(id)
    } catch (error) {
        RESULT.Res(res)('', 401, 'token失效,请重新登录')
    }

}
