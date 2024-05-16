import { PieChart, Pie, Legend, Sector, Cell, ResponsiveContainer } from 'recharts';
 
 
const RechartsMyData = () => {
 
    const data = [
        { name: 'Bad', value: 3 },
        { name: 'Not Bad', value: 4 },
        { name: 'Good', value: 2 },
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
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
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