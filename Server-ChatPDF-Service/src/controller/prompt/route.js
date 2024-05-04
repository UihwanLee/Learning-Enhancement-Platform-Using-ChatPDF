const express = require('express');
const router = express.Router();
const promptService = require('./service');

router.get('/getQuestions', async (req, res) => {
  try {
    const questions = await promptService.generateQuestions();
    console.log("/getQuestions 호출");
    console.log(questions)
    res.json(questions);
  } catch (error) {
    console.error('GET /getQuestions error', error);
    res.status(500).json({ 'error': error.message });
  }
});

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

module.exports = router;
