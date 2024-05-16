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
        name: "2024-05-06",
        algorithm: 0,
        network: 5,
        operating_system: 3,
        database: 0,
    },
    {
        name: "2024-05-07",
        algorithm: 3,
        network: 1,
        operating_system: 2,
        database: 6,
    },
    {
        name: "2024-05-08",
        algorithm: 0,
        network: 3,
        operating_system: 2,
        database: 4,
    },
    {
        name: "2024-05-09",
        algorithm: 6,
        network: 0,
        operating_system: 0,
        database: 4,
    },
    {
        name: "2024-05-10",
        algorithm: 2,
        network: 1,
        operating_system: 5,
        database: 4,
    },
    {
        name: "2024-05-11",
        algorithm: 0,
        network: 2,
        operating_system: 0,
        database: 0,
    },
    {
        name: "2024-05-12",
        algorithm: 6,
        network: 7,
        operating_system: 2,
        database: 0,
    },
  ];
  
  const RechartsDay = () => {
    return (
      <>
        <LineChart width={600} height={300} data={data}>
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
  
  export default RechartsDay;