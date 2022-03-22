module.exports.r200 = (code,data,message) => {
    return {
        code : code,
        data : data || [],
        message : message || ''
    }
}
module.exports.r404 = () => {
    return {
        code : 404,
        message : '没有这个API'
    }
}
module.exports.r500 = () => {
    return {
        code : 500,
        message : '服务器错误'
    }
}

