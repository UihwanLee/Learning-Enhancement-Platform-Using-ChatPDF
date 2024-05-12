const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const pdf = require('pdf-poppler');
const dotenv = require('dotenv');
const { chatPDF } = require('../../utils/chatPDF');  // chatPDF 구현 필요

dotenv.config();

// AWS SDK 설정
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();
const uploadDirectory = path.join(__dirname);

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

const upload = multer({ storage: storage }).single('pdfFile');

async function validateTopic(filePath, category) {
    const prompt = `이 파일이 ${category}와 직접적으로 관련된 주제인지 'Yes' 아니면 'No' 로 대답해줘.`;
    const YesOrNo = await chatPDF(filePath, prompt);
    return YesOrNo.toLowerCase().trim() === 'yes' || YesOrNo.toLowerCase().trim() === 'yes.';
}

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
            await uploadToS3(imagePath, filePath);
            fs.unlinkSync(imagePath);
        }
    }
}

async function uploadToS3(filePath, originalFileName) {
    const fileStream = fs.createReadStream(filePath);
    const folderName = path.basename(originalFileName, path.extname(originalFileName));
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${folderName}/${path.basename(filePath)}`,
        Body: fileStream
    };
    await s3.upload(uploadParams).promise();
}

const getJpgImagesFromS3 = async (bucketName, folderPath) => {
    const params = {
      Bucket: bucketName,
      Prefix: folderPath
    };
  
    try {
      const data = await s3.listObjectsV2(params).promise();
      const jpgFiles = data.Contents.filter(item => {
        return item.Key.startsWith(`${folderPath}/`) && item.Key.endsWith('.jpg');
      });
      
      return jpgFiles.map(file => {
        return `https://${bucketName}.s3.${AWS.config.region}.amazonaws.com/${file.Key}`;
      });
    } catch (error) {
      console.error('Error fetching JPG images from S3', error);
      return [];
    }
  };
  
    


async function handleFileUpload(req, res, next) {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const isRelated = await validateTopic(file.path, '알고리즘');
        if (!isRelated) {
            fs.unlinkSync(file.path);
            console.log('카테고리 주제와 관련이 없는 파일입니다.');
            return res.status(400).send('주제와 관련이 없는 파일입니다.');
        }
        await convertAndUpload(file.path);
        res.send('success');
        console.log('파일 S3 업로드 성공');
    } catch (error) {
        next(error);
    } finally {
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
    }
}

module.exports = {
    getJpgImagesFromS3,
    upload,
    handleFileUpload
};
