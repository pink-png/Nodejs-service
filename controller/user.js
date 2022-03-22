const db = require("../core/mysql");
const RESULT = require("../core/result")

// 添加新的用户
module.exports.insertuser = async (req, res) => {
    let { username, password, nickname, phone } = req.body;

    //判断有无传过来
    if (username == undefined || password == undefined || nickname == undefined || phone == undefined) {
        res.send('某些参数没有没传')
        return
    }
    // 判断有无重复注册
    let selectuser = 'SELECT * FROM dl_user'
    await db.exec(selectuser).then(result => {
        // console.log('查询user表成功', result)
        let phonemap = result.map(item => {
            return item.phone
        })

        if (phonemap.includes(phone)) {
            res.send(RESULT.r200(900, '', '存在重复phone,添加失败'))
            return
        }
    }, err => {
        console.log('查询user表失败', err)
        res.send(RESULT.r500())
    })
    // 添加数据的时候 格式为 'XXX' 需要加引号
    const insertSql = `INSERT INTO dl_user (username, password, nickname, phone, type) VALUES 
    ('${username}', ${password}, '${nickname}', '${phone}','${type}')`
    let result = db.exec(insertSql);
    await result.then(result => {
        // console.log('结果:', result)
        res.send(RESULT.r200(200, result, 'success'))
    }, err => {
        console.log('失败:', err)
        res.send(RESULT.r500())
    })
}

// 更新用户
module.exports.updateuser = async (req, res) => {
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

// 查询user表的数据
module.exports.selectuser = async (req, res) => {
    console.log(req.url) //亲求地址
    console.log(req.method) //请求方法
    console.log(req.headers) // 请求头
    console.log('请求参数', req.query)
    const insertSql = 'SELECT * FROM dl_user'
    const result = db.exec(insertSql);
    await result.then(result => {
        console.log('结果:', result)
        res.send(RESULT.r200(200, result, 'success'))
        // res.status(200).send(result)
    }, err => {
        res.send(RESULT.r500())
    })
}

module.exports.hhh = (req, res, next) => {
    try {
        // console.log(aa)
        // let aa = 1
        res.send(RESULT.r200(200, [{ name: 1 }], 'success'))
    } catch (error) {
        next(error)
    }


}


