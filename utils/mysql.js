const mysql = require('mysql');

// 创建数据库连接池
const pool = mysql.createPool(require("../config/config.default").dev);

// 连接池里面创建了一个新连接时，会触发一个连接事件。如需要在使用此连接之前设置会话变量，将要对此事件进行监听
pool.on('connection', (connection) => {
    // connection.query('SET SESSION auto_increment_increment=1')
});

// 队列中等待可用连接的回调函数被触发时，连接池将触发此事件。
pool.on('enqueue', () => {
    console.log('Waiting for available connection slot');
});

exports.Pool = pool;

exports.getConnection = (cb) => {
    if (typeof cb == "function") {
        pool.getConnection(function (err, connection) {
            cb(err, connection);
        });
    } else {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
        });
    }
};
exports.exec = (sql, values, cb) => {
    if (typeof cb == "function") {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                cb(err);
            } else {
                connection.query(sql, values, (error, rows) => {
                    connection.release();
                    cb(error, rows);
                });
            }
        });
    } else {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    reject(err);
                } else {
                    connection.query(sql, values, (error, rows) => {
                        connection.release();
                        if (error)
                            reject(error);
                        else
                            resolve(rows);
                    });
                }
            });
        });
    }
};
exports.beginTransaction = (connection, cb) => {
    if (typeof cb == "function") {
        connection.beginTransaction(function (err) {
            if (err) {
                throw err;
            }
            cb(null, connection);
        });
    } else {
        return new Promise((resolve, reject) => {
            connection.beginTransaction(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
        });
    }
};
exports.rollback = (connection, cb) => {
    if (typeof cb == "function") {
        connection.rollback(function () {
            connection.release();
            cb && cb();
        });
    } else {
        return new Promise((resolve, reject) => {
            connection.rollback(function (err) {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};
exports.commit = (connection, cb) => {
    if (typeof cb == "function") {
        connection.commit(function (err) {
            if (err) {
                connection.rollback(function () {
                    cb && cb(err);
                    throw err;
                });
            }
            connection.release();
            cb && cb();
        });
    } else {
        return new Promise((resolve, reject) => {
            connection.commit(function (err) {
                if (err) {
                    connection.rollback(function () {
                        reject(err);
                    });
                }
                connection.release();
                resolve();
            });
        });
    }
};
/**
 * 检查是否链接失败
 */
// this.getConnection((err, connection) => {
//     if (err) throw err;
//     else {
//         // logger.info("connected success!");
//         connection.release();
//     }
// });

/**
 * 带事务
 * @param sql
 * @param values
 * @returns {Promise}
 */
exports.exec2 = (connection, sql, values, cb) => {
    if (typeof cb == "function") {
        connection.query(sql, values, (error, rows) => {
            cb(error, rows);
        });
    } else {
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (error, rows) => {
                if (error)
                    reject(error);
                else
                    resolve(rows);
            });
        });
    }
};
