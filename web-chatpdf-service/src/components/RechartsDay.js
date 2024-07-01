import React, { useState, useEffect } from "react";
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
  { name: "각 학습 카테고리 별 총 점수", algorithm: 70, network: 80, operating_system: 75, database: 65 },
];

const RechartsDay = (props) => {

  const [originalData, setOriginalData] = useState([]);
  const [maxScore, setMaxScore] = useState(100);
  const data = props.data;
  const data2 = props.data2;
  
  useEffect(() => {
    if (data.length > 0) {
      // 초기 점수 합계 객체
      const totalScores = {
        "알고리즘": 0,
        "네트워크": 0,
        "운영체제": 0,
        "데이터베이스": 0
      };

      // 사전조사: 각 카테고리별 평가 점수 합계를 계산
      data.forEach(item => {
        const { category, evaluation } = item;
        if (evaluation) {
          Object.values(evaluation).forEach(evaluation => {
            if (evaluation && evaluation.length > 0) {
              const score = parseInt(evaluation[0], 10);
              if (!isNaN(score)) {
                const categoryKey = category.toLowerCase().replace(" ", "_");
                totalScores[categoryKey] += score;
                console.log(totalScores[categoryKey]);
              }
            }
          });
        }
      });

      // 면접: 각 카테고리별 평가 점수 합계를 계산
      data2.forEach(item => {
        const { category, evaluation } = item;
        if (evaluation) {
          Object.values(evaluation).forEach(evaluation => {
            if (evaluation && evaluation.length > 0) {
              const score = parseInt(evaluation[0], 10);
              if (!isNaN(score)) {
                const categoryKey = category.toLowerCase().replace(" ", "_");
                totalScores[categoryKey] += score;
                console.log(totalScores[categoryKey]);
              }
            }
          });
        }
      });

      // originalData 설정
      setOriginalData([
        {
          name: "각 학습 카테고리 별 총 점수",
          algorithm: totalScores["알고리즘"],
          network: totalScores["네트워크"],
          operating_system: totalScores["운영체제"],
          database: totalScores["데이터베이스"]
        }
      ]);

      // 최대 점수 계산
      const maxCategoryScore = Math.max(
        totalScores["알고리즘"],
        totalScores["네트워크"],
        totalScores["운영체제"],
        totalScores["데이터베이스"]
      );
      setMaxScore(maxCategoryScore);
    }
  }, [data]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ResponsiveContainer width={600} height={400}>
        <BarChart
          data={originalData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            height={60}
            textAnchor="end"
            tick={{ fontSize: 12 }}
            tickMargin={10}
            style={{ fontSize: "15px", lineHeight: "14px", textAnchor: "middle" }}
          />
          <YAxis
            domain={[0, maxScore]}
            allowDataOverflow={true}
            tickCount={6}
            width={10}
            tick={{ fontSize: 10 }}
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