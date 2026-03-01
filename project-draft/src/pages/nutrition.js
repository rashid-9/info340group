// utils/nutrition.js

export function calculateNutritionTargets(userProfile) {
  const { age, height, weight, gender, activityLevel, goal, higherProtein } = userProfile;

  let bmr;
  if (gender === "Male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === "Female") {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 78;
  }

  const activityMultipliers = {
    "Sedentary": 1.2,
    "Lightly Active": 1.375,
    "Moderately Active": 1.55,
    "Very Active": 1.725,
    "Extremely Active": 1.9
  };

  const tdee = bmr * (activityMultipliers[activityLevel] || 1.2);

  let calorieTarget;
  let goalDescription;
  let goalName;

  if (goal === "Lose Weight") {
    calorieTarget = tdee - 500;
    goalDescription = "Calorie deficit for fat loss";
    goalName = "Cutting";
  } else if (goal === "Build Muscle") {
    calorieTarget = tdee + 300;
    goalDescription = "Calorie surplus for muscle gain";
    goalName = "Bulking";
  } else {
    calorieTarget = tdee;
    goalDescription = "Maintaining current weight";
    goalName = "Maintaining";
  }

  let proteinGrams;
  if (higherProtein || goal === "Build Muscle") {
    proteinGrams = weight * 2.2;
  } else if (goal === "Lose Weight") {
    proteinGrams = weight * 2.0;
  } else {
    proteinGrams = weight * 1.6;
  }

  const fatCalories = calorieTarget * 0.27;
  const fatGrams = fatCalories / 9;

  const proteinCalories = proteinGrams * 4;
  const carbCalories = calorieTarget - proteinCalories - fatCalories;
  const carbGrams = carbCalories / 4;

  return {
    calories: Math.round(calorieTarget),
    protein: Math.round(proteinGrams),
    carbs: Math.round(carbGrams),
    fat: Math.round(fatGrams),
    goalName,
    goalDescription
  };
}