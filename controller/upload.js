const RESULT = require("../core/result")
const fs = require("fs")
const path = require("path")
const imgpath = require("../config/index").imgpath

exports.uploadimg = async (req, res, next) => {
    // console.log('res',req)

    // 没有上传图片的时候files是空的
    if (req.files == undefined) {
        res.send(RESULT.r200(900, '', '请上传图片'))
    }

    // 这里只做单图上传处理
    if (req.files.length == 1) {

        let { buffer, mimetype } = req.files[0];
        let fileName = (new Date()).getTime() + parseInt(Math.random() * 3435) + parseInt(Math.random() * 6575);
        let fileType = mimetype.split('/')[1];
        let apath = `${imgpath}${fileName}.${fileType}`

        fs.writeFile(`./public/images/${fileName}.${fileType}`, buffer, (data) => {
            if (data) {
                res.send(RESULT.r200(900, '', '上传失败'))
            } else {
                res.send(RESULT.r200(200, { imgPath: apath }, '上传成功'))
            }
        })
    }

    // 多图
    if (req.files.length > 1) {

        // 返回没有上传成功的图片名字
        var stringarr = []
        // 图片上传成功的路径
        var imgurl = []

        for (let i = 0; i < req.files.length; i++) {
            // console.log(req.files[i])
            let { buffer, mimetype } = req.files[i];
            let fileName = (new Date()).getTime() + parseInt(Math.random() * 3435) + parseInt(Math.random() * 6575);
            let fileType = mimetype.split('/')[1];
            let apath = `${imgpath}${fileName}.${fileType}`

            fs.writeFile(`./public/images/${fileName}.${fileType}`, buffer, (data) => {
                // data==true?stringarr.push(fileName) : imgurl.push(apath)
                if (data) {
                    stringarr.push(fileName)
                } else {
                    imgurl.push(apath)
                    // console.log(imgurl)
                }
            })
        }

        console.log('imgurl', imgurl)

        if (stringarr.length != 0) {
            res.send(RESULT.r200(200, stringarr, '有图片上传失败'))
        } else {
            res.send(RESULT.r200(200, imgurl, '上传成功'))
        }

    }
}

exports.readjson = async (req, res, next) => {
    try {
        fs.readFile('./public/data/list.json', 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.masssge })
            }
            console.log(11)
            let db = JSON.parse(data)
            res.status(200).json(db)
        })
    } catch (error) {
        next(error)
    }


}