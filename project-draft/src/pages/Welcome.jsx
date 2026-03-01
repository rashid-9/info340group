// AI-generated code: Welcome/Onboarding component for NutriTrack
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  // AI-generated code: Hook for navigation
  const navigate = useNavigate();
  // AI-generated code: Track current step in multi-step form (1-3)
  const [currentStep, setCurrentStep] = useState(1);
  // AI-generated code: Store all form data for user profile
  const [formData, setFormData] = useState({
    age: "", // AI-generated code
    height: "", // AI-generated code
    weight: "", // AI-generated code
    gender: "", // AI-generated code
    activityLevel: "", // AI-generated code
    goal: "", // AI-generated code
    higherProtein: false // AI-generated code
  });

  // AI-generated code: Handle text/number input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target; // AI-generated code
    setFormData(prev => ({ // AI-generated code
      ...prev, // AI-generated code
      [name]: value // AI-generated code
    })); // AI-generated code
  };

  // AI-generated code: Handle gender selection
  const handleGenderSelect = (gender) => {
    setFormData(prev => ({ // AI-generated code
      ...prev, // AI-generated code
      gender: gender // AI-generated code
    })); // AI-generated code
  };

  // AI-generated code: Handle activity level selection
  const handleActivitySelect = (activity) => {
    setFormData(prev => ({ // AI-generated code
      ...prev, // AI-generated code
      activityLevel: activity // AI-generated code
    })); // AI-generated code
  };

  // AI-generated code: Handle goal selection
  const handleGoalSelect = (goal) => {
    setFormData(prev => ({ // AI-generated code
      ...prev, // AI-generated code
      goal: goal // AI-generated code
    })); // AI-generated code
  };

  // AI-generated code: Handle higher protein checkbox
  const handleCheckboxChange = (e) => {
    setFormData(prev => ({ // AI-generated code
      ...prev, // AI-generated code
      higherProtein: e.target.checked // AI-generated code
    })); // AI-generated code
  };

  // AI-generated code: Handle continue/submit button
  const handleContinue = () => {
    if (currentStep < 3) { // AI-generated code: Move to next step
      setCurrentStep(currentStep + 1); // AI-generated code
    } else { // AI-generated code: Final step - save and navigate
      // AI-generated code: Save user data to localStorage
      localStorage.setItem("userProfile", JSON.stringify(formData)); // AI-generated code
      localStorage.setItem("hasCompletedOnboarding", "true"); // AI-generated code
      
      // AI-generated code: Navigate to dashboard
      navigate("/dashboard"); // AI-generated code
    }
  };

  // AI-generated code: Handle back button
  const handleBack = () => {
    if (currentStep > 1) { // AI-generated code
      setCurrentStep(currentStep - 1); // AI-generated code
    }
  };

  // AI-generated code: Validation for each step
  const isStep1Valid = formData.age && formData.height && formData.weight; // AI-generated code
  const isStep2Valid = formData.activityLevel; // AI-generated code
  const isStep3Valid = formData.goal; // AI-generated code
  
  // AI-generated code: Check if current step is valid
  const isCurrentStepValid = currentStep === 1 ? isStep1Valid : 
                             currentStep === 2 ? isStep2Valid : 
                             isStep3Valid;

  return (
    // AI-generated code: Welcome page container
    <div className="welcome-container">
      {/* AI-generated code: Welcome card wrapper */}
      <div className="welcome-card">
        {/* AI-generated code: Calendar icon */}
        <div className="welcome-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        
        {/* AI-generated code: Welcome header */}
        <h1>Welcome to NutriTrack</h1>
        <p className="welcome-subtitle">Let's personalize your nutrition goals</p>

        {/* AI-generated code: Progress bar showing completion */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
        </div>

        {/* AI-generated code: Multi-step form container */}
        <div className="welcome-form">
          {/* AI-generated code: Step 1 - Basic Information */}
          {currentStep === 1 && (
            <>
              <h2>Basic Information</h2>

              {/* AI-generated code: Age input */}
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="25"
                  min="1"
                  max="120"
                />
              </div>

              {/* AI-generated code: Height input */}
              <div className="form-group">
                <label htmlFor="height">Height (cm)</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="170"
                  min="50"
                  max="300"
                />
              </div>

              {/* AI-generated code: Weight input */}
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="70"
                  min="20"
                  max="500"
                />
              </div>

              {/* AI-generated code: Gender selection */}
              <div className="form-group">
                <label>Gender (optional)</label>
                <div className="gender-options">
                  {/* AI-generated code: Male button */}
                  <button
                    type="button"
                    className={`gender-btn ${formData.gender === "Male" ? "selected" : ""}`}
                    onClick={() => handleGenderSelect("Male")}
                  >
                    Male
                  </button>
                  {/* AI-generated code: Female button */}
                  <button
                    type="button"
                    className={`gender-btn ${formData.gender === "Female" ? "selected" : ""}`}
                    onClick={() => handleGenderSelect("Female")}
                  >
                    Female
                  </button>
                  {/* AI-generated code: Prefer not to say button */}
                  <button
                    type="button"
                    className={`gender-btn ${formData.gender === "Prefer not to say" ? "selected" : ""}`}
                    onClick={() => handleGenderSelect("Prefer not to say")}
                  >
                    Prefer not to say
                  </button>
                </div>
              </div>
            </>
          )}

          {/* AI-generated code: Step 2 - Activity Level */}
          {currentStep === 2 && (
            <>
              <h2>Activity Level</h2>
              <p className="step-description">How active are you on a typical day?</p>

              {/* AI-generated code: Activity level options */}
              <div className="activity-options">
                {/* AI-generated code: Sedentary option */}
                <button
                  type="button"
                  className={`activity-btn ${formData.activityLevel === "Sedentary" ? "selected" : ""}`}
                  onClick={() => handleActivitySelect("Sedentary")}
                >
                  <div className="activity-title">Sedentary</div>
                  <div className="activity-desc">Little to no exercise</div>
                </button>

                {/* AI-generated code: Lightly Active option */}
                <button
                  type="button"
                  className={`activity-btn ${formData.activityLevel === "Lightly Active" ? "selected" : ""}`}
                  onClick={() => handleActivitySelect("Lightly Active")}
                >
                  <div className="activity-title">Lightly Active</div>
                  <div className="activity-desc">Light exercise 1-3 days/week</div>
                </button>

                {/* AI-generated code: Moderately Active option */}
                <button
                  type="button"
                  className={`activity-btn ${formData.activityLevel === "Moderately Active" ? "selected" : ""}`}
                  onClick={() => handleActivitySelect("Moderately Active")}
                >
                  <div className="activity-title">Moderately Active</div>
                  <div className="activity-desc">Moderate exercise 3-5 days/week</div>
                </button>

                {/* AI-generated code: Very Active option */}
                <button
                  type="button"
                  className={`activity-btn ${formData.activityLevel === "Very Active" ? "selected" : ""}`}
                  onClick={() => handleActivitySelect("Very Active")}
                >
                  <div className="activity-title">Very Active</div>
                  <div className="activity-desc">Hard exercise 6-7 days/week</div>
                </button>

                {/* AI-generated code: Extremely Active option */}
                <button
                  type="button"
                  className={`activity-btn ${formData.activityLevel === "Extremely Active" ? "selected" : ""}`}
                  onClick={() => handleActivitySelect("Extremely Active")}
                >
                  <div className="activity-title">Extremely Active</div>
                  <div className="activity-desc">Hard daily exercise & physical job</div>
                </button>
              </div>
            </>
          )}

          {/* AI-generated code: Step 3 - Your Goal */}
          {currentStep === 3 && (
            <>
              <h2>Your Goal</h2>
              <p className="step-description">What would you like to achieve?</p>

              {/* AI-generated code: Goal options */}
              <div className="goal-options">
                {/* AI-generated code: Lose Weight option */}
                <button
                  type="button"
                  className={`goal-btn ${formData.goal === "Lose Weight" ? "selected" : ""}`}
                  onClick={() => handleGoalSelect("Lose Weight")}
                >
                  <div className="goal-title">Lose Weight</div>
                  <div className="goal-desc">Calorie deficit for fat loss</div>
                </button>

                {/* AI-generated code: Maintain Weight option */}
                <button
                  type="button"
                  className={`goal-btn ${formData.goal === "Maintain Weight" ? "selected" : ""}`}
                  onClick={() => handleGoalSelect("Maintain Weight")}
                >
                  <div className="goal-title">Maintain Weight</div>
                  <div className="goal-desc">Stay at current weight</div>
                </button>

                {/* AI-generated code: Build Muscle option */}
                <button
                  type="button"
                  className={`goal-btn ${formData.goal === "Build Muscle" ? "selected" : ""}`}
                  onClick={() => handleGoalSelect("Build Muscle")}
                >
                  <div className="goal-title">Build Muscle</div>
                  <div className="goal-desc">Calorie surplus for muscle gain</div>
                </button>
              </div>

              {/* AI-generated code: Higher protein checkbox */}
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.higherProtein}
                    onChange={handleCheckboxChange}
                  />
                  <span>Higher Protein Target</span>
                </label>
                <p className="checkbox-desc">Increase protein intake for better satiety and muscle preservation</p>
              </div>
            </>
          )}

          {/* AI-generated code: Navigation buttons */}
          <div className="button-group">
            {/* AI-generated code: Back button (shown from step 2 onwards) */}
            {currentStep > 1 && (
              <button className="back-btn" onClick={handleBack}>
                Back
              </button>
            )}
            {/* AI-generated code: Continue/Submit button */}
            <button
              className="continue-btn"
              onClick={handleContinue}
              disabled={!isCurrentStepValid}
            >
              {currentStep === 3 ? "Calculate Targets" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
