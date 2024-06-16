import React, { useCallback, useState, useEffect } from "react";
import Header from './Header'
import RechartsEvaluate from './RechartEvaluate';
import RechartsDay from './RechartsDay';
import RechartsDocument from './RechartsDocument';
import RechartsMyData from './RechartMyData';
import RechartsCategory from './RechartCategory';

// JSON 데이터
const jsonData = [
    {
        "filename": "운영체제 테스트 파일.pdf",
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

const COLORS = ['#0CD3FF', '#AB0F21', '#0088FE', '#FF8042'];

const TestPage = () => {

  //const [data, setData] = useState(null);

  // 데이터 정보 받아오기
//   useEffect(() => {
//     // 데이터 fetch 함수
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/data'); // API 경로 수정 필요
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

    useEffect(() => {
        // 데이터 fetch 함수
        //setData(jsonData);

    }, []); // 두 번째 인자로 빈 배열을 전달하여 한 번만 호출하도록 설정


  // 카테고리별로 데이터 필터링
  const algorithmDocuments = jsonData.filter(doc => doc.category === '알고리즘');
  const networkDocuments = jsonData.filter(doc => doc.category === '네트워크');
  const osDocuments = jsonData.filter(doc => doc.category === '운영체제');
  const dbDocuments = jsonData.filter(doc => doc.category === '데이터베이스');

  if (!algorithmDocuments) {
    return <div>Loading...</div>;
  }

  //const evaluationScores = Object.values(evaluation).map(([score]) => parseInt(score, 10));

  // 예시에서 사용할 점수 데이터
  const exampleEvaluationData = [
    { name: '질문1', score: 70 },
    { name: '질문2', score: 20 },
    { name: '질문3', score: 100 },
    { name: '질문4', score: 40 },
    { name: '질문5', score: 65 },
  ];

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
        <RechartsDay></RechartsDay>
      </div>
      <br/>
      <h1>학습 문서 별 지표</h1>
      <br/>
      <h2>알고리즘</h2>
      <div style={{display: 'flex'}}>
      {algorithmDocuments.map((doc, index) => (
          <RechartsDocument document={doc.filename} data={doc.evaluation} color={COLORS[0]} />
        ))}
      </div>
      <br/>
      <h2>네트워크</h2>
      {networkDocuments.map((doc, index) => (
          <RechartsDocument key={index} document={doc.filename} data={doc.evaluation} color={COLORS[1]} />
        ))}
      <br/>
      <h2>운영체제</h2>
      <div style={{display: 'flex'}}>
      {osDocuments.map((doc, index) => (
          <RechartsDocument key={index} document={doc.filename} data={doc.evaluation} color={COLORS[2]} />
        ))}
      </div>
      <br/>
      <h2>데이터베이스</h2>
      {dbDocuments.map((doc, index) => (
          <RechartsDocument key={index} document={doc.filename} data={doc.evaluation} color={COLORS[3]} />
        ))}
      <p>This is the content of My Page.</p>
    </div>
  );
};

export default TestPage;