const { MongoClient } = require('mongodb');
const connectDB = require('../../utils/connectDB');
const { chatPDF } = require('../../utils/chatPDF');
const fs = require('fs');
const path = require('path');

const { getDocumentPath } = require('../files/documentStore');

let answers = [];
let result = {};

// [사전 조사] 초기 질문 5개 생성
async function generateQuestions(numQuestions) {
  answers.length = 0; // answers 초기화
  const db = await connectDB();
  const filePath = getDocumentPath(); 
  const filename = path.basename(filePath);

  const fileInfo = await db.collection('fileInfo').findOne(
    { filename: filename }
  );

  const prompt = `이 파일과 관련된 지식 수준을 파악할 수 있는 문제를 ${numQuestions}개 내줘. 
  문제는 ${fileInfo.indexes[0]}, ${fileInfo.indexes[1]}, ${fileInfo.indexes[2]}, 
  ${fileInfo.indexes[3]}, ${fileInfo.indexes[4]}, 이 5가지 주제에서 하나씩 그 주제와 관련된 문제를 내줘. 
  오직 문제만 대답하고 문제 앞의 설명은 생략해. 그리고 말 끝은 반드시 ! 하나를 넣어줘.`;

  // 크기가 5인 questions 배열 데이터 생성
  const question = await chatPDF(filePath, prompt);
  const split_questions = question.split('!');
  split_questions.pop();
  const questions = split_questions.map(item => item.trim());

  await db.collection('preQNA').insertOne({ filename: filename, questions: questions, answers: null });
  

  return questions;
}

// [면접 진행] index에 따라 질문 3개 생성
async function generateDetailQuestions(numQuestions, category) {
  const filePath = getDocumentPath(); 
  const prompt = `이 pdf 파일을 참조해서 ${category}와 관련된 지식 수준을 파악하기 위한 주관식 문제 ${numQuestions}개를 직접 만들어서 내줘. 
  다른 말은 하지말고 문제만 말해주고 말 끝은 반드시 ! 하나를 넣어줘.`;

  const question = await chatPDF(filePath, prompt);
  const split_questions = question.split('!');
  split_questions.pop();
  const questions = split_questions.map(item => item.trim());

  // const db = await connectDB();
  // for (let i = 0; i < questions.length; i++) {
  //   await db.collection('prompt').insertOne({ user: null, question: questions[i], answer: null, score: null, General_opinion: null, Model_answer: null});
  // }

  return questions;
}


async function updateAnswer(answer) {
  const db = await connectDB();
  const filePath = getDocumentPath(); 
  const filename = path.basename(filePath);

  // answers 배열에 새로운 answer 추가
  answers.push(answer);
  console.log("updateAnswer answer: ", answer);

  // answers 배열의 크기가 5가 되면 업데이트 수행
  if (answers.length === 5) {
    const newAnswerArray = answers.slice(); // answers 배열 복사

    const result = await db.collection('preQNA').updateMany(
        { filename: filename },
        { $set: { answers: newAnswerArray } }
    );

    if (result.modifiedCount > 0) {
        console.log(`preQNA 컬렉션의 ${result.modifiedCount}개의 문서가 성공적으로 업데이트되었습니다.`);
    } else {
        console.log('업데이트된 문서가 없습니다.');
    }

    // 업데이트 후 answers 배열 초기화
    answers.length = 0;
  }
  return result;
}

// [사전 조사] 5개의 QNA 평가
async function preEvaluate() {
  const db = await connectDB();
  preQNACollection = db.collection('preQNA');
  const filePath = getDocumentPath(); 
  const filename = path.basename(filePath);

  const preQNA = await preQNACollection.findOne(
    { filename: filename },
    { projection: { questions: 1, answers: 1, _id: 0 } }
  );

  if (preQNA) {
    console.log('questions:', preQNA.questions);
    console.log('answers:', preQNA.answers);
  } else {
      console.log('해당 filename을 가진 문서를 찾을 수 없습니다.');
  }
  
  // '/' 로 점수, 모범답변, 종합의견 구분, '#' 로 각각의 평가 구분
  const evalPrompt = `다음은 이 파일과 관련된 질문과 답변들입니다. 
  각각의 질문과 답변은 5개의 요소로 이루어져 있습니다. 아래의 질문과 답변에 대해 5개 각각의 평가를 해주세요. 
  평가는 점수, 모범답변, 종합의견 3가지로 해주세요. (점수는 0~100점, 모범답변은 질문에 대한 정답, 종합의견은 답변에 대한 평가) 
  오직 점수, 모범답변, 종합의견 3가지만 대답해주고 각각 사이에 '/'를 넣어주세요. 그리고 각각의 평가 5개들 사이에는 '#'를 넣어주세요. 
  예를 들면 "80/정확한 답변입니다/더 구체적이면 좋을거 같습니다#50/답은 파리입니다/수도에 대해 더 공부해보세요#/40/모범답변/종합의견#20/
  모범답변/종합의견#100/모범답변/종합의견" 이렇게 대답하면 됩니다. 
  1. 질문: ${preQNA.questions[0]} 답변: ${preQNA.answers[0]}
  2. 질문: ${preQNA.questions[1]} 답변: ${preQNA.answers[1]}
  3. 질문: ${preQNA.questions[2]} 답변: ${preQNA.answers[2]}
  4. 질문: ${preQNA.questions[3]} 답변: ${preQNA.answers[3]}
  5. 질문: ${preQNA.questions[4]} 답변: ${preQNA.answers[4]}`;

  const evalResponse = await chatPDF(filePath, evalPrompt);
  console.log("chatpdf의 평가: ", evalResponse);

  // '#'로 구분된 섹션을 분리
  const sections = evalResponse.split('#');
  const evalResult = {};

  // 각 섹션을 '/'로 나누어 result 객체에 저장
  sections.forEach((section, index) => {
      evalResult[index] = section.split('/');
  });

  // preQNA에 filename을 기준으로 evaluation 필드 추가
  const updateResult = await preQNACollection.updateMany(
    { filename: filename },
    { $set: { evaluation: evalResult } }
  );

  if (updateResult.modifiedCount > 0) {
      console.log(`${updateResult.modifiedCount}개의 문서가 성공적으로 업데이트되었습니다.`);
  } else {
      console.log('업데이트된 문서가 없습니다.');
  }

  return evalResult;
}

// [사전 조사] filename에 따라 questions, answers, evaluation 반환
async function getPreQNAData(filename) {
  const db = await connectDB();
  preQNACollection = db.collection('preQNA');

  const preQNAData = await preQNACollection.findOne(
    { filename: filename },
    { projection: { questions: 1, answers: 1, evaluation: 1, _id: 0 } }
  );

  return preQNAData;
}

module.exports = {
  generateQuestions,
  generateDetailQuestions,
  updateAnswer,
  preEvaluate,
  getPreQNAData
};