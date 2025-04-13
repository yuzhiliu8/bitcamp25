// PieChartWrapper.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ["#6A38D9", "#F4A261", "#E76F51", "#6E6E6E"];

const PieChartWrapper = ({ pieData }) => {
  return (
    <PieChart width={330} height={330}>
      <Pie
        data={pieData}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        dataKey="value"
        startAngle={90}
        endAngle={-270}
        isAnimationActive={true}
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value, name, props) => {
          const grams = pieData[props.dataIndex]?.grams;
          return grams ? [`${grams}g`, name] : [`${value} kcal`, name];
        }}
        cursor={{ fill: "#f5f5f5" }}
      />
      <Legend verticalAlign="bottom" height={25} />
    </PieChart>
  );
};

export default PieChartWrapper;
