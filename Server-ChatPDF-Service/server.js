const axios = require("axios");
const { chatPDF } = require('./chatPDF');
const express = require('express');
const app = express();
app.set('view engine', 'ejs')
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());

const { MongoClient } = require('mongodb')

let db
const url = process.env.MONGODB_KEY;
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('ChatPDF_test')

  app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3001');
  })
  
}).catch((err)=>{
  console.log(err)
})

app.get('/', async (req, res) => {
    res.render('pre.ejs');
})

app.post('/', async (req, res) => {
    console.log('POST / 호출');
    const filePath = './algo.pdf';
    const prompt = `이 pdf 파일을 참조해서 이 주제와 관련해서 나의 학습 수준을 파악하기 위한 주관식 문제 5개를 직접 만들어서 내줘.
    다른 말은 하지말고 문제만 말해주고 말 끝은 반드시 ! 하나를 넣어줘.`;
    
    const result = await chatPDF(filePath, prompt);
    // Question buffer
    const Qbuffer = result.split('!');
    // Answer buffer
    const Abuffer = [];
    for (let i = 1; i <= 5; i++) {
        Abuffer.push(req.body['answer' + i]);
    }
    console.log(Abuffer);
    if(Abuffer[0] != null){
        for (let i = 0; i < 5; i++){
            // userID: user의 ID, question: chatpdf의 질문, answer: user의 답변, score: [great, good, not bad, bad] 중 하나
            // General_opinion: user의 답변에 따른 chatpdf의 종합 의견, Model_answer: chatpdf의 질문의 모범 답변
            await db.collection('prompt').insertOne( { userID: null, question: Qbuffer[i], answer: Abuffer[i], score: null, General_opinion: null, Model_answer: null});
        }
    } else{
        console.log('Abuffer none');
    }

         
    if (result) {
        res.render('index.ejs', { Qbuffer: Qbuffer });
    } else {
        res.status(500).json({ 'error': 'Failed to get response from ChatPDF API' });
    }
});

// score 페이지
app.get('/score', async (req, res) => {
    res.render('score.ejs');
});

app.post('/score', async (req, res) => {
    console.log('POST /score 호출')
    questions = [];
    answers = [];

    let result = await db.collection('prompt').find().toArray()
    console.log(result);

    if(result){
        for(let i = 0; i <= 4; i++){
            questions.push(result[i].question);
            answers.push(result[i].answer);
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
            const filePath = './algo.pdf';
            const prompt1 = `"${question}" 라는 질문에 "${answer}" 라는 대답을 했을 때 
            점수를 great, good, bad 3가지 경우로 나누어서 평가해줘. 다른 대답은 하지말고 오직 점수만 말해줘.`;
            const prompt2 = `"${question}" 라는 질문에 ${answer} 라는 대답을 했을 때
            답변이 어느 정도 맞았는지, 아니면 틀렸는지 평가해주고 부가적인 설명을 포함한 종합적인 의견을 말해줘. 다른 대답은 하지말고 오직 의견만 말해줘.`;
            const prompt3 = `${question} 라는 질문에 ${answer} 라는 대답을 했을 때 답변에 대한 모범 답변을 말해줘. 
            내 답변을 그대로 말하지말고 더 구체적인 정답을 말해줘. 다른 대답은 하지말고 오직 모범 답변만 말해줘.`;

            const score_result = await chatPDF(filePath, prompt1);
            console.log('점수 ----------------------');
            console.log(score_result)
            const General_opinion_result = await chatPDF(filePath, prompt2);
            console.log('종합 의견 ----------------------');
            console.log(General_opinion_result)
            const Model_answer_result = await chatPDF(filePath, prompt3);
            console.log('모범 답변 ----------------------');
            console.log(Model_answer_result)

            // DB에 점수, 종합의견, 모범답변 저장
            const updateFields = {
                $set: {
                score: score_result,
                General_opinion: General_opinion_result,
                Model_answer: Model_answer_result
                }
            };
        
            const updateResult = await db.collection('prompt').updateOne(query, updateFields);
            } else {
                console.log('Document가 존재하지 않습니다.');
            }

        

    } else {
        res.status(500).json({ 'error': 'Failed to get response from MongoBD' });
    }
 
});

// app.post("/question", async (req, res) => {
//     // question 필드가 존재하는 문서를 찾는 쿼리
//     const query = {
//     $and: [
//         { question: { $exists: true } },
//         { answer: { $exists: true } }
//     ]
//     };

//     try {
//     // 쿼리에 맞는 문서들 가져오기
//     const documentsWithFields = await db.collection('prompt').find(query).toArray();

//     documentsWithFields.forEach(document => {
//         console.log('Question:', document.question);
//         console.log('Answer:', document.answer);
        
//     });
//     } catch (error) {
//     console.error('문서 가져오기 실패:', error);
//     }
// });

// 질문 전송 버튼 클릭 이벤트, api 통해 질문 1개 뽑아줌.
app.get("/api/question", async (req, res) => {
    console.log('POST /api/question 호출');
    const filePath = './algo.pdf';
    const prompt = `이 pdf 파일을 참고해서 알고리즘을 제대로 공부했는지 테스트하기 위한 주관식 문제를 하나 내줘.
    다양한 문제를 풀어보기 위해 물어볼때마다 다른 문제를 내줘. 그리고 다른 말은 하지말고 오직 문제만 말해줘.`;
    
    const question = await chatPDF(filePath, prompt);
    console.log("question: ", question);
    res.send(question);
});

app.get('/api/createQuestion', async (req, res) => {
    console.log('GET /api/createQuestion 호출');
    const filePath = './algo.pdf';
    const prompt = `이 pdf 파일을 참조해서 이 주제와 관련해서 나의 학습 수준을 파악하기 위한 주관식 문제 5개를 직접 만들어서 내줘.
    다른 말은 하지말고 문제만 말해주고 말 끝은 반드시 ! 하나를 넣어줘.`;
    
    const question = await chatPDF(filePath, prompt);
    // Question buffer
    const Qbuffer = question.split('!');
    
    
    for (let i = 0; i < 5; i++){
        // userID: user의 ID, question: chatpdf의 질문, answer: user의 답변, score: [great, good, not bad, bad] 중 하나
        // General_opinion: user의 답변에 따른 chatpdf의 종합 의견, Model_answer: chatpdf의 질문의 모범 답변
        await db.collection('prompt').insertOne( { userID: null, question: Qbuffer[i], answer: null, score: null, General_opinion: null, Model_answer: null});
    }
    

         
    if (question) {
        //react로 question 전송
        res.send(Qbuffer[0]);
    } else {
        res.status(500).json({ 'error': 'Failed to get response from ChatPDF API' });
    }
});

app.post('/api/sendAnswer', async (req, res) => {
    console.log('POST /api/sendAnswer 호출');
    
    await db.prompt.updateOne(
        // 조건: question 필드가 null이 아닌 경우
        { question: { $ne: null } },
        // 업데이트할 필드 및 값: answer 필드에 원하는 값을 설정합니다.
        { $set: { answer: req.body.answer } }
    );
    console.log(req.body);
      

  
});




