import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header.jsx";

const FOOD_DB = [
  { id: 1, name: "Chicken Breast", serving: "100g", calories: 165, protein: 31, carbs: 0, fat: 4 },
  { id: 2, name: "Oatmeal", serving: "1 cup cooked", calories: 154, protein: 6, carbs: 27, fat: 3 },
  { id: 3, name: "Banana", serving: "1 medium", calories: 105, protein: 1, carbs: 27, fat: 0 },
  { id: 4, name: "Avocado", serving: "1/2 medium", calories: 120, protein: 1, carbs: 6, fat: 11 },
  { id: 5, name: "Brown Rice", serving: "1 cup cooked", calories: 216, protein: 5, carbs: 45, fat: 2 },
  { id: 6, name: "Eggs", serving: "1 large", calories: 72, protein: 6, carbs: 0, fat: 5 },
  { id: 7, name: "Greek Yogurt", serving: "1 cup", calories: 130, protein: 17, carbs: 9, fat: 0 },
  { id: 8, name: "Salmon", serving: "100g", calories: 208, protein: 20, carbs: 0, fat: 13 },
  { id: 9, name: "Broccoli", serving: "1 cup", calories: 55, protein: 4, carbs: 11, fat: 1 },
  { id: 10, name: "Sweet Potato", serving: "1 medium", calories: 103, protein: 2, carbs: 24, fat: 0 },
  { id: 11, name: "Almonds", serving: "1 oz", calories: 164, protein: 6, carbs: 6, fat: 14 },
  { id: 12, name: "Whole Milk", serving: "1 cup", calories: 149, protein: 8, carbs: 12, fat: 8 },
  { id: 13, name: "Cheddar Cheese", serving: "1 oz", calories: 113, protein: 7, carbs: 0, fat: 9 },
  { id: 14, name: "White Rice", serving: "1 cup cooked", calories: 206, protein: 4, carbs: 45, fat: 0 },
  { id: 15, name: "Pasta", serving: "1 cup cooked", calories: 220, protein: 8, carbs: 43, fat: 1 },
  { id: 16, name: "Apple", serving: "1 medium", calories: 95, protein: 0, carbs: 25, fat: 0 },
  { id: 17, name: "Peanut Butter", serving: "2 tbsp", calories: 188, protein: 8, carbs: 6, fat: 16 },
  { id: 18, name: "Tuna (canned)", serving: "3 oz", calories: 100, protein: 22, carbs: 0, fat: 1 },
  { id: 19, name: "Spinach", serving: "1 cup raw", calories: 7, protein: 1, carbs: 1, fat: 0 },
  { id: 20, name: "Orange", serving: "1 medium", calories: 62, protein: 1, carbs: 15, fat: 0 },
];

const TODAY_KEY = () => new Date().toISOString().slice(0, 10);

function getLog() {
  try { return JSON.parse(localStorage.getItem(`food-log-${TODAY_KEY()}`)) || []; }
  catch { return []; }
}

function saveLog(log) {
  localStorage.setItem(`food-log-${TODAY_KEY()}`, JSON.stringify(log));
}

export default function LogFood() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [servings, setServings] = useState(1);
  const [log, setLog] = useState(getLog());
  const [showCustom, setShowCustom] = useState(false);
  const [custom, setCustom] = useState({ name: "", serving: "", calories: "", protein: "", carbs: "", fat: "" });
  const [added, setAdded] = useState(null);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    setResults(FOOD_DB.filter(f => f.name.toLowerCase().includes(q)).slice(0, 6));
  }, [query]);

  function selectFood(food) {
    setSelected(food);
    setServings(1);
    setResults([]);
    setQuery(food.name);
  }

  function addToLog() {
    if (!selected) return;
    const entry = {
      id: Date.now(),
      name: selected.name,
      serving: selected.serving,
      servings,
      calories: Math.round(selected.calories * servings),
      protein: Math.round(selected.protein * servings),
      carbs: Math.round(selected.carbs * servings),
      fat: Math.round(selected.fat * servings),
    };
    const updated = [entry, ...log];
    setLog(updated);
    saveLog(updated);
    window.dispatchEvent(new Event("foodLogUpdated"));
    setAdded(entry.name);
    setSelected(null);
    setQuery("");
    setTimeout(() => setAdded(null), 2000);
  }

  function removeFromLog(id) {
    const updated = log.filter(e => e.id !== id);
    setLog(updated);
    saveLog(updated);
    window.dispatchEvent(new Event("foodLogUpdated"));
  }

  function addCustomFood() {
    if (!custom.name || !custom.calories) return;
    const entry = {
      id: Date.now(),
      name: custom.name,
      serving: custom.serving || "1 serving",
      servings: 1,
      calories: Number(custom.calories),
      protein: Number(custom.protein) || 0,
      carbs: Number(custom.carbs) || 0,
      fat: Number(custom.fat) || 0,
    };
    const updated = [entry, ...log];
    setLog(updated);
    saveLog(updated);
    window.dispatchEvent(new Event("foodLogUpdated"));
    setCustom({ name: "", serving: "", calories: "", protein: "", carbs: "", fat: "" });
    setShowCustom(false);
    setAdded(entry.name);
    setTimeout(() => setAdded(null), 2000);
  }

  const totals = log.reduce((acc, e) => ({
    calories: acc.calories + e.calories,
    protein: acc.protein + e.protein,
    carbs: acc.carbs + e.carbs,
    fat: acc.fat + e.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  useEffect(() => {
    localStorage.setItem("dailyConsumed", JSON.stringify(totals));
  }, [totals]);

  return (
    <>
      <Header />

      {added && <div className="logfood-toast">{added} added to log ✓</div>}

      <section className="budget-section">
        <div className="budget-card">
          <div className="budget-header">
            <h2>🍴 Log Food</h2>
          </div>

          <div className="logfood-search-wrap">
            <span className="logfood-search-icon">🔍</span>
            <input
              className="logfood-input"
              type="text"
              placeholder="Search for foods..."
              autoComplete="off"
              value={query}
              onChange={e => { setQuery(e.target.value); setSelected(null); }}
            />
          </div>

          {results.length > 0 && (
            <div className="logfood-results">
              {results.map(food => (
                <button key={food.id} className="logfood-result-item" onClick={() => selectFood(food)}>
                  <div className="logfood-result-name">{food.name}</div>
                  <div className="logfood-result-meta">{food.serving}</div>
                  <div className="logfood-result-macros">
                    {food.calories} cal &bull; P: {food.protein}g &bull; C: {food.carbs}g &bull; F: {food.fat}g
                  </div>
                </button>
              ))}
            </div>
          )}

          {selected && (
            <div className="logfood-detail">
              <div className="logfood-detail-header">
                <div>
                  <div className="logfood-detail-name">{selected.name}</div>
                  <div className="logfood-detail-serving">{selected.serving}</div>
                </div>
                <button className="logfood-close" onClick={() => { setSelected(null); setQuery(""); }}>✕</button>
              </div>
              <div className="logfood-detail-body">
                <div>
                  <div className="logfood-label">Servings</div>
                  <input
                    className="logfood-servings"
                    type="number"
                    min="0.25"
                    step="0.25"
                    value={servings}
                    onChange={e => setServings(Math.max(0.25, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <div className="logfood-label">Total Calories</div>
                  <div className="logfood-cals">{Math.round(selected.calories * servings)}</div>
                </div>
              </div>
              <div className="logfood-macros-row">
                <span>P: {Math.round(selected.protein * servings)}g</span>
                <span>C: {Math.round(selected.carbs * servings)}g</span>
                <span>F: {Math.round(selected.fat * servings)}g</span>
              </div>
              <button className="logfood-add-btn" onClick={addToLog}>Add to Log</button>
            </div>
          )}
        </div>
      </section>

      <section className="budget-section">
        <div className="budget-card">
          <button className="logfood-add-custom" onClick={() => setShowCustom(v => !v)}>
            + Add Custom Food
          </button>
          {showCustom && (
            <div className="logfood-custom-form">
              <input className="logfood-custom-input" placeholder="Food name *" value={custom.name} onChange={e => setCustom(p => ({ ...p, name: e.target.value }))} />
              <input className="logfood-custom-input" placeholder="Serving size (e.g. 1 cup)" value={custom.serving} onChange={e => setCustom(p => ({ ...p, serving: e.target.value }))} />
              <div className="logfood-custom-row">
                <input className="logfood-custom-input" type="number" placeholder="Calories *" value={custom.calories} onChange={e => setCustom(p => ({ ...p, calories: e.target.value }))} />
                <input className="logfood-custom-input" type="number" placeholder="Protein (g)" value={custom.protein} onChange={e => setCustom(p => ({ ...p, protein: e.target.value }))} />
                <input className="logfood-custom-input" type="number" placeholder="Carbs (g)" value={custom.carbs} onChange={e => setCustom(p => ({ ...p, carbs: e.target.value }))} />
                <input className="logfood-custom-input" type="number" placeholder="Fat (g)" value={custom.fat} onChange={e => setCustom(p => ({ ...p, fat: e.target.value }))} />
              </div>
              <button className="logfood-add-btn" onClick={addCustomFood}>Add to Log</button>
            </div>
          )}
        </div>
      </section>

      {log.length > 0 && (
        <section className="budget-section">
          <div className="budget-card">
            <div className="today-foods__header">
              <div className="today-foods__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
              <h2 className="today-foods__title">Today's Foods</h2>
            </div>

            <div className="logfood-totals">
              <span>{totals.calories} cal total</span>
              <span>P: {totals.protein}g</span>
              <span>C: {totals.carbs}g</span>
              <span>F: {totals.fat}g</span>
            </div>

            <div className="today-foods__list">
              {log.map(entry => (
                <div key={entry.id} className="food-item">
                  <div className="food-item__left">
                    <p className="food-item__name">{entry.name}</p>
                    <p className="food-item__sub">{entry.servings} × {entry.serving}</p>
                  </div>
                  <div className="food-item__right">
                    <div className="food-item__cal">{entry.calories}<span className="food-item__unit">cal</span></div>
                    <div className="food-item__macros">P: {entry.protein}g &bull; C: {entry.carbs}g &bull; F: {entry.fat}g</div>
                  </div>
                  <button className="logfood-remove" onClick={() => removeFromLog(entry.id)}>✕</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer><p></p></footer>
    </>
  );
}