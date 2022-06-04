const db = require("../utils/mysql");
const RESULT = require("../utils/result")
const Usermodel = require("../models/user")
const SECRET = require('../config/config.default').SECRET
const jwt = require('jsonwebtoken')

// 用户登录
exports.login = async (req, res, next) => {
    const fileds = req.body
    let { phone, password } = fileds;
    const userdata = await Usermodel.selectuser()
    // 用户存不存在
    const isrepeatphone = userdata.findIndex(item => item.phone == phone)
    if (isrepeatphone == -1) {
        RESULT.Res(res)('', 401, '用户不存在')
    } else {
        if (userdata[isrepeatphone].password == password) {
            const token = jwt.sign({
                id: userdata[isrepeatphone].id // 用户唯一的数据id
            }, SECRET)
            RESULT.Res(res)({ token: token }, 200, '登录成功')
        } else {
            RESULT.Res(res)('', 422, '密码无效')
        }
    }
}

// 用户注册
exports.register = async (req, res) => {
    const fileds = req.body
    let { username, password, nickname, phone, email } = fileds;
    for (const key in req.body) {
        if (fileds[key] == undefined || fileds[key] == '') {
            RESULT.Res(res)('', 400, key + '为空')
        }
    }
    try {
        // 验证邮箱手机号有无重复
        const userdata = await Usermodel.selectuser()
        const isrepeatphone = userdata.findIndex(item => item.phone == phone)
        const isrepeatemail = userdata.findIndex(item => item.email == email)
        if (isrepeatemail == -1 && isrepeatphone == -1) {
            const insertdata = await Usermodel.insertuser(username, password, nickname, phone, email)
            RESULT.Res(res)('', 200, '注册成功')
        } else {
            if (isrepeatphone != -1) {
                const text1 = '手机号重复'
                RESULT.Res(res)('', 400, text1)
            }
            if (isrepeatemail != -1) {
                const text2 = '邮箱重复'
                RESULT.Res(res)('', 400, text2)
            }
        }
    } catch (error) {
        RESULT.Res(res)('', 500, '服务器错误')
    }
}

// 验证登录
exports.profile = async (req, res) => {

    try {
        // 在头部拿到加密的token
        const raw = req.headers.authorization.split(' ').pop().toString()
        // 解密
        console.log('12121212', jwt.verify(raw, SECRET))
        const { id } = jwt.verify(raw, SECRET)

        // 根据解密出来的id查找用户
        const infoid = await Usermodel.findone(id)
        RESULT.Res(res)(infoid, 200, '成功')
    } catch (error) {
        RESULT.Res(res)('', 401, 'token失效,请重新登录')
    }
}

// 列表返回
exports.swiperlist = async (req, res) => {
    try {
        const list = [1, 2, 3, 4, 5]
        RESULT.Res(res)(list, 200, '成功')
    } catch (error) {
        // next(error)
    }
}

// 更新用户
exports.updateuser = async (req, res) => {
    const { id } = req.params;
    const updateSql = `UPDATE dl_user SET nickname = "gsq" where id = ${id}`
    const result = db.exec(updateSql);
    await result.then(result => {
        console.log('结果:', result)
        res.send(RESULT.r200(200, result, 'success'))
    }, err => {
        res.send(RESULT.r500())
    })
}




