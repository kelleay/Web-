const express = require('express')
const router = express.Router()
const { upload, handleUpload } = require("../handle/loadImgs")
const queryFuncs = require("../handle/queryImgs")

// 上传接口
router.post('/upload', upload, handleUpload);
router.post('/querybytime', queryFuncs.queryByTime)
router.post('/querybylocation', queryFuncs.queryByLocation)
router.post('/querybytimeandlocation', queryFuncs.queryByLocationAndTime)
router.post('/queryall', queryFuncs.queryAll)
module.exports = router