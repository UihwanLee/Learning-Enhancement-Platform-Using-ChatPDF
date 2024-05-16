
import React from 'react';
import { Radar, RadarChart, PolarGrid, 
    PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
 
const RechartsCategory = (props) => {

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

    return (
        <RadarChart outerRadius={90} width={730} height={250} data={evaluateCategoryCountData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Radar name="학습횟수" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
        </RadarChart>
    );
}
 
export default RechartsCategory;