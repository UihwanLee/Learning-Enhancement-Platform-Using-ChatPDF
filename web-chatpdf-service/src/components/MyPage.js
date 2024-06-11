import React from 'react';
import Header from './Header';
import RechartsEvaluate from './RechartEvaluate';
import RechartsDay from './RechartsDay';
import RechartsDocument from './RechartsDocument';
import RechartsMyData from './RechartMyData';
import RechartsCategory from './RechartCategory';
import './MyPage.css'; // CSS 파일을 import

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

const user_id = "Uihwan";
const document1 = "algo.pdf";
const document2 = "알고리즘 노트.pdf";
const document3 = "운영체제.pdf";
const color1 = "#0CD3FF";
const color2 = "#AB0F21";

const MyPage = () => {
  return (
    <div className="mypage-container">
      <Header element="nexon" />
      <div className="mypage-section">
        <h1 className="mypage-section-title">My Page</h1>
        <div className="mypage-user-info">
          <h2>USER ID: {user_id}</h2>
          <h2>학습 통계량: 50%</h2>
        </div>
      </div>
      <div className="mypage-section">
        <RechartsCategory />
        <RechartsMyData />
      </div>
      <div className="mypage-section">
        <h1 className="mypage-section-title">전체 지표</h1>
        <div className="mypage-chart-container">
          <RechartsEvaluate />
          <RechartsDay />
        </div>
      </div>
      <div className="mypage-section">
        <h1 className="mypage-section-title">학습 문서 별 지표</h1>
        <div className="mypage-document-section">
          <div className="mypage-subject-box">
            <h2 className="mypage-subject-title">알고리즘</h2>
            <div className="mypage-document-container">
              <RechartsDocument document={document1} data={data} color={color1} />
              <RechartsDocument document={document2} data={data} color={color1} />
            </div>
          </div>
          <div className="mypage-subject-box">
            <h2 className="mypage-subject-title">네트워크</h2>
            <div className="mypage-document-container">
              <RechartsDocument document="Empty Chart" data={[]} color="#000000" />
            </div>
          </div>
          <div className="mypage-subject-box">
            <h2 className="mypage-subject-title">운영체제</h2>
            <div className="mypage-document-container">
              <RechartsDocument document={document3} data={data} color={color2} />
            </div>
          </div>
          <div className="mypage-subject-box">
            <h2 className="mypage-subject-title">데이터베이스</h2>
            <div className="mypage-document-container">
              <RechartsDocument document="Empty Chart" data={[]} color="#000000" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
