const db = require("../utils/mysql");

// 查询用户表
exports.selectuser = () => {
    const selectuser = 'SELECT * FROM ns_user'
    return db.exec(selectuser)
}
 // 根据id查询个人信息
exports.findone = (id) => {
    const selectuser = `SELECT * FROM ns_user where id = ${id}`
    return db.exec(selectuser)
}

// 新增用户
exports.insertuser = (username, password, nickname, phone, email) => {
    const insertSql = `INSERT INTO ns_user (username, password, nickname, phone, email) VALUES ('${username}', ${password}, '${nickname}', '${phone}','${email}')`
    return db.exec(insertSql);
}

