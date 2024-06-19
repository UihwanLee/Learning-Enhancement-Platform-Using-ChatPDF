import React from "react";
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

const RechartsEvaluate = () => {
  return (
    <>
      <LineChart width={600} height={300} data={data}>
        <Line type="linear" dataKey="algorithm" stroke="#0CD3FF" strokeWidth={3} />
        <Line type="natural" dataKey="network" stroke="#FFCA29" strokeWidth={3} />
        <Line type="natural" dataKey="operating_system" stroke="#FF0000" strokeWidth={3} />
        <Line type="natural" dataKey="database" stroke="#ACBD00" strokeWidth={3} />
        <CartesianGrid stroke="#ccc" />
        <YAxis type="number" domain={[0, 100]} />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
      </LineChart>
    </>
  );
};

export default RechartsEvaluate;
