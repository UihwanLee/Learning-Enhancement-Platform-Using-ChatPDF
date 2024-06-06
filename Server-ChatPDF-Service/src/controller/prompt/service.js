const { MongoClient } = require('mongodb');
const connectDB = require('../../utils/connectDB');
const { chatPDF } = require('../../utils/chatPDF');
const fs = require('fs');
const path = require('path');

const { getDocumentPath } = require('../files/documentStore');


async function generateQuestions(numQuestions) {
  //const filePath = path.join(__dirname, "algo.pdf");
  const filePath = getDocumentPath(); 
  console.log("filePath: ", filePath);
  const prompt = `이 pdf 파일을 참조해서 이 주제와 관련해서 나의 학습 수준을 파악하기 위한 주관식 문제 ${numQuestions}개를 직접 만들어서 내줘. 오직 5개의 문제만 대답하고 앞에 번호는 생략해줘. 말 끝은 반드시 ! 하나를 넣어줘.`;

  const question = await chatPDF(filePath, prompt);
  const split_questions = question.split('!');
  split_questions.pop();
  const questions = split_questions.map(item => item.trim());

  const db = await connectDB();
  for (let i = 0; i < questions.length; i++) {
    await db.collection('prompt').insertOne({ user: null, question: questions[i], answer: null, score: null, General_opinion: null, Model_answer: null});
  }

  return questions;
}

async function generateDetailQuestions(numQuestions) {
  //const filePath = path.join(__dirname, "algo.pdf");
  const filePath = getDocumentPath(); 
  console.log("filePath: ", filePath);
  const prompt = `이 pdf 파일을 참조해서 이 주제와 관련해서 나의 학습 수준을 파악하기 위한 주관식 문제 ${numQuestions}개를 직접 만들어서 내줘. 다른 말은 하지말고 문제만 말해주고 말 끝은 반드시 ! 하나를 넣어줘.`;

  const question = await chatPDF(filePath, prompt);
  const split_questions = question.split('!');
  split_questions.pop();
  const questions = split_questions.map(item => item.trim());

  const db = await connectDB();
  for (let i = 0; i < questions.length; i++) {
    await db.collection('prompt').insertOne({ user: null, question: questions[i], answer: null, score: null, General_opinion: null, Model_answer: null});
  }

  return questions;
}

async function generateTailQuestion(questionPrompt) {
  const filePath = path.join(__dirname, "algo.pdf");
  const prompt = "주어진 질문 '${questionPrompt}' 에 대해 질문과 직접적인 관련이 있는 꼬리 질문 1개를 생성해.";

  const question = await chatPDF(filePath, prompt);

  // const db = await connectDB();
  // for (let i = 0; i < tailQuestions.length; i++) {
  //   await db.collection('tailQuestions').insertOne({ userID: null, question: tailQuestions[i], answer: null, score: null, General_opinion: null, Model_answer: null});
  // }

  return tailQuestion;
}

async function updateAnswer(answer) {
  const db = await connectDB();
  return db.collection('prompt').updateOne(
    { answer: null },
    { $set: { answer: answer } }
  );
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
  updateAnswer,
  evaluateAnswers
};
