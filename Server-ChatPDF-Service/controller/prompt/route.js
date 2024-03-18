const express = require('express');
const router = express.Router();
const { chatPDF } = require('../../utils/chatPDF');
const { MongoClient } = require('mongodb');
const connectDB = require('../../utils/connectDB');

router.get('/getQuestions', async (req, res) => {
  console.log('POST /getQuestions 호출');
    const filePath = __dirname + "/algo.pdf";
    const prompt = `이 pdf 파일을 참조해서 이 주제와 관련해서 나의 학습 수준을 파악하기 위한 주관식 문제 5개를 직접 만들어서 내줘.
    다른 말은 하지말고 문제만 말해주고 말 끝은 반드시 ! 하나를 넣어줘.`;
    
    const question = await chatPDF(filePath, prompt);
    const splited_questions = question.split('!');
    splited_questions.pop();
    questions = splited_questions.map(item => item.trim());

    const db = await connectDB();
    for (let i = 0; i < 5; i++){
      // userID: user의 ID, question: chatpdf의 질문, answer: user의 답변, score: [great, good, not bad, bad] 중 하나
      // General_opinion: user의 답변에 따른 chatpdf의 종합 의견, Model_answer: chatpdf의 질문의 모범 답변
      await db.collection('prompt').insertOne( { userID: null, question: questions[i], answer: null, score: null, General_opinion: null, Model_answer: null});
    }

    //react로 questions 전송
    if (question) {
      res.json(questions);
      console.log("questions 보냄");
      console.log(questions);
    } else {
        res.status(500).json({ 'error': 'Failed to get response from ChatPDF API' });
    }
});
  
router.post('/sendAnswer', async (req, res) => {
  console.log('POST /sendAnswer 호출');
  console.log("answer 받음 ", req.body);

  try{
    const db = await connectDB();
    await db.collection('prompt').updateOne(
      // 조건: answer 필드가 null인 경우 answer 값 수정
      { answer: null },
      { $set: { answer: req.body.answer } }
    );

  }catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
 
});

//prompt의 question 를 가져오는 함수(나중에 models로 옮겨야함)
router.get('/getQuestions', async (req, res) => {
  console.log('GET /prompt/getQuestion 호출');
  try{
    const db = await connectDB();
    const result = await db.collection('prompt').find().toArray();
  
    questions = [];
    for (let i = 0; i < 5; i++){
      questions.push(result[i].question);
    }
    console.log(questions);
    return questions;

  }catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
});

module.exports = router;