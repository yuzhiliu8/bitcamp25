import React, { useState, useRef, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import "./HomePage.css";

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const totalGoal = 2000;
  const protein = 400;
  const carbs = 900;
  const fat = 700;
  const consumed = protein + carbs + fat;
  const remaining = totalGoal - consumed;

  const pieData = [
    { name: "Protein", value: protein, grams: 100 },
    { name: "Carbs", value: carbs, grams: 225 },
    { name: "Fat", value: fat, grams: 78 },
    { name: "Remaining", value: remaining > 0 ? remaining : 0, grams: null },
  ];

  const COLORS = ["#6A38D9", "#F4A261", "#E76F51", "#E0E0E0"];

  return (
    <div className="homepage">
      {/* Hamburger Menu */}
      <div className="hamburger" ref={menuRef}>
        <button className="hamburger-button" onClick={() => setShowMenu(!showMenu)}>
          ☰
        </button>
        {showMenu && (
          <div className="hamburger-menu">
            <button onClick={() => alert("Sign out placeholder")}>Sign Out</button>
            <button onClick={() => alert("Past logs placeholder")}>Past Logs</button>
            <button onClick={() => alert("Create/Update Goals placeholder")}>Set Goals</button>
          </div>
        )}
      </div>

      {/* Header */}
      <header className="homepage-header">
        <h1>Today's Summary</h1>
        <p>{today}</p>
      </header>

      {/* Pie Chart */}
      <section className="charts-section horizontal">
        <div className="chart-container relative">
          <h3>Calories Breakdown</h3>
          <PieChart width={220} height={220}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
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
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
          <div className="goal-label">{totalGoal} kcal</div>
        </div>
      </section>

      {/* Goal Display */}
      <section className="goals-section">
        <h3>Current Goal</h3>
        <p>Daily Calorie Goal: {totalGoal} kcal</p>
      </section>

      <button className="add-button">+</button>
    </div>
  );
};

export default HomePage;
