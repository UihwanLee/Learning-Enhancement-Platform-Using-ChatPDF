import React from 'react';
import Header from './Header'
import RechartsEvaluate from './RechartEvaluate';
import RechartsDay from './RechartsDay';
import RechartsDocument from './RechartsDocument';
import RechartsMyData from './RechartMyData';
import RechartsCategory from './RechartCategory';

const data = [
  {
    name: "질문1",
    score: 70,
  },  
  {
      name: "질문2",
      score: 20,
  },
  {
      name: "질문3",
      score: 100,
  },
  {
      name: "질문4",
      score: 40,
  },
  {
      name: "질문5",
      score: 65,
  },
];

const evaluateCategoryData = [
  {
    "subject": "알고리즘",
    "value": 70,
    "fullMark": 100
  },
  {
      "subject": "네트워크",
      "value": 20,
      "fullMark": 100
  },
  {
    "subject": "운영체제",
    "value": 55,
    "fullMark": 100
  },
  {
      "subject": "데이터베이스",
      "value": 40,
      "fullMark": 100
    },
]

const evaluateCategoryCountData = [
  {
    "subject": "알고리즘",
    "value": 5,
    "fullMark": 100
  },
  {
      "subject": "네트워크",
      "value": 2,
      "fullMark": 100
  },
  {
    "subject": "운영체제",
    "value": 10,
    "fullMark": 100
  },
  {
      "subject": "데이터베이스",
      "value": 4,
      "fullMark": 100
    },
]

const user_id = "Uihwan";
const document1 = "algo.pdf";
const document2 = "알고리즘 노트.pdf";
const document3 = "운영체제.pdf";
const color1 = "#0CD3FF";
const color2 = "#AB0F21";

const MyPage = () => {

  // ddddd

  return (
    <div>
      <Header element="nexon" />
      <h1>My Page</h1>
      <div style={{display: 'flex'}}>
        <div>
          <h2>USER ID: {user_id}</h2>
          <h2>학습 통계량: 50%</h2>
        </div>
        <div>
          <br/>
        </div>
        <RechartsCategory></RechartsCategory>
        <RechartsMyData></RechartsMyData>
      </div>
      <h1>전체 지표</h1>
      <div style={{display: 'flex'}}>
        <RechartsEvaluate data={data}></RechartsEvaluate>
        <RechartsDay></RechartsDay>
      </div>
      <br/>
      <h1>학습 문서 별 지표</h1>
      <br/>
      <h2>알고리즘</h2>
      <div style={{display: 'flex'}}>
        <RechartsDocument document={document1} data={data} color={color1}></RechartsDocument>
        <RechartsDocument document={document2} data={data} color={color1}></RechartsDocument>
      </div>
      <br/>
      <h2>네트워크</h2>
      <br/>
      <h2>운영체제</h2>
      <div style={{display: 'flex'}}>
        <RechartsDocument document={document3} data={data} color={color2}></RechartsDocument>
      </div>
      <br/>
      <h2>데이터베이스</h2>
      <p>This is the content of My Page.</p>
    </div>
  );
};

export default MyPage;