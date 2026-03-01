import React from "react";
import Header from "../components/Header.jsx";

// AI-generated code: Sample data for macros (hard-coded constant for draft)
const MACRO_DATA = [
  { name: "Protein", amount: "95g", className: "protein", percentage: 80 }, // AI-generated code
  { name: "Carbohydrates", amount: "250g", className: "carbs", percentage: 65 }, // AI-generated code
  { name: "Fats", amount: "70g", className: "fat", percentage: 90 } // AI-generated code
];

// AI-generated code: Sample data for weekly calories (hard-coded constant for draft)
const WEEKLY_DATA = [
  { day: "Monday", consumed: 1753, target: 2500 }, // AI-generated code
  { day: "Tuesday", consumed: 1250, target: 2500 }, // AI-generated code
  { day: "Wednesday", consumed: 2013, target: 2500 }, // AI-generated code
  { day: "Thursday", consumed: 1572, target: 2500 }, // AI-generated code
  { day: "Friday", consumed: 2245, target: 2500 }, // AI-generated code
  { day: "Saturday", consumed: 1000, target: 2500 }, // AI-generated code
  { day: "Sunday", consumed: 1875, target: 2500 } // AI-generated code
];

export default function Progress() {
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
  
              {/* AI-generated code: Data-driven macro rendering using .map() */}
              {MACRO_DATA.map((macro) => (
                <div className="macro" key={macro.name}>
                  <p>{macro.name} <span>{macro.amount}</span></p>
                  <div className="bar">
                    <div 
                      className={`bar-fill ${macro.className}`}
                      style={{ width: `${macro.percentage}%` }} /* AI-generated code */
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
  
              <div className="weekly-chart">
                {/* AI-generated code: Data-driven weekly calorie rendering using .map() */}
                {WEEKLY_DATA.map((dayData) => {
                  const percentage = Math.round((dayData.consumed / dayData.target) * 100); // AI-generated code
                  return (
                    <div className="day" key={dayData.day}>
                      <p>{dayData.day} <span>{dayData.consumed} / {dayData.target} cal</span></p>
                      <div className="bar">
                        <div className="bar-fill calories" style={{ width: `${percentage}%` }} /> {/* AI-generated code */}
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