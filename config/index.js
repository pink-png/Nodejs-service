
// 本地数据库配置
module.exports = {
    dev: {
        host: "127.0.0.1",
        user: "root",
        password: "guo19981030",
        port: 3306,
        database: 'tp_blog'
    },
    tokenKey: "youker.net",
    key: "zanzan",
    imgpath: 'http://localhost:8080/public/images/',
    appid: 'wx9262448133172596',
    appSecret: 'd7969f12b0bdd3452d5007c4f655b907'
}

// 线上数据库配置
// module.exports = {
//     dev: {
//         host: "127.0.0.1",
//         user: "root",
//         password: "e888ad25d7a6c412",
//         port: 3306,
//         database: 'tp_blog'
//     },
//     tokenKey: "youker.net",
//     key: "zanzan",
//     imgpath: 'http://songqing.xyz/public/images/',
//     appid: 'wx9262448133172596',
//     appSecret: 'd7969f12b0bdd3452d5007c4f655b907'
// }