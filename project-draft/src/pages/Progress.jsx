import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import { calculateNutritionTargets } from "./nutrition.js";

export default function Progress() {

  const [showPercentage, setShowPercentage] = useState(false);
  const [targets, setTargets] = useState(null);
  const [consumed, setConsumed] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

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
            <h2>Daily Macro Progress</h2>

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
      </main>

      <footer>
        <p>&copy; 2026 NutriTrack.</p>
      </footer>
    </>
  );
}