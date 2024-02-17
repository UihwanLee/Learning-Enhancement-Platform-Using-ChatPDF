const axios = require("axios");
const { chatPDF } = require('./chatPDF');
const express = require('express');
const app = express();
app.set('view engine', 'ejs')
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.render('index.ejs');
})

app.post('/', async (req, res) => {
    const filePath = './algo.pdf';
    const prompt = '이 pdf 파일을 참조해서 이 주제와 관련해서 나의 학습 수준을 파악하기 위한 주관식 문제 5개를 직접 만들어서 내줘. 다른 말은 하지말고 문제만 말해줘';
    
    const result = await chatPDF(filePath, prompt);
    //Preliminary Investigation Question, 사전 조사 문제 배열
    const preInvQ = result.split('?');
    
    
    if (result) {
        res.render('pre.ejs', { preInvQ: preInvQ });
    } else {
        res.status(500).json({ 'error': 'Failed to get response from ChatPDF API' });
    }
});


app.get('/ask', async (req, res) => {
    res.render('askPDF.ejs');
})

app.post('/ask', async (req, res) => {
    const filePath = req.body.filePath;
    const prompt = req.body.prompt;
    // result = 답변
    const result = await chatPDF(filePath, prompt);
    console.log(result);
    
    if (result) {
        res.send(result);
    } else {
        res.status(500).json({ 'error': 'Failed to get response from ChatPDF API' });
    }
});



app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
})
//chatPDF('./test2.pdf', "이 파일에서 관련 연구 및 사례는 어떤 것들이 있는지 알려줘");

