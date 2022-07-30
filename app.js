const express = require("express");
const app = express();
const path = require("path")
const cors = require("cors");
const helmet = require('helmet')
const morgan = require('morgan')
const PORT = process.env.PORT || 3000
const errorHandler = require('./middleware/error-handler')

// 导入自定义中间件
// const GSQjwtmiddleware = require('./middleware/AuthJwt')
// app.use(GSQjwtmiddleware)

// Helmet是一个能够帮助增强Node.JS之Express/Connect等Javascript Web应用安全的中间件。 [https://zhuanlan.zhihu.com/p/136866630]
app.use(helmet())
// 为客户端提供跨域资源请求
app.use(cors());
// 解析表单请求体 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// 解析表单请求体 application/json
app.use(express.json());
// 开放资源目录
app.use(express.static(__dirname));
// 用于请求开放目录下的image
app.use('/public', express.static(path.join(__dirname, './public/images')))
// 打印日志
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(morgan('dev'))

//添加路由模块到应用上
app.use('/users', require('./router/users'));
app.use('/order', require('./router/order'));
app.use('/io', require('./router/io'));

// 在所有中间件之后挂载错误处理中间件
app.use(errorHandler())

// 通常会在所有的路由之后配置 404 的处理
app.use((req, res, next) => {
  res.status(404).send('404 Not Found.')
})

app.listen(PORT, () => {
  console.log(`Service start at ${PORT}`);
})



