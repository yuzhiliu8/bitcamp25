import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "./HomePage.css";

const data = [
  { name: "Consumed", value: 1400 },
  { name: "Remaining", value: 600 },
];

// New color scheme
const COLORS = ["#2A160C", "#E0E0E0"]; // brown and neutral

const HomePage = () => {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Today's Summary</h1>
        <p>{today}</p>
      </header>

      <section className="charts-section">
        <div className="chart-container">
          <h3>Calories</h3>
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
      </section>

      <button className="add-button">+</button>
    </div>
  );
};

export default HomePage;
