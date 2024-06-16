import { PieChart, Pie, Legend, Sector, Cell, ResponsiveContainer } from 'recharts';
 
 
const RechartsMyData = (props) => {


    // 초기 카운터 객체
    const initialCount = { Bad: 0, 'Not Bad': 0, Good: 0 };

    // 각 카테고리별로 평가 데이터를 순회하여 개수를 세기
    const evaluationCounts = props.data.reduce((acc, item) => {
        Object.values(item.evaluation).forEach(evaluation => {
        const score = parseInt(evaluation[0], 10);
        if (score <= 30) {
            acc.Bad += 1;
        } else if (score > 30 && score <= 70) {
            acc['Not Bad'] += 1;
        } else if (score > 70) {
            acc.Good += 1;
        }
        });
        return acc;
    }, initialCount);

    // 결과 데이터 배열 생성
    const evaluationData = [
        { name: 'Bad', value: evaluationCounts.Bad },
        { name: 'Not Bad', value: evaluationCounts['Not Bad'] },
        { name: 'Good', value: evaluationCounts.Good },
    ];
 
    const COLORS = ['#FF8042', '#00C49F', '#0088FE', '#FF8042'];
 
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
 
    return (
        <>
            <div>

                    {/* <h1>Favorite Beverages - technostuf.com</h1> */}
                    {/* <hr /> */}
                    <div className="col-md-8">
                        <ResponsiveContainer width={500} height={300} className="text-center">
                            <PieChart width={700} height={700}>
                                <Legend layout="vertical" verticalAlign="top" align="top" />
                                <Pie
                                    data={evaluationData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {evaluationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}
export default RechartsMyData;