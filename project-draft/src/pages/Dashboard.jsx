import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";

// AI-generated code: Calculate personalized nutrition targets based on user profile
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

export default function Dashboard() {
  // AI-generated code: State for calculated targets
  const [targets, setTargets] = useState(null);
  // AI-generated code: State for user profile
  const [userProfile, setUserProfile] = useState(null);
  const [consumed, setConsumed] = useState({
    calories: 259,
    protein: 7,
    carbs: 54,
    fat: 3
  });

  // AI-generated code: Load user profile from localStorage and calculate targets
  useEffect(() => {
    const profileData = localStorage.getItem("userProfile"); // AI-generated code
    if (profileData) {
      const profile = JSON.parse(profileData); // AI-generated code
      setUserProfile(profile); // AI-generated code
      const calculatedTargets = calculateNutritionTargets(profile); // AI-generated code
      setTargets(calculatedTargets); // AI-generated code
    }
  }, []);

  // AI-generated code: Function to reset user profile and restart onboarding
  const handleResetProfile = () => {
    // AI-generated code: Confirm before resetting
    if (window.confirm("Are you sure you want to reset your profile? This will restart the onboarding process.")) {
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
    fat: targets.fat - consumed.fat // AI-generated code
  };

  // AI-generated code: Calculate percentage of targets consumed for progress bars
  const percentages = {
    calories: (consumed.calories / targets.calories) * 100, // AI-generated code
    protein: (consumed.protein / targets.protein) * 100, // AI-generated code
    carbs: (consumed.carbs / targets.carbs) * 100, // AI-generated code
    fat: (consumed.fat / targets.fat) * 100 // AI-generated code
  };

  // AI-generated code: Array of macros for data-driven rendering with .map()
  const macros = [
    { name: "Protein", key: "protein", className: "protein" }, // AI-generated code
    { name: "Carbs", key: "carbs", className: "carbs" }, // AI-generated code
    { name: "Fat", key: "fat", className: "fat" } // AI-generated code
  ];

  return (
    <>
      <Header/>

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
            <div className="bar-fill calories" style={{ width: `${Math.min(percentages.calories, 100)}%` }}></div>
          </div>

          {/* AI-generated code: Data-driven macro display using .map() */}
          {macros.map((macro) => ( /* AI-generated code */
            <div className="macro" key={macro.key}>
              <p>
                {macro.name} <span>{consumed[macro.key]}g / {targets[macro.key]}g</span>
              </p>
              <div className="bar">
                <div 
                  className={`bar-fill ${macro.className}`} 
                  style={{ width: `${Math.min(percentages[macro.key], 100)}%` }} /* AI-generated code */
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
              <h1 className="goal-metric-value">{userProfile.activityLevel.split(' ')[0]}</h1>
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
            <article className="food-item">
              <div className="food-item__left">
                <h3 className="food-item__name">Oatmeal</h3>
                <p className="food-item__sub">1 × 1 cup cooked</p>
              </div>
  
              <div className="food-item__right">
                <div className="food-item__cal">
                  154 <span className="food-item__unit">cal</span>
                </div>
                <div className="food-item__macros">P: 6g • C: 27g • F: 3g</div>
              </div>
            </article>
  
            <article className="food-item">
              <div className="food-item__left">
                <h3 className="food-item__name">Banana</h3>
                <p className="food-item__sub">1 × 1 medium</p>
              </div>
  
              <div className="food-item__right">
                <div className="food-item__cal">
                  105 <span className="food-item__unit">cal</span>
                </div>
                <div className="food-item__macros">P: 1g • C: 27g • F: 0g</div>
              </div>
            </article>
          </div>
        </section>
      </>
    );
  }