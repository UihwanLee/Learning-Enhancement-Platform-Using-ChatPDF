const express = require('express');
const router = express.Router();
const promptService = require('./service');
const fileService = require('../files/service');

// 사전 조사 질문 5개 생성
router.get('/getQuestions', async (req, res) => {
  try {
    const questions = await promptService.generateQuestions(5);
    console.log("/getQuestions 호출");
    console.log(questions)
    res.json(questions);
  } catch (error) {
    console.error('GET /getQuestions error', error);
    res.status(500).json({ 'error': error.message });
  }
});

// answer db 저장
router.post('/sendAnswer', async (req, res) => {
  try {
    const result = await promptService.updateAnswer(req.body.answer);
    console.log("Answer 보내기 성공");
    console.log(result);
    res.json({ message: "Answer 보내기 성공", result });
  } catch (error) {
    console.error('POST /sendAnswer error', error);
    res.status(500).json({ 'error': error.message });
  }
});


router.get('/eval', async (req, res) => {
  try {
    const evaluations = await promptService.evaluateAnswers();
    console.log("평가 완료", evaluations);
    res.json(evaluations);
  } catch (error) {
    console.error('GET /eval error', error);
    res.status(500).json({ 'error': error.message });
  }
});

// [면접] 목차에 관한 3가지 질문 생성
router.get('/startInterview', async (req, res) => {
  try {
    const startInterviewQuestions = await promptService.generateQuestions(3);
    console.log("/startInterview 호출");
    console.log(startInterviewQuestions);
    res.json(startInterviewQuestions);
  } catch (error) {
    console.error('GET /startInterview error', error);
    res.status(500).json({ 'error': error.message });
  }
});

// [면접] 꼬리 질문 처리 - 질문에 대한 꼬리 질문 생성
router.get('/getTailQuestions', async (req, res) => {
  try {
    const questionPrompt = req.query.questionPrompt;

    // 요청된 질문 prompt와 개수를 사용하여 꼬리 질문을 생성
    const questions = await promptService.generateTailQuestion(questionPrompt);

    // 생성된 꼬리 질문을 JSON 형식으로 클라이언트에 반환
    res.json({
      success: true,
      questions: questions
    });
  } catch (error) {
    console.error('GET /getTailQuestions error', error);
    res.status(500).json({ 'error': error.message });
  }
});


module.exports = router;
