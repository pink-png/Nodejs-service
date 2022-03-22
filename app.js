const express = require("express");
const app = express();
const path = require("path")
const fs = require("fs")
const cors = require("cors");
const { json } = require("express");
const helmet = require('helmet')

// 导入自定义中间件
const GSQjwtmiddleware = require('./middleware/AuthJwt')

// Helmet是一个能够帮助增强Node.JS之Express/Connect等Javascript Web应用安全的中间件。 [https://zhuanlan.zhihu.com/p/136866630]
app.use(helmet())
app.use(cors());
// 解析表单请求体 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// 解析表单请求体 application/json
app.use(express.json());
// 开放资源目录
app.use(express.static(__dirname));
// 用于请求开放目录下的image
app.use('/public', express.static(path.join(__dirname, './public/images')))
// app.use(GSQjwtmiddleware)

//设置跨域访问
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//添加两个路由到应用上
app.use('/users', require('./routes/users'));
app.use('/order', require('./routes/order'));

// 通常会在所有的路由之后配置 404 的处理
app.use((req, res, next) => {  
    res.status(404).send('404 Not Found.')
})

// 在所有中间件之后挂载错误处理中间件
app.use((err, req, res, next) => {
    console.error('222------', err.stack)
    res.status(500).json({ error: err.message })
})

app.get('/json', (req, res) => {
    fs.readFile('./public/data/list.json', 'utf8', (err, data) => {
        if (err) {
            // 失败了直接 return
            return res.status(500).json({ error: err.masssge })
        }
        console.log(11)
        let db = JSON.parse(data)
        res.status(200).json(db)
    })
})

app.listen(8080, () => {
    console.log("启动服务8080完毕!");
})


