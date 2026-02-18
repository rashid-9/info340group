import Header from "../components/Header.jsx";

export default function LogFood() {
    return (
      <>
        <Header />
        
        <main>
          <section className="page-header">
            <h1>Log Food</h1>
            <p>Search for foods and add them to your daily log.</p>
          </section>
  
          <section className="progress-section">
            <div className="budget-card">
              <h2>Search</h2>
  
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
  
          <section className="progress-section">
            <div className="budget-card">
              <a className="logfood-add" href="/log-food.html">
                + Add Custom Food
              </a>
            </div>
          </section>
        </main>
  
        <footer>
          <p>&copy; 2026 NutriTrack.</p>
        </footer>
      </>
    );
  }