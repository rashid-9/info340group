import React, { useState } from "react";
import Header from "../components/Header.jsx";

const MACRO_DATA = [
  { name: "Protein", amount: "95g", className: "protein", percentage: 80 },
  { name: "Carbohydrates", amount: "250g", className: "carbs", percentage: 65 },
  { name: "Fats", amount: "70g", className: "fat", percentage: 90 }
];

const WEEKLY_DATA = [
  { day: "Monday", consumed: 1753, target: 2500 },
  { day: "Tuesday", consumed: 1250, target: 2500 },
  { day: "Wednesday", consumed: 2013, target: 2500 },
  { day: "Thursday", consumed: 1572, target: 2500 },
  { day: "Friday", consumed: 2245, target: 2500 },
  { day: "Saturday", consumed: 1000, target: 2500 },
  { day: "Sunday", consumed: 1875, target: 2500 }
];

export default function Progress() {

  const [showPercentage, setShowPercentage] = useState(false);

  const totalWeekCalories = WEEKLY_DATA.reduce(
    (sum, day) => sum + day.consumed,
    0
  );

  const averageCalories = Math.round(
    totalWeekCalories / WEEKLY_DATA.length
  );


  return (
    <>
      <Header />

      <main>
        <section className="page-header">
          <h1>Your Progress!</h1>
          <p>Your Daily Summaries and Nutrition Trends</p>
        </section>

        <section className="progress-section">
          <div className="budget-card">
            <h2>Daily Macro Breakdown</h2>

            <button
              className="toggle-btn"
              onClick={() => setShowPercentage(!showPercentage)}
            >
              {showPercentage ? "Show Grams" : "Show Percentage"}
            </button>


            { }
            {MACRO_DATA.map((macro) => (
              <div className="macro" key={macro.name}>
                <p>
                  {macro.name}
                  <span>
                    {showPercentage
                      ? `${macro.percentage}%`
                      : macro.amount}
                  </span>
                </p>
                <div className="bar">
                  <div
                    className={`bar-fill ${macro.className}`}
                    style={{ width: `${macro.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="progress-section">
          <div className="budget-card">
            <h2>Calories This Week</h2>
            <p>Your daily caloric intake over the past 7 days</p>

            <p>
              Weekly Average: <strong>{averageCalories} cal/day</strong>
            </p>

            <div className="weekly-chart">
              { }
              {WEEKLY_DATA.map((dayData) => {
                const percentage = Math.min(
                  Math.round((dayData.consumed / dayData.target) * 100),
                  100
                );
                return (
                  <div className="day" key={dayData.day}>
                    <p>{dayData.day} <span>{dayData.consumed} / {dayData.target} cal</span></p>
                    <div className="bar">
                      <div className="bar-fill calories" style={{ width: `${percentage}%` }} /> { }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 NutriTrack.</p>
      </footer>
    </>
  );
}