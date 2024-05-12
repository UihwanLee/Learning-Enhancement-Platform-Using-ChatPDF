const express = require('express');
const fileService = require('./service');
const dotenv = require('dotenv');
dotenv.config();

const router = express();

// multer 미들웨어와 handleFileUpload 미들웨어 연결
router.post('/upload', fileService.upload, fileService.handleFileUpload);

router.get('/images', async (req, res) => {
    console.log("GET /images 요청");
    const folderPath = req.query.folder;  // 쿼리에서 폴더 경로를 가져옵니다.
    if (!folderPath) {
      return res.status(400).send('Folder path is required');
    }
    
    const images = await fileService.getJpgImagesFromS3(process.env.S3_BUCKET_NAME, folderPath);
    console.log(images);
    res.json(images);
  });
  

module.exports = router;

