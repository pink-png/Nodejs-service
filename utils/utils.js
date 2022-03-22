// 只截取文字
module.exports.GettwoChinese = function (strValue) {
    if (strValue !== null && strValue !== '') {
        const reg = /[\u4e00-\u9fa5]/g;
        return strValue.match(reg).join('');
    }
    return '';
}

module.exports.GetoneChinese = function (strValue) {
    let res = strValue.replace(/<\/?.+?>/g, "").replace(/ /g, "");
    return res;
}


// let aa = '<p> 登报是证件遗失证明等具有一定法律约束效力的公证行为。</p> <p> 支付宝登报，安全放心，登报格式齐全，选择报纸多，价格实惠透明，见报当天快递，可指导办理，以用户为核心，用心做好登报服务。 </p> <p> XXX：本院受理杨军诉你离婚后财产纠纷一案，现依法向你公告送达起诉状副本、应诉通知书、举证通知书及开庭传票，自公告起60日即视为送达。答辩和举证的期限均为公告期满后15日内。定于答辩和举证期满后第XX日X时(节假日顺延)在本院第X法庭公开审理，逾期依法缺席审判。 </p> <p> XXX人民法院 </p> <p> <br/> </p> <p> <img style="width:100%;" src="http://www.dengbaow.cn/media/umeditor/jsp/upload/20211112/57891636692960018.png"/> </p>'

// res =
// var newContent = aa.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {

//     // capture,返回每个匹配的字符串
//     console.log('img',capture)
//     // var newStr = '<img src="http://www.csghj.gov.cn' + capture + '" alt="" />';
//     var newStr = capture;
//     return newStr;
// });
// // console.log('res', res)
// console.log('img',newContent)