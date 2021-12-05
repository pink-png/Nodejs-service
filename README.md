# Nodejs-service
nodejsj集成服务开发笔记

1.报错 Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
node中express的，res.send() 或res.json()这类客户端返回的方法仅返回一次，如果多次返回就会出现这个错误！


2.添加数据库数据的时候 格式为 'XXX' 需要加引号 ,并且对传入的值进行提前判断为undefined 或者为空的判断，不然服务会停掉
let insertSql = `INSERT INTO tp_admin (username, password, nickname, email) VALUES ('${username}', ${password}, '${nickname}', '${email}')`

3.nodejs如何实现多个定时任务？
记录用户提醒的时间，定时脚本去扫。

4.代码别犯错
server.post('./wxlogin', WxAPI.wxlogin)    ./   没有点