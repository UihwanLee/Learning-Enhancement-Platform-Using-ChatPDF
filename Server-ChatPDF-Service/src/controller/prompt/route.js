const express = require('express');
const router = express.Router();
const promptService = require('./service');
const fileService = require('../files/service');

// 질문 생성
// interviewType이 0 이면 사전 조사, 1 이면 면접 진행
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

// [면접 진행] 목차에 관한 3가지 질문 생성
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

// answer db 저장
router.post('/sendAnswer', async (req, res) => {
  try {
    const result = await promptService.updateAnswer(req.body.answer);
  } catch (error) {
    console.error('POST /sendAnswer error', error);
    res.status(500).json({ 'error': error.message });
  }
});


router.get('/eval', async (req, res) => {
  try {
    console.log('/eval 호출됨');
    const evalResult = await promptService.preEvaluate();
    console.log("평가 완료", evalResult);
    res.json(evalResult);
  } catch (error) {
    console.error('GET /eval error', error);
    res.status(500).json({ 'error': error.message });
  }
});

router.get('/preQNA/:filename', async (req, res) => {
  console.log('/preQNA/:filename 호출됨');
  const filename = req.params.filename;

  try {
      const preQNAData = await promptService.getPreQNAData(filename);

      if (preQNAData) {
          res.json(preQNAData);
      } else {
          res.status(404).send('Document not found');
      }
  } catch (error) {
      res.status(500).send('Server error');
  }
});




module.exports = router;
