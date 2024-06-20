import React, { useCallback, useState, useEffect } from "react";
import Header from './Header'
import RechartsEvaluate from './RechartEvaluate';
import RechartsDay from './RechartsDay';
import RechartsDocument from './RechartsDocument';
import RechartsMyData from './RechartMyData';
import RechartsCategory from './RechartCategory';
import './MyPage.css'; // CSS 파일을 import
import { type } from "@testing-library/user-event/dist/type";
import axios from 'axios';

// JSON 데이터
const jsonData = [
  {
      "filename": "알고리즘 테스트 파일.pdf",
      "category": "알고리즘",
      "questions": [
      "1. 운영체제는 무엇을 하는 시스템인가요?",
      "2. 윈도우, 리눅스, 안드로이드 등 운영체제의 종류는 무엇이 있나요?",
      "3. 프로세스 관리란 무엇을 의미하나요?",
      "4. 주기억장치 관리는 어떤 역할을 하나요?",
      "5. 파일 시스템이란 무엇을 관리하는 시스템인가요?"
      ],
      "answers": [
      "운영체제란 응용프로그램 또는 사용자가 컴퓨터 하드웨어를 편리하고 효율적으로 사용하기 위한 소프트웨어이다.",
      "윈도우, 리눅스 등이 있다.",
      "메인 메모리에 할당되어 실행중인 상태인 프로그램을 관리하는 것이다.",
      "주기억장치는 메모리에 정보를 저장했다가 CPU로 옮기는 작업을 한다.",
      "잘 모르겠다."
      ],
      "evaluation": {
      "0": [
          "60",
          "정확한 답변이지만 더 구체적으로 설명하면 좋을 것 같습니다",
          "답변에 필요한 정보가 더 필요합니다"
      ],
      "1": [
          "70",
          "윈도우, 리눅스 등이 운영체제의 종류에 해당합니다",
          "종합적인 정보를 제공하면 더 좋을 것 같습니다"
      ],
      "2": [
          "80",
          "프로세스 관리는 메인 메모리에 할당되어 실행중인 프로그램을 관리하는 것을 의미합니다",
          "정확하고 명확한 답변입니다"
      ],
      "3": [
          "70",
          "주기억장치는 정보를 저장하고 CPU로 전달하는 역할을 합니다",
          "좀 더 구체적으로 설명하면 좋을 것 같습니다"
      ],
      "4": [
          "30",
          "파일 시스템은 파일과 디렉토리를 관리하는 시스템입니다",
          "더 자세한 설명이 필요합니다."
      ]
      }
  },
  {
      "filename": "알고리즘 테스트 파일2.pdf",
      "category": "알고리즘",
      "questions": [
      "1. 운영체제는 무엇을 하는 시스템인가요?",
      "2. 윈도우, 리눅스, 안드로이드 등 운영체제의 종류는 무엇이 있나요?",
      "3. 프로세스 관리란 무엇을 의미하나요?",
      "4. 주기억장치 관리는 어떤 역할을 하나요?",
      "5. 파일 시스템이란 무엇을 관리하는 시스템인가요?"
      ],
      "answers": [
      "운영체제란 응용프로그램 또는 사용자가 컴퓨터 하드웨어를 편리하고 효율적으로 사용하기 위한 소프트웨어이다.",
      "윈도우, 리눅스 등이 있다.",
      "메인 메모리에 할당되어 실행중인 상태인 프로그램을 관리하는 것이다.",
      "주기억장치는 메모리에 정보를 저장했다가 CPU로 옮기는 작업을 한다.",
      "잘 모르겠다."
      ],
      "evaluation": {
      "0": [
          "100",
          "정확한 답변이지만 더 구체적으로 설명하면 좋을 것 같습니다",
          "답변에 필요한 정보가 더 필요합니다"
      ],
      "1": [
          "50",
          "윈도우, 리눅스 등이 운영체제의 종류에 해당합니다",
          "종합적인 정보를 제공하면 더 좋을 것 같습니다"
      ],
      "2": [
          "90",
          "프로세스 관리는 메인 메모리에 할당되어 실행중인 프로그램을 관리하는 것을 의미합니다",
          "정확하고 명확한 답변입니다"
      ],
      "3": [
          "0",
          "주기억장치는 정보를 저장하고 CPU로 전달하는 역할을 합니다",
          "좀 더 구체적으로 설명하면 좋을 것 같습니다"
      ],
      "4": [
          "70",
          "파일 시스템은 파일과 디렉토리를 관리하는 시스템입니다",
          "더 자세한 설명이 필요합니다."
      ]
      }
  },
  {
      "filename": "네트워크 테스트 파일.pdf",
      "category": "네트워크",
      "questions": [
      "1. 운영체제는 무엇을 하는 시스템인가요?",
      "2. 윈도우, 리눅스, 안드로이드 등 운영체제의 종류는 무엇이 있나요?",
      "3. 프로세스 관리란 무엇을 의미하나요?",
      "4. 주기억장치 관리는 어떤 역할을 하나요?",
      "5. 파일 시스템이란 무엇을 관리하는 시스템인가요?"
      ],
      "answers": [
      "운영체제란 응용프로그램 또는 사용자가 컴퓨터 하드웨어를 편리하고 효율적으로 사용하기 위한 소프트웨어이다.",
      "윈도우, 리눅스 등이 있다.",
      "메인 메모리에 할당되어 실행중인 상태인 프로그램을 관리하는 것이다.",
      "주기억장치는 메모리에 정보를 저장했다가 CPU로 옮기는 작업을 한다.",
      "잘 모르겠다."
      ],
      "evaluation": {
      "0": [
          "10",
          "정확한 답변이지만 더 구체적으로 설명하면 좋을 것 같습니다",
          "답변에 필요한 정보가 더 필요합니다"
      ],
      "1": [
          "60",
          "윈도우, 리눅스 등이 운영체제의 종류에 해당합니다",
          "종합적인 정보를 제공하면 더 좋을 것 같습니다"
      ],
      "2": [
          "50",
          "프로세스 관리는 메인 메모리에 할당되어 실행중인 프로그램을 관리하는 것을 의미합니다",
          "정확하고 명확한 답변입니다"
      ],
      "3": [
          "20",
          "주기억장치는 정보를 저장하고 CPU로 전달하는 역할을 합니다",
          "좀 더 구체적으로 설명하면 좋을 것 같습니다"
      ],
      "4": [
          "80",
          "파일 시스템은 파일과 디렉토리를 관리하는 시스템입니다",
          "더 자세한 설명이 필요합니다."
      ]
      }
  },
];

// JSON 데이터
const jsonData2 = [
  {
      "filename": "알고리즘 테스트 파일2.pdf",
      "category": "알고리즘",
      "questions": [
      "1. 운영체제는 무엇을 하는 시스템인가요?",
      "2. 윈도우, 리눅스, 안드로이드 등 운영체제의 종류는 무엇이 있나요?",
      "3. 프로세스 관리란 무엇을 의미하나요?",
      "4. 주기억장치 관리는 어떤 역할을 하나요?",
      "5. 파일 시스템이란 무엇을 관리하는 시스템인가요?",
      "6. 파일 시스템이란 무엇을 관리하는 시스템인가요?"
      ],
      "answers": [
      "운영체제란 응용프로그램 또는 사용자가 컴퓨터 하드웨어를 편리하고 효율적으로 사용하기 위한 소프트웨어이다.",
      "윈도우, 리눅스 등이 있다.",
      "메인 메모리에 할당되어 실행중인 상태인 프로그램을 관리하는 것이다.",
      "주기억장치는 메모리에 정보를 저장했다가 CPU로 옮기는 작업을 한다.",
      "잘 모르겠다.",
      "잘 모르겠다."
      ],
      "evaluation": {
      "0": [
          "15",
          "정확한 답변이지만 더 구체적으로 설명하면 좋을 것 같습니다",
          "답변에 필요한 정보가 더 필요합니다"
      ],
      "1": [
          "100",
          "윈도우, 리눅스 등이 운영체제의 종류에 해당합니다",
          "종합적인 정보를 제공하면 더 좋을 것 같습니다"
      ],
      "2": [
          "30",
          "프로세스 관리는 메인 메모리에 할당되어 실행중인 프로그램을 관리하는 것을 의미합니다",
          "정확하고 명확한 답변입니다"
      ],
      "3": [
          "60",
          "주기억장치는 정보를 저장하고 CPU로 전달하는 역할을 합니다",
          "좀 더 구체적으로 설명하면 좋을 것 같습니다"
      ],
      "4": [
          "10",
          "파일 시스템은 파일과 디렉토리를 관리하는 시스템입니다",
          "더 자세한 설명이 필요합니다."
      ],
      "5": [
          "20",
          "파일 시스템은 파일과 디렉토리를 관리하는 시스템입니다",
          "더 자세한 설명이 필요합니다."
      ]
      }
  },
  {
      "filename": "알고리즘 테스트 파일.pdf",
      "category": "알고리즘",
      "questions": [
      "1. 운영체제는 무엇을 하는 시스템인가요?",
      "2. 윈도우, 리눅스, 안드로이드 등 운영체제의 종류는 무엇이 있나요?",
      "3. 프로세스 관리란 무엇을 의미하나요?",
      ],
      "answers": [
      "운영체제란 응용프로그램 또는 사용자가 컴퓨터 하드웨어를 편리하고 효율적으로 사용하기 위한 소프트웨어이다.",
      "윈도우, 리눅스 등이 있다.",
      "메인 메모리에 할당되어 실행중인 상태인 프로그램을 관리하는 것이다.",
      ],
      "evaluation": {
      "0": [
          "40",
          "정확한 답변이지만 더 구체적으로 설명하면 좋을 것 같습니다",
          "답변에 필요한 정보가 더 필요합니다"
      ],
      "1": [
          "0",
          "윈도우, 리눅스 등이 운영체제의 종류에 해당합니다",
          "종합적인 정보를 제공하면 더 좋을 것 같습니다"
      ],
      "2": [
          "20",
          "프로세스 관리는 메인 메모리에 할당되어 실행중인 프로그램을 관리하는 것을 의미합니다",
          "정확하고 명확한 답변입니다"
      ],
      }
  },
  {
      "filename": "운영체제 테스트 파일.pdf",
      "category": "운영체제",
      "questions": [
      "1. 운영체제는 무엇을 하는 시스템인가요?",
      "2. 윈도우, 리눅스, 안드로이드 등 운영체제의 종류는 무엇이 있나요?",
      "3. 프로세스 관리란 무엇을 의미하나요?",
      "4. 주기억장치 관리는 어떤 역할을 하나요?",
      "5. 파일 시스템이란 무엇을 관리하는 시스템인가요?"
      ],
      "answers": [
      "운영체제란 응용프로그램 또는 사용자가 컴퓨터 하드웨어를 편리하고 효율적으로 사용하기 위한 소프트웨어이다.",
      "윈도우, 리눅스 등이 있다.",
      "메인 메모리에 할당되어 실행중인 상태인 프로그램을 관리하는 것이다.",
      "주기억장치는 메모리에 정보를 저장했다가 CPU로 옮기는 작업을 한다.",
      "잘 모르겠다."
      ],
      "evaluation": {
      "0": [
          "100",
          "정확한 답변이지만 더 구체적으로 설명하면 좋을 것 같습니다",
          "답변에 필요한 정보가 더 필요합니다"
      ],
      "1": [
          "60",
          "윈도우, 리눅스 등이 운영체제의 종류에 해당합니다",
          "종합적인 정보를 제공하면 더 좋을 것 같습니다"
      ],
      "2": [
          "40",
          "프로세스 관리는 메인 메모리에 할당되어 실행중인 프로그램을 관리하는 것을 의미합니다",
          "정확하고 명확한 답변입니다"
      ],
      "3": [
          "70",
          "주기억장치는 정보를 저장하고 CPU로 전달하는 역할을 합니다",
          "좀 더 구체적으로 설명하면 좋을 것 같습니다"
      ],
      "4": [
          "10",
          "파일 시스템은 파일과 디렉토리를 관리하는 시스템입니다",
          "더 자세한 설명이 필요합니다."
      ]
      }
  },
];

const user_id = "Uihwan";
const COLORS = ['#0CD3FF', '#66FF00', '#6633FF', '#0033FF'];
const COLORS_INTERVIEW = ['#FF0033', '#00FFFF', '#FF66FF', '#FF6600'];


const MyPage = () => {

  const [preQNAData, setPreQNAData] = useState([]);
  const [QNAData, setQNAData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //데이터 정보 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const preQNA = await axios.get('http://localhost:3001/prompt/getAllPreQNA');
        const QNA = await axios.get('http://localhost:3001/prompt/getAllQNA');

        console.log(preQNA.data[0].filename);
        console.log(preQNA.data[0].questions);
        console.log(preQNA.data[0].answers);
        console.log(preQNA.data[0].evaluation);
        console.log(preQNA.data[0].indexes);

        console.log(QNA.data[0].filename);
        console.log(QNA.data[0].questions);
        console.log(QNA.data[0].answers);
        console.log(QNA.data[0].evaluation);
        console.log(QNA.data[0].indexes);

        setPreQNAData(preQNA.data);
        setQNAData(QNA.data);
        setLoading(false);
      } catch (error) {
        setError(error.toString());
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // useEffect(() => {
  //     // 데이터 fetch 함수
  //     setPreQNAData(jsonData);
  //     setQNAData(jsonData2);
  // }, []); 

  if (!preQNAData || !QNAData) {
      return <div>Loading...</div>;
  }

  // 데이터 원소의 개수
  const dataCount = preQNAData.length + QNAData.length;

  // 질문 답변 횟수 계산
  const totalEvaluationsPreQNA = preQNAData.reduce((total, item) => {
      const evaluationCount = item.evaluation ? Object.keys(item.evaluation).length : 0;
      return total + evaluationCount;
  }, 0);

  const totalEvaluationsQNA = QNAData.reduce((total, item) => {
    const evaluationCount = item.evaluation ? Object.keys(item.evaluation).length : 0;
    return total + evaluationCount;
}, 0);

  // 카테고리별로 데이터 필터링
  const algorithmDocumentsPrev = preQNAData.filter(doc => doc.category === '알고리즘');
  const networkDocumentsPrev = preQNAData.filter(doc => doc.category === '네트워크');
  const osDocumentsPrev = preQNAData.filter(doc => doc.category === '운영체제');
  const dbDocumentsPrev = preQNAData.filter(doc => doc.category === '데이터베이스');

  const algorithmDocuments = QNAData.filter(doc => doc.category === '알고리즘');
  const networkDocuments = QNAData.filter(doc => doc.category === '네트워크');
  const osDocuments = QNAData.filter(doc => doc.category === '운영체제');
  const dbDocuments = QNAData.filter(doc => doc.category === '데이터베이스');

  const TYPE_PREINTERVIEW = "사전조사";
  const TYPE_INTERVIEW = "면접";

  return (
    <div>
    <Header element="nexon" />
    <div className="mypage-container">
      <div className="mypage-section">
        <h1 className="mypage-section-title">My Page</h1>
        <div className="mypage-user-info">
          <div className="mypage-subject-box">
          <h2>USER ID: {user_id}</h2>
          <h2>면접 횟수: {dataCount} </h2>
          <h2>질문 답변 횟수: {totalEvaluationsPreQNA + totalEvaluationsQNA}</h2>
          </div>
          <br/>
          <h2>[카테고리 학습량]</h2>
          <br/>
          <div style={{display: 'flex'}}>
            <div>
              <div className="mypage-subject-box">
              <h2>알고리즘: {algorithmDocumentsPrev.length}</h2>
              <h2>네트워크: {networkDocumentsPrev.length}</h2>
              <h2>운영체제: {osDocumentsPrev.length}</h2>
              <h2>데이터베이스: {dbDocumentsPrev.length}</h2>
            </div>
            <h2>사전조사</h2>
          </div>
          <div>
            <div className="mypage-subject-box">
              <h2>알고리즘: {algorithmDocuments.length}</h2>
              <h2>네트워크: {networkDocuments.length}</h2>
              <h2>운영체제: {osDocuments.length}</h2>
              <h2>데이터베이스: {dbDocuments.length}</h2>
            </div>
            <h2>면접</h2>
          </div>
          <div>
          <br/>
          </div>
      </div>
        </div>
      </div>
      <div className="mypage-section">
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h2 style={{textAlign: 'center'}}>사전조사: </h2>
          <RechartsCategory data={preQNAData} />
          <RechartsMyData data={preQNAData} />
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h2 style={{textAlign: 'center'}}>면접: </h2>
          <RechartsCategory data={QNAData} />
          <RechartsMyData data={QNAData} />
        </div>
      </div>
      <div className="mypage-section">
        <h1 className="mypage-section-title">전체 지표</h1>
        <div className="mypage-chart-container">
          <RechartsEvaluate data={preQNAData} data2={QNAData} />
          <div className="recharts-day-container">
  <h5 className="mypage-section-subtitle" style={{ textAlign: 'center' }}>{''}<br/>{''}</h5>
  <div style={{ width: '100%', textAlign: 'center' }}>
  <RechartsDay data={preQNAData} data2={QNAData}/>
  </div>
</div>

        </div>
      </div>
      <div className="mypage-section">
        <h1 className="mypage-section-title">학습 문서 별 지표</h1>
        <div className="mypage-document-section">
          <div className="mypage-subject-box">
            <h1 className="mypage-subject-title">알고리즘</h1>
            <br/>
            <div className="mypage-document-container">
              <div style={{display: 'flex'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {algorithmDocumentsPrev.length > 0 ? (
                        algorithmDocumentsPrev.map((doc, index) => (
                          <h2 key={index} style={{ textAlign: 'center', margin: '0 10px', flex: '1', alignItems: 'center' }}>
                            {doc.filename}
                          </h2>
                        ))
                      ) : (
                        algorithmDocuments.map((doc, index) => (
                          <h2 key={index} style={{ textAlign: 'center', margin: '0 10px', flex: '1', alignItems: 'center' }}>
                            {doc.filename}
                          </h2>
                        ))
                      )}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {algorithmDocumentsPrev.map((doc, index) => (
                      <RechartsDocument document={doc.filename} type={TYPE_PREINTERVIEW} data={doc.evaluation} color={COLORS[0]} />
                  ))}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {algorithmDocuments.map((doc, index) => (
                      <RechartsDocument document={doc.filename} type={TYPE_INTERVIEW} data={doc.evaluation} color={COLORS_INTERVIEW[0]} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mypage-subject-box">
            <h1 className="mypage-subject-title">네트워크</h1>
            <br/>
            <div className="mypage-document-container">
              <div style={{display: 'flex'}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {networkDocumentsPrev.length > 0 ? (
                        networkDocumentsPrev.map((doc, index) => (
                          <h2 key={index} style={{ textAlign: 'center', margin: '0 10px', flex: '1', alignItems: 'center' }}>
                            {doc.filename}
                          </h2>
                        ))
                      ) : (
                        networkDocuments.map((doc, index) => (
                          <h2 key={index} style={{ textAlign: 'center', margin: '0 10px', flex: '1', alignItems: 'center' }}>
                            {doc.filename}
                          </h2>
                        ))
                      )}
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {networkDocumentsPrev.map((doc, index) => (
                        <RechartsDocument document={doc.filename} type={TYPE_PREINTERVIEW} data={doc.evaluation} color={COLORS[1]} />
                    ))}
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {networkDocuments.map((doc, index) => (
                        <RechartsDocument document={doc.filename} type={TYPE_INTERVIEW} data={doc.evaluation} color={COLORS_INTERVIEW[1]} />
                    ))}
                  </div>
                </div>
            </div>
          </div>
          <div className="mypage-subject-box">
            <h1 className="mypage-subject-title">운영체제</h1>
            <br/>
            <div className="mypage-document-container">
            <div style={{display: 'flex'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {osDocumentsPrev.length > 0 ? (
                    osDocumentsPrev.map((doc, index) => (
                      <h2 key={index} style={{ textAlign: 'center', margin: '0 10px', flex: '1', alignItems: 'center' }}>
                        {doc.filename}
                      </h2>
                    ))
                  ) : (
                    osDocuments.map((doc, index) => (
                      <h2 key={index} style={{ textAlign: 'center', margin: '0 10px', flex: '1', alignItems: 'center' }}>
                        {doc.filename}
                      </h2>
                    ))
                  )}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {osDocumentsPrev.map((doc, index) => (
                      <RechartsDocument document={doc.filename} type={TYPE_PREINTERVIEW} data={doc.evaluation} color={COLORS[2]} />
                  ))}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {osDocuments.map((doc, index) => (
                      <RechartsDocument document={doc.filename} type={TYPE_INTERVIEW} data={doc.evaluation} color={COLORS_INTERVIEW[2]} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mypage-subject-box">
            <h1 className="mypage-subject-title">데이터베이스</h1>
            <br/>
            <div className="mypage-document-container">
            <div style={{display: 'flex'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {dbDocumentsPrev.length > 0 ? (
                      dbDocumentsPrev.map((doc, index) => (
                        <h2 key={index} style={{ textAlign: 'center', margin: '0 10px', flex: '1', alignItems: 'center' }}>
                          {doc.filename}
                        </h2>
                      ))
                    ) : (
                      dbDocuments.map((doc, index) => (
                        <h2 key={index} style={{ textAlign: 'center', margin: '0 10px', flex: '1', alignItems: 'center' }}>
                          {doc.filename}
                        </h2>
                      ))
                    )}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {dbDocumentsPrev.map((doc, index) => (
                      <RechartsDocument document={doc.filename} type={TYPE_PREINTERVIEW} data={doc.evaluation} color={COLORS[3]} />
                  ))}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {dbDocuments.map((doc, index) => (
                      <RechartsDocument document={doc.filename} type={TYPE_INTERVIEW} data={doc.evaluation} color={COLORS_INTERVIEW[3]} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyPage;