
const { spawn, fork } = require('child_process');
const { cwd } = require('process');

module.exports.child1 = () => {
    console.log('获取当前进程工作目录child:',cwd())

    // const cpuNum = require('os').cpus().length
    // const childProcess = require('child_process')

    // for (let i = 0; i < cpuNum; ++i) {
    //     childProcess.fork('./child_process_1.js')
    // }

    // console.log('Master: Hello world.')

    var child = require('child_process');
    // var du = child.spawn(process.platform === "win32" ? "npm.cmd" : "npm", ['-v'], { cwd: cwd()});
    var du = child.spawn(process.platform === "win32" ? "npm.ls" : "ls", ['-l'], { cwd: cwd()});
    
    du.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    du.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    du.on('exit', function (code) {
        console.log('child process exited with code ' + code);
    });


    // var ps = require('child_process').spawn(process.platform === "win32" ? "npm.cmd" : "npm", ['install'], {
    //     stdio: 'inherit',
    //     cwd: srcPath
    // });


}




