import React, { useState, useRef, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
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
    { name: "Protein", value: protein },
    { name: "Carbs", value: carbs },
    { name: "Fat", value: fat },
    { name: "Remaining", value: remaining > 0 ? remaining : 0 },
  ];

  const COLORS = ["#6A38D9", "#F4A261", "#E76F51", "#E0E0E0"];

  const macroData = [
    { name: "Protein", grams: 100 },
    { name: "Carbs", grams: 225 },
    { name: "Fat", grams: 78 },
  ];

  return (
    <div className="homepage">
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

      <header className="homepage-header">
        <h1>Today's Summary</h1>
        <p>{today}</p>
      </header>

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
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
          <div className="goal-label">{totalGoal} kcal</div>
        </div>

        <div className="chart-container">
          <h3>Macros (grams)</h3>
          <BarChart
            width={300}
            height={200}
            data={macroData}
            layout="vertical"
            barCategoryGap={20}
            barSize={24}
          >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip
              formatter={(value, name) => [`${value}g`, name]}
              cursor={{ fill: "transparent" }}
            />
            <Bar dataKey="grams">
              {macroData.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </section>

      <section className="goals-section">
        <h3>Current Goal</h3>
        <p>Daily Calorie Goal: {totalGoal} kcal</p>
      </section>

      <button className="add-button">+</button>
    </div>
  );
};

export default HomePage;
