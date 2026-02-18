import Header from "../components/Header.jsx";


export default function Progress() {
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
  
              <div className="macro">
                <p>Protein <span>95g</span></p>
                <div className="bar">
                  <div className="bar-fill protein"></div>
                </div>
              </div>
  
              <div className="macro">
                <p>Carbohydrates <span>250g</span></p>
                <div className="bar">
                  <div className="bar-fill carbs"></div>
                </div>
              </div>
  
              <div className="macro">
                <p>Fats <span>70g</span></p>
                <div className="bar">
                  <div className="bar-fill fat"></div>
                </div>
              </div>
            </div>
          </section>
  
          <section className="progress-section">
            <div className="budget-card">
              <h2>Calories This Week</h2>
              <p>Your daily caloric intake over the past 7 days</p>
  
              <div className="weekly-chart">
  
                <div className="day">
                  <p>Monday <span>1,753 / 2500 cal</span></p>
                  <div className="bar">
                    <div className="bar-fill calories" style={{ width: "70%" }} />
                  </div>
                </div>
  
                <div className="day">
                  <p>Tuesday <span>1,250 / 2500 cal</span></p>
                  <div className="bar">
                    <div className="bar-fill calories" style={{ width: "50%" }} />
                  </div>
                </div>
  
                <div className="day">
                  <p>Wednesday <span>2,013 / 2500 cal</span></p>
                  <div className="bar">
                    <div className="bar-fill calories" style={{ width: "80%" }} />
                  </div>
                </div>
  
                <div className="day">
                  <p>Thursday <span>1,572 / 2500 cal</span></p>
                  <div className="bar">
                    <div className="bar-fill calories" style={{ width: "60%" }} />
                  </div>
                </div>
  
                <div className="day">
                  <p>Friday <span>2,245 / 2500 cal</span></p>
                  <div className="bar">
                    <div className="bar-fill calories" style={{ width: "90%" }} />
                  </div>
                </div>
  
                <div className="day">
                  <p>Saturday <span>1,000 / 2500 cal</span></p>
                  <div className="bar">
                    <div className="bar-fill calories" style={{ width: "40%" }} />
                  </div>
                </div>
  
                <div className="day">
                  <p>Sunday <span>1,875 / 2500 cal</span></p>
                  <div className="bar">
                    <div className="bar-fill calories" style={{ width: "75%" }} />
                  </div>
                </div>
  
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