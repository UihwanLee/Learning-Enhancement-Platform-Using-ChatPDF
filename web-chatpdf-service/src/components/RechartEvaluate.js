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
      Bad: { algorithm: 0, network: 0, operating_system: 0, database: 0 },
      NotBad: { algorithm: 0, network: 0, operating_system: 0, database: 0 },
      Good: { algorithm: 0, network: 0, operating_system: 0, database: 0 }
    };

    // 카테고리별 평가 데이터를 순회하여 개수를 세기
  const evaluationCounts = data.reduce((acc, item) => {
    const { category, evaluation } = item;
    if (evaluation) {
      Object.values(evaluation).forEach(evaluation => {
        if (evaluation && evaluation.length > 0) {
          const score = parseInt(evaluation[0], 10);
          if (!isNaN(score)) {
            console.log(score);
            const categoryKey = category.toLowerCase().replace(" ", "_");
            if (score <= 30) {
              acc.Bad[categoryKey] += 1;
            } else if (score > 30 && score <= 70) {
              acc.NotBad[categoryKey] += 1;
            } else if (score > 70) {
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
      { name: 'Bad', ...evaluationCounts.Bad },
      { name: 'Not Bad', ...evaluationCounts.NotBad },
      { name: 'Good', ...evaluationCounts.Good },
      { name: "평가", algorithm: 0, network: 0, operating_system: 0, database: 0 },  
    ];

    return (
      <>
        <LineChart width={600} height={300} data={evaluationData}>
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