const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express();
const { chatPDF } = require('../../utils/chatPDF');
const { MongoClient } = require('mongodb');
const connectDB = require('../../utils/connectDB');
const fs = require('fs');

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
router.post('/upload', upload.single('pdfFile'), async (req, res) => {
  console.log('POST /upload 실행됨');

  const file = req.file;
  if (!file) {
    return res.status(400).send('파일 업로드 오류(파일 못 읽음)');
  }

  // ChatPDF API 호출해 업로드하는 파일이 주제(카테고리)에 맞는지 유효성 검사 
  // 주의! 파일이 이미지 파일로 이루어진 PDF 파일이면 api가 인식을 못해서 오류남. 반드시 글자로 작성된 파일이어야 함.
  const filePath = file.path;
  const category = ['알고리즘', '운영체제', '네트워크', '데이터베이스'];
  const prompt = "이 파일이 " + category[1] + "와 직접적으로 관련된 주제인지 'Yes' 아니면 'No' 로 대답해줘.";

  const YesOrNo = await chatPDF(filePath, prompt);

  // 'No' 또는 'No.'이면 파일 업로드를 하지 않음
  if (YesOrNo.toLowerCase().trim() === 'no' || YesOrNo.toLowerCase().trim() === 'no.') {
    // 파일 삭제 로직 추가 (선택 사항)
    fs.unlinkSync(filePath);
    res.status(500).send('주제와 관련이 없는 파일입니다. 파일 업로드가 취소되었습니다.');
  } else {
    console.log(YesOrNo);
    res.send('파일이 성공적으로 업로드되었습니다.');
  }
  
});

module.exports = router;