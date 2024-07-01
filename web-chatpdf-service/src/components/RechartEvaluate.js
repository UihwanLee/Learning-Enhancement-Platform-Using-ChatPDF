import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
  } from "recharts";
  
  const data = [
    {
      name: "0",
      algorithm: 0,
      network: 0,
      operating_system: 0,
      database: 0,
    },  
    {
        name: "Bad",
        algorithm: 2,
        network: 0,
        operating_system: 4,
        database: 0,
    },
    {
        name: "Not Bad",
        algorithm: 5,
        network: 0,
        operating_system: 2,
        database: 0,
    },
    {
        name: "Good",
        algorithm: 1,
        network: 0,
        operating_system: 6,
        database: 0,
    },
    {
      name: "평가",
      algorithm: 0,
      network: 0,
      operating_system: 0,
      database: 0,
    },
  ];
  
  const RechartsEvaluate = (props) => {
    
    // 초기 카운터 객체
    const initialCount = {
      Bad: { "알고리즘": 0, "네트워크": 0, "운영체제": 0, "데이터베이스": 0 },
      NotBad: { "알고리즘": 0, "네트워크": 0, "운영체제": 0, "데이터베이스": 0 },
      Good: { "알고리즘": 0, "네트워크": 0, "운영체제": 0, "데이터베이스": 0 }
    };

  // 카테고리별 평가 데이터를 순회하여 개수를 세기
  const evaluationCounts = props.data.reduce((acc, item) => {
    const { category, evaluation } = item;
    if (evaluation) {
      Object.values(evaluation).forEach(evaluation => {
        if (evaluation && evaluation.length > 0) {
          const score = parseInt(evaluation[0], 10);
          if (!isNaN(score)) {
            const categoryKey = category.toLowerCase().replace(" ", "_");
            if (score <= 60) {
              acc.Bad[categoryKey] += 1;
            } else if (score > 60 && score <= 80) {
              acc.NotBad[categoryKey] += 1;
            } else if (score > 80) {
              acc.Good[categoryKey] += 1;
            }
          }
        }
      });
    }
    return acc;
  }, initialCount);

  // 카테고리별 평가 데이터를 순회하여 개수를 세기
  const evaluationCountsInterview = props.data2.reduce((acc, item) => {
    const { category, evaluation } = item;
    if (evaluation) {
      Object.values(evaluation).forEach(evaluation => {
        if (evaluation && evaluation.length > 0) {
          const score = parseInt(evaluation[0], 10);
          if (!isNaN(score)) {
            const categoryKey = category.toLowerCase().replace(" ", "_");
            if (score <= 60) {
              acc.Bad[categoryKey] += 1;
            } else if (score > 60 && score <= 80) {
              acc.NotBad[categoryKey] += 1;
            } else if (score > 80) {
              acc.Good[categoryKey] += 1;
            }
          }
        }
      });
    }
    return acc;
  }, initialCount);


    // 결과 데이터 배열 생성
    const evaluationData = [
      { name: "0", algorithm: 0, network: 0, operating_system: 0, database: 0 },  
      { name: 'Bad',  algorithm: evaluationCounts.Bad["알고리즘"] + evaluationCountsInterview.Bad["알고리즘"], 
                      network: evaluationCounts.Bad["네트워크"] + evaluationCountsInterview.Bad["네트워크"], 
                      operating_system: evaluationCounts.Bad["운영체제"] + evaluationCountsInterview.Bad["운영체제"], 
                      database: evaluationCounts.Bad["데이터베이스"] + evaluationCountsInterview.Bad["데이터베이스"] },
      { name: 'NotBad',  algorithm: evaluationCounts.NotBad["알고리즘"] + evaluationCountsInterview.NotBad["알고리즘"], 
                      network: evaluationCounts.NotBad["네트워크"] + evaluationCountsInterview.NotBad["네트워크"], 
                      operating_system: evaluationCounts.NotBad["운영체제"] + evaluationCountsInterview.NotBad["운영체제"], 
                      database: evaluationCounts.NotBad["데이터베이스"] + evaluationCountsInterview.NotBad["데이터베이스"] },
      { name: 'Good',  algorithm: evaluationCounts.Good["알고리즘"] + evaluationCountsInterview.Good["알고리즘"], 
                        network: evaluationCounts.Good["네트워크"] + evaluationCountsInterview.Good["네트워크"], 
                        operating_system: evaluationCounts.Good["운영체제"] + evaluationCountsInterview.Good["운영체제"], 
                        database: evaluationCounts.Good["데이터베이스"] + evaluationCountsInterview.Good["데이터베이스"] },
      { name: "평가", algorithm: 0, network: 0, operating_system: 0, database: 0 },  
    ];

    return (
      <>
        <LineChart width={600} height={400} data={evaluationData}>
          <Line type="linear" dataKey="algorithm" stroke="#0CD3FF" strokeWidth={3} />
          <Line type="natural" dataKey="network" stroke="#FFCA29" strokeWidth={3} />
          <Line type="natural" dataKey="operating_system" stroke="#FF0000" strokeWidth={3} />
          <Line type="natural" dataKey="database" stroke="#ACBD00" strokeWidth={3} />
          <CartesianGrid stroke="#ccc" />
          <YAxis />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
        </LineChart>
      </>
    );
  };
  
  export default RechartsEvaluate;