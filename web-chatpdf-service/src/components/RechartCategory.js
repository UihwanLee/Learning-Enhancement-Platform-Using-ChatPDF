
import React from 'react';
import { Radar, RadarChart, PolarGrid, 
    PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
 
const RechartsCategory = (props) => {

      const categories = ['알고리즘', '네트워크', '운영체제', '데이터베이스'];

      let max_count = 0;

      const evaluateCategoryCountData2 = categories.map(category => {
        const count = props.data.filter(item => item.category === category).length;
        max_count = (count > max_count) ? count : max_count;
        return {
          subject: category,
          value: count,
          fullMark: 100
        };
      });

    return (
        <RadarChart outerRadius={90} width={730} height={250} data={evaluateCategoryCountData2}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, max_count]} />
            <Radar name="학습횟수" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
        </RadarChart>
    );
}
 
export default RechartsCategory;