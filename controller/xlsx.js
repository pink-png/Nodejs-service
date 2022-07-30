// exceljs 所需的 polyfills
// require('core-js/modules/es.promise');
// require('core-js/modules/es.string.includes');
// require('core-js/modules/es.object.assign');
// require('core-js/modules/es.object.keys');
// require('core-js/modules/es.symbol');
// require('core-js/modules/es.symbol.async-iterator');
// require('regenerator-runtime/runtime');
// const ExcelJS = require('exceljs/dist/es5');

const RESULT = require("../utils/result")
const fs = require('fs')
const path = require('path')


exports.xlsxfrom = async (req, res, next) => {

    RESULT.Res(res)(111, 200, '成功')
}