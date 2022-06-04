const db = require("../utils/mysql");
const RESULT = require("../utils/result")
const request = require('request');

// 微信授权登录
module.exports.wxlogin = (req, res) => {

    const appid = require("../config").appid
    const appSecret = require("../config").appSecret
    let { code } = req.body
    console.log('code', code)

    request({
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`,
        method: "get",
        headers: {
            "content-type": "application/json",
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 请求成功的处理逻辑
        }
    });

    res.send('21212344444')
}
