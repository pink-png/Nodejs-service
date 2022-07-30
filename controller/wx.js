const db = require("../utils/mysql");
const RESULT = require("../utils/result")
const request = require('request');
const { appid, appSecret } = require("../config/config.default")

const setcode = (code) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`,
            method: "get",
            headers: { "content-type": "application/json" }
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                resolve(1)
            } else { resolve(2) }
        });
    })
}

// 微信授权登录
exports.wxlogin = async (req, res) => {

    let { code } = req.body
    const res = await setcode(code)
    if (res == 1) {
        RESULT.Res(res)('', 200, '成功')
    }

}
