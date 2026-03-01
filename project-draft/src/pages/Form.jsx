import { useState } from "react";

export default function Forms() {
  
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    gender: "",
    activityLevel: "",
    goal: "",
    highProtein: false,
  });


const [step, setStep] = useState(1);

const next = () => setStep((s) => Math.min(s + 1, 3));
const back = () => setStep((s) => Math.max(s - 1, 1));

const handleSubmit = () => {
  console.log(formData);
  alert("Form submitted! Check console.");
};

return (
  <div style={{ maxWidth: "500px", margin: "40px auto" }}>
    <h2>NutriTrack Setup</h2>

    {/* STEP 1 */}
    {step === 1 && (
      <>
        <h3>Basic Information</h3>

        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => update("age", e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={(e) => update("height", e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={(e) => update("weight", e.target.value)}
        />
        <br /><br />

        <select
          value={formData.gender}
          onChange={(e) => update("gender", e.target.value)}
        >
          <option value="">Select Gender (optional)</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="na">Prefer not to say</option>
        </select>
        <br /><br />

        <button onClick={next}>Continue</button>
      </>
    )}

    {/* STEP 2 */}
    {step === 2 && (
      <>
        <h3>Activity Level</h3>

        <select
          value={formData.activityLevel}
          onChange={(e) => update("activityLevel", e.target.value)}
        >
          <option value="">Select Activity Level</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Lightly Active</option>
          <option value="moderate">Moderately Active</option>
          <option value="very">Very Active</option>
          <option value="extreme">Extremely Active</option>
        </select>

        <br /><br />

        <button onClick={back}>Back</button>{" "}
        <button onClick={next}>Continue</button>
      </>
    )}

    {/* STEP 3 */}
    {step === 3 && (
      <>
        <h3>Your Goal</h3>

        <select
          value={formData.goal}
          onChange={(e) => update("goal", e.target.value)}
        >
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="build">Build Muscle</option>
        </select>

        <br /><br />

        <label>
          <input
            type="checkbox"
            checked={formData.highProtein}
            onChange={(e) => update("highProtein", e.target.checked)}
          />
          Higher Protein Target
        </label>

        <br /><br />

        <button onClick={back}>Back</button>{" "}
        <button onClick={handleSubmit}>Calculate Targets</button>
      </>
    )}
  </div>
);
}

