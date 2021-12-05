const RESULT = require("../core/result")
const JWT = require('../utils/jwt')

// jwt验证方式的登录
module.exports.jwtlogin = (req, res) => {
    console.log('jwt', JWT)

    const payload = {
        uuid: '3455445-acuya7skeasd-iue7',
        phone: 133409899625,
    };
    const token = JWT.generate(payload, '12s');
    const info = JWT.verify(token);
    console.log('token', token);
    console.log('info', info);


    // setTimeout(() => { 
    //     console.log('检验过期token');
    //     const info2 = JWT.verify(token);
    //     console.log(info2); // false
    // }, 13000);

    res.send(RESULT.r200(200, '', 'success'))

}
