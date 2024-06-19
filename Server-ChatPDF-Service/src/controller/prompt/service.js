const { MongoClient } = require('mongodb');
const connectDB = require('../../utils/connectDB');
const { chatPDF } = require('../../utils/chatPDF');
const fs = require('fs');
const path = require('path');

const { getDocumentPath } = require('../files/documentStore');

let answers = [];
let result = {};

// 사전 조사 질문 데이터 정제
function PreCleanData(rawData) {
  // 데이터에서 '!'를 기준으로 분리
  let sections = rawData.split('!');
  let cleanedData = [];

  sections.forEach(section => {
      // 각 섹션을 줄 단위로 분리하고 트림
      let cleanedLine = section.trim();
      // 숫자와 점을 제거한 후 필요없는 공백을 트림
      cleanedLine = cleanedLine.replace(/^\d+\.\s*/, '').trim();
      // 비어 있지 않은 줄만 추출
      if (cleanedLine) {
          cleanedData.push(cleanedLine);
      }
  });

  // 필요한 데이터들 사이에 '!' 추가
  return cleanedData.join('!');
}

// [사전 조사] 초기 질문 5개 생성
async function generateQuestions(numQuestions) {
  answers.length = 0; // answers 초기화
  const db = await connectDB();
  const filePath = getDocumentPath(); 
  const filename = path.basename(filePath);

  const fileInfo = await db.collection('fileInfo').findOne(
    { filename: filename }
  );

  const prompt = `이 파일과 관련된 지식 수준을 파악할 수 있는 문제를 ${numQuestions}개 내줘. 
  문제는 ${fileInfo.indexes[0]}, ${fileInfo.indexes[1]}, ${fileInfo.indexes[2]}, 
  ${fileInfo.indexes[3]}, ${fileInfo.indexes[4]}, 이 5가지 주제에서 하나씩 그 주제와 관련된 문제를 내줘. 
  문제는 단답형으로 답변할 수 있을 만한 문제들로 간단하게 내줘.
  오직 문제만 대답하고 문제 앞의 설명은 생략해. 그리고 각 문제들의 끝에는 반드시 ! 하나를 넣어줘.`;

  // 크기가 5인 questions 배열 데이터 생성
  const question = await chatPDF(filePath, prompt);

  // 데이터 정제
  cleaned_question = PreCleanData(question);

  const split_questions = cleaned_question.split('!');
  //split_questions.pop();
  const questions = split_questions.map(item => item.trim());

  // 동일한 filename이 이미 존재하는지 확인
  const existingDocument = await db.collection('preQNA').findOne({ filename: filename });

  if (existingDocument) {
    console.log(`filename이 ${filename}인 문서가 이미 존재합니다. Insert를 생략합니다.`);
  } else {
    // 동일한 filename이 존재하지 않는 경우에만 삽입
    const insertResult = await db.collection('preQNA').insertOne({ filename: filename, questions: questions, answers: null });
    console.log(`filename이 ${filename}인 문서가 성공적으로 삽입되었습니다.`, insertResult.insertedId);
  }
  

  return questions;
}

// [면접 진행] index에 따라 질문 3개 생성
async function generateDetailQuestions(numQuestions, category) {
  const db = await connectDB();
  const filePath = getDocumentPath(); 
  const filename = path.basename(filePath);
  const prompt = `이 pdf 파일을 참조해서 ${category}와 관련된 지식 수준을 파악하기 위한 주관식 문제 ${numQuestions}개를 직접 만들어서 내줘. 
  다른 말은 하지말고 문제만 말해주고 말 끝은 반드시 ! 하나를 넣어줘.`;

  const question = await chatPDF(filePath, prompt);
  const split_questions = question.split('!');
  split_questions.pop();
  const questions = split_questions.map(item => item.trim());

  await db.collection('QNA').insertOne({ filename: filename, questions: questions, answers: null });

  return questions;
}


async function updateAnswer(answer) {
  const db = await connectDB();
  const filePath = getDocumentPath(); 
  const filename = path.basename(filePath);

  // answers 배열에 새로운 answer 추가
  answers.push(answer);
  console.log("updateAnswer answer: ", answer);

  // answers 배열의 크기가 5가 되면 업데이트 수행
  if (answers.length === 5) {
    const newAnswerArray = answers.slice(); // answers 배열 복사

    const result = await db.collection('preQNA').updateMany(
        { filename: filename },
        { $set: { answers: newAnswerArray } }
    );

    if (result.modifiedCount > 0) {
        console.log(`preQNA 컬렉션의 ${result.modifiedCount}개의 문서가 성공적으로 업데이트되었습니다.`);
    } else {
        console.log('업데이트된 문서가 없습니다.');
    }

    // 업데이트 후 answers 배열 초기화
    answers.length = 0;
  }
  return result;
}

// [면접 진행] 꼬리 질문을 생성해야할지 판단하는 라우터, YesOrNo
async function checkTailQuestion(question, answer) {
  const db = await connectDB();
  const filePath = getDocumentPath(); 
  const filename = path.basename(filePath);

  const prompt = `${question} 에 대한 답으로 ${answer} 라고 대답을 했는데 어느 정도 정답에 가까운 거 같아? 
  다른 말 하지말고 Yes/No 중에 대답해줘`;
  console.log(prompt);
  const YesOrNo = await chatPDF(filePath, prompt);
  console.log("YesOrNo: ", YesOrNo);
  return YesOrNo;
}

// 꼬리질문 생성하는 함수
async function generateTailQuestion(question, answer) {
  const db = await connectDB();
  const filePath = getDocumentPath(); 
  const filename = path.basename(filePath);
  
  const prompt = `${question}에 대한 답으로 ${answer}라고 대답을 했을 때 이 대답에 대해 면접 상황에서 추가적으로 물어 볼만한 문제를 내줘. 
  다른 말 하지 말고 오직 문제만 말해줘. 그리고 말투는 질문 형식으로 해줘.`;
  console.log(prompt);
  const TailQuestion = await chatPDF(filePath, prompt);
  console.log("TailQuestion: ", TailQuestion);
  return TailQuestion;
}


// fileInfo에 categoty 필드 추가
async function updateFileInfoWithCategory() {
  try {
    const db = await connectDB();

    const studyRoomCollection = db.collection('studyRoom');
    const fileInfoCollection = db.collection('fileInfo');

    const filePath = getDocumentPath(); 
    const filename = path.basename(filePath);

    // studyRoom 컬렉션에서 titlePDF가 filename과 같은 문서 찾기
    const studyRoom = await studyRoomCollection.findOne({ titlePDF: filename });

    if (studyRoom) {
      const { category } = studyRoom;

      // fileInfo 컬렉션에서 filename이 일치하는 문서 업데이트
      const updateResult = await fileInfoCollection.updateMany(
        { filename: filename },
        { $set: { category: category } }
      );

      console.log(`${filename}의 category 업데이트 결과:`, updateResult.modifiedCount);
    }
  } catch (error) {
    console.error('MongoDB 작업 중 오류 발생:', error);
  } 
}

// 평가 데이터 정제
function cleanData(rawData) {
  // 데이터에서 '!'를 기준으로 분리
  let sections = rawData.split('!');
  let cleanedData = [];

  sections.forEach(section => {
      // 각 섹션을 줄 단위로 분리
      let lines = section.split('\n');
      lines.forEach(line => {
          // 숫자와 점을 제거한 후 필요없는 공백을 트림
          let cleanedLine = line.replace(/^\d+\.\s*/, '').trim();
          // 끝에 '#' 문자가 있으면 제거
          cleanedLine = cleanedLine.replace(/#$/, '').trim();
          // 슬래시 형식의 데이터만 추출
          if (cleanedLine.match(/^\d+\s*\/\s*.*\/\s*.*$/)) {
              cleanedData.push(cleanedLine);
          }
      });
  });

  // 필요한 데이터들 사이에 '#' 추가
  return cleanedData.join('#');
}

// [사전 조사] 5개의 QNA 평가
async function preEvaluate() {
  updateFileInfoWithCategory();
  const db = await connectDB();
  preQNACollection = db.collection('preQNA');
  const filePath = getDocumentPath(); 
  const filename = path.basename(filePath);

  const preQNA = await preQNACollection.findOne(
    { filename: filename },
    { projection: { questions: 1, answers: 1, _id: 0 } }
  );

  if (preQNA) {
    console.log('questions:', preQNA.questions);
    console.log('answers:', preQNA.answers);
  } else {
      console.log('해당 filename을 가진 문서를 찾을 수 없습니다.');
  }
  
  // '/' 로 점수, 모범답변, 종합의견 구분, '#' 로 각각의 평가 구분
  const evalPrompt = `아래 질문과 답변 5개에 대해 각각 평가를 해줘. 평가는 점수, 모범답변, 종합의견 3가지로 나눠서 해주고 
  점수는 0~100점, 모범답변은 질문에 대해 가장 정답에 가까운 예시 답변, 종합의견은 답변에 대한 평가를 해줘. 
  다른 말은 하지말고 오직 평가만 해주고 점수, 모범답변, 종합의견 사이에는 '/' 문자를 하나 넣어주고 5개의 평가들 사이에는 '#' 문자 하나를 넣어주고, 
  첫 평가 앞과 마지막 평가 마지막에 각각 '!' 문자 하나씩 넣어줘.
  예를 들어 
  1. 질문: 이진 검색 트리에서 삽입 연산의 평균 시간 복잡도는?
  답변: O(log n)
  2. 질문: 퀵 정렬의 최악의 경우 시간 복잡도는?
  답변: O(n^2)
  3. 질문: 그래프 탐색에서 BFS가 사용하는 자료 구조는?
  답변: 큐
  4. 질문: 다익스트라 알고리즘에서 가중치가 음수인 간선이 존재할 때의 문제점은?
  답변: 잘못된 결과
  5. 질문: 병합 정렬의 안정성 여부는?
  답변: 안정적
  이 5개의 질문과 답변에 대한 평가를
  "!80/ O(log n)/ 올바른 답변입니다. 정확한 시간 복잡도를 제시했습니다.#
  90/ O(n^2)/ 올바른 답변입니다. 다만, 최악의 경우를 피하기 위한 피벗 선택 전략에 대한 추가 설명이 있으면 더 좋습니다.#
  95/ 큐/ 올바른 답변입니다. 정확한 자료 구조를 제시했습니다.#
  70/ 잘못된 결과/ 문제점을 정확히 지적했으나, 음수 가중치가 존재할 때 다익스트라 알고리즘이 왜 잘못된 결과를 도출하는지에 대한 추가 설명이 있으면 좋습니다.#
  100/ 안정적/ 올바른 답변입니다. 병합 정렬의 안정성 여부를 정확히 제시했습니다.!"
  이런 형식으로 아래 질문과 답변 5개에 대해 각각 평가를 해줘.
  1. 질문: ${preQNA.questions[0]} 답변: ${preQNA.answers[0]}
  2. 질문: ${preQNA.questions[1]} 답변: ${preQNA.answers[1]}
  3. 질문: ${preQNA.questions[2]} 답변: ${preQNA.answers[2]}
  4. 질문: ${preQNA.questions[3]} 답변: ${preQNA.answers[3]}
  5. 질문: ${preQNA.questions[4]} 답변: ${preQNA.answers[4]}`;

  const evalResponse = await chatPDF(filePath, evalPrompt);
  console.log("chatpdf의 평가: ", evalResponse);

  // 평가 데이터 정제
  const cleaned_evalResponse = cleanData(evalResponse);

  // '#'로 구분된 섹션을 분리
  const sections = cleaned_evalResponse.split('#');
  let evalResult = {};

  // 각 섹션을 '/'로 나누어 result 객체에 저장
  sections.forEach((section, index) => {
      evalResult[index] = section.split('/');
  });

  // preQNA에 filename을 기준으로 evaluation 필드 추가
  const updateResult = await preQNACollection.updateMany(
    { filename: filename },
    { $set: { evaluation: evalResult } }
  );

  if (updateResult.modifiedCount > 0) {
      console.log(`${updateResult.modifiedCount}개의 문서가 성공적으로 업데이트되었습니다.`);
  } else {
      console.log('업데이트된 문서가 없습니다.');
  }

  return evalResult;
}

// [사전 조사] filename에 따라 questions, answers, evaluation, indexes 반환
async function getPreQNAData(filename) {
  const db = await connectDB();
  preQNACollection = db.collection('preQNA');

  const preQNAData = await preQNACollection.findOne(
    { filename: filename },
    { projection: { questions: 1, answers: 1, evaluation: 1, indexes: 1, _id: 0 } }
  );

  return preQNAData;
}

async function updatePreQNAWithIndexes() {
  try {
    const db = await connectDB();
    const fileInfoCollection = db.collection('fileInfo');
    const preQNACollection = db.collection('preQNA');

    // fileInfo 컬렉션에서 모든 문서 가져오기
    const fileInfos = await fileInfoCollection.find({}).toArray();

    for (const fileInfo of fileInfos) {
      const { filename, indexes } = fileInfo;

      // preQNA 컬렉션에서 filename이 일치하는 문서 업데이트
      const updateResult = await preQNACollection.updateMany(
        { filename: filename },
        { $set: { indexes: indexes } }
      );

      console.log(`${filename}의 indexes 업데이트 결과:`, updateResult.modifiedCount);
    }
  } catch (error) {
    console.error('MongoDB 작업 중 오류 발생:', error);
  } 
}

module.exports = {
  generateQuestions,
  generateDetailQuestions,
  updateAnswer,
  preEvaluate,
  getPreQNAData,
  checkTailQuestion,
  generateTailQuestion,
  updatePreQNAWithIndexes
};