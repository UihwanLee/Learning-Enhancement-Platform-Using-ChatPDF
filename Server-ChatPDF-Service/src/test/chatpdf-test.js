const { chatPDF } = require('../utils/chatPDF');
const path = require('path');

const filePath = path.join(__dirname, "알고리즘_테스트.pdf");
const prompt = `이 pdf 파일을 참조해서 이 주제와 관련해서 나의 학습 수준을 파악하기 위한 주관식 문제 5개를 직접 만들어서 내줘.
다른 말은 하지말고 문제만 말해주고 말 끝은 반드시 ! 하나를 넣어줘.`;
async function chatpdfTest(filePath, prompt){
    console.log("ChatPDF TEST");
    const question = await chatPDF(filePath, prompt);
    return question;
}

console.log(chatpdfTest(filePath, prompt));