import React, { useState, useRef, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { useNavigate } from 'react-router';
import SideMenu from '../../components/SideMenu/SideMenu';
import MealItem from '../../components/MealItem/MealItem';
import DatePicker from 'react-datepicker';
import PieChartWrapper from '../../components/PieChartWrapper/PieChartWrapper';
import { FaCalendarAlt } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import './HomePage.css';
import { API_URL } from '../../util/Constants';

function HomePage({ session }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calLog, setCalLog] = useState({});
  const [goals, setGoals] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const getData = async () => {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      const formattedEST = formatter.format(selectedDate); 
      const formData = new FormData();
      formData.append('date', formattedEST);
      console.log(formattedEST);

      const response = await fetch(`${API_URL}/api/callogs/get-cal-log`, {
        method: "POST",
        body: formData,
        credentials: 'include'
      });

      const data = await response.json();
      setCalLog(data);
      console.log(data);


      const goalResponse = await fetch(`${API_URL}/api/goal/show-goal`, {
        method: "GET",
        credentials: "include"
      });

      const goalData = await goalResponse.json();
      setGoals(goalData);
      console.log(goalData);
    }

    getData();
  }, [selectedDate])



  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
  });
  }

  const remaining = goals.calorieGoal - calLog.total_calories;

  const pieData = [
    { name: "Protein", value: calLog.total_protein * 4, grams: calLog.total_protein},
    { name: "Carbs", value: calLog.total_carbs * 4, grams: calLog.total_carbs},
    { name: "Fat", value: calLog.total_fat * 9, grams: calLog.total_fat},
    { name: "Remaining", value: remaining > 0 ? remaining : 0, grams: null },
  ];

  const COLORS = ["#6A38D9", "#F4A261", "#E76F51", "#6E6E6E"];

  return (
    <div className="homepage">

      <header className="homepage-header">
        <h1>Today's Summary</h1>

        <div className="date">
          <p>{formatDate(selectedDate)}</p>

          <div className="space"></div>
          <DatePicker 
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              console.log(date);
            }}
            customInput={<FaCalendarAlt size={20}/>}
            />
        </div>
      </header>


      <SideMenu />

      <div className="dashboard">
        <div className="left">

        <section className="goals-section">
          <h3>Current Goal</h3>
          <p>Calories Consumed: {calLog.total_calories}/{goals.calorieGoal} kcal</p>
        </section>

        <section className="charts-section horizontal">
          <div className="chart-container relative">
            <h3>Calories Breakdown</h3>
            {(goals.calorieGoal && calLog.total_calories !== undefined) ? (
              <PieChartWrapper pieData={pieData} key={JSON.stringify(pieData)}/>
            ) : (<> Loading ... </>)

            }
            {!isNaN(remaining) && (
              <div className="goal-label">{remaining} Left</div>
            )}
          </div>
        </section>
        </div>

        <div className="right">
          <div className="diary">
            <div className="entry">
              <div className="title">
                <h4>Breakfast</h4>
                <div className="space"></div>
                {calLog.breakfast_calories}
              </div>
              
              {/* <MealItem name={"Eggs"} cals={'500'}/> */}
              
            </div>
            <div className="entry">

              <div className="title">
                <h4>Lunch</h4>
                <div className="space"></div>
                {calLog.lunch_calories}
              </div>
            </div>
            <div className="entry">
              <div className="title">
                <h4>Dinner</h4>
                <div className="space"></div>
                {calLog.dinner_calories}
              </div>
            </div>
          </div>
        </div>

      </div>


      <button className="dropbtn" onClick={() => navigate("/logfood")}>Log Food</button>
      

    </div>
  );
};

export default HomePage;
