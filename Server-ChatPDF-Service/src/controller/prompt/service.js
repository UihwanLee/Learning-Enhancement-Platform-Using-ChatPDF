const { MongoClient } = require('mongodb');
const connectDB = require('../../utils/connectDB');
const { chatPDF } = require('../../utils/chatPDF');
const fs = require('fs');
const path = require('path');

const { getDocumentPath } = require('../files/documentStore');

// [사전 조사] 초기 질문 5개 생성
async function generateQuestions(numQuestions) {
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

const answers = [];
async function updateAnswer(answer) {
  const db = await connectDB();
  const filePath = getDocumentPath(); 
  const filename = path.basename(filePath);

  // answers 배열에 새로운 answer 추가
  answers.push(answer);

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

async function evaluateAnswers() {
  const db = await connectDB();
  let documents = await db.collection('prompt').find().toArray();
  if (!documents || documents.length === 0) {
    throw new Error('No documents found');
  }

  const evaluations = [];

  for (const doc of documents) {
    const { question, answer } = doc;
    const evalPrompt = `"${question}" 라는 질문에 "${answer}" 라는 답변을 했을 때 평가를 해주는데 평가를 3가지로 나눠서 해줘. 점수, 종합의견, 모범답변으로 나눠서 각각 !로 끝내줘.`;
    const evalResponse = await chatPDF(__dirname + "/algo.pdf", evalPrompt);

    const split_result = evalResponse.split('!');
    if (split_result.length >= 3) {
      const [score, General_opinion, Model_answer] = split_result.map(item => item.trim());
      evaluations.push({ question, answer, score, General_opinion, Model_answer });
    }
  }

  return evaluations;
}

module.exports = {
  generateQuestions,
  generateDetailQuestions,
  updateAnswer,
  evaluateAnswers
};
