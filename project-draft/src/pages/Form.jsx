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

}