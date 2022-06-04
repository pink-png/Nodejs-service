// 内置的工具模块
const util = require('util')

module.exports = () => {
    return (err, req, res, next) => {
        console.log('错误信息---', err.stack)
        res.status(500).json({ error: util.format(err) })
    }
}