exports.r200 = (code, data, message) => {
    return {
        code: code,
        data: data || [],
        message: message || ''
    }
}
exports.r404 = () => {
    return {
        code: 404,
        message: '没有这个API'
    }
}
exports.r500 = () => {
    return {
        code: 500,
        message: '服务器错误'
    }
}

exports.Res = (res) => {

    return (data, code, message) => {

        let obj = {
            code: code,
            data: data || null,
            message: message || ''
        }

        res.send(obj)
    }

}

