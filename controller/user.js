const db = require("../core/mysql");
const RESULT = require("../core/result")

// 添加新的用户
module.exports.insertuser = async (req, res) => {
    let { username, password, nickname, email } = req.body;

    //判断有无传过来
    if (username == undefined || password == undefined || nickname == undefined || email == undefined) {
        res.send('某些参数没有没传')
        return
    }

    // 判断有无重复注册
    let selectuser = 'SELECT * FROM tp_admin'
    await db.exec(selectuser).then(result => {
        // console.log('查询user表成功', result)
        let nicknamemap = result.map(item => {
            return item.nickname
        })

        if (nicknamemap.includes(nickname)) {
            res.send(RESULT.r200(900, '', '存在重复nickname,添加失败'))
            return
        }

        let emailmap = result.map(item => {
            return item.email
        })

        if (emailmap.includes(email)) {
            res.send(RESULT.r200(900, '', '存在重复邮箱,添加失败'))
            return
        }
    }, err => {
        console.log('查询user表失败', err)
        res.send(RESULT.r500())
    })
    // 添加数据的时候 格式为 'XXX' 需要加引号
    const insertSql = `INSERT INTO tp_admin (username, password, nickname, email) VALUES ('${username}', ${password}, '${nickname}', '${email}')`
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
    const updateSql = `UPDATE tp_admin SET nickname = "gsq" where id = ${id}`
    const result = db.exec(updateSql);
    await result.then(result => {
        console.log('结果:', result)
        res.send(RESULT.r200(200, result, 'success'))
    }, err => {
        res.send(RESULT.r500())
    })
}

// 查询tp_admin表的数据
module.exports.selecttpadmim = async (req, res) => {
    const insertSql = 'SELECT * FROM tp_admin'
    const result = db.exec(insertSql);
    await result.then(result => {
        console.log('结果:', result)
        res.send(RESULT.r200(200, result, 'success'))
    }, err => {
        res.send(RESULT.r500())
    })
}

// 单线程计算速度的测试    结果:比java略快一点
module.exports.text11 = async (req, res) => {
    console.time()
    function fibonacci(n) {
        if (n == 1 || n == 2) {
            return 1
        };
        return fibonacci(n - 2) + fibonacci(n - 1);
    }
    fibonacci(40)
    console.timeEnd()
    res.send('计算好了')
}




