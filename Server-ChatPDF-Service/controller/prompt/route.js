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
    const split_questions = question.split('!');
    split_questions.pop();
    questions = split_questions.map(item => item.trim());

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

// 답변 평가(점수, 종합의견, 모범답변 데이터 보냄)
router.get('/eval', async (req, res) => {
  console.log('GET /eval 호출')
  questions = [];
  answers = [];

  const db = await connectDB();
  let documents = await db.collection('prompt').find().toArray();
  if(documents){
      for(let i = 0; i <= 4; i++){
          questions.push(documents[i].question);
          answers.push(documents[i].answer);
      }
      console.log('questions---------------------');
      console.log(questions);
      console.log('answers-----------------------');
      console.log(answers);
      const resultAnswers = answers.map(String).join(', ');
      console.log('resultAnswers----------------------');
      console.log(resultAnswers)

      // DB에서 score, General_opinion, Model_answer 중 하나가 ''일 경우
      const query = {
          $or: [
            { score: null },
            { General_opinion: null },
            { Model_answer: null }
          ]
        };
      // 빈 데이터를 가진 첫 번째 문서 가져오기
      const documentWithEmptyData = await db.collection('prompt').findOne(query);

      // question과 answer를 저장할 변수 초기화
      let question, answer;

      // 문서가 존재하고 question과 answer 필드가 정의되어 있는지 확인
      if (documentWithEmptyData && 'question' in documentWithEmptyData && 'answer' in documentWithEmptyData) {
          // question과 answer 필드값 가져오기
          question = documentWithEmptyData.question;
          answer = documentWithEmptyData.answer;

          // 가져온 값 출력 또는 다른 작업 수행
          console.log('Question:', question);
          console.log('Answer:', answer);

          // 점수, 종합의견, 모범답변 각각 API 통해 불러오기
          const filePath = __dirname + "/algo.pdf";
          const prompt = `"${question}" 라는 질문에 "${answer}" 라는 답변을 했을 때 평가를 해주는데 평가를 3가지로 나눠서 해줘.
          3가지 평가은 각각 점수, 종합의견, 모범답변으로 나눠서 해주고 점수는 답변이 정확하다면 great, 어느 정도만 맞았다면 good, 완전히 틀렸다면 bad로 평가해줘.
          종합의견은 답변이 어느 정도 맞았는지, 아니면 틀렸는지 평가해주고 부가적인 설명을 포함한 종합적인 의견을 말해줘.
          모범답변은 질문에 대한 해설을 말해주고 내 답변을 그대로 말하지말고 더 구체적인 정답을 말해줘.
          그리고 각 답변의 끝에는 ! 문자를 꼭 넣어야 하는데 예를 들면 
          "점수: bad !
           종합의견: 답변이 완전히 틀렸습니다. 다이나믹 프로그래밍의 장점에 대해 정확한 설명이 제공되지 않았습니다. !
           모범답변: 다이나믹 프로그래밍의 장점은 중복 계산을 최소화하여 효율적인 알고리즘을 제공하고, 
           복잡한 문제를 간단한 부분 문제로 나누어 해결할 수 있는 점입니다. 또한, 최적화 문제나 최단 경로 문제 등에서 효과적으로 사용될 수 있습니다. 
           이러한 장점들로 인해 다이나믹 프로그래밍은 많은 문제 해결에 유용하게 활용됩니다. !"
           이런식으로 끝에 꼭 ! 문자를 넣어줘.
          `

          const eval_result = await chatPDF(filePath, prompt);
          console.log(eval_result);

          // eval_result 배열 쪼개기
          split_eval_result = eval_result.split('!');
          split_eval_result.pop();
          eval_list = split_eval_result.map(item => item.trim());
          console.log(eval_list);

          //DB에 점수, 종합의견, 모범답변 저장
          await db.collection('evaluation').insertOne({
            score: eval_list[0],
            General_opinion: eval_list[1],
            Model_answer: eval_list[2]
          })
          
      }
      

  } else {
      res.status(500).json({ 'error': 'Failed to get response from MongoBD' });
  }

});


module.exports = router;