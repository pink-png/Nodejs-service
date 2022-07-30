const express = require("express");
let ioRouter = express.Router();

const Upload = require("../controller/xlsx")

ioRouter.get('/xlsxfrom', Upload.xlsxfrom)


module.exports = ioRouter;