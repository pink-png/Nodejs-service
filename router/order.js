const express = require("express");
const multer = require('multer');
express().use(multer().any())
let orderRouter = express.Router();

const Upload = require("../controller/upload")

orderRouter.post('/uploadimg', multer().single('img'), Upload.uploadimg)
orderRouter.get('/jsonss', Upload.readjson)


module.exports = orderRouter;