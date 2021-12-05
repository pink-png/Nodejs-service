module.exports.exit = () => {
    // 监听进程退出
    process.on('exit', function (code) {
        // 进程退出后，其后的事件循环将会结束，计时器也不会被执行
        setTimeout(function () {
            console.log('This will not run');
        }, 0);
        console.log('进程退出码是:', code);
    });
    //   //进程退出
    //   process.exit();
    //   //进程正常退出，其退出码为：0
}


module.exports.uncaughtException = () => {
    //异常捕获
    process.on('uncaughtException', function (exception) {
        console.log('捕获到的异常是:', exception);
    });

    //一个未定义的方法，用来制造异常
    // nonexistentFunc();

    //输出
    //   捕获到的异常是: [ReferenceError: nonexistentFunc is not defined]
}

module.exports.SIGINT = () => {
    process.stdin.resume();

    //使用Control+C键，可以触发SIGINT信号
    process.on('SIGINT', function () {
        console.log('收到SIGINT信号，按Control+D键可以退出进程');
    });
}




