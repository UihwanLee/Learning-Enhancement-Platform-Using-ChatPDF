const express = require('express');
const fileService = require('./service');

const router = express();

// multer 미들웨어와 handleFileUpload 미들웨어 연결
router.post('/upload', fileService.upload, fileService.handleFileUpload);

module.exports = router;

