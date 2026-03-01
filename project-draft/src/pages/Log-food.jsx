import React from "react";
import Header from "../components/Header.jsx";

export default function LogFood() {
  return (
    <>
      <Header />

      <section className="budget-section">
        <div className="budget-card">
          <div className="budget-header">
            <h2>Log Food</h2>
          </div>

          <form className="logfood-search" role="search" action="#" method="get">
            <label className="sr-only" htmlFor="food-search">
              Search for foods
            </label>
            <input
              id="food-search"
              className="logfood-input"
              type="search"
              placeholder="Search for foods..."
              autoComplete="off"
            />
          </form>
        </div>
      </section>

      <section className="budget-section">
        <div className="budget-card">
          <a className="logfood-add" href="/log-food.html">
            + Add Custom Food
          </a>
        </div>
      </section>

      <footer>
        <p></p>
      </footer>
    </>
  );
}