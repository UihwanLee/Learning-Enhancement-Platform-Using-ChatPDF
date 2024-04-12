const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express();

// 파일을 저장할 디렉토리 설정
const uploadDirectory = path.join(__dirname, 'uploads');

// multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    // 한글 깨짐 현상 해결
    file.originalname = Buffer.from(file.originalname, 'ascii').toString('utf8');
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });

// 정적 파일 제공을 위한 미들웨어 설정
router.use(express.static('public'));

// 파일 업로드를 처리하는 엔드포인트
router.post('/upload', upload.single('pdfFile'), (req, res) => {
  console.log('POST /upload 실행됨');
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  //file.filename = Buffer.from(file.filename, 'ascii').toString('utf8');
  //file.path = Buffer.from(file.path, 'ascii').toString('utf8');

  console.log(file);
  res.send('File uploaded successfully.');
});

module.exports = router;
