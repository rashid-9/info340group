import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import { calculateNutritionTargets } from "./nutrition.js";

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function getTodayLog() {
  try {
    return JSON.parse(localStorage.getItem("food-log-" + getTodayDate())) || [];
  } catch {
    return [];
  }
}

function getDailyConsumed() {
  try {
    return (
      JSON.parse(localStorage.getItem("dailyConsumed")) || {
        //Used AI to understand JSON.parse
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      }
    );
  } catch {
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };
  }
}

export default function Dashboard() {
  // AI-generated code: State for calculated targets
  const [targets, setTargets] = useState(null);
  // AI-generated code: State for user profile
  const [userProfile, setUserProfile] = useState(null);

  const [consumed, setConsumed] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [todayLog, setTodayLog] = useState([]);


  // AI-generated code: Load user profile from localStorage and calculate targets
  useEffect(() => {
    const profileData = localStorage.getItem("userProfile");

    if (profileData) {
      const profile = JSON.parse(profileData);
      setUserProfile(profile);
      const calculatedTargets = calculateNutritionTargets(profile);
      setTargets(calculatedTargets);
    }

    setConsumed(getDailyConsumed());
    setTodayLog(getTodayLog());
  }, []);

  useEffect(() => {
    function syncDashboardData() {
      const storedConsumed = localStorage.getItem("dailyConsumed");
      const storedFoodLog = localStorage.getItem("food-log-" + getTodayDate());

      if (storedConsumed) {
        setConsumed(JSON.parse(storedConsumed));
      } else {
        setConsumed({
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
        });
      }

      if (storedFoodLog) {
        setTodayLog(JSON.parse(storedFoodLog));
      } else {
        setTodayLog([]);
      }
    }

    window.addEventListener("foodLogUpdated", syncDashboardData);

    return () => {
      window.removeEventListener("foodLogUpdated", syncDashboardData);
    };
  }, []);

  // AI-generated code: Function to reset user profile and restart onboarding
  const handleResetProfile = () => {
    // AI-generated code: Confirm before resetting
    if (
      window.confirm(
        "Are you sure you want to reset your profile? This will restart the onboarding process."
      )
    ) {
      // AI-generated code: Clear profile data from localStorage
      localStorage.removeItem("userProfile");
      localStorage.removeItem("hasCompletedOnboarding");
      // AI-generated code: Redirect to welcome page
      window.location.href = "/";
    }
  };

  // AI-generated code: Show loading state while fetching data
  if (!targets || !userProfile) {
    return (
      <>
        <Header />
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Loading your personalized targets...</p>
        </div>
      </>
    );
  }

  // AI-generated code: Calculate remaining nutrients for the day
  const remaining = {
    calories: targets.calories - consumed.calories, // AI-generated code
    protein: targets.protein - consumed.protein, // AI-generated code
    carbs: targets.carbs - consumed.carbs, // AI-generated code
    fat: targets.fat - consumed.fat, // AI-generated code
  };

  // AI-generated code: Calculate percentage of targets consumed for progress bars
  const percentages = {
    calories: (consumed.calories / targets.calories) * 100, // AI-generated code
    protein: (consumed.protein / targets.protein) * 100, // AI-generated code
    carbs: (consumed.carbs / targets.carbs) * 100, // AI-generated code
    fat: (consumed.fat / targets.fat) * 100, // AI-generated code
  };

  // AI-generated code: Array of macros for data-driven rendering with .map()
  const macros = [
    { name: "Protein", key: "protein", className: "protein" }, // AI-generated code
    { name: "Carbs", key: "carbs", className: "carbs" }, // AI-generated code
    { name: "Fat", key: "fat", className: "fat" }, // AI-generated code
  ];

  return (
    <>
      <Header />

      <section className="budget-section">
        <div className="budget-card">
          <div className="budget-header">
            <h2>Today's Budget</h2>
            {/* AI-generated code: Display remaining calories dynamically */}
            <p className="remaining">
              <strong>{remaining.calories}</strong> remaining
            </p>
          </div>

          {/* AI-generated code: Display consumed and target calories */}
          <h1>{consumed.calories}</h1>
          <p>of {targets.calories} calories</p>

          {/* AI-generated code: Calorie progress bar */}
          <div className="bar">
            <div
              className="bar-fill calories"
              style={{ width: `${Math.min(percentages.calories, 100)}%` }}
            ></div>
          </div>

          {/* AI-generated code: Data-driven macro display using .map() */}
          {macros.map((macro /* AI-generated code */) => (
            <div className="macro" key={macro.key}>
              <p>
                {macro.name}{" "}
                <span>
                  {consumed[macro.key]}g / {targets[macro.key]}g
                </span>
              </p>
              <div className="bar">
                <div
                  className={`bar-fill ${macro.className}`}
                  style={{
                    width: `${Math.min(percentages[macro.key], 100)}%`,
                  }} /* AI-generated code */
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="budget-section goal-section">
        <div className="budget-card goal-card">
          <div className="budget-header goal-header">
            <div className="goal-title">
              <span className="goal-dot" aria-hidden="true"></span>
              <h2>Your Goal</h2>
            </div>

            {/* AI-generated code: Display goal name dynamically */}
            <p className="remaining goal-status">
              <strong>{targets.goalName}</strong>
            </p>
          </div>

          {/* AI-generated code: Display goal description dynamically */}
          <p className="goal-description">{targets.goalDescription}</p>

          <div className="goal-metrics">
            {/* AI-generated code: Display activity level from profile */}
            <div className="goal-metric">
              <p className="goal-metric-label">Activity</p>
              <h1 className="goal-metric-value">{userProfile.activityLevel}</h1>
            </div>

            {/* AI-generated code: Display weight from profile */}
            <div className="goal-metric">
              <p className="goal-metric-label">Weight</p>
              <h1 className="goal-metric-value">{userProfile.weight} kg</h1>
            </div>
          </div>

          {/* AI-generated code: Reset profile button to restart onboarding */}
          <button className="reset-profile-btn" onClick={handleResetProfile}>
            Reset Profile
          </button>
        </div>
      </section>

      <section className="today-foods" aria-label="Today's Foods">
        <header className="today-foods__header">
          <span className="today-foods__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M3 16l7-7 4 4 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 2h4v4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h2 className="today-foods__title">Today's Foods</h2>
        </header>

        <div className="today-foods__list">
          {todayLog.length === 0 ? (
            <article className="food-item">
              <div className="food-item__left">
                <h3 className="food-item__name">No foods logged yet</h3>
                <p className="food-item__sub">
                  Go to Log Food to add your meals
                </p>
              </div>
            </article>
          ) : (
            todayLog.map((entry) => (
              <article className="food-item" key={entry.id}>
                <div className="food-item__left">
                  <h3 className="food-item__name">{entry.name}</h3>
                  <p className="food-item__sub">
                    {entry.servings} × {entry.serving}
                  </p>
                </div>

                <div className="food-item__right">
                  <div className="food-item__cal">
                    {entry.calories}{" "}
                    <span className="food-item__unit">cal</span>
                  </div>
                  <div className="food-item__macros">
                    P: {entry.protein}g • C: {entry.carbs}g • F: {entry.fat}g
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}
