
const JWT = require('../utils/jwt')
const RESULT = require("../core/result")
module.exports = (req, res, next) => {

    console.log("拿到数据", req.headers)

    let { authorization } = req.headers

    const token = authorization.replace('Bearer ', '');
    const info = JWT.verify(token);
    console.log('info',info)
    
    if (info) {
        res.send(RESULT.r200(200, 'success', 'success'))
    } else {
        res.send(RESULT.r500())
    }
    next()
}
