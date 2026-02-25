import React from "react";
import Header from "../components/Header.jsx";


export default function Dashboard() {
    return (
      <>
        <Header/>
  
        <section className="budget-section">
          <div className="budget-card">
            <div className="budget-header">
              <h2>Today's Budget</h2>
              <p className="remaining">
                <strong>1074</strong> remaining
              </p>
            </div>
  
            <h1>259</h1>
            <p>of 1333 calories</p>
  
            <div className="bar">
              <div className="bar-fill calories"></div>
            </div>
  
            <div className="macro">
              <p>
                Protein <span>7g / 99g</span>
              </p>
              <div className="bar">
                <div className="bar-fill protein"></div>
              </div>
            </div>
  
            <div className="macro">
              <p>
                Carbs <span>54g / 151g</span>
              </p>
              <div className="bar">
                <div className="bar-fill carbs"></div>
              </div>
            </div>
  
            <div className="macro">
              <p>
                Fat <span>3g / 37g</span>
              </p>
              <div className="bar">
                <div className="bar-fill fat"></div>
              </div>
            </div>
          </div>
        </section>
  
        <section className="budget-section goal-section">
          <div className="budget-card goal-card">
            <div className="budget-header goal-header">
              <div className="goal-title">
                <span className="goal-dot" aria-hidden="true"></span>
                <h2>Your Goal</h2>
              </div>
  
              <p className="remaining goal-status">
                <strong>Bulking</strong>
              </p>
            </div>
  
            <p className="goal-description">Building muscle with a calorie surplus</p>
  
            <div className="goal-metrics">
              <div className="goal-metric">
                <p className="goal-metric-label">Activity</p>
                <h1 className="goal-metric-value">Moderate</h1>
              </div>
  
              <div className="goal-metric">
                <p className="goal-metric-label">Weight</p>
                <h1 className="goal-metric-value">55 kg</h1>
              </div>
            </div>
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