import React, { useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 데이터
const originalData = [
  { name: "2024-05-06", algorithm: 70, network: 80, operating_system: 75, database: 65 },
  { name: "2024-05-07", algorithm: 85, network: 60, operating_system: 70, database: 95 },
  { name: "2024-05-08", algorithm: 55, network: 70, operating_system: 60, database: 85 },
  { name: "2024-05-09", algorithm: 90, network: 50, operating_system: 80, database: 75 },
  { name: "2024-05-10", algorithm: 75, network: 65, operating_system: 85, database: 80 },
  { name: "2024-05-11", algorithm: 60, network: 85, operating_system: 55, database: 70 },
  { name: "2024-05-12", algorithm: 95, network: 90, operating_system: 95, database: 90 },
];

const RechartsDay = () => {
  const [startDate, setStartDate] = useState(originalData[0].name);
  const [endDate, setEndDate] = useState(originalData[originalData.length - 1].name);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // 선택된 날짜 범위 내의 데이터 필터링
  const filteredData = originalData.filter((entry) => {
    return entry.name >= startDate && entry.name <= endDate;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginBottom: "5px" }}>시작 날짜 </label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginBottom: "5px" }}>종료 날짜 </label>
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-45}
            height={60}
            textAnchor="end"
            tick={{ fontSize: 12 }}
            tickMargin={10}
            style={{ fontSize: "12px", lineHeight: "14px", textAnchor: "middle" }}
          />
          <YAxis
            domain={[0, 100]}
            allowDataOverflow={true}
            tickCount={6}
            width={80}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Bar dataKey="algorithm" fill="#0CD3FF" />
          <Bar dataKey="network" fill="#FFCA29" />
          <Bar dataKey="operating_system" fill="#FF0000" />
          <Bar dataKey="database" fill="#ACBD00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsDay;
