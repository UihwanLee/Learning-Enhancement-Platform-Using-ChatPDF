const { MongoClient } = require('mongodb');
const connectDB = require('../../utils/connectDB');
const { chatPDF } = require('../../utils/chatPDF');
const fs = require('fs');
const path = require('path');

// 목차 생성 함수
async function generateIndexes(filename) {
  console.log("generateIndexes 호출");
  const db = await connectDB();

  // filename을 기준으로 문서 찾기
  const query = { filename: filename };
  console.log("query: ", query);
  const fileDocument = await db.collection('fileInfo').findOne(query);
  const filePath = fileDocument.filepath;
  console.log("generateIndexes에서의 filePath: ", filePath);
  const prompt = "이 파일을 참고해서 중요하다고 생각되는 주제로 목차를 5개로 나눠줘. 앞의 번호는 붙이지 말고 목차만 말해주고  각 목차 사이에 !를 반드시 넣어줘. 예시도 생략해줘.";

  // chatPDF API 실행
  const index = await chatPDF(filePath, prompt);
  const split_indexes = index.split('!');
  //split_indexes.pop();
  const indexes = split_indexes.map(item => item.trim());

  return indexes;
}
  
module.exports = {
  generateIndexes
};