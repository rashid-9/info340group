import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";

const MACRO_DATA = [
  { name: "Protein", amount: "95g", className: "protein", percentage: 80 },
  { name: "Carbohydrates", amount: "250g", className: "carbs", percentage: 65 },
  { name: "Fats", amount: "70g", className: "fat", percentage: 90 }
];

const WEEKLY_DATA = [
  { day: "Monday", consumed: 1753 },
  { day: "Tuesday", consumed: 1250 },
  { day: "Wednesday", consumed: 2013 },
  { day: "Thursday", consumed: 1572 },
  { day: "Friday", consumed: 2245 },
  { day: "Saturday", consumed: 1000 },
  { day: "Sunday", consumed: 1875}
];

function calculateNutritionTargets(userProfile) {
  // AI-generated code: Destructure user profile data
  const { age, height, weight, gender, activityLevel, goal, higherProtein } = userProfile;

  // AI-generated code: Calculate BMR using Mifflin-St Jeor Equation
  let bmr;
  if (gender === "Male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5; // AI-generated code: Male BMR formula
  } else if (gender === "Female") {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161; // AI-generated code: Female BMR formula
  } else {
    // AI-generated code: Average for non-binary/prefer not to say
    bmr = 10 * weight + 6.25 * height - 5 * age - 78;
  }

  // AI-generated code: Activity multipliers for TDEE calculation
  const activityMultipliers = {
    "Sedentary": 1.2, // AI-generated code
    "Lightly Active": 1.375, // AI-generated code
    "Moderately Active": 1.55, // AI-generated code
    "Very Active": 1.725, // AI-generated code
    "Extremely Active": 1.9 // AI-generated code
  };

  // AI-generated code: Calculate TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * (activityMultipliers[activityLevel] || 1.2);

  // AI-generated code: Calculate calorie target based on goal
  let calorieTarget;
  let goalDescription;
  let goalName;

  if (goal === "Lose Weight") {
    calorieTarget = tdee - 500; // AI-generated code: 500 calorie deficit
    goalDescription = "Calorie deficit for fat loss"; // AI-generated code
    goalName = "Cutting"; // AI-generated code
  } else if (goal === "Build Muscle") {
    calorieTarget = tdee + 300; // AI-generated code: 300 calorie surplus
    goalDescription = "Calorie surplus for muscle gain"; // AI-generated code
    goalName = "Bulking"; // AI-generated code
  } else {
    calorieTarget = tdee; // AI-generated code: Maintenance
    goalDescription = "Maintaining current weight"; // AI-generated code
    goalName = "Maintaining"; // AI-generated code
  }

  // AI-generated code: Calculate macro targets
  let proteinGrams;
  if (higherProtein || goal === "Build Muscle") {
    proteinGrams = weight * 2.2; // AI-generated code: 2.2g per kg for higher protein
  } else if (goal === "Lose Weight") {
    proteinGrams = weight * 2.0; // AI-generated code: 2.0g per kg for weight loss
  } else {
    proteinGrams = weight * 1.6; // AI-generated code: 1.6g per kg for maintenance
  }

  // AI-generated code: Fat - 25-30% of calories
  const fatCalories = calorieTarget * 0.27; // AI-generated code
  const fatGrams = fatCalories / 9; // AI-generated code

  // AI-generated code: Carbs - remaining calories
  const proteinCalories = proteinGrams * 4; // AI-generated code
  const carbCalories = calorieTarget - proteinCalories - fatCalories; // AI-generated code
  const carbGrams = carbCalories / 4; // AI-generated code

  // AI-generated code: Return calculated targets
  return {
    calories: Math.round(calorieTarget), // AI-generated code
    protein: Math.round(proteinGrams), // AI-generated code
    carbs: Math.round(carbGrams), // AI-generated code
    fat: Math.round(fatGrams), // AI-generated code
    goalName, // AI-generated code
    goalDescription // AI-generated code
  };
}

export default function Progress() {

  const [showPercentage, setShowPercentage] = useState(false);

  const totalWeekCalories = WEEKLY_DATA.reduce(
    (sum, day) => sum + day.consumed,
    0
  );

  const averageCalories = Math.round(
    totalWeekCalories / WEEKLY_DATA.length
  );

  const [targets, setTargets] = useState(null);

  useEffect(() => {
    const profileData = localStorage.getItem("userProfile");

    if (profileData) {
      const profile = JSON.parse(profileData);
      const calculatedTargets = calculateNutritionTargets(profile);
      setTargets(calculatedTargets);
    }
  }, []);

  if (!targets) {
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