import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import { calculateNutritionTargets } from "./nutrition.js";

const WEEKLY_DATA = [
  { day: "Monday", consumed: 1753 },
  { day: "Tuesday", consumed: 1250 },
  { day: "Wednesday", consumed: 2013 },
  { day: "Thursday", consumed: 1572 },
  { day: "Friday", consumed: 2245 },
  { day: "Saturday", consumed: 1000 },
  { day: "Sunday", consumed: 1875 }
];

export default function Progress() {

  const [showPercentage, setShowPercentage] = useState(false);
  const [targets, setTargets] = useState(null);
  const [consumed, setConsumed] = useState(null);

  useEffect(() => {
    const profileData = localStorage.getItem("userProfile");
    if (profileData) {
      const profile = JSON.parse(profileData);
      const calculatedTargets = calculateNutritionTargets(profile);
      setTargets(calculatedTargets);
    }

    const storedConsumed = localStorage.getItem("dailyConsumed");
    if (storedConsumed) {
      setConsumed(JSON.parse(storedConsumed));
    }
  }, []);

  if (!targets || !consumed) {
    return (
      <>
        <Header />
        <p style={{ padding: "2rem" }}>Loading progress...</p>
      </>
    );
  }

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

            {[
              { name: "Protein", key: "protein", className: "protein" },
              { name: "Carbohydrates", key: "carbs", className: "carbs" },
              { name: "Fats", key: "fat", className: "fat" }
            ].map((macro) => {

              const percentage = Math.min(
                Math.round((consumed[macro.key] / targets[macro.key]) * 100),
                100
              );

              return (
                <div className="macro" key={macro.key}>
                  <p>
                    {macro.name}
                    <span>
                      {showPercentage
                        ? `${percentage}%`
                        : `${consumed[macro.key]}g / ${targets[macro.key]}g`}
                    </span>
                  </p>

                  <div className="bar">
                    <div
                      className={`bar-fill ${macro.className}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
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
              
              {WEEKLY_DATA.map((dayData) => {
                const percentage = Math.min(
                  Math.round((dayData.consumed / targets.calories) * 100),
                  100
                );
                return (
                  <div className="day" key={dayData.day}>
                    <p>{dayData.day} <span>{dayData.consumed} / {targets.calories} cal</span></p>
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