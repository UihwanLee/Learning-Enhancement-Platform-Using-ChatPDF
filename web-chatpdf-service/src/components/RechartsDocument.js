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
  
  const RechartsDocument = (props) => {

    // props.evaluation 객체를 필요한 형식으로 변환
    const evaluationData = Object.entries(props.data).map(([key, value], index) => ({
      name: `질문${index + 1}`,
      score: parseInt(value[0], 10), // 점수를 정수로 변환
    }));

    return (
      <>
        <h3>{props.document}</h3>
        <LineChart width={600} height={300} data={evaluationData}>
          <Line type="linear" dataKey="score" stroke={props.color} strokeWidth={3} />
          <CartesianGrid stroke="#ccc" />
          <YAxis domain={[0, 100]} /> 
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
        </LineChart>
      </>
    );
  };
  
  export default RechartsDocument;