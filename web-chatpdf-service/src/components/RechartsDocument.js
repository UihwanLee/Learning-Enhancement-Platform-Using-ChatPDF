import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
  } from "recharts";
  
  const RechartsDocument = (props) => {
    return (
      <>
        <h3>{props.document}</h3>
        <LineChart width={600} height={300} data={props.data}>
          <Line type="linear" dataKey="score" stroke={props.color} strokeWidth={3} />
          <CartesianGrid stroke="#ccc" />
          <YAxis />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
        </LineChart>
      </>
    );
  };
  
  export default RechartsDocument;