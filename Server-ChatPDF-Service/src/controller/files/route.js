const express = require('express');
const fileService = require('./service');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
dotenv.config();

const { setDocumentPath } = require('./documentStore');

const router = express();
router.use(bodyParser.json());

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

router.post('/SendDocumentData', async (req, res) => {
  const { document } = req.body;

  console.log('Received document:', document);

  try {
    const S3downloadfilePath = await fileService.downloadFileFromS3(document);
    // 파일을 추가로 처리하거나, 응답으로 보내는 등의 작업을 할 수 있습니다

    // document 값을 저장
    setDocumentPath(S3downloadfilePath);

    res.send({ status: 'success', message: 'Document data received and file downloaded successfully', S3downloadfilePath });
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message });
  }
});

module.exports = router;

