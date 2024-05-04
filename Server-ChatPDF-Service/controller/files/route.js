const express = require('express');
const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs');
const pdf = require('pdf-poppler');
const dotenv = require('dotenv');

dotenv.config();

const router = express();
const uploadDirectory = path.join(__dirname, 'uploads');

const { chatPDF } = require('../../utils/chatPDF');

// AWS SDK 직접 설정
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'ascii').toString('utf8');
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });

// 파일 업로드 및 처리 라우트
router.post('/upload', upload.single('pdfFile'), async (req, res) => {
  const file = req.file;
  if (!file) {
      return res.status(400).send('No file uploaded.');
  }

  const category = '알고리즘'; // 예시로 '알고리즘' 카테고리 사용

  try {
      const isRelated = await validateTopic(file.path, category);
      if (!isRelated) {
          fs.unlinkSync(file.path);
          console.log('주제와 관련이 없는 파일입니다. 파일 업로드가 취소되었습니다.');
          return res.status(400).send('주제와 관련이 없는 파일입니다. 파일 업로드가 취소되었습니다.');
      }
      await convertAndUpload(file.path);
      res.send('파일 S3 업로드 성공');
      console.log('파일 S3 업로드 성공')
  } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).send(error.message);
  } finally {
      if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
      }
  }
});

// ChatPDF API를 통해 파일 주제 유효성 검사
async function validateTopic(filePath, category) {
  const prompt = `이 파일이 ${category}와 직접적으로 관련된 주제인지 'Yes' 아니면 'No' 로 대답해줘.`;
  const YesOrNo = await chatPDF(filePath, prompt); // chatPDF 함수는 예시로, 구현 필요
  console.log("YesOrNo: ", YesOrNo);
  return YesOrNo.toLowerCase().trim() === 'yes' || YesOrNo.toLowerCase().trim() === 'yes.';
}

// 파일을 이미지로 변환하고 S3에 업로드하는 함수
async function convertAndUpload(filePath) {
  const outputDir = path.dirname(filePath);
  const baseName = path.basename(filePath, path.extname(filePath));
  
  let opts = {
      format: 'jpeg',
      out_dir: outputDir,
      out_prefix: baseName,
      page: null
  };

  await pdf.convert(filePath, opts);
  const files = fs.readdirSync(outputDir);

  for (let filename of files) {
      if (filename.startsWith(baseName)) {
          const imagePath = path.join(outputDir, filename);
          await uploadToS3(imagePath, filePath); // 원본 파일 이름을 인자로 추가
          fs.unlinkSync(imagePath); // 로컬 파일 삭제
      }
  }
}


// 이미지를 AWS S3에 업로드하는 함수
async function uploadToS3(filePath, originalFileName) {
  const fileStream = fs.createReadStream(filePath);
  const folderName = path.basename(originalFileName, path.extname(originalFileName));
  const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${folderName}/${path.basename(filePath)}`, // 파일 이름으로 폴더 생성
      Body: fileStream
  };
  await s3.upload(uploadParams).promise();
}



module.exports = router;

