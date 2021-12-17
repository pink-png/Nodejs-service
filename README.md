# Nodejs-service
nodejs集成服务开发笔记



- [x] 1.报错 Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 
node中express的，res.send() 或res.json()这类客户端返回的方法仅返回一次，如果多次返回就会出现这个错误！

- [x] 2.添加数据库数据的时候 格式为 'XXX' 需要加引号 ,并且对传入的值进行提前判断为undefined 或者为空的判断，不然服务会停掉
let insertSql = `INSERT INTO tp_admin (username, password, nickname, email) VALUES ('${username}', ${password}, '${nickname}', '${email}')`




- [x] 3.nodejs如何实现多个定时任务？
记录用户提醒的时间，定时脚本去扫。



- [x] 4.代码别犯错
server.post('./wxlogin', WxAPI.wxlogin)    ./   没有点



- [x] 5.websocket 服务 (2021 - 12 - 5) 
初步实现简单功能



- [x] 6.jwt授权登录 和 OAuth登录 (2021 - 12 - 6) 
https://www.cnblogs.com/hl1223/p/13024954.html


- [x] 7.数据库的操作事务的操作还没有



- [x] 8.nodejs的中间件其实就是一个函数，需要用use的方式引入


- [x] 9.考虑在nodejs + express 中真正实现模块化服务



10.




<!-- - [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter -->