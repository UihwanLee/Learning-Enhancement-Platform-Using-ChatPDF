const dotenv = require('dotenv');
require('dotenv').config();

console.log(process.env.PORT);
console.log(process.env.MONGODB_KEY);
console.log(process.env.CHATPDF_KEY);
console.log(process.env.S3_ACCESS_KEY_ID);
console.log(process.env.S3_SECRET_ACCESS_KEY);
console.log(process.env.AWS_REGION);
console.log(process.env.S3_BUCKET_NAME);
console.log(process.env.JWT_SECRET);
