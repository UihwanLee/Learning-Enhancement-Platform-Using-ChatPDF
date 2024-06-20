const express = require('express');
const router = express.Router();
const promptService = require('./service');
const fileService = require('../files/service');
const cors = require('cors')

router.use(cors());

// 질문 생성
// interviewType이 0 이면 사전 조사, 1 이면 면접 진행
// interviewType이 0인 경우
router.get('/getQuestions', async (req, res) => {
  try {
    console.log("/getQuestions 호출");
    const questions = await promptService.generateQuestions(5);
    console.log(questions)
    res.json(questions);
  } catch (error) {
    console.error('GET /getQuestions error', error);
    res.status(500).json({ 'error': error.message });
  }
});

// interviewType이 1인 경우
// [면접 진행] 목차에 관한 3가지 질문 생성
router.post('/startInterview', async (req, res) => {
  try {
    console.log("/startInterview 호출");
    console.log("목차 값이 나와야함: ", req.body);
    const { JSONindex } = req.body;

    const startInterviewQuestions = await promptService.generateDetailQuestions(3, JSONindex);
    console.log(startInterviewQuestions);
    res.json(startInterviewQuestions);
  } catch (error) {
    console.error('GET /startInterview error', error);
    res.status(500).json({ 'error': error.message });
  }
});

// [사전 조사] answer db 저장
router.post('/preSendAnswer', async (req, res) => {
  try {
    const response = await promptService.preUpdateAnswer(req.body.answer);
  } catch (error) {
    console.error('POST /preSendAnswer error', error);
    res.status(500).json({ 'error': error.message });
  }
});

// // [면접 진행] question db 저장
// router.post('/sendQuestion', async (req, res) => {
//   console.log('sendQuestion 호출됨');
//   try {
//     const response = await promptService.updateQuestion(req.body.question);
//   } catch (error) {
//     console.error('POST /sendQuestion error', error);
//     res.status(500).json({ 'error': error.message });
//   }
// });

// // [면접 진행] answer db 저장
// router.post('/sendAnswer', async (req, res) => {
//   console.log('sendAnswer 호출됨');
//   try {
//     const response = await promptService.updateAnswer(req.body.answer);
//   } catch (error) {
//     console.error('POST /sendAnswer error', error);
//     res.status(500).json({ 'error': error.message });
//   }
// });

router.post('/sendData', async (req, res) => {
  console.log('sendData 호출됨');
  const { question, answer } = req.body;
  try {
    await promptService.updateData(question, answer);
    // await promptService.updateQuestion(req.body.question);
    // await promptService.updateAnswer(req.body.answer);
  } catch (error) {
    console.error('POST /sendData error', error);
    res.status(500).json({ 'error': error.message });
  }
});

// [면접 진행] 꼬리 질문일지 아닐지
router.post('/YesOrNo', async (req, res) => {
  console.log("/YesOrNo 호출");
  try {
    const YesOrNo = await promptService.checkTailQuestion(req.body.question, req.body.answer);
    res.send(YesOrNo);
  } catch (error) {
    console.error('POST /YesOrNo error', error);
    res.status(500).json({ 'error': error.message });
  }
});

// [면접 진행] 꼬리 질문 생성
router.post('/generateTailQuestion', async (req, res) => {
  console.log("/generateTailQuestion 호출");
  try {
    const TailQuestion = await promptService.generateTailQuestion(req.body.question, req.body.answer);
    res.send(TailQuestion);
  } catch (error) {
    console.error('POST /generateTailQuestio error', error);
    res.status(500).json({ 'error': error.message });
  }
});


router.post('/preEval', async (req, res) => {
  try {
    console.log('POST /preEval 호출됨');
    const preEvalResult = await promptService.preEvaluate();
    console.log("사전조사 평가 완료", preEvalResult);
  } catch (error) {
    console.error('GET /preEval error', error);
    res.status(500).json({ 'error': error.message });
  }
});

router.post('/eval', async (req, res) => {
  try {
    console.log('POST /eval 호출됨');
    const evalResult = await promptService.evaluate();
    console.log("면접 평가 완료", evalResult);
  } catch (error) {
    console.error('GET /eval error', error);
    res.status(500).json({ 'error': error.message });
  }
});

router.get('/getAllPreQNA', async (req, res) => {
  try {
    console.log('/getAllPreQNA 호출됨');
    preQNADocuments = await promptService.getAllPreQNAData();

    res.json(preQNADocuments);

  } catch (error) {
    console.error('MongoDB 작업 중 오류 발생:', error);
    res.status(500).send('서버 오류 발생');
  } 
});

router.get('/getAllQNA', async (req, res) => {
  try {
    console.log('/getAllQNA 호출됨');
    QNADocuments = await promptService.getAllQNAData();

    res.json(QNADocuments);

  } catch (error) {
    console.error('MongoDB 작업 중 오류 발생:', error);
    res.status(500).send('서버 오류 발생');
  } 
});

router.get('/getPreQNA', async (req, res) => {
  console.log('/getPreQNA 호출됨');
  const { filename } = req.query;
  console.log("[/getPreQNA] filename: ", filename);
  try {
      const preQNAData = await promptService.getPreQNAData(filename);
      await promptService.updatePreQNAWithIndexes();
      await promptService.updatePreQNAWithCategory();
  
      if (preQNAData) {
          res.json(preQNAData);
      } else {
          res.status(404).send('Document not found');
      }


  } catch (error) {
      res.status(500).send('Server error');
  }
});

router.get('/getQNA', async (req, res) => {
  console.log('/getQNA 호출됨');
  const { filename } = req.query;
  console.log("[/getQNA] filename: ", filename);
  try {
      const QNAData = await promptService.getQNAData(filename);
      await promptService.updateQNAWithIndexes();
      await promptService.updateQNAWithCategory();
  
      if (QNAData) {
          res.json(QNAData);
      } else {
          res.status(404).send('Document not found');
      }


  } catch (error) {
      res.status(500).send('Server error');
  }
});


module.exports = router;